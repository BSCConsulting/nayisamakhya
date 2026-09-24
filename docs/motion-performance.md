# Motion performance guide

How Nayi Samakhya keeps the civic dashboard feeling live without taxing low-end Android devices common in rural / semi-urban Telangana & AP.

## Principles

1. **CSS first for hover / tap.** Card lift (`scale: 1.02`), gradient borders, and `active:scale-0.98` are pure CSS (`.bento-card`, `.tap`). No JS on the interaction path.
2. **Framer Motion only for orchestration.** Entrance stagger, accordion height, and the LIVE sync fade use `framer-motion`. Charts and sparklines are static / CSS SVG.
3. **`prefers-reduced-motion`.** `useReducedMotion()` skips stagger / height animation; CSS media query disables pulse and transforms.
4. **`whileInView` + `once: true`.** Sections animate when they enter the viewport, then stop — no continuous scroll listeners after first paint.
5. **No chart libraries.** Donut, sparkline, and booth bars are inline SVG. Keeps JS payload small for 3G / mid-range phones.
6. **GPU-friendly properties.** Prefer `transform` and `opacity`. Avoid animating `box-shadow` blur radius in loops (SOS pulse is the only intentional exception, and it respects reduced motion).
7. **Illustrations are SVG placeholders.** No large raster heroes on the home dashboard; patterns are CSS data-URIs at ~5% opacity.

## Checklist before shipping motion

- [ ] Works with OS “Reduce motion” enabled
- [ ] No layout thrash on accordion open (height animation is contained)
- [ ] Sticky LIVE bar does not cause CLS when Syncing text swaps (fixed min-width)
- [ ] Lighthouse / Web Vitals on a throttled mid-tier device stay acceptable

## Files

| Concern | Location |
|---------|----------|
| Tokens / utilities | `src/app/globals.css`, `tailwind.config.ts` |
| Stagger / fade primitives | `src/components/motion/primitives.tsx` |
| LIVE pill | `src/components/home/LiveTelemetryBar.tsx` |
| Bento + charts | `src/components/home/BentoGrid.tsx`, `src/components/charts/*` |
