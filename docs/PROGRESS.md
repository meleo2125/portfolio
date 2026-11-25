# Progress

Branch: `redesign`. Each phase ends with a summary and waits for owner approval.

## Phase 0 — Set up · awaiting approval
- [x] Repo inspected (findings in DECISIONS.md D-002, D-006, D-007)
- [x] Skills/plugins/MCP inventory; Claude Code docs checked for install method
- [x] Candidate skills/plugins listed for approval (chat report, 2026-11-25)
- [ ] Install approved skills (after reading each SKILL.md and scripts in full)
- [x] Docs created: CLAUDE.md, AGENTS.md, docs/CONTENT.md, DESIGN.md (skeleton), DECISIONS.md, PROGRESS.md, reference/, briefs/
- [x] Dependencies installed (npm ci)
- [x] Lint runs (ESLint 9 CLI) — 15 errors / 4 warnings in old code, left for the rebuild
- [x] Typecheck clean
- [ ] Build clean — fails locally: old site needs POSTGRES_URL (D-007)
- [x] Playwright + screenshot script, verified against the live site
- [x] Branch `redesign` created

## Phase 1 — Audit current site · not started
- [ ] Screenshots of every page at 375/768/1440
- [ ] Lighthouse (perf, a11y, SEO, best practices), mobile + desktop
- [ ] docs/AUDIT.md: wrong/outdated, weak structure, worth keeping

## Phase 2 — Design direction · not started (brief: docs/briefs/phase-2-design-direction.md)
- [ ] Survey portfolios → docs/DESIGN_CLICHES.md
- [ ] 8+ raw concepts with originality / risk / readability notes
- [ ] Scoring; discard low originality or readability, with reasons
- [ ] Top 3: static HTML mock (hero + one content section), palette, type pairing, mobile + reduced-motion notes
- [ ] Recommendation + main risk of each → owner picks
- [ ] docs/DESIGN.md filled; tokens in code; /design-system preview page

## Phase 3 — IA and copy · not started
## Phase 4 — Build · not started
## Phase 5 — QA · not started
## Phase 6 — Preview and ship · not started
