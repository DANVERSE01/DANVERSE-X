# Framer Motion System

## Variants Library
- `pageVariants`: `initial` / `animate` / `exit` with stagger orchestration
- `cardVariants`: hover lift and shadow emphasis
- `listVariants`: `staggerChildren: 0.08`
- `heroVariants`: orchestrated entrance sequence
- `modalVariants`: `scale: 0.95` with opacity timing

## Scroll + Velocity
- `useScroll` + `useTransform` for parallax depth layers
- `useVelocity` + `useSpring` for scroll velocity effects

## Routing + Layout Motion
- `AnimatePresence` with `mode="wait"` for page transitions
- `layoutId` for shared element morph transitions

## Drag + Motion Values
- Drag patterns: `dragConstraints`, `dragElastic`, `onDragEnd` velocity handling
- MotionValue pipeline: `useMotionValue` + `animate()` + Three.js sync

## Accessibility Rule
- Always call `useReducedMotion()` and conditionally disable non-essential animation
