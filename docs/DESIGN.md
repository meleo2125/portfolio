# Design system: Patch bay

Chosen by the owner on 2026-11-25 (D-013). Reference mock: docs/design/concepts/b-patchbay.html.
Live preview of every token and component: `/design-system` (not linked from the site, `noindex`).
Code: tokens in `src/app/(site)/site.css`, Tailwind names in `tailwind.config.ts`, fonts in `src/app/(site)/layout.tsx`.

## The idea in one line
Three thick cables plug the platforms he builds on into what he built there: enterprise data platforms → AI and automation tools, the web → TheLyst, Android → Kharcha. The cables are the one memorable thing; everything around them stays quiet.

## Principles
1. **One huge thing.** The patch bay in the hero. Headings are big and condensed, but nothing else competes with the cables.
2. **Plain words first.** The hero says what he builds in general terms. SAP product names appear only in the work section's sentences, each with a short gloss.
3. **The cables are true and public.** Only pairs approved in docs/CONTENT.md. The three workplace accelerators are never cables, cards or headline items (D-015); they are described in sentences in the work section. Never add cables for decoration.
4. **Commit to colour in one big area.** The yellow field is the work section and nowhere else.
5. **Hard switches, no cards.** Sections are full-bleed bands that change colour hard. Content is never boxed into cards with shadows.
6. **Show the work.** Real screenshots, big, bleeding off the right edge.
7. **One motion moment.** The cables plug in once on load. Nothing animates on scroll.

## Colour
Values are RGB channels in CSS (`--paper: 240 240 236`) so Tailwind can apply opacity. Contrast is WCAG 2 against the background each colour is used on.

| Token | Light | Dark | Use | Contrast (light / dark) |
|---|---|---|---|---|
| `paper` | #F0F0EC | #151517 | page background | — |
| `ink` | #17171A | #ECECE6 | text, jack rings, rules | 15.7 / 15.4 on paper |
| `muted` | #55565C | #A6A7AD | secondary text, glosses | 6.4 / 7.6 on paper |
| `field` | #F4BE2C | #E0A818 | the work section only | — |
| `on-field` | #17171A | #17171A | text on field | 10.4 / 8.3 |
| `on-field-soft` | #3D3417 | #3D3417 | secondary text on field | 7.2 / 5.8 |
| `cable-1` | #D9411E | #FF6B47 | work cable | decorative only |
| `cable-2` | #0E7C7B | #3FC1BF | TheLyst cable | decorative only |
| `cable-3` | #5B3FD6 | #9B88FF | Kharcha cable, phone-shot offset | decorative only |

Rules
- Cable colours never carry text, links or meaning that is not also in words.
- Links use the surrounding text colour with an underline (1px, 2px on hover). No coloured links.
- Dark mode follows `prefers-color-scheme`. The field stays yellow with dark text in both modes.
- Selection: `ink` background, `paper` text.

## Type
- **Anybody** (variable: `wdth` 50–150, `wght` 100–900), self-hosted with next/font, `axes: ['wdth']`. Headings, ports, the name.
- **Hanken Grotesk** (variable `wght`). Body text, glosses, small labels.
- Body: 1.0625rem (17px) / 1.6, measure at most 60ch. Numbers use tabular figures where they line up.

| Role | Font | Size | Settings |
|---|---|---|---|
| Name (h1) | Anybody | clamp(3.25rem, 9vw, 9.5rem); 19vw under 820px | wght 880, wdth 72, line-height 0.86, tracking -0.02em |
| Section title (h2) | Anybody | clamp(2.6rem, 8vw, 7.5rem) | wght 880, wdth 72, line-height 0.88 |
| Project title (h3) | Anybody | clamp(2.25rem, 5vw, 4.5rem) | wght 860, wdth 80, line-height 0.9 |
| Port label | Anybody | clamp(1.15rem, 2.5vw, 2.3rem); 1.3rem on phones | wght 700, wdth 100 |
| Work sentences | Hanken | clamp(1.25rem, 1.9vw, 1.55rem) | wght 400, line-height 1.45, max 62ch |
| Claim | Hanken | clamp(1.25rem, 2vw, 1.6rem) | wght 500, line-height 1.3, max 28ch |
| Lede | Hanken | 1.1875rem | wght 400 |
| Body | Hanken | 1.0625rem | wght 400 |
| Small / gloss | Hanken | 0.95rem (port gloss: max(0.95rem, 0.42em)) | wght 450 |

