// Audit capture for a deployed or local site. Reused for before/after comparison (Phase 1 and 5).
// Usage: node scripts/audit-capture.mjs <baseUrl> <outDir>
// Writes PNGs and <outDir>/audit.json. outDir should be under screenshots/ (gitignored).
// Each step records its own error and the JSON is rewritten after every step, so partial results survive.
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const [base, outDir] = process.argv.slice(2);
if (!base || !outDir) {
  console.error("usage: node scripts/audit-capture.mjs <baseUrl> <outDir>");
  process.exit(1);
}
const WIDTHS = [375, 768, 1440];
const ROUTES = [
  ["home", "/"],
  ["admin-login", "/admin/login"],
  ["not-found", "/this-page-does-not-exist"],
];
const NAV = { waitUntil: "load", timeout: 90_000 };
// Old site only: first-visit boot loader flag. Harmless on other sites.
const SKIP_LOADER = () => {
  try { sessionStorage.setItem("mukesh.portfolio.booted", "1"); } catch {}
};
const report = { base, capturedAt: new Date().toISOString(), errors: [], pages: [], firstVisit: [], noJs: null, keyboard: null, links: [] };

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const save = () => writeFile(path.join(outDir, "audit.json"), JSON.stringify(report, null, 2));
async function step(name, fn) {
  try { await fn(); } catch (e) {
    const msg = String(e).split("\n")[0];
    report.errors.push({ step: name, error: msg });
    console.error(`[${name}] ${msg}`);
  }
  await save();
}
async function scrollThrough(page) {
  const height = await page.evaluate(() => document.scrollingElement.scrollHeight);
  for (let y = 0; y < height; y += 300) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);
}
async function openHome(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const page = await ctx.newPage();
  await page.addInitScript(SKIP_LOADER);
  await page.goto(base + "/", NAV);
  await page.waitForTimeout(1500);
  return { ctx, page };
}

try {
  // 1. Every route at every width, loader skipped, after scrolling (reveals scroll-triggered content).
  for (const [label, route] of ROUTES) {
    for (const width of WIDTHS) {
      await step(`page ${label} ${width}`, async () => {
        const ctx = await browser.newContext({ viewport: { width, height: 900 } });
        const page = await ctx.newPage();
        await page.addInitScript(SKIP_LOADER);
        try {
          const res = await page.goto(base + route, NAV);
          await page.waitForTimeout(1500);
          await scrollThrough(page);
          const file = path.join(outDir, `${label}-${width}.png`);
          await page.screenshot({ path: file, fullPage: true });
          const info = await page.evaluate(() => ({
            title: document.title,
            height: document.scrollingElement.scrollHeight,
            horizontalOverflow: document.scrollingElement.scrollWidth > window.innerWidth,
          }));
          report.pages.push({ label, route, width, status: res?.status(), file, ...info });
        } finally { await ctx.close(); }
      });
    }
  }

  // 2. First visit (fresh session, loader NOT skipped): time until the h1 is visible and not covered,
  //    plus a viewport screenshot at 1s. Normal and reduced motion.
  for (const reducedMotion of ["no-preference", "reduce"]) {
    for (const width of [375, 1440]) {
      await step(`first-visit ${reducedMotion} ${width}`, async () => {
        const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion });
        const page = await ctx.newPage();
        try {
          const t0 = Date.now();
          await page.goto(base + "/", { waitUntil: "commit", timeout: 90_000 });
          const shotAt1s = page.waitForTimeout(1000).then(() =>
            page.screenshot({ path: path.join(outDir, `first-visit-${reducedMotion === "reduce" ? "reduced" : "normal"}-1s-${width}.png`) })
          );
          let ms = null;
          try {
            await page.waitForFunction(() => {
              const h = document.querySelector("main h1");
              if (!h) return false;
              const r = h.getBoundingClientRect();
              if (r.width === 0 || parseFloat(getComputedStyle(h).opacity) < 0.9) return false;
              const top = document.elementFromPoint(r.left + 5, r.top + 5);
              return top === h || h.contains(top);
            }, null, { timeout: 20_000, polling: 100 });
            ms = Date.now() - t0;
          } catch { ms = ">20000"; }
          await shotAt1s;
          report.firstVisit.push({ reducedMotion, width, msUntilH1VisibleAndUncovered: ms });
        } finally { await ctx.close(); }
      });
    }
  }

  // 3. No JavaScript: how much text is hidden by inline opacity.
  await step("no-js", async () => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
    const page = await ctx.newPage();
    try {
      await page.goto(base + "/", NAV);
      const file = path.join(outDir, "no-js-1440.png");
      await page.screenshot({ path: file, fullPage: true });
      report.noJs = await page.evaluate(() => {
        const els = [...document.querySelectorAll("main h1, main h2, main h3, main p, main li")];
        const hidden = els.filter((e) => {
          for (let n = e; n && n !== document.body; n = n.parentElement) {
            if (parseFloat(getComputedStyle(n).opacity) === 0) return true;
          }
          return false;
        });
        return { textElementsTotal: els.length, textElementsHiddenByOpacity: hidden.length };
      });
      report.noJs.file = file;
    } finally { await ctx.close(); }
  });

  // 4. Keyboard: first 25 Tab stops on home, accessible name, and whether a focus indicator is drawn.
  await step("keyboard", async () => {
    const { ctx, page } = await openHome();
    try {
      const stops = [];
      for (let i = 0; i < 25; i++) {
        await page.keyboard.press("Tab");
        stops.push(await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return null;
          const s = getComputedStyle(el);
          const name = (el.getAttribute("aria-label") || el.textContent || el.getAttribute("title") || "").trim().replace(/\s+/g, " ").slice(0, 60);
          const outline = s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0;
          const ring = Boolean(s.boxShadow && s.boxShadow !== "none");
          const r = el.getBoundingClientRect();
          return { tag: el.tagName.toLowerCase(), name, href: el.getAttribute("href"), focusIndicator: outline || ring, onScreen: r.bottom > 0 && r.top < innerHeight };
        }));
      }
      report.keyboard = stops;
    } finally { await ctx.close(); }
  });

  // 5. Links on home (project cards expanded): href, target, rel, HTTP status.
  await step("links", async () => {
    const { ctx, page } = await openHome();
    try {
      await scrollThrough(page);
      for (const b of await page.locator("main button[aria-expanded='false']").all()) {
        await b.click({ timeout: 3000 }).catch(() => {});
        await page.waitForTimeout(200);
      }
      const links = await page.evaluate(() =>
        [...document.querySelectorAll("a[href]")].map((a) => ({
          text: (a.getAttribute("aria-label") || a.textContent || "").trim().replace(/\s+/g, " ").slice(0, 50),
          href: a.href, target: a.getAttribute("target"), rel: a.getAttribute("rel"),
        }))
      );
      const seen = new Map();
      for (const l of links) {
        if (/^https?:/.test(l.href) && !seen.has(l.href)) {
          let status;
          try { status = (await page.request.get(l.href, { maxRedirects: 5, timeout: 20_000 })).status(); }
          catch (e) { status = "error: " + String(e).split("\n")[0]; }
          seen.set(l.href, status);
        }
        l.status = seen.get(l.href) ?? "n/a";
      }
      report.links = links;
    } finally { await ctx.close(); }
  });
} finally {
  await browser.close();
  await save();
}
console.log("done:", path.join(outDir, "audit.json"), "errors:", report.errors.length);
