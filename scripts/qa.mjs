// Phase 5 QA against a running build. Usage: node scripts/qa.mjs [baseUrl] [out.json]
// Checks: route status codes, links and images on /, headings and landmarks, metadata,
// keyboard focus order and visibility, no-JS content, reduced motion, and axe-core (WCAG 2.1 A/AA + best
// practice) in light and dark at 375 and 1440, also with a skills switch active. Writes JSON and prints a summary.
import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const axePath = createRequire(import.meta.url).resolve("axe-core/axe.min.js");

const base = (process.argv[2] ?? "http://localhost:3100").replace(/\/$/, "");
const out = process.argv[3] ?? "screenshots/qa.json";
const result = {};
const browser = await chromium.launch();

try {
  // 1. Routes
  const routes = ["/", "/resume.pdf", "/robots.txt", "/sitemap.xml", "/opengraph-image", "/icon.svg", "/design-system", "/admin", "/admin/login", "/no-such-page"];
  result.routes = {};
  for (const r of routes) {
    const res = await fetch(base + r, { redirect: "manual" });
    result.routes[r] = res.status;
  }
  result.robots = await (await fetch(base + "/robots.txt")).text();
  result.sitemap = await (await fetch(base + "/sitemap.xml")).text();

  // 2. Home page structure
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  result.home = await page.evaluate(() => {
    const abs = (a) => a.getAttribute("href");
    const links = [...document.querySelectorAll("a")].map((a) => ({
      text: a.textContent.trim().replace(/\s+/g, " "),
      href: abs(a),
      target: a.getAttribute("target"),
      rel: a.getAttribute("rel"),
    }));
    const anchors = links.filter((l) => l.href?.startsWith("#")).map((l) => ({ href: l.href, exists: !!document.getElementById(l.href.slice(1)) }));
    const external = links.filter((l) => /^https?:/.test(l.href ?? ""));
    const badExternal = external.filter((l) => l.target !== "_blank" || !/noopener/.test(l.rel ?? "") || !/noreferrer/.test(l.rel ?? ""));
    const images = [...document.querySelectorAll("img")].map((i) => ({ src: i.getAttribute("src")?.slice(0, 90), alt: i.getAttribute("alt"), w: i.getAttribute("width"), h: i.getAttribute("height") }));
    const headings = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => `${h.tagName} ${h.textContent.trim().replace(/\s+/g, " ").slice(0, 50)}`);
    const landmarks = [...document.querySelectorAll("header,nav,main,footer,section[aria-labelledby],section[aria-label]")].map((e) => e.tagName + (e.getAttribute("aria-label") ? `[${e.getAttribute("aria-label")}]` : ""));
    const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
    const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
    const meta = Object.fromEntries(
      [...document.querySelectorAll("meta[name],meta[property],link[rel=canonical],link[rel=icon]")].map((m) => [
        m.getAttribute("name") ?? m.getAttribute("property") ?? m.getAttribute("rel"),
        m.getAttribute("content") ?? m.getAttribute("href"),
      ]),
    );
    return { title: document.title, lang: document.documentElement.lang, meta, links, anchors, badExternal, images, headings, landmarks, dupIds, text: document.body.innerText };
  });

  // 3. Keyboard: first 40 tab stops, each must show a visible outline
  result.keyboard = [];
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      return { tag: el.tagName, text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40), outline: `${cs.outlineStyle} ${cs.outlineWidth}` };
    });
    if (info) result.keyboard.push(info);
  }
  await page.close();

  // 4. No JavaScript: content still there
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const p2 = await nojs.newPage();
  await p2.goto(base + "/", { waitUntil: "load" });
  result.noJs = await p2.evaluate(() => ({
    hasName: document.body.innerText.includes("Mukesh"),
    hasPairs: document.body.innerText.includes("Enterprise data platforms") && document.body.innerText.includes("Kharcha"),
    hasSkills: document.body.innerText.includes("Jetpack Compose"),
    hiddenText: [...document.querySelectorAll("main *")].filter((e) => e.children.length === 0 && e.textContent.trim() && getComputedStyle(e).visibility === "hidden").length,
  }));
  await nojs.close();

  // 5. Reduced motion: nothing animates
  const rm = await browser.newContext({ reducedMotion: "reduce" });
  const p3 = await rm.newPage();
  await p3.goto(base + "/", { waitUntil: "networkidle" });
  await p3.waitForTimeout(600);
  result.reducedMotion = await p3.evaluate(() => ({ runningAnimations: document.getAnimations().filter((a) => a.playState === "running").length }));
  await rm.close();

  // 6. axe-core on fully rendered content
  result.axe = [];
  for (const scheme of ["light", "dark"]) {
    for (const width of [375, 1440]) {
      for (const state of ["all", "thelyst"]) {
        const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
        const pg = await ctx.newPage();
        await pg.goto(base + "/", { waitUntil: "networkidle" });
        await pg.waitForTimeout(2000);
        if (state !== "all") await pg.locator(".skill-switch", { hasText: "TheLyst" }).click();
        await pg.waitForTimeout(400);
        await pg.addScriptTag({ path: axePath });
        const r = await pg.evaluate(async () =>
          (await axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] } })).violations.map((v) => ({
            id: v.id, impact: v.impact, nodes: v.nodes.length, targets: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
          })),
        );
        result.axe.push({ scheme, width, state, violations: r });
        await ctx.close();
      }
    }
  }
} finally {
  await browser.close();
}

await writeFile(out, JSON.stringify(result, null, 2));
const h = result.home;
console.log("routes", JSON.stringify(result.routes));
console.log("title", h.title, "| lang", h.lang);
console.log("links", h.links.length, "| broken anchors", h.anchors.filter((a) => !a.exists).length, "| external without target/rel", h.badExternal.length, "| duplicate ids", h.dupIds.length);
console.log("images", h.images.length, "| missing alt attr", h.images.filter((i) => i.alt === null).length, "| missing size", h.images.filter((i) => !i.w || !i.h).length);
console.log("keyboard stops", result.keyboard.length, "| without visible outline", result.keyboard.filter((k) => /^none/.test(k.outline)).length);
console.log("noJs", JSON.stringify(result.noJs), "| reducedMotion", JSON.stringify(result.reducedMotion));
for (const a of result.axe) console.log("axe", a.scheme, a.width, a.state, a.violations.length ? JSON.stringify(a.violations) : "no violations");
console.log("written", out);
