// Full-page screenshots at the three review widths.
// Usage: node scripts/screenshot.mjs <url> [outDir] [label]
//   node scripts/screenshot.mjs http://localhost:3000 screenshots/home home
// Output: <outDir>/<label>-<width>.png  (outDir is gitignored)
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const WIDTHS = [375, 768, 1440];
const [url, outDir = "screenshots", label = "page"] = process.argv.slice(2);
if (!url) {
  console.error("usage: node scripts/screenshot.mjs <url> [outDir] [label]");
  process.exit(1);
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
try {
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    // Old site only: skip the first-visit boot loader so the real page is captured.
    await page.addInitScript(() => {
      try { sessionStorage.setItem("mukesh.portfolio.booted", "1"); } catch {}
    });
    await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    // Scroll through the page so scroll-triggered (whileInView) content renders.
    // Real wheel events: programmatic scrollTo did not trigger the old site's observers.
    const height = await page.evaluate(() => document.scrollingElement.scrollHeight);
    for (let y = 0; y < height; y += 300) {
      await page.mouse.wheel(0, 300);
      await page.waitForTimeout(150);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500); // let entry animations settle
    const file = path.join(outDir, `${label}-${width}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(file);
    await page.close();
  }
} finally {
  await browser.close();
}
