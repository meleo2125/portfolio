# Decisions log

Newest first. Each entry: what, why, status. "Pending" entries need the owner.

## 2026-11-25 — Phase 2

**D-017 · No public link for Kharcha — done (owner)**
Owner decision 2026-11-26: the Kharcha repo is going private, so the site shows no source or demo link for it. Removed from the design-system page, the mocks and CONTENT.md. The owner's updated resume (2026-11-26) has no Kharcha link and is now public/resume.pdf.

**D-016 · New design lives in its own root layout — done**
The old site moved unchanged into `src/app/(legacy)/` (its layout, page, globals.css and /admin); the redesign has its own root layout in `src/app/(site)/` with its own CSS (site.css) and fonts (Anybody with the wdth axis, Hanken Grotesk, via next/font). Route groups with separate root layouts are documented in node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route-groups.md; the only cost is a full page load when moving between the two, which ends in Phase 4 when (legacy) is deleted. /design-system is `noindex` and not linked. No new dependencies.

**D-015 · Workplace accelerators described in sentences only — done (owner)**
Owner decision 2026-11-25: do not feature the three Bristlecone accelerators (no hero cables, titles, cards or showcase) until they are live; explain them in lines. The showcase version is archived in docs/archive/accelerators-showcase/. Hero cables now pair public things: enterprise data platforms → AI and automation tools, the web → TheLyst, Android → Kharcha (proposal, awaiting owner approval). The hero's "Up to 70%" line moved into the work sentences.

**D-014 · Kharcha replaces the IPR project — done (owner)**
Owner decision 2026-11-25: remove the Gamified IPR Learning Platform from the site and the resume; add Kharcha (github.com/meleo2125/kharcha). Wording drafted from that public repo's docs and code and checked against the code (split methods, debt simplification, WorkManager capture, AES-GCM backups); no metrics, because it has none. The owner's phone holds real bank data, so Kharcha imagery must come from demo data. Old-site code (NodeGraph, migrate-projects) still mentions IPR and is replaced in Phase 4.

**D-013 · Design directions reworked (v2) — done: owner chose B. Patch bay (2026-11-25)**
Owner feedback: v1 put too much SAP below the name and looked plain. Studied what the strongest surveyed sites do well (DESIGN_REFERENCES.md) and rebuilt three bolder directions with a plain-language hero: A. Migration, B. Patch bay (recommended), C. Strata. New fonts, all checked on Google Fonts: Anybody (wdth 50–150), Hanken Grotesk. TheLyst images captured from its public demo into docs/design/concepts/img/. Supersedes the v1 recommendation in D-012.

**D-012 · Design directions proposed — pending (owner)**
Survey of 76 live portfolios (method in DESIGN_CLICHES.md). 11 concepts drawn from SAP data work, scored on originality, truth, 10-second readability, perf/a11y cost and build ease; anything with ≤2 on originality or readability discarded. Top 3 mocked as static HTML with real CONTENT.md text only: A. The Mapping (recommended), B. Strata, C. Lineage. All typefaces confirmed available on Google Fonts with the axes used (Archivo wdth 62–125; Familjen Grotesk; Atkinson Hyperlegible Next; Funnel Display/Sans), so next/font can self-host them. Mocks load fonts from the Google Fonts CDN for preview only. Other people's sites were screenshotted for the survey but are not committed.

## 2026-11-25 — Phase 1

**D-011 · Audit tooling — done**
Lighthouse 13.6.0 (GoogleChrome, published 2026-10-27) run through `npx` against Playwright's Chromium; NOT added to package.json. PageSpeed Insights was the first choice (no install) but its anonymous daily quota was exhausted. Scores are lab data from this 4-thread machine with simulated throttling; Phase 5 must use the same version and flags for a fair before/after. Added scripts/audit-capture.mjs (Playwright only, no new dependency) for repeatable screenshots, first-visit timing, no-JS, keyboard and link checks.

## 2026-11-25 — Phase 0

**D-010 · Resume conflicts resolved by owner — done**
(1) Ruby on Rails stays in the GeeksforGeeks experience line (article topic) but never as a skill. (2) Resume-only details added to CONTENT.md (TheLyst/IPR descriptions, "80% of users scoring perfectly", GfG FAQs line, award reason, event organisers, resume skill groups incl. Gemini API, AI chatbots, JWT). (3) The earlier Associate period and its 60–90% figure are left off the site entirely. New PDF copied to public/resume.pdf; its links (GitHub meleo2125, LinkedIn, portfolio, TheLyst, IPR) and metadata checked.

