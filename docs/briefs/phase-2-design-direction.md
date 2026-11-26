# Phase 2 brief (replaces the original Phase 2 process)

Received 2026-11-25 during Phase 0. Verbatim from the owner. This is the active spec for Phase 2.

---

Change to Phase 2 (design direction). I don't want a common portfolio idea.

## Ideas that are off the table
Designers' clichés and developers' clichés are both banned. Do not propose or use any of these, or close variants of them:
- Terminal, command line, code editor, IDE, "computer screen", browser window or OS desktop as the layout; typing animations; fake boot sequences; green-on-black; "hello world"; syntax-highlighted code as decoration.
- Art-book, magazine or editorial-spread themes; paper cutouts, collage, sticker or scrapbook looks; Polaroids; brutalist-for-its-own-sake; giant serif type with grain as the whole idea.
- Glassmorphism cards on a purple-blue gradient, neon cyberpunk, dark mode with glowing orbs, bento grids as the main concept, a 3D floating laptop or globe, particle backgrounds, cursor-follower gimmicks, "scroll-jacking".
- Resume-as-a-document, Notion or dashboard look-alikes, game or retro-OS themes, anything that looks like a template from Awwwards, Dribbble or a Vercel/Next.js starter.
First spend a few minutes surveying current developer and designer portfolios, then list the clichés you actually find in docs/DESIGN_CLICHES.md so you know what to avoid. Do not copy any existing site.

## Where the idea must come from
The concept has to come from what is specific about me, not from "developer" or "designer" in general. Mine is: an engineer who works inside SAP enterprise data platforms, building software that moves, maps and automates data between systems that most developers have never seen. Ideas can draw on things like: systems landscapes and how objects move between them, migration (before and after, source and target), lineage and dependency maps, models and layers, reports and the questions behind them, bridging two worlds (enterprise data and modern software), automation replacing manual steps, or anything else you find that is true to the work. The metaphor must be something a visitor understands without explanation and must never expose confidential detail (see the confidentiality rules in CLAUDE.md). Abstract and visual is fine; literal screenshots of SAP tools are not.

## Process
1. Generate at least 8 raw concepts. For each: a title, the core idea in two sentences, what is original about it, which clichés it risks drifting toward, and how it keeps the content readable.
2. Score each on: originality, truth to my work, readability in 10 seconds for a recruiter, performance and accessibility cost, and how hard it is to build well. Discard anything that scores low on originality or readability, and say why.
3. Take the best 3. For each, produce a static HTML mock of the hero and one content section (work or projects), a palette, a type pairing, and a short note on how it behaves on mobile and with reduced motion.
4. Give me your honest recommendation and the main risk of each. Stop and wait for my choice.

## Non-negotiables
- A visitor must understand within 5 seconds who I am, what I build and how to contact me. No concept may hide that behind an interaction.
- Original and distinctive does not mean confusing. Navigation stays predictable, text stays readable, everything works on a phone and with a keyboard.
- Honest content only (docs/CONTENT.md). The concept changes how the site looks and moves, not what it claims.
- Keep it performant (no heavy libraries for effect alone) and accessible (WCAG AA, reduced motion respected).

Start by writing docs/DESIGN_CLICHES.md, then the 8 concepts.
