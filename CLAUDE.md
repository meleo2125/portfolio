@AGENTS.md

# Mukesh Prajapat — portfolio

Personal portfolio for a software engineer in the SAP domain. Live at https://mukeshprajapat.vercel.app (deployed by Vercel from `master`).
A full rebuild is in progress on branch `redesign`. Phase plan and status: docs/PROGRESS.md.

## Read docs/ first
Before ANY design or content change, read:
- docs/CONTENT.md — the only allowed source of site text
- docs/DESIGN.md — tokens, components, motion rules (filled in Phase 2)
- docs/DESIGN_CLICHES.md — what the design must avoid (Phase 2)
- docs/DECISIONS.md — why things are the way they are
- docs/briefs/ — the owner's original instructions, verbatim
- docs/reference/ — version notes for Next.js, Tailwind and libraries in use

## Stack (as of Phase 0; see docs/reference/)
- Next.js 16.2.10, App Router, Turbopack (default in 16). Version-matched docs: node_modules/next/dist/docs/
- React: App Router uses the React canary bundled with Next 16; package.json pins react 18.3.1 (types/peer only)
- TypeScript 5.9 (strict), path alias `@/*` -> `src/*`
- Tailwind CSS 3.4 + CSS custom properties (tokens in src/app/globals.css)
- framer-motion 11, lucide-react icons, next/font (Space Grotesk, Inter, JetBrains Mono)
- Old site only: @vercel/postgres (deprecated) for projects + site_content tables, /admin panel, middleware auth
- Package manager: npm (package-lock.json). Node 24 locally; Next 16 needs Node >= 20.9

## Commands
```
npm run dev          # http://localhost:3000
npm run build        # NOTE: old site needs POSTGRES_URL at build time (not available locally)
npm run lint         # ESLint 9 flat config (eslint.config.mjs); `next lint` no longer exists
npm run typecheck    # tsc --noEmit
npm run screenshot -- <url> [outDir] [label]   # full-page PNGs at 375/768/1440 into screenshots/ (gitignored)
```
No test runner yet. Playwright (@playwright/test, Chromium headless shell) is installed for screenshots and later QA.

## Machine limits
4-thread CPU box. Run heavy jobs with `nice`, one at a time (build, Lighthouse, Playwright).

## Conventions
- Small, focused commits with clear messages, on `redesign` only. Never push to `master`, never deploy to production, never merge. The owner approves pushes, previews and PRs.
- Keep dependencies minimal. Every new dependency gets an entry in docs/DECISIONS.md with the reason.
- Server Components by default; `"use client"` only where interaction needs it.
- Semantic HTML, keyboard accessible, WCAG AA contrast, honour prefers-reduced-motion and prefers-color-scheme.
- External links: `target="_blank" rel="noopener noreferrer"`.
- Images through next/image.
- After visual changes: screenshot at 375/768/1440 and look at the result before reporting.
- Update docs/PROGRESS.md as work completes; log decisions in docs/DECISIONS.md.
- Ask the owner when something is ambiguous or a fact is missing. Do not guess.

## Confidentiality rules (strict)
The owner's SAP work belongs to his employer and its customers.
- The public site shows only the same level of detail as the resume lines in docs/CONTENT.md.
- No customer names. No screenshots or demos of customer data. No architecture diagrams or internal details of the three accelerators (BW-to-Datasphere/Snowflake migration tool, MCP-based AI assistant for Datasphere, BusinessObjects landscape platform).
- No invented metrics, numbers, awards, companies or technologies. Ever.
- If a section feels like it needs more detail than CONTENT.md gives, stop and ask.
- Design metaphors may evoke enterprise data work abstractly; never literal screenshots or recreations of SAP tool UIs.
- This repository is PUBLIC on GitHub. Everything committed (including docs/) is public.

## Never include anywhere
Ruby, Ruby on Rails, DaisyUI, Three.js, the Virtual Herbal Garden project, any "60-90%" claim on the Associate Consultant role, any phone number. Full exclusion list: docs/CONTENT.md.