**D-009 · Project skills installed (owner approved: frontend-design, web-design-guidelines, react-best-practices, impeccable) — done**
Vendored into .claude/skills/ at pinned commits after reading every SKILL.md in full and scanning all 129 bundled markdown files for hidden characters and agent-directed instructions (none found). No scripts installed. impeccable is text-only: its launcher downloads and runs a binary from GitHub releases and can install edit hooks, which conflicts with the "no executing downloaded files" rule; the skill has a documented fallback without it. Rejected after review: ui-ux-pro-max (its style catalog is built from the banned clichés), taste-skill (pushes stock photos, shaders, 3D globe), karpathy-guidelines (duplicates CLAUDE.md rules), Matt Pocock's skills (workflow, not design; git-guardrails optional). Provenance: .claude/skills/README.md. Project skills load at session start, so they may need a new session to appear.

**D-008 · Resume PDF must be replaced by the owner — resolved by D-010**
public/resume.pdf (Jul 2025) contradicts CONTENT.md: says "Associate", "60–90%", lists Ruby, Ruby on Rails, DaisyUI, Three.js, Virtual Herbal Garden, "Web Developer Bootcamp". The site will link /resume.pdf; the owner supplies the current PDF. Claude will not generate one.
Update 2026-11-25: owner supplied ~/Documents/Mukesh_Prajapat_Resume_SAP.pdf (created 2026-11-25). Not copied into public/ yet. It differs from CONTENT.md: GfG bullet names "Ruby on Rails" (banned list); extra lines not in CONTENT.md (GfG "5–10 FAQs per piece", IPR "80% of users scoring perfectly", fuller TheLyst/IPR descriptions, award reason "for contributions to AI and automation initiatives", organisers for Techblitz 2025 and HackScript 6.0, "AI chatbots", "Gemini API", "JWT" in skills); it omits the earlier-Associate 60–90% bullet. Owner to decide which wins.

**D-007 · Old Postgres/admin stack: keep or drop? — done: dropped (owner, 2026-11-26)**
Outcome: the redesign has no database, no /admin, no /api/admin-login and no middleware; @vercel/postgres, docx (unused), framer-motion and lucide-react removed. The Vercel Postgres database itself and its env vars still exist in the owner's Vercel account; deleting them is the owner's call.

Projects and bio text live in a Vercel Postgres DB edited through /admin. That DB holds the outdated text (60–90%, Associate, Herbal Garden). @vercel/postgres is deprecated. The build fails locally without POSTGRES_URL. Proposal: rebuild serves static content from typed files generated from CONTENT.md; remove /admin, middleware, API route, DB scripts and @vercel/postgres. Faster, simpler, no secret needed to build. Also: the current middleware treats a missing ADMIN_PASSWORD as a match for a missing cookie (undefined === undefined), and the cookie stores the password itself. Dropping the admin removes both problems.

**D-006 · Framework versions — pending (Phase 2/4)**
Staying on Next 16.2.10 and Tailwind 3.4 for now. Options for later: Next 16.4.x (latest), Tailwind 4, React 19 types. Decide before Phase 4 build, not during audit.

**D-005 · Lint migrated to ESLint 9 CLI — done**
Next 16 removed `next lint`, so `npm run lint` was broken. Followed the bundled doc (03-api-reference/05-config/03-eslint.md): eslint ^9, eslint-config-next 16.2.10 (was 15.0.3, mismatched), `eslint.config.mjs` with core-web-vitals + typescript. Removed `.eslintrc.json`. Added `typecheck` and `screenshot` scripts. Remaining lint errors are in code the rebuild replaces; not fixed on purpose.

**D-004 · Playwright as a dev dependency — done**
@playwright/test + Chromium headless shell, for 375/768/1440 screenshots now and QA later. Dev-only, not shipped. scripts/screenshot.mjs uses real wheel scrolling because the old site's whileInView sections do not appear with programmatic scrolling, and pre-sets the boot-loader session flag.

**D-003 · AGENTS.md + bundled Next docs instead of a Next.js skill — done**
Next 16.2+ ships version-matched docs in node_modules/next/dist/docs and recommends AGENTS.md (imported by CLAUDE.md). Avoids stale training data without an extra plugin or MCP server.

**D-002 · Git attached to the existing GitHub repo — done**
The folder was a copy of github.com/meleo2125/portfolio @ 6615364 with CRLF line endings and no .git, .gitignore or .eslintrc.json. Verified every tracked file was identical apart from line endings, then `git init` + `origin` + reset to origin/master + checkout (restored LF and the two dotfiles). Work happens on `redesign`. The repo is public: everything in docs/ is public once pushed.

**D-001 · Briefs stored verbatim — done**
docs/briefs/original-brief.md and docs/briefs/phase-2-design-direction.md hold the owner's instructions so later phases do not depend on chat history. The Phase 2 brief replaces the original Phase 2 process.
