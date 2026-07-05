# Developer Portfolio

A responsive, high-performance web portfolio featuring a custom systems telemetry aesthetic. The design includes modular panels, a scrolling pulse indicator, interactive skill-to-project highlighting, and a live Canvas-based node graph of the primary technical domains.

## Tech Stack

- **Framework:** Next.js 15 (App Router) & TypeScript
- **Styling:** Tailwind CSS v3 & CSS custom variables (design tokens)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Space Grotesk (headings), Inter (body text), and JetBrains Mono (code/mono elements)
- **Visuals:** Pure HTML5 Canvas 2D Node Graph (lightweight and dependency-free)

## Getting Started

To run the development server locally:

```bash
npm install
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

To build and preview the production bundle:

```bash
npm run build
npm start
```

## Directory Structure

```
src/
  app/
    layout.tsx           # Metadata, fonts, HTML skeleton
    page.tsx             # Main page entry point composing all sections
    globals.css          # Core styles, variables, utilities, animations
  components/
    layout/              # Layout structural elements (NavRail, Footer)
    hero/                # Hero layout, canvas node graph, telemetry widgets
    loader/              # First-visit boot experience and session-aware loading gate
      BootGate.tsx       # Shows the loader once per browser session using sessionStorage
      BootLoader.tsx     # Telemetry-style loading animation with animated progress and status messages
    sections/            # Modular sections (About, Skills, Experience, Projects, Credentials, Contact)
    project/             # Project cards with expandable summaries
    shared/              # Shared design components (Headers, readouts, indicators)
  lib/
    animation/           # State store and cross-linking hooks for skill highlighting
    data/                # Clean data files for projects, skills, and experience logs
```

## Key Interactions

- **Hero Startup Animation:** A quick flicker animation runs on mount, adapting dynamically for accessibility.
- **Canvas Node Graph:** A lightweight 3D-effect systems graph connecting enterprise SAP topics and full-stack projects.
- **Scroll Sync Indicator:** A vertical pulse line synced to viewport scroll depth.
- **Skill Filtering & Highlights:** Hovering or clicking a skill highlights matching projects and auto-scrolls to the Projects section.
- **In-Place Details:** Project cards expand within the grid to preserve browsing context.
- **Keyboard Navigation:** Shortcuts (e.g. `g` followed by a section initial) provide high accessibility.

## Loader Experience

- **BootGate:** Guards the initial boot sequence so returning visitors skip the loader and the page transitions smoothly.
- **BootLoader:** Renders a custom systems-style loading screen with telemetry-inspired messaging, progress feedback, and a cinematic reveal.

## Accessibility Features

- Fully responsive layouts.
- Dynamic detection of `prefers-reduced-motion` to bypass animations and immediate terminal display.
- Clear, focusable formats, buttons, and links with accessible keyboard focus rings.
- Semantic HTML tags used for sections, grids, lists, and metadata.
- Fully compatible with screen readers.
