# Portfolio clichés to avoid

Phase 2 input. What current portfolios actually look like, so the new design can avoid it. Nothing here is a reference to copy.

## Method (2026-11-25)
- **Random developer sample:** 40 sites drawn at random (fixed seed) from the 2,118 personal sites in github.com/emmabostian/developer-portfolios (27.8k stars, updated daily). 39 loaded.
- **Curated sample:** 40 sites taken from two 2026 roundups, Colorlib "21 Best Developer & Software Engineer Portfolios 2026" and Muzli "100 Best Designer Portfolio Websites of 2026", choosing individuals over agencies. 37 loaded.
- **Capture:** first screen only, 1440×900, 2.5 s after load, JavaScript on.
- **Counts:** from looking at the 76 screenshots. A pattern can be counted more than once per site. Raw screenshots are in the session scratchpad and are not committed (other people's sites).
- **Also included:** the banned list from the owner's brief (docs/briefs/phase-2-design-direction.md) and the AI-design tells listed in the frontend-design skill.

## A. Seen most often (counts out of 76)

| Pattern | Count | Notes |
|---|---|---|
| Dark background (near-black or navy) as the default | ~40 | Often with one glowing accent; cyan, violet and orange most common |
| Two CTAs under the hero: "View work" + "Download CV/Resume" | ~20 | Same pair, same order, ghost-and-solid style |
| Row of social icons under the intro | ~15 | GitHub / LinkedIn / X / mail icons with no labels |
| Headshot in a circle, ring or rounded card next to the headline | ~12 | Often with a green "available" dot |
| Floating pill navbar or bottom dock | ~10 | Centred capsule with 4–6 links, or a macOS-style dock |
| Mono ALL-CAPS eyebrow labels and meta strings joined with "·" | ~10 | "SOFTWARE ENGINEER · NYC · 2026" |
| Accent word in the headline (other colour, italic serif or underline) | ~10 | "I build things that *ship*", "from pixels to *pipelines*" |
| Role title as a giant headline | ~9 | "SOFTWARE ENGINEER", "FULLSTACK DEVELOPER & AGENTIC AI" |
| Blank screen or preloader still showing after 2.5 s | ~10 | Spinners, "Loading a 3D scene 67%", a black page with one glowing dot. Our current site does the same |
| "Hi, I'm …" / "Hello, I'm …" greeting with a wave emoji | ~8 | |
| Code or JSON as decoration | ~7 | `const developer = { … }`, `<coder>`, fake editor windows with traffic-light dots |
| Terminal, boot or "mission control" intro | ~6 | "ACCESS GRANTED.", fake telemetry panels, IDE file-tree sidebars. Our current site does this |
| "I build / I turn / Crafting …" headline formula | ~8 | "Turning bold ideas into digital reality", "Crafting websites that feel good" |
| Stat counters: big number + tiny label | ~6 | "+12 years · +46 projects · +20 clients", "98% client satisfaction" |
| Cookie or consent banner covering the first screen | ~6 | |
| Starfield, constellation, particles or glowing orb background | ~6 | |
| Giant full-width display name | ~5 | Name set edge to edge, sometimes cropped |
| 3D scenes and objects | ~6 | Isometric desk/room, 3D laptop, floating fruit, floppy disk, chrome blobs |
| Cream background with high-contrast serif | ~5 | Beige paper, italic serif display, sometimes with grain |
| Local-time clock in the header | ~5 | "LOCAL TIME 18:28 GMT+7" |
| "Available for work" badge with pulsing green dot | ~5 | |
| Sticky two-column layout: name and nav left, scrolling text right | ~2 | Few in the sample, but one heavily cloned template; recruiters will recognise it |
| Hand-drawn mascot or cartoon avatar | ~3 | |
| Neon/synthwave, pixel or glitch display type | ~3 | |
| Tech-logo cloud | ~2 | Floating brand icons around the name |
| Polaroid photo stack; OS desktop with app icons | 1 each | Both on the banned list |

## B. Banned by the brief (whether or not seen in the sample)
- Terminal, command line, code editor, IDE, computer screen, browser window or OS desktop as the layout. Typing animations. Fake boot sequences. Green-on-black. "Hello world". Syntax-highlighted code as decoration.
- Art-book, magazine or editorial-spread themes. Paper cutouts, collage, sticker or scrapbook looks. Polaroids. Brutalism for its own sake. Giant serif type with grain as the whole idea.
- Glassmorphism on purple-blue gradients. Neon cyberpunk. Dark mode with glowing orbs. Bento grids as the main concept. 3D floating laptop or globe. Particle backgrounds. Cursor followers. Scroll-jacking.
- Resume-as-a-document. Notion or dashboard look-alikes. Game or retro-OS themes. Anything that looks like an Awwwards, Dribbble or Vercel/Next.js starter template.

## C. AI-generated design tells (frontend-design skill)
- Warm cream (#F4F1EA-ish) + high-contrast serif + terracotta accent (#D97757-ish).
- Near-black + one acid-green or vermilion accent.
- Broadsheet layout: hairline rules everywhere, zero radius, dense newspaper columns.
- SaaS card kit: identical rounded cards, one radius for everything, the same soft grey shadow, gradient washes.
- Template chrome: tracked ALL-CAPS eyebrow over every heading; "A · B · C" meta strings; "WORD — fragment" labels; tinted near-black (#0B0B0B, #111) used as black; monospace for small data labels; "→" appended to every link and button.
- One accented word in a headline; numbered markers (01/02/03) on content that is not a sequence; fade-and-slide-up on every section; hover lift on every card.

## D. Rules that follow for this site
1. **No intro of any kind.** Real content is in the server HTML and visible on first paint, with or without JavaScript, motion or cookies (there are none to consent to).
2. **The first screen states facts, not a formula.** Name, current role and employer, what he builds, and contact. No greeting, no "I build…", no accent word, no stat counters.
3. **Contact is text, not an icon row.** Email, GitHub, LinkedIn and resume as labelled links.
4. **Colour scheme follows the visitor** (light and dark both designed). Dark is not the default because it is the cliché.
5. **No decoration that pretends to be code, a terminal, a dashboard, a desktop or a 3D scene.** Visual ideas come from the work: moving and mapping data between systems.
6. **Labels only where they carry information**, in sentence case, in the body face (not mono caps).
7. **Numbers appear only where CONTENT.md has them,** inside sentences or clearly attributed, never as a hero counter row.
8. **Photography:** none planned. A headshot is optional and needs the owner's decision; if used, no circle-with-ring treatment.
