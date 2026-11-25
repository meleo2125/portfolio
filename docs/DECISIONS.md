# Decisions log

Newest first. Each entry: what, why, status. "Pending" entries need the owner.

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

**D-007 · Old Postgres/admin stack: keep or drop? — pending (owner)**
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
