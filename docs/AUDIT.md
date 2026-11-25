# Audit of the current site (Phase 1)

Site: https://mukeshprajapat.vercel.app (deployment from `master` @ 6615364, served from Vercel's cache, `age` ≈ 130 days at audit time).
Audited 2026-11-25. Raw data (gitignored): `screenshots/phase1-before/` — full-page PNGs per route and width, `audit.json`, Lighthouse JSON.
Re-run: `node scripts/audit-capture.mjs <url> <outDir>` and Lighthouse 13.6.0 (see §2 for flags).

## 1. Pages

| Route | Status | Notes |
|---|---|---|
| `/` | 200 | The whole portfolio, one page |
| `/admin` | 307 → `/admin/login` | Password-protected CMS for the Postgres content |
| `/admin/login` | 200 | Public login form, indexable (no `noindex`) |
| any unknown path | 404 | Default Next.js 404, unstyled |
| `/robots.txt`, `/sitemap.xml`, `/favicon.ico`, OG image | 404 | Missing |
| `/resume.pdf` | 200 | Old resume (Jul 2025; see §4) |

## 2. Lighthouse (baseline for Phase 5)

Lighthouse 13.6.0, run locally on this machine (headless Chromium 1255 from Playwright, default simulated throttling), against the live URL with a fresh session, so the boot loader runs. PageSpeed Insights could not be used: the shared API quota was exhausted. Medians: mobile 3 runs, desktop 2 runs. JSON: `screenshots/phase1-before/lighthouse/`.

Command (mobile; add `--preset=desktop` for desktop):
```
CHROME_PATH=~/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome nice npx --yes lighthouse@13.6.0 <url> --quiet \
  --chrome-flags="--headless=new --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=<file>
```

| | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Speed Index |
|---|---|---|---|---|---|---|---|---|---|
| Mobile | **81** (79 / 81 / 84) | 100 | 96 | 100 | 0.93 s | 2.69 s | 583 ms | 0 | 2.30 s |
| Desktop | 100 | 100 | 96 | 100 | 0.27 s | 0.57 s | 20 ms | 0 | 0.61 s |

- Mobile performance is held down by JavaScript: 4.7 s JS execution and 9.8 s main-thread work under throttling, TBT 583 ms. The biggest chunk (71 KB) costs 5.1 s of CPU alone. Contributors: framer-motion on almost every section, the canvas node graph animation, the boot loader, the keyboard overlay.
- Best practices 96: one console error, a 404 for `/favicon.ico`.
- Total transfer is small (343 KB), and fonts are self-hosted with `next/font`, so the fix is CPU work, not bytes.
- **The 100 for accessibility is misleading.** Axe skips elements with `opacity: 0`, and most of the page starts that way, so contrast and much of the content went untested. The problems in §3 are invisible to Lighthouse.
- SEO 100 checks only basics. It misses that there is no canonical, OG image, sitemap or robots file, and that `metadataBase` is wrong.

## 3. Experience, accessibility and robustness (measured)

From `scripts/audit-capture.mjs` (`audit.json`) and the screenshots.

