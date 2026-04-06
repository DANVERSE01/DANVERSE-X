---
name: framer-motion
description: Framer Motion 12 animation patterns for DANVERSE-X — variants, scroll animations, layout animations, gestures, and integration with GSAP. Auto-loaded for animation or motion component work.
trigger: framer motion|motion|animate|variant|whileInView|AnimatePresence|layout animation|spring|useAnimate
---

# Framer Motion 12 — DANVERSE-X Patterns

## Core Pattern: Variants
```tsx
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }  // --ease-cinematic
  }
}

export function Section({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.section>
  )
}
```

## Staggered Children
```tsx
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.ul variants={container} initial="hidden" animate="visible">
      {projects.map((p) => (
        <motion.li key={p.id} variants={item}>
          <ProjectCard project={p} />
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

## Page Transitions (AnimatePresence)
```tsx
// app/layout.tsx (Client Component)
'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

## Scroll-driven Animation
```tsx
import { useScroll, useTransform, motion } from 'framer-motion'

export function ParallaxSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <motion.div style={{ y, opacity }}>
      <HeroContent />
    </motion.div>
  )
}
```

## Gesture Animations
```tsx
<motion.button
  whileHover={{ scale: 1.04, boxShadow: 'var(--glow-primary)' }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
>
  View Project
</motion.button>
```

## Layout Animations (Shared Element)
```tsx
// Automatically animates size/position changes
<motion.div layoutId="project-card" className="...">
  <motion.img layoutId="project-image" src={project.image} />
  <motion.h2 layoutId="project-title">{project.title}</motion.h2>
</motion.div>
```

## useAnimate (Imperative)
```tsx
import { useAnimate } from 'framer-motion'

export function AnimatedButton() {
  const [scope, animate] = useAnimate()

  const handleClick = async () => {
    await animate(scope.current, { scale: 0.95 }, { duration: 0.1 })
    await animate(scope.current, { scale: 1 }, { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] })
  }

  return <button ref={scope} onClick={handleClick}>Click me</button>
}
```

## DANVERSE Easing Constants
```ts
// Use these to match CSS token --ease-cinematic and --ease-snap
const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const
const EASE_SNAP = [0.34, 1.56, 0.64, 1] as const
const EASE_PREMIUM = [0.4, 0, 0.2, 1] as const
```

## GSAP + Framer Motion Split
- **Framer Motion** → component-level animations, transitions, gestures, layout
- **GSAP + ScrollTrigger** → complex scroll sequences, timeline-based, canvas, Three.js sync
- Never mix them on the same element — pick one per animation context

## Performance Rules
- `whileInView` always with `viewport={{ once: true }}` for entrance animations
- Use `will-change: transform` via Framer's `layout` prop, not manual CSS
- `AnimatePresence` mode `"wait"` prevents layout flash during transitions
- Heavy variants → memoize with `useMemo`
