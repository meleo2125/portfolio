# Mukesh Prajapat — Portfolio

A **Control Room** themed developer portfolio, built from the design blueprint in `portfolio-design-blueprint.md`. Systems-engineering aesthetic: instrumentation panels, telemetry backdrop, signal-line scroll indicator, and a live node-graph in the hero.

## Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS v3 + CSS variables (design tokens per Section 5.1 of the blueprint)
- **Animation:** Framer Motion
- **Icons:** Lucide
- **Fonts:** Space Grotesk (display) · Inter (body) · JetBrains Mono (data) — all via `next/font`
- **3D / graph:** Custom Canvas 2D node graph (dependency-free faux-3D). Blueprint suggests React Three Fiber — swap in later if desired.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Build & preview production:

```bash
npm run build
npm run start
```

## Project structure

```
src/
  app/
    layout.tsx           # font wiring, skip-to-content, metadata
    page.tsx             # composes every section
    globals.css          # design tokens + panel/scanline/grid utilities
  components/
    layout/              Shell — NavRail (left rail / mobile bottom bar), Footer
    hero/                Hero, TelemetryField, NodeGraph
    sections/            About, SkillsPanel, ExperienceLog, ProjectGrid,
                         Credentials, ContactPrompt
    project/             ProjectCard (in-place expand)
    shared/              SignalLine, StatusReadout, SectionHeader,
                         KeyboardHintOverlay
  lib/
    animation/           tinyStore, useCrossLink (skill↔project link state)
    data/                skills.ts, projects.ts, experience.ts
                         ← content lives here, separated from components
```

Content is fully separated from components — updating a project, skill, or
role is a data-file swap, not a component rewrite.

## Signature interactions (per blueprint §4)

- **Hero boot sequence** — 700ms flicker-to-stable on load. Skipped under `prefers-reduced-motion`.
- **Live telemetry node graph** — canvas 2D rotating faux-3D graph of Mukesh's real systems (SAP HANA · BW · Datasphere · SAC · his own apps). Respects reduced motion.
- **Signal line** — thin fixed vertical line on the right; glow/position tracks scroll progress.
- **Skill ↔ Project cross-linking** — hovering any skill highlights every project card that uses it (pulsing amber border). Works for keyboard focus too, not just mouse.
- **In-place project expansion** — cards open in the grid; no navigation away from the flow.
- **Keyboard shortcuts** — `g` then `p / a / e / c / s / h` jumps to sections; `?` toggles the help panel.
- **Terminal contact prompt** — animated `> reach_out --email`, instant under reduced motion.

## Accessibility

- Skip-to-content link before the nav.
- All interactive controls are real `<button>` / `<a>` elements with visible focus rings.
- `prefers-reduced-motion` disables the boot flicker, node-graph rotation, signal-line pulse, and terminal type-in.
- Cross-linking works on `:focus` as well as `:hover` — keyboard users get parity.
- Semantic sectioning (`<section>`, `<article>`, `<dl>` for status panels).
- Color contrast: amber `#E8A33D` and cyan `#3F8FA6` both cleared against `#0B0E13` for body-size WCAG AA.

## Blueprint implementation checklist

Corresponds to phases in blueprint §8.

- [x] **Phase 1 — Skeleton & content model** (`lib/data/*.ts`, unstyled sections)
- [x] **Phase 2 — Design system** (tokens, typography scale, panel components)
- [x] **Phase 3 — Signature interactions** (boot, signal line, skill↔project link)
- [x] **Phase 4 — Content pass** (all real content wired from the blueprint)
- [x] **Phase 5 — Polish & accessibility** (reduced-motion, focus, contrast, keyboard nav)
- [x] **Phase 6 — Optional enhancements** (node graph, keyboard shortcuts)

## Assets to add (blueprint §7)

- [ ] Resume PDF at `/public/resume.pdf` (link it from a CTA in `Hero.tsx` or `ContactPrompt.tsx`).
- [ ] Screen captures / screenshots for TheLyst, Virtual Herbal Garden (optional media strip in `ProjectCard`).
- [ ] Favicon and OG image consistent with the Control Room palette.

## Deploy

Push to Vercel — matches TheLyst's setup. Environment variables: none required.

---

Built following the specifications in `portfolio-design-blueprint.md`.
