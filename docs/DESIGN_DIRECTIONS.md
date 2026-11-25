# Design directions (Phase 2)

Brief: docs/briefs/phase-2-design-direction.md. What to avoid: docs/DESIGN_CLICHES.md. Content: docs/CONTENT.md only.
Mocks are static HTML in `docs/design/concepts/`. Open them in a browser; they need no build. Fonts load from Google Fonts for the mock only; the real build self-hosts them with next/font.

## What is specific about the subject
An engineer who works inside SAP enterprise data platforms (BW, Datasphere, BusinessObjects) and writes modern software (Python, FastAPI, Next.js, MCP) that moves, maps and automates data between systems. The site's readers are SAP product and engineering teams (who know the vocabulary) and general engineering recruiters (who don't). The page has one job: in five seconds, say who he is, what he builds, and how to reach him, and then back it up.

The vernacular of that world, which is where the visual ideas come from:
- **source and target:** migration maps an object in one system to its counterpart in another
- **layers:** warehouses are built in layers, from raw inbound data up to the reporting layer people actually read
- **lineage:** every reported number can be traced back to where it came from
- **the semantic layer:** BusinessObjects translates database fields into business terms
- **the landscape and transports:** objects move from development to test to production
- **the report:** a well-made report answers one question clearly

## 1. Raw concepts

Each concept below changes only how the site looks and moves. None of them adds a claim.

### 1. The Mapping
**Idea:** The site is built from mapping rows: a source on the left, a drawn connector, a target on the right, which is what a migration spec looks like. The hero is one mapping, *SAP BW, Datasphere, BusinessObjects* to *AI and automation software*, and the Bristlecone work is three of them.
**Original because:** the structural device is the actual shape of his work (source to target), not a developer prop. The transformation is shown in the type itself: condensed letterforms on the source side, wide on the target side.
**Cliché risk:** a spreadsheet, a spec sheet or a form ("Label: value"), or arrows appended to everything.
**Readability:** high. Rows read left to right as plain sentences, and the name is the largest thing on the page.

### 2. Strata
**Idea:** The page is a cross-section through a warehouse. The top layer is the refined summary a reader needs; each band below is more granular and a tone deeper, ending at the raw detail. A depth gauge in the margin names the layers and doubles as the navigation.
**Original because:** it turns "most aggregated first" (the BI reporting principle) into both the information architecture and the colour system. The page literally gets deeper.
**Cliché risk:** generic alternating section backgrounds; scroll storytelling; "geology" as decoration.
**Readability:** very high. The summary is complete on its own and every band has a plain-language name.

### 3. Lineage
**Idea:** Every claim on the page is traceable. The hero's statements are marked and connected by thin lineage lines in the margin to the role or project they come from, the way a data platform shows where a number was calculated.
**Original because:** it makes honesty the visual concept. The content rule "nothing beyond the resume" becomes something the visitor can see and check.
**Cliché risk:** node graphs or network visuals (the old site had one); footnotes and an editorial look; clutter.
**Readability:** good. Text comes first and the lines are an extra layer; without JavaScript or on a phone they become inline "source" links.

### 4. Two registers (semantic layer)
**Idea:** Like a BusinessObjects universe, each technical line has a plain-language twin under it, so SAP specialists and generalists both read the page in their own terms.
**Original because:** it serves the two real audiences explicitly.
**Cliché risk:** low visually, but it doubles the text.
**Readability:** low. Two versions of every line slow scanning, and the plain-language versions would be new copy beyond CONTENT.md.

### 5. Cut-over (before and after)
**Idea:** The hero shows a list of manual steps collapsing into one automated step; each section is a before/after pair.
**Original because:** it dramatises "automation replacing manual steps".
**Cliché risk:** SaaS landing-page before/after; animated counters.
**Readability:** medium-high, but the manual steps would have to be invented or would describe the confidential tools' internals.

