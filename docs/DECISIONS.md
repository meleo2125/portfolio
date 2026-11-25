# Decisions log

Newest first. Each entry: what, why, status. "Pending" entries need the owner.

## 2026-11-25 — Phase 0

**D-008 · Resume PDF must be replaced by the owner — pending (owner)**
public/resume.pdf (Jul 2025) contradicts CONTENT.md: says "Associate", "60–90%", lists Ruby, Ruby on Rails, DaisyUI, Three.js, Virtual Herbal Garden, "Web Developer Bootcamp". The site will link /resume.pdf; the owner supplies the current PDF. Claude will not generate one.

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
