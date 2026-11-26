// Full-page screenshots at the three review widths.
// Usage: node scripts/screenshot.mjs <url> [outDir] [label]
//   node scripts/screenshot.mjs http://localhost:3000 screenshots/home home
//   COLOR_SCHEME=dark node scripts/screenshot.mjs ...   (default: light)
// Output: <outDir>/<label>-<width>.png, or <label>-dark-<width>.png  (outDir is gitignored)
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
const scheme = process.env.COLOR_SCHEME === "dark" ? "dark" : "light";
const browser = await chromium.launch();
try {
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: scheme });
    await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    // Scroll through the page so lazy-loaded images load before the full-page capture.
    const height = await page.evaluate(() => document.scrollingElement.scrollHeight);
    for (let y = 0; y < height; y += 300) {
      await page.mouse.wheel(0, 300);
      await page.waitForTimeout(150);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(2000); // let the one load animation (cables) finish
    const file = path.join(outDir, `${label}${scheme === "dark" ? "-dark" : ""}-${width}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(file);
    await page.close();
  }
} finally {
  await browser.close();
}
