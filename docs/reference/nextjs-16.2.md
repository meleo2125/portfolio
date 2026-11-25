# Next.js 16.2.10 — reference notes

Source: version-matched official docs bundled at `node_modules/next/dist/docs/` (read on 2026-11-25).
Read the bundled page itself before writing code; these are pointers, not a substitute. Latest on npm: 16.4.6 (not adopted; see DECISIONS.md).

## Changes from 15 that affect this repo (01-app/02-guides/upgrading/version-16.md)
- `next lint` removed. Use the ESLint CLI with flat config (`eslint.config.mjs`, `eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`). Ref: 01-app/03-api-reference/05-config/03-eslint.md
- `middleware.ts` deprecated, renamed `proxy.ts` (Node runtime only). Old site still uses middleware.ts.
- Turbopack is the default for `next dev` and `next build`. Config is top-level `turbopack`, not `experimental.turbopack`.
- Node.js >= 20.9 required.
- Async request APIs only (`cookies()`, `headers()`, `params`, `searchParams` must be awaited).
- Async `params` for icon / opengraph-image generators; async `id` for `sitemap` with generateSitemaps.
- App Router runs on the React canary bundled with Next (React 19.2 features).
- next/image defaults: `minimumCacheTTL` 4h, `qualities` only `[75]`, `imageSizes` no longer includes 16, local images with query strings need `images.localPatterns.search`, local-IP optimisation blocked by default.

## Pages to read in later phases
| Need | Bundled doc |
|---|---|
| Metadata, OG images | 01-app/01-getting-started/14-metadata-and-og-images.md, 03-api-reference/04-functions/generate-metadata.md, 03-file-conventions/01-metadata/opengraph-image.md |
| sitemap / robots | 03-api-reference/03-file-conventions/01-metadata/sitemap.md, robots.md |
| Images | 01-getting-started/12-images.md, 03-api-reference/02-components/image.md |
| Fonts | 01-getting-started/13-fonts.md, 03-api-reference/02-components/font.md |
| Static pages / no data fetching | 02-guides/public-static-pages.md |
| Production checklist (perf, a11y, SEO) | 02-guides/production-checklist.md |
| JSON-LD | 02-guides/json-ld.md |
| Avoiding theme flash | 02-guides/preventing-flash-before-hydration.md |
| View transitions | 02-guides/view-transitions.md |
| Lazy loading | 02-guides/lazy-loading.md |
| Tailwind v3 setup | 02-guides/tailwind-v3-css.md |
| AI agents / AGENTS.md | 02-guides/ai-agents.md, 02-guides/mcp.md |

## Agent setup used here
`AGENTS.md` at the repo root carries the official "read the bundled docs" rule; `CLAUDE.md` imports it with `@AGENTS.md` (pattern from 02-guides/ai-agents.md).
