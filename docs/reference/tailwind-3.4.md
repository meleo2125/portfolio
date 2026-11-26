# Tailwind CSS 3.4.19 — reference notes

Installed: tailwindcss 3.4.19 (PostCSS plugin + autoprefixer). Latest major on npm is 4.3.5 (not adopted; decision pending, see DECISIONS.md).
Sources fetched 2026-11-25. Read the page before relying on a note.

## Dark mode — https://v3.tailwindcss.com/docs/dark-mode
- Default: `dark:` follows `prefers-color-scheme`.
- Manual toggle: `darkMode: 'selector'` (replaced the `class` strategy in v3.4.1). `dark:` applies when an ancestor has class `dark`, e.g. `<html class="dark">`.
- Custom selector: `darkMode: ['selector', '[data-mode="dark"]']`.
- Full override: `darkMode: ['variant', '&:not(.light *)']`.
- System + manual toggle: docs example sets/removes `dark` on `document.documentElement` from `localStorage.theme`, falling back to `matchMedia('(prefers-color-scheme: dark)')`. Removing `localStorage.theme` returns to following the OS. Run it before paint to avoid a flash (see Next doc 02-guides/preventing-flash-before-hydration.md).

## Colors from CSS variables — https://v3.tailwindcss.com/docs/customizing-colors
- Store channels only: `--color-primary: 255 115 179;` (a full `rgb(...)` value breaks opacity modifiers).
- Config: `primary: 'rgb(var(--color-primary))'` (or `hsl(var(...))`). Separator style must match the function (spaces for modern syntax, commas for rgba/hsla).
- The `/ <alpha-value>` placeholder form was not shown on the fetched page; verify before using it.
- The current site uses full color values in variables (e.g. `bg: "var(--color-bg)"`), so `bg-amber/10`-style opacity modifiers on those tokens are unreliable.

## Reduced motion — https://v3.tailwindcss.com/docs/hover-focus-and-other-states
- `motion-reduce:` applies only when the user asks for reduced motion (e.g. `motion-reduce:hidden`).
- `motion-safe:` applies only when they have not (e.g. `motion-safe:transition`).
- (Section was past the fetch truncation point; notes come from a summary of the page. Re-check before Phase 4.)
