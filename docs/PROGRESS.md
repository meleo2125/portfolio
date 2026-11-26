# Progress

Branch: `redesign`. Each phase ends with a summary and waits for owner approval.

## Phase 0 — Set up · approved 2026-11-25
- [x] Repo inspected (findings in DECISIONS.md D-002, D-006, D-007)
- [x] Skills/plugins/MCP inventory; Claude Code docs checked for install method
- [x] Candidate skills/plugins listed for approval (chat report, 2026-11-25)
- [x] Install approved skills: frontend-design, web-design-guidelines, react-best-practices, impeccable (text only) — D-009
- [x] New resume in public/resume.pdf; CONTENT.md updated from owner answers — D-010
- [x] Docs created: CLAUDE.md, AGENTS.md, docs/CONTENT.md, DESIGN.md (skeleton), DECISIONS.md, PROGRESS.md, reference/, briefs/
- [x] Dependencies installed (npm ci)
- [x] Lint runs (ESLint 9 CLI) — 15 errors / 4 warnings in old code, left for the rebuild
- [x] Typecheck clean
- [ ] Build clean — fails locally: old site needs POSTGRES_URL (D-007)
- [x] Playwright + screenshot script, verified against the live site
- [x] Branch `redesign` created

## Phase 1 — Audit current site · approved 2026-11-25
- [x] Screenshots of every page at 375/768/1440 (/, /admin/login, 404) + first visit, reduced motion, no-JS — screenshots/phase1-before/ (gitignored)
- [x] Lighthouse 13.6.0 mobile ×3 + desktop ×2 (local; PSI quota exhausted)
- [x] Content check vs CONTENT.md, keyboard, links, contrast
- [x] docs/AUDIT.md

## Phase 2 — Design direction · approved 2026-11-26 (brief: docs/briefs/phase-2-design-direction.md)
- [x] Survey of 76 portfolios (39 random developer, 37 curated developer/designer) → docs/DESIGN_CLICHES.md
- [x] 11 raw concepts with originality / risk / readability notes → docs/DESIGN_DIRECTIONS.md
- [x] Scoring; 8 discarded with reasons
- [x] Top 3 mocks: docs/design/concepts/a-mapping.html, b-strata.html, c-lineage.html (light + dark, 375/768/1440 checked)
- [x] Recommendation (v1: A. The Mapping) + main risk of each
- [x] Owner feedback on v1 (too SAP-heavy up front, too plain) → docs/DESIGN_REFERENCES.md (what the best sites do well)
- [x] v2 mocks: a-migration.html, b-patchbay.html, c-strata.html (light + dark, 375/768/1440 checked); recommendation B
- [x] Owner replaced the IPR project with Kharcha (CONTENT.md); resume-update prompt written for the owner
- [x] Owner picked B. Patch bay (D-013)
- [x] Workplace accelerators toned down to sentences; showcase archived (D-015)
- [x] Kharcha demo-data screenshots received, checked for real data, three added (light + dark)
- [x] Hero cable pairs approved with Phase 2; glosses go to final review in Phase 3 (IA_AND_COPY.md §4)
- [x] docs/DESIGN.md filled; tokens in src/app/(site)/site.css + tailwind.config.ts; fonts via next/font; PatchBay component; /design-system page (375/768/1440 + dark checked). Old site moved to src/app/(legacy)/ (D-016)

## Phase 3 — IA and copy · approved 2026-11-26
- [x] Pages, section order, nav → docs/IA_AND_COPY.md
- [x] All site copy from CONTENT.md, plus a table of every rewording vs the resume
- [x] Kharcha source links removed (repo going private, D-017); CONTENT.md skills synced with the new resume (Kotlin, Jetpack Compose)
- [x] Owner approved copy and rewordings; later edit: no Kharcha status line or screenshot caption
- [x] New resume PDF without the Kharcha repo link → public/resume.pdf (2026-11-26)
- [x] D-007 confirmed: Postgres and /admin dropped; /design-system is 404 in production
## Phase 4 — Build · done 2026-11-26
- [x] Old site, database, admin, middleware and 4 dependencies removed (commit c352774)
- [x] Home page built from src/content/site.ts (one file holds all text)
- [x] 404, icon, Open Graph image, robots.txt, sitemap.xml, canonical, theme colour
- [x] Lint 0 errors / 0 warnings, typecheck clean, production build passes (all routes static)
- [x] Checked in the browser pane at 1440, 768, 375 and 320, light and dark; fixed list bullets, duplicate email, nav overflow at 320
- [x] Skills shown as a patch panel (owner approved 2026-11-26); mapping from CONTENT.md, React and SQLite plugs inferred
- [x] docs/UPDATING.md: how to update content without /admin; Vercel clean-up steps
- [x] Playwright Chromium reinstalled (owner OK, 2026-11-26; ~700 MB on disk). Full-page screenshots at 375/768/1440, light and dark: screenshots/phase4/ (gitignored)
- [x] Lighthouse 13.6.0, production build, same flags as Phase 1. Accessibility, best practices, SEO: 100 on every run. Desktop performance 100 (TBT 30 ms). Mobile performance over 5 runs: 80, 91, 92, 86, 89 (median 89; LCP 0.8–1.2 s, CLS 0, TBT 340–860 ms). The first run after each server start is consistently the lowest. Old site: median 81 mobile.
- [x] Skills panel reworked to cut hydration: the 38 skills are server-rendered; only the five switches are client code
- [ ] Mobile performance is not reliably ≥ 90 in this machine's lab runs. Recheck with PageSpeed Insights on the Vercel preview (Phase 5/6), which runs on consistent hardware
- [x] New resume PDF without the Kharcha repo link → public/resume.pdf (2026-11-26)
## Phase 5 — QA · done, awaiting owner (report: docs/QA.md)
- [x] Lint, typecheck, build clean
- [x] scripts/qa.mjs: routes, links, anchors, images, headings, landmarks, metadata, keyboard, no-JS, reduced motion, axe-core (8 runs, 0 violations)
- [x] Lighthouse before/after: accessibility, best practices, SEO 100; desktop 100; mobile median 86 (range 77–92, TBT noise)
- [x] Site text re-read against CONTENT.md: no unapproved facts
- [x] Confidentiality: bank name removed from CONTENT.md; built site clean
- [x] Owner decided to keep the KOTAKD screenshot and commit 6665532 as they are (2026-11-26)
- [x] New resume PDF published to public/resume.pdf (Kharcha, no repo link; text and links checked)
## Phase 6 — Preview and ship · not started
