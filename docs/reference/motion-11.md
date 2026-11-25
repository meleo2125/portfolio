# framer-motion 11.18.2 (Motion for React) — reference notes

Installed: framer-motion 11.18.2. Whether the rebuild keeps it is a Phase 2/4 decision (CSS may be enough; see DECISIONS.md).
Source: https://motion.dev/docs/react-accessibility (fetched 2026-11-25). Examples there import from "framer-motion".

## Reduced motion
- `<MotionConfig reducedMotion="user">` disables transform and layout animations when the OS asks for reduced motion, and keeps opacity/colour animations.
- `reducedMotion` also takes `"always"` or `"never"` (lets a site-level setting override the OS).
- `useReducedMotion()` returns a boolean for custom logic, e.g. `animate={reduce ? { opacity: 1 } : { x: 0 }}`.

## Known issue on the current site
Sections use `initial={{ opacity: 0 }}` + `whileInView`. Content stays invisible until scrolled into view, so it is missing for no-JS visitors, some crawlers and full-page screenshots, and `opacity` still animates under reduced motion. Avoid hiding real content behind entry animations in the rebuild.