- **First visit hides the site for about 4.8 s.** Time until the `<h1>` is visible and not covered by the loader: 4.77 s (375px) and 4.80 s (1440px). It is the same with `prefers-reduced-motion: reduce` (5.10 s / 4.77 s): the loader does not shorten for reduced motion. It shows "Establishing link", fake telemetry and "HANDSHAKE · PORTFOLIO" (screenshot `first-visit-*-1s-*.png`).
- **Without JavaScript nothing is readable.** 74 of 74 headings, paragraphs and list items in `<main>` are inside `opacity: 0` (server HTML ships `style="opacity:0"` on 32 elements, including the `<h1>`). This also affects some crawlers, link previews and reader modes.
- **The 5-second test fails.** The first screen shows no name (only "MP" in the side rail), no current title or employer, and no contact. The `<h1>` is "Data systems engineer. Independent builder.", a tagline not in CONTENT.md. The hero stats are "60–90%" (banned), CGPI and "5+ shipped" (unsupported).
- **Mobile (375px):** the icon-only bottom nav bar sits over page content (it covers the node graph in the hero screenshot); its icons have no visible labels. The node graph is unreadable at this width (overlapping labels such as "IPR App" / "Virtual Garden"). Page length is 7,743px. No horizontal overflow at any width.
- **Keyboard:** a skip link exists and every focus stop shows a visible indicator (good). But it takes 9 Tab stops to reach the hero buttons, and every skill chip is a `<button>`, so 30+ stops sit between the hero and Experience.
- **Single-key shortcuts** (`?` and `g` + letter) are always on with no way to switch them off (WCAG 2.1.4 Character Key Shortcuts, level A).
- **Small text:** 20 places use 9–11px text, mostly monospace uppercase labels.
- **Contrast (computed from tokens):** body text 16.1:1, muted text 6.3–7.6:1, amber 7.5–9.0:1, all pass. Cyan (`#3F8FA6`, used in 14 places) is 5.24:1 on the page background but 4.38:1 on raised panels, below 4.5:1 for small text.
- **No light theme.** Dark only; `prefers-color-scheme` is ignored and there is no `color-scheme` or `theme-color`.
- **Links:** every external link uses `target="_blank" rel="noopener noreferrer"`. All resolved (200), except LinkedIn, which returns 429 to automated clients (normal for LinkedIn). The project-card links still point to the removed Herbal Garden demo and source, and to a third-party repo (`SM-Sclass/502lostserver_ALGORITHM_9.0`) for the excluded AI Healthcare project.
- **404 page:** the unstyled Next.js default on a white background, with the home page's title. `/admin/login` also reuses the home title and is indexable.

## 4. Outdated or wrong content (checked against docs/CONTENT.md)

Live text comes from three places: Postgres (`projects`, `site_content`), `src/lib/data/*.ts`, and hard-coded component copy.

**Wrong facts / banned items on the live site**
- Title "Associate - SAP Analytics" / "Associate in SAP Analytics" / "Associate, SAP Analytics @ Bristlecone" (hero status card, About, Experience). Current title: Associate Consultant, SAP Analytics.
- "60–90%" appears 3 times: hero stat ("Reduction 60–90% manual effort"), About paragraph, Experience outcome. Must not appear at all.
- Ruby on Rails listed as a skill (Skills › Foundations).
- Virtual Herbal Garden project card (and "Three.js" in its stored build text). Removed project.
- DaisyUI in TheLyst's stored build text.
- `/resume.pdf` is the July 2025 resume: "Associate", "60–90%", Ruby, Ruby on Rails, DaisyUI, Three.js, Virtual Herbal Garden, "Web Developer Bootcamp". (Fixed on `redesign`: new PDF committed.)
- `metadataBase` is `https://mukesh.portfolio` (not a real domain), so any absolute URL Next generates from it would be wrong.