### 6. Transport route (development, test, production)
**Idea:** Roles and projects are objects being promoted through a three-tier landscape, laid out as lanes.
**Original because:** it is SAP-specific.
**Cliché risk:** CI/CD pipeline diagrams; dashboard look.
**Readability:** low for non-SAP readers. It needs explanation, which the brief rules out.

### 7. Entity model
**Idea:** The person as a data model: entities (role, project, skill) with relationships drawn between them.
**Original because:** not much; it is a diagram.
**Cliché risk:** node graphs (the current site's hero), network backgrounds.
**Readability:** low. A visitor has to read a diagram to find the name and role.

### 8. Extract, transform, load
**Idea:** Three acts: where he comes from (extract), what he does (transform), what it produces (load).
**Original because:** weakly. It is a metaphor imposed on section names.
**Cliché risk:** the same jargon-label trap as the current "MOD-01 · DIAGNOSTICS".
**Readability:** medium. The labels need decoding.

### 9. The question behind the report
**Idea:** Each section is titled with the question a hiring manager asks ("What does he build?") and answered like a well-made one-figure report.
**Original because:** weakly. Q&A portfolios and FAQ formats are common.
**Cliché risk:** FAQ page; dashboard tiles.
**Readability:** very high.

### 10. The seam
**Idea:** The page is two materials, a strict enterprise grid and an open modern layout, meeting at a visible seam that every item crosses.
**Original because:** it shows "bridging two worlds" directly.
**Cliché risk:** split-screen gimmick; inconsistent styling on purpose.
**Readability:** medium. On a phone the seam has to turn sideways, and the idea overlaps with The Mapping.

### 11. Grain control
**Idea:** A single "summary / detail" control changes the grain of the whole page, like switching a report's level of aggregation.
**Original because:** few portfolios let the reader choose the level of detail.
**Cliché risk:** low.
**Readability:** medium. Detail sits behind a control, and the brief says nothing important may hide behind an interaction.

## 2. Scores

1 = poor, 5 = strong. For cost and build, 5 means cheap or easy. Rule: discard anything scoring 2 or less on originality or 10-second readability.

| # | Concept | Originality | Truth to the work | 10-second read | Perf + a11y cost | Ease of building well | Total | Verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | The Mapping | 4 | 5 | 5 | 5 | 4 | **23** | Top 3 |
| 2 | Strata | 4 | 4 | 5 | 5 | 4 | **22** | Top 3 |
| 3 | Lineage | 5 | 5 | 4 | 3 | 2 | **19** | Top 3 |
| 10 | The seam | 4 | 5 | 3 | 4 | 3 | 19 | Out: overlaps with Mapping (same idea, weaker on mobile) |
| 9 | Question behind the report | 2 | 3 | 5 | 5 | 4 | 19 | Out: low originality (FAQ format) |
| 11 | Grain control | 4 | 4 | 3 | 4 | 3 | 18 | Out: hides detail behind a control. Could be a later feature for Strata |
| 4 | Two registers | 4 | 3 | 2 | 5 | 3 | 17 | Out: low readability, and needs copy beyond CONTENT.md |
| 5 | Cut-over | 3 | 3 | 4 | 4 | 3 | 17 | Out: would require invented manual steps or the confidential tools' internals |
| 8 | Extract, transform, load | 2 | 3 | 3 | 5 | 4 | 17 | Out: low originality; jargon labels |
| 6 | Transport route | 3 | 4 | 2 | 4 | 3 | 16 | Out: low readability for non-SAP readers; pipeline cliché |
| 7 | Entity model | 2 | 3 | 2 | 3 | 2 | 12 | Out: low originality and readability (node graph again) |

Lineage scores lower on cost and build because it needs a small script to draw lines between elements, and a fallback for phones and no-JS. It stays in because it is the most original idea and the most honest one.

## 3. The three directions

All three mocks use only CONTENT.md text, put name, role, what he builds and contact in the first screen, render fully without JavaScript, and include a dark palette that follows the system setting. Contrast ratios below are measured against each palette's own background.

### A. The Mapping
Mock: `docs/design/concepts/a-mapping.html` (hero + Work at Bristlecone)

**Concept.** A migration is a map from source to target, and so is this page. The signature element is the mapping row: a source in condensed letterforms, a drawn connector with a diamond "transform" node, and a target in wide letterforms. The hero is one row (*SAP BW, Datasphere, BusinessObjects* to *AI and automation software*). The Bristlecone section is three rows taken straight from the resume line: BW to Datasphere or Snowflake (migration tool), Datasphere to an MCP-based AI assistant, BusinessObjects landscape to a landscape platform. Everything else is quiet text. The SAP work is shown as what it is, moving between systems, without diagrams, logos or internals.

| Token | Light | Dark | Use | Contrast (light / dark) |
|---|---|---|---|---|
| Field | `#EEF0EC` | `#121614` | page | n/a |
| Ink | `#161B18` | `#E6EAE6` | text | 15.2 / 15.0 |
| Graphite | `#4B544F` | `#A2ABA5` | secondary text, source side | 6.8 / 7.7 |
| Mapped | `#0D6A4B` | `#57C597` | connectors, links, focus | 5.8 / 8.6 |
| Rule | `#C3C9C3` | `#333B36` | section divider only | decorative |

**Type.** One family: **Archivo**, variable on weight *and width* (62–125). Source side: width 62, weight 560. Target side and name: width 112–118. Body: width 100. The width shift is the transformation. Tabular figures throughout.

**Layout.** 12-column grid, left-aligned. A mapping row is 4 : 1.4 : 6 (source right-aligned against the connector, target left-aligned). Rows are separated by space, not rules. Text measure stays at most 68ch.

**Mobile.** Rows stack: source, then a short vertical connector, then target. The name wraps to two lines at 375px. Nothing hides.

**Motion and reduced motion.** One moment: the hero connector draws left to right once on load (700 ms, ease-out), and its node fades in. Nothing else moves. With reduced motion the connector is simply there.

**Risks.**
- **Main risk:** overused, mapping rows turn into a form or spec sheet ("Label: value"). Rule: only where there is a true source and target (hero, accelerators, possibly each project's data sources); everything else is prose.
- **Font weight:** a variable font with a width axis is a larger file. It needs Latin subsetting, and should be measured against the 90+ mobile Lighthouse target.

### B. Strata
Mock: `docs/design/concepts/b-strata.html` (Summary layer + Projects layer + top of Skills)

**Concept.** A cross-section through a warehouse. The top layer is the refined summary (who, what, contact), and each band below is more granular and one tone deeper: Summary, Work, Projects, Skills, Background. A "core sample" in the left rail is the navigation, a stack of swatches in the layers' own colours, so the nav is also a map of the page's depth. On phones the core sample becomes a strip of five swatches, and each layer's heading sticks while you are inside it.

| Layer | Light | Text on it (ink / muted / link) |
|---|---|---|
| Summary | `#F6F6F4` | 16.0 / 7.4 / 6.3 |
| Work | `#E7E3DA` | 13.5 / 6.8 / 6.1 |
| Projects | `#CDC2B0` | 9.8 / 6.2 / 5.3 |
| Skills | `#4E4032` | 8.7 / 6.3 / 6.2 (light text) |
| Background | `#2A221B` | 13.6 / 8.4 / 8.8 (light text) |
| Dark scheme | `#3A3029` down to `#1D1713` | 11.1 to 15.4 / 7.7 to 10.6 / 8.0 to 11.0 |

Ink `#1E1A16`, muted `#504A43`, link `#1B5683`. On deep layers: `#F3EEE7`, `#D6CBBD`, `#A9D1F0`.

**Type.** **Familjen Grotesk** for headings (a grotesk with some character) and **Atkinson Hyperlegible Next** for body (designed for legibility; note that its zero is slashed).

**Layout.** Full-bleed bands, content at 46rem, left-aligned, with the core-sample rail at 11.5rem on desktop. Projects are entries separated by a rule, not cards.

**Mobile.** Swatch strip at the top, sticky layer headings, single column.

**Motion and reduced motion.** No load animation. Smooth scrolling to a layer when its swatch is clicked, which is turned off with reduced motion. Showing the current layer in the core sample needs a small IntersectionObserver (not in the mock).

**Risks.**
- **Main risk:** without care it reads as ordinary alternating section colours. The idea lives in the monotonic deepening and the core sample, and both must be obvious.
- **Dark mode flattens the strata:** five dark layers span only 1.38:1 against each other, so the concept is weaker in dark.
- **Earth tones** are distinctive but read less "software" than A or C.

### C. Lineage
Mock: `docs/design/concepts/c-lineage.html` (hero with claims + Work at Bristlecone as sources)

**Concept.** On a data platform you can trace any number back to where it was calculated; this page does the same for its claims. In the hero, each claim ("AI and automation accelerators…", "up to 70%", "Brilliant Beginner Award and SPOT Award") is a dotted link ending in an open ring. On wide screens, lineage lines run through the right-hand gutter, one lane per claim, to a filled port beside the resume line it comes from. Hovering or focusing a claim lights up its line and tints its source. Honesty is the visual idea.

| Token | Light | Dark | Use | Contrast (light / dark) |
|---|---|---|---|---|
| Paper | `#EBEFF3` | `#0F141A` | page | n/a |
| Ink | `#121A22` | `#E4EAF0` | text | 15.2 / 15.3 |
| Muted | `#4A5663` | `#9AA6B2` | secondary text | 6.5 / 7.5 |
| Lineage | `#3043C9` | `#93A0FF` | links, claim marks, active lines, focus | 6.6 / 7.7 |
| Lineage soft | lineage at 38% | lineage at 35% | resting lines (decorative; the link text carries the meaning) | n/a |
| Tint | `#DDE3F7` | `#1B2340` | highlighted source | n/a |

**Type.** **Funnel Display** for name and headings, **Funnel Sans** for body. It's one recent superfamily, rarely seen on portfolios yet.

**Layout.** A 44rem reading column plus a gutter for lineage. Sources are an ordered list with a filled marker; claims are inline links.

**Mobile and no-JS.** Lines are not drawn below 1100px or without JavaScript. Claims stay dotted links with their ring and jump to the source, which highlights via `:target`. The idea survives, but quietly.

**Motion and reduced motion.** One moment: the lines trace from claim to source once on load (900 ms, staggered 120 ms). Hover and focus highlighting follows the visitor's own action. With reduced motion the lines appear already drawn and the tint has no transition.

**Risks.**
- **Main risk:** the signature is only visible on wide screens. On phones, where many recruiters first open a link, it shrinks to dotted links.
- **Most to build and maintain:** it is the only direction that needs a script measuring layout (ResizeObserver) to stay correct.
- **Clutter:** with more than 4–5 claims the gutter gets busy, so claims must stay few.

## 4. Recommendation

**A. The Mapping.** It scored highest and is the most legible in five seconds. It is also the cheapest to build fast and accessible: no script is needed, one variable font, one animation. Its device comes straight from what the owner does all day (source to target), and it reads the same in light, dark and on a phone. B is the safest and most readable but the least memorable; its idea is mostly colour. C is the most original but spends most of its effect on large screens and costs the most to keep correct.

One addition worth considering, which doesn't change the direction: borrow C's claim-to-source links (no lines) for the hero numbers in A, so "up to 70%" links to the Bristlecone line it comes from.

Waiting for the owner's choice. After the choice: docs/DESIGN.md, tokens in code, and the /design-system page (Phase 2 step 3 of the original brief).
