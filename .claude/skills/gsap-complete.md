# GSAP Complete

## Core Systems
- ScrollTrigger: `pin`, `scrub: 1.5`, `snap`, `batch()`, `ScrollTrigger.refresh()`
- ScrollSmoother: `wrapper`/`content`, `smooth: 1.2`, `effects()`
- SplitText mask (GSAP 3.13+): automatic `clip-path`, no wrapper needed
- SplitText: chars/words/lines targeting with stagger patterns
- Flip: `Flip.getState()` + `Flip.from()` for layout transitions

## SVG + Path Plugins
- DrawSVG: stroke reveal using `0% -> 100%`
- MorphSVG: `morphTo` with `shapeIndex` matching
- MotionPath: `curviness` and `orientToBezier`

## Easing + Timing
- CustomEase: use cinematic curve values for brand motion language

## Integration Rules
- Lenis integration: `gsap.ticker.add(lenis.raf)`
- ALL plugins are FREE since GSAP 3.12: DrawSVG, MorphSVG, SplitText, ScrollSmoother
- NEVER use `cdn.jsdelivr`; always `npm install gsap`
