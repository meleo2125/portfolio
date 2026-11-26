# Phase 5: QA and review

Run 2026-11-26 against the production build (`next build` + `next start`, port 3100) on this 4-thread machine.
Re-run: `node scripts/qa.mjs http://localhost:3100 <out.json>` and Lighthouse 13.6.0 with the flags in AUDIT.md §2.
Raw output (gitignored): `screenshots/phase5-qa.json`, `screenshots/phase5/lh/`, `screenshots/phase4/lh/`.

## Build checks
- `npm run lint`: 0 errors, 0 warnings (Phase 0: 15 errors, 4 warnings in the old code)
- `npm run typecheck`: clean
- `npm run build`: passes, every route static (Phase 0: failed without the database)

## Lighthouse, before and after
Same version (13.6.0), same flags, same machine. Before: the live old site, Phase 1. After: the production build of the redesign.

| | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Mobile, before | 81 (79 / 81 / 84) | 100* | 96 | 100 | 0.93 s | 2.69 s | 583 ms | 0 |
| Mobile, after | 86 (86 / 92 / 77) | 100 | 100 | 100 | 0.9 s | 0.9 s | 560 ms (350–1,090) | 0 |
| Desktop, before | 100 | 100* | 96 | 100 | 0.27 s | 0.57 s | 20 ms | 0 |
| Desktop, after | 100 (100 / 100) | 100 | 100 | 100 | 0.2–0.3 s | 0.2–0.3 s | 30–70 ms | 0 |

\* The old site's 100 was misleading: most content started at `opacity: 0`, so axe skipped it (AUDIT.md §2).

- **Mobile performance is not reliably ≥ 90 here.** Across all 8 mobile runs since Phase 4 (80, 91, 92, 86, 89, 86, 92, 77), the median is 87.5. LCP and CLS are steady and good (0.8–1.2 s, 0). Only Total Blocking Time moves, from 340 to 1,090 ms between identical runs, which points at CPU contention on this machine under Lighthouse's 4× slowdown.
- **What runs on the main thread:** React (70 KB, the framework itself) hydrating a mostly server-rendered page, plus two small client components (the hero cables and the five skill switches).
- **Next check:** PageSpeed Insights on the Vercel preview (Phase 6), which runs on consistent hardware. If it is still under 90 there, the next lever is to lazy-hydrate the hero cables.

## Accessibility
- **axe-core 4.12.1, WCAG 2.1 A/AA + best practice:** no violations in 8 runs (light and dark × 375 and 1440 × skills panel with and without a switch active). It's injected from node_modules (already present via eslint-plugin-jsx-a11y), so no new dependency.
- **Keyboard:** 39 tab stops, in reading order, starting with "Skip to content". Every stop shows a visible 3px outline. The skill switches are real buttons with `aria-pressed`.
- **Structure:** one h1, then h2/h3 with no skipped levels. Landmarks: header, nav ("Sections"), main, footer, plus named regions for each section.
- **Fixed during QA:**
  - The h1 now has a real space between the two lines, so its name reads "Mukesh Prajapat".
  - The skill groups no longer create seven extra landmark regions.
- **Reduced motion:** no running animations; the cables are drawn complete.
- **No JavaScript:** all text is present, including the patch bay pairs and every skill; no hidden text.
- **Contrast:** checked by axe in both themes, including dimmed skills (5.3:1 light, 7.0:1 dark, computed separately).

## Routes and links
| Route | Status |
|---|---|
| `/` | 200 |
| `/resume.pdf` | 200 (the new resume, published after QA) |
| `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, `/icon.svg` | 200 |
| `/design-system` | 404 in production (owner preview only) |
| `/admin`, `/admin/login`, unknown paths | 404 (styled page) |

- **In-page anchors:** all resolve.
- **External links** all have `target="_blank" rel="noopener noreferrer"`:
  - GitHub profile, TheLyst repo, TheLyst live demo: 200.
  - LinkedIn: answers 999 to automated requests and shows a sign-in wall to logged-out visitors. The URL matches the resume and CONTENT.md exactly, but it was not verified beyond that.
- **Metadata:** title, description, canonical, Open Graph and Twitter tags with a 1200×630 image and alt, icon, theme colour in both schemes, `lang="en"`.

## Text against CONTENT.md
143 visible lines, the image alt texts, the title, the description and the OG alt were compared with CONTENT.md and IA_AND_COPY.md.
- No unapproved facts.
- Not found word for word, and all fine:
  - "Skip to content" (now listed in IA_AND_COPY.md);
  - the screen-reader phrases "used at work" etc. (approved with the skills panel);
  - the GeeksforGeeks line (differs only by bold formatting);
  - the OG alt (name plus the approved claim).

## Confidentiality
- **Built site** (HTML, RSC payload, client JS) contains none of: phone numbers, any 60–90 figure, IPR, Herbal Garden, DaisyUI, Three.js, TypeScript, TensorFlow, the excluded roles or awards. Ruby appears only as the GeeksforGeeks article topic.
- **SAP work:**
  - shown only as the approved sentences, at resume level;
  - no customer names;
  - no internals, architecture or screenshots of the accelerators.
- **Kharcha images:** made-up demo data only.
- **Found and fixed:** CONTENT.md named the owner's bank, in the note on which screenshots were skipped. It's removed from all tracked files.
- **Owner decision (2026-11-26): keep both as they are.** No screenshot swap and no history rewrite. For the record:
  1. The Kharcha home screenshot shows the SMS sender code "KOTAKD" under the demo alert, which identifies the bank the app was built for. The data around it is fictional.
  2. The bank name is still in one local commit (`6665532`, not pushed). Removing it from history needs a rewrite of unpushed local commits before Phase 6.

## Open
- Done after QA: the new resume (Kharcha, no repo link) replaced `public/resume.pdf`. Its 5 links are the ones checked above; text matches CONTENT.md.
- Mobile performance: confirm on the Vercel preview (above).
- Re-run after D-019 (skills panel: one Projects switch): routes, links and images unchanged; 38 tab stops, all with a visible outline; axe: no violations in 8 runs.
