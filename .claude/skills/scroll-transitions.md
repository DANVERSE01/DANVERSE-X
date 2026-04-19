# Scroll + Transition Systems

## Lenis
- Lenis v2 pages usage: `import Lenis from 'lenis'` (not `lenis/react`)
- React usage: `import { ReactLenis } from 'lenis/react'`
- Recommended config: `duration: 1.2`, easing `power3.out`, `smoothWheel: true`

## Barba.js Lifecycle
- Hook order: `beforeLeave` -> `leave` -> `afterLeave` -> `beforeEnter` -> `enter`
- Use GSAP timeline orchestration in each hook
- Enable prefetch on hover for perceived speed

## View Transitions API
- Prefer `document.startViewTransition()` for native transitions
- Set `view-transition-name` in CSS
- Style with `::view-transition-old(...)` and `::view-transition-new(...)`
- Safari 18+ support allows native-first without extra libraries

## CSS Scroll-Driven Animation
- `animation-timeline: scroll()` or `animation-timeline: view()`
- `animation-range` with `entry` and `exit`