**On the live site but not in CONTENT.md (excluded unless the owner adds them)**
- Taglines and claims: "Data systems engineer. Independent builder.", "By day I design… By choice I ship…", "I thrive on solving real-world problems…", "Shipped 5+ production apps", "5 flagship builds", "Collaborated cross-functionally…".
- Projects: AI Healthcare Platform ("90%+ prediction accuracy"), Next.js Firebase Auth Starter Kit.
- Earlier roles: GoodGameNation, YPP Technologies, Techniche IIT Guwahati.
- Award "Knowledge Ninja"; certifications "AI for India 2.0", "The Web Developer Bootcamp".
- Skills not in CONTENT.md: TypeScript, TensorFlow, "SAP BW Modeling"/"SAP HANA Modeling" as skills (CONTENT.md has them as training), SQLite listed as an SAP-role tool.
- Extracurriculars line (Students' Council, E-Cell, CSI, DataCite).
- "CGPI" wording (CONTENT.md: CGPA 9.32/10).

**Missing from the live site (in CONTENT.md)**
- The three accelerators line and "up to 70%".
- Associate Consultant title; training list; award reason.
- GeeksforGeeks role (hidden inside a collapsed "Earlier deployments (4)" list, with "Ruby on Rails and statistics").
- Skills: REST APIs, MCP, GitHub Actions, Vercel, Firebase Authentication, JWT, WebI, Claude Code, AI chatbots.
- Portfolio headline "Software Engineer | AI & Automation for SAP Data Platforms".

Also verified by expanding every project card: TheLyst shows "DaisyUI" and an unsupported outcome claim ("The design language ties directly into this portfolio"); Herbal Garden shows "Three.js, React Three Fiber"; AI Healthcare shows "90%+ prediction accuracy".

## 5. Weak in structure

1. **The concept hides the person.** The whole site is a terminal/telemetry theme: boot sequence, "SYS:BOOT · v25.07 · online", "MOD-02 · DIAGNOSTICS", "DEPLOYMENT LOG", "TERMINAL", a `$ reach_out --email` prompt, "exit_code: 0", "Power off". All of these are on the Phase 2 banned list, and the jargon means nothing to a recruiter.
2. **The differentiator is buried.** SAP work, the main reason to hire, gets one outcome paragraph and a tool list. The three accelerators and "up to 70%" are absent. The hero splits attention 50/50 with "Independent builder".
3. **Key content sits behind clicks.** Project details are collapsed by default; GeeksforGeeks is hidden in "Earlier deployments (4)".
4. **Too much, too loosely sourced.** 5 projects (2 to keep), 4 extra roles, extracurriculars and taglines, many of them not in CONTENT.md.
5. **Content comes from three sources** (Postgres, TS data files, hard-coded JSX). The database is what kept the stale "60–90%" and "Associate" text alive, and the build fails without the database secret (DECISIONS D-007).
6. **Metadata and SEO basics are missing:** canonical, OG image and URL, robots, sitemap, favicon.ico, theme-color, per-page titles, a styled 404. `metadataBase` points to `https://mukesh.portfolio`.
7. **Admin surface on a portfolio.** Public login page, password stored in the cookie, and middleware that passes if `ADMIN_PASSWORD` is ever unset (D-007).
8. **Lint debt:** 15 ESLint errors (setState in effects, `any`), all in code that will be replaced.

## 6. Worth keeping

- **Delivery basics:** static generation behind Vercel's CDN, `next/font` self-hosting (CLS 0), small transfer size (343 KB), desktop performance 100.
- **Accessibility habits:** skip link, visible focus indicators on every stop, `aria-label`s on icon controls, `role="img"` + label on the canvas, semantic `<section>`/heading structure (1 h1, 6 h2, 13 h3), correct `rel` on external links, an existing reduced-motion check (it just needs to apply to the loader and to content visibility).
- **Single page with anchor navigation** suits a portfolio this size; keep predictable section anchors.
- **Verified facts already on the site:** TheLyst and IPR links and metrics, achievements, education, email, GitHub and LinkedIn links.
- **The skill → project link idea** (skills point to the work that uses them) ties claims to evidence. Keep the idea, but not as 30 tab-stop buttons.
- **Not keeping:** the terminal theme, boot loader, fake telemetry, keyboard overlay, node graph, admin panel and DB, and framer-motion as a page-wide dependency (decided in Phase 2/4).

## 7. Inputs to later phases
- Phase 2: the old look is evidence of what to avoid (§5.1). The concept must pass the 5-second test with no loader and no JS.
- Phase 3: section order must put name, role, SAP work and contact in the first screen.
- Phase 4: no `opacity: 0` on server-rendered content; reduced motion must remove waiting, not just movement. Targets: mobile performance ≥ 90, TBT < 200 ms. Add robots, sitemap, OG, canonical, favicon, a styled 404, and `noindex` where needed.
- Phase 5: re-run `scripts/audit-capture.mjs` and Lighthouse 13.6.0 with the same flags, and add axe on fully visible content.
