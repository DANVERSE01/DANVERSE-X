# DANVERSE-X Refactor Changelog

Date: 2026-03-30
Branch: codex/showcase-refactor-v2

## Modified Files

### lib/tokens.css

- Replaced the core brand color block with the v2 palette system
- Brand primary: `#E0E75B` (citrus-lime)
- Brand secondary: `#00A6A6` (aqua-teal)
- Added coral `#EF786A`, lavender `#C48BB4`, and steel `#A8C5D0` accent tokens
- Added `--glow-primary`, `--glow-secondary`, and `--glow-coral`
- Added `--ease-cinematic`, `--duration-fast`, `--duration-base`, and `--duration-slow`
- Fixed `--color-text-muted` to `#6A8A94` for improved contrast

### components/cinematic-showcase.tsx

- Kept the showcase on a single stage container with `min-height: 100vh`
- Vimeo iframe now fills the stage through the CSS-module wrapper instead of a fixed aspect-ratio shell
- Showcase state is driven by `useState<number>(0)` for the active work item
- CTA and thumbnail interactions now use CSS classes instead of imperative inline style mutations
- Work selector thumbnails use token-driven accent colors and accessible pressed states

### styles/showcase.module.css

- Added the dedicated showcase layout classes for stage, media wrapper, overlay, content, CTA, and work grid states
- Added full-bleed iframe treatment with negative inset plus scale to avoid viewport edge gaps
- Added reduced-motion handling for showcase-specific transitions

### components/showcase.module.css

- Added reusable Flow-TV styling for the pricing/showreel strip CTA and ticker treatments
- Aligned supporting showcase UI with the same token palette used by the main cinematic showcase

### app/globals.css

- Added a global `prefers-reduced-motion` block with near-zero transition durations
- Added `:focus-visible` rules for `button`, `a`, and `[role=button]`
- Forces `scroll-behavior: auto` under reduced motion

### Additional Token Adoption

- Updated `app/not-found.tsx`, `app/opengraph-image.tsx`, and `components/error-screen.tsx` to use the new palette tokens
- Updated concept-section styling files to adopt the new coral/teal/steel system and improved mobile/reduced-motion behavior

## Bug Fix Summary

The showcase letterboxing issue came from constraining the Vimeo media inside a fixed-ratio shell. The current layout uses a full-stage wrapper with oversized iframe coverage so the video continues to fill the viewport across wider and taller aspect ratios.

## Contrast Fixes

`--color-text-muted` changed from `#4A5A60` to `#6A8A94` to improve contrast against the darker surface palette.

## Review Checklist

- [ ] Visual QA: iPhone 14 + iPad + 1440px Desktop
- [ ] Video autoplays/loops on Safari iOS (`playsinline=1` required)
- [ ] CTA "Start Your Project" links to correct destination
- [ ] Colour palette approved by design lead
- [ ] TypeScript strict: `npm run build` + `npx tsc --noEmit` both clean
- [ ] No horizontal overflow at any breakpoint

## [2.0.0] - 2026-03-26

### Fixed

- Removed user-scalable=no accessibility regression
- Secured n8n webhooks behind server-side API proxy
- Fixed low-contrast text throughout
- Removed dead components and dependencies

### Added

- Dynamic OG image generation
- Web app manifest
- Custom 404 page
- Lighthouse CI performance budget
- Sentry error monitoring
- Design token system

### Changed

- Standardized on npm (removed pnpm-lock.yaml)
- GTM/GA IDs now read from environment variables
- Hero video now lazy loads
