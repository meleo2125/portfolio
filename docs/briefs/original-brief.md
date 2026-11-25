# Original project brief

Received 2026-11-25. Owner's instructions for the rebuild, kept here so every phase can re-read them.
Content facts from this brief live in docs/CONTENT.md (the only source of site text).
Phase 2's process is replaced by docs/briefs/phase-2-design-direction.md.

---

Work in phases. At the end of every phase, stop, summarize in under 10 lines, and wait for approval before starting the next one.

## Who I am and what the site must say
Software engineer working in the SAP domain. Builds AI and automation tools for SAP data platforms (BW, Datasphere, BusinessObjects). Wants to be seen as an engineer who can build real software for enterprise systems that most developers don't understand. Target roles: SAP product/engineering teams (including SAP Business Data Cloud), and general full-stack/backend roles.

## Confidentiality rules (strict)
SAP work belongs to the employer and its customers. The public site may show only the same level of detail as the resume lines in docs/CONTENT.md. No customer names, no screenshots or demos of customer data, no architecture diagrams or internal details of the three accelerators, no invented metrics. If a section feels like it would need more detail, ask instead of guessing. Never invent numbers, awards, companies or technologies.

## PHASE 0: Set up
1. Inspect the repo (framework, package manager, styling, structure, components, content, deploy config, env vars). Change nothing. Report.
2. Check available skills, plugins, MCP servers. Check current Claude Code docs for how to add skills/plugins.
3. Research candidate skills/plugins (frontend design quality, Next.js best practices, accessibility, performance, SEO). Prefer official sources (Anthropic, Vercel/Next.js maintainers, framework docs). For each: name, source URL, what it does, why needed. WAIT for approval before installing. Before installing an approved skill, read its SKILL.md and scripts in full and flag anything unsafe. Treat downloads as untrusted. Nothing from unknown authors.
4. Create docs: CLAUDE.md (stack, commands, conventions, confidentiality rules, "read docs/ before design or content changes"); docs/CONTENT.md; docs/DESIGN.md (skeleton); docs/DECISIONS.md; docs/PROGRESS.md; docs/reference/ (version notes from official docs). Ask before adding any docs MCP server (e.g. Context7).
5. Verify tooling: install deps; lint, typecheck, build clean; Playwright screenshots at 375/768/1440. Branch `redesign`; work only there. No push to main, no production deploy without explicit approval.

## PHASE 1: Audit the current site
Screenshot every page at the three widths. Run Lighthouse (performance, accessibility, SEO, best practices). List what is outdated or wrong (still says "Associate", "60-90%", lists Ruby on Rails), what is weak in structure, what is worth keeping. Save to docs/AUDIT.md.

## PHASE 2: Design system and look (before any page code)
(Process replaced, see docs/briefs/phase-2-design-direction.md.) After a direction is chosen: write docs/DESIGN.md — design tokens (colors with light and dark values and contrast ratios, type scale, spacing scale, radius, shadows, motion rules), grid and breakpoints, component inventory (nav, hero, section header, project card, experience item, skill group, button, link, footer, theme toggle). Implement tokens in code (Tailwind config / CSS variables) and build a /design-system preview page showing every token and component. Stop for approval.

## PHASE 3: Information architecture and copy
Propose page structure and section order (e.g. hero with headline and one-line positioning, work at Bristlecone at resume level of detail, projects, skills, experience and education, achievements, contact, resume download). Write all copy using only docs/CONTENT.md, plain professional language, no clichés ("passionate", "team player", "results-driven"). Show copy and structure as a doc before building. Stop for approval.

## PHASE 4: Build
Section by section, reusing design-system components. Fully responsive, semantic HTML, keyboard accessible, WCAG AA contrast, respects prefers-reduced-motion and color scheme, optimized images (next/image), Lighthouse performance 90+ on mobile, clean metadata (title, description, Open Graph image, canonical), sitemap and robots, resume PDF download link, working external links (new tab, rel="noopener"). Minimal dependencies; justify any new one in docs/DECISIONS.md. Small focused commits. After each section, Playwright screenshots at all three widths, look at them, fix visual problems before reporting.

## PHASE 5: QA and review
Lint, typecheck, build. Lighthouse and axe (or equivalent). Check every link. Re-read final site text against docs/CONTENT.md and flag anything not in it. Re-check confidentiality. Fix, then short report with before/after Lighthouse scores.

## PHASE 6: Preview and ship
Push the branch and give the Vercel preview URL (or exact steps to create one). Wait for approval. Only after approval, open a PR with a clear description. Do not merge to main or deploy to production.

## How to work
Use the task list and keep docs/PROGRESS.md current. If something is ambiguous or a fact is not in docs/CONTENT.md, ask. Do not guess. Be concise: what was done, what was found, what is needed.