Never: all-caps labels, one accented word in a headline, monospace for data labels, eyebrows above headings.

## Space and layout
- Gutter: `clamp(1.25rem, 4.5vw, 4.5rem)` on both sides of every band.
- Section padding: `clamp(4rem, 12vh, 8rem)` top and bottom.
- Hero: at least the viewport height (`100svh`): nav, name + claim, the patch bay.
- Grids are two uneven columns (for example 4fr / 8fr, 5fr / 6fr). They collapse to one column under 820px.
- Project screenshots bleed off the right edge (negative right margin equal to the gutter, rounded only on the left).
- Radius: 12px for screenshots, 16px for phone shots, full circles for jacks and plugs. Nothing else is rounded.
- Breakpoint: 820px. Content is checked at 375, 768 and 1440.

## Components
**Nav.** Text links to sections plus Resume, no icons, no background. Underline on hover.

**Hero intro.** Name left, claim + one line of context + contact links right. Collapses to one column.

**PatchBay** (`src/components/site/PatchBay.tsx`, client component). The signature.
- Props: column headings and three pairs `{ source, target, gloss? }` in content order, plus the visual order of the targets.
- Desktop: sources right-aligned in the left column, targets in the right column, ordered so cables cross. Phone: each source above its target, the target pushed right; cables drop between them.
- Jack: circle 1.15em, ring 0.16em `ink`, filled `paper`. Plug: a cable-coloured disc at both ends.
- Cable: stroke 10–18px (9px on phones), round caps, with a thin highlight stroke offset up by 22% of the width. Desktop cables sag (cubic curves pushed down by 70px plus a quarter of the vertical distance).
- Interaction: pointer over a port lights its cable and port; the others fade to 18% / 45% opacity over 200ms.
- Without JavaScript: a plain list of pairs, each read as "source: target" (visually hidden joiner).
- The SVG is `aria-hidden`; the words carry the meaning.

**Work sentences** (work section, on the yellow field). Two short paragraphs in large Hanken text that name the accelerators in passing, SAP names glossed in plain words. No titles, cards or cables for them (D-015). The showcase version is archived in docs/archive/accelerators-showcase/.

**Effect grid.** Short blocks (Recognition, Training) under a 2px rule.

**Project.** Text column (title, plain description, stack, links) beside a bleeding screenshot. Optional phone shot overlaps the bottom-left corner with a hard `cable-3` offset shadow (10px 10px, no blur). Images through next/image.

**Placeholder.** Dashed 3px `muted` border, same aspect and bleed as a screenshot, plain text saying what is missing. Never shipped to production.

**Links and focus.** Underlined text links. Focus: 3px solid `currentColor` outline, 4px offset, on every interactive element.

## Motion
- The one moment: on first load each cable draws from its source to its target (1000ms, `cubic-bezier(0.65, 0, 0.35, 1)`, starting at 250ms, 180ms apart), then the far plug pops in (260ms, ease-out).
- Responses to the user: cable highlight on hover (200ms ease-out), underline thickness on hover.
- Nothing else moves: no scroll reveals, no parallax, no hover lifts, no animated counters.
- `prefers-reduced-motion: reduce`: cables are drawn complete, no transitions.

## Imagery
- Real screenshots only, captured from public demos or from demo data. Never customer data or anything from SAP systems.
- WebP, served through next/image with width and height set. Phone shots are lazy-loaded.
- Kharcha: screenshots from demo data only (the owner's phone holds real bank data).
