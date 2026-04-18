---
name: gsap-advanced
description: Advanced GSAP patterns — SplitText, DrawSVG, MorphSVG, ScrollTrigger scrub/pin/snap, Flip plugin, MotionPath, ScrambleText, physics springs, and production animation architecture for DANVERSE-X.
trigger: gsap|greensock|splittext|scrolltrigger|drawtsvg|morphsvg|gsap flip|motion path|scramble|animation timeline|tween|stagger|pin|scrub|snap
---

# Advanced GSAP — DANVERSE Production Patterns

> All GSAP Club plugins are FREE since 2024. Always import from `lib/gsap.ts` — never directly.

---

## GSAP Singleton Import (mandatory)

```ts
// lib/gsap.ts — always import from here
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { Flip } from 'gsap/Flip';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
```

---

## SplitText — All Patterns

### Word-by-Word Slide Up (Standard DANVERSE)
```ts
const split = SplitText.create(heading, {
  type: 'words,lines',
  linesClass: 'overflow-hidden', // critical — masks the reveal
});

gsap.from(split.words, {
  opacity: 0,
  y: '110%',        // go slightly below 100% for "clip" feel
  duration: 0.7,
  stagger: 0.06,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: heading,
    start: 'top 85%',
  },
});
```

### Character-by-Character (Cinematic)
```ts
const split = SplitText.create(el, { type: 'chars,words' });

gsap.from(split.chars, {
  opacity: 0,
  y: 40,
  rotateX: -90,
  transformOrigin: 'top center',
  duration: 0.5,
  stagger: 0.02,
  ease: 'back.out(2)',
});
```

### GSAP 3.13+ Mask Reveal (Auto Clip)
```ts
// GSAP 3.13 added mask:true — auto generates clip-path container
const split = SplitText.create(heading, {
  type: 'lines',
  mask: 'lines',  // auto-wraps lines in overflow:hidden container
});

gsap.from(split.lines, {
  yPercent: 100,
  duration: 0.8,
  stagger: 0.1,
  ease: 'power4.out',
});
```

### ScrambleText (Cyberpunk / Tech)
```ts
gsap.to(el, {
  duration: 1.5,
  scrambleText: {
    text: 'DANVERSE STUDIO',
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    revealDelay: 0.3,
    speed: 0.4,
    delimiter: '',
    newClass: 'text-[var(--color-electric-blue)]',
    oldClass: 'opacity-40',
  },
  ease: 'power3.out',
});
```

### Variable Font Weight Morphing
```ts
gsap.fromTo(heading,
  { fontVariationSettings: "'wght' 100" },
  {
    fontVariationSettings: "'wght' 900",
    duration: 1.2,
    ease: 'power2.inOut',
    scrollTrigger: { trigger: heading, start: 'top 80%' },
  }
);
```

---

## ScrollTrigger — Advanced Patterns

### Scrub with Premium Feel
```ts
// scrub: 1.5 = 1.5 second lag — feels premium, not instant
ScrollTrigger.create({
  trigger: section,
  start: 'top top',
  end: '+=200%',
  pin: true,
  scrub: 1.5,
  animation: tl,
});
```

### Horizontal Scroll
```ts
const track = gsap.utils.toArray('.panel');

gsap.to(track, {
  xPercent: -100 * (track.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.horizontal-container',
    pin: true,
    scrub: 1.5,
    snap: {
      snapTo: 1 / (track.length - 1),
      duration: { min: 0.2, max: 0.6 },
      ease: 'power1.inOut',
    },
    end: () => `+=${document.querySelector('.horizontal-container').offsetWidth}`,
  },
});
```

### Section Snap (Full-Screen Sections)
```ts
const sections = gsap.utils.toArray('section');
let currentSection = 0;

ScrollTrigger.create({
  snap: {
    snapTo: (progress) => Math.round(progress * (sections.length - 1)) / (sections.length - 1),
    duration: { min: 0.2, max: 0.5 },
    delay: 0.1,
    ease: 'power1.inOut',
  },
});
```

### Parallax Depth System
```ts
// 3 depth layers: bg (slow), mid (normal), fg (fast)
gsap.to('.parallax-bg', {
  yPercent: -30,
  ease: 'none',
  scrollTrigger: { trigger: section, scrub: true },
});

gsap.to('.parallax-mid', {
  yPercent: -15,
  ease: 'none',
  scrollTrigger: { trigger: section, scrub: true },
});

gsap.to('.parallax-fg', {
  yPercent: -5,
  ease: 'none',
  scrollTrigger: { trigger: section, scrub: true },
});
```

### Background Color Morph
```ts
sections.forEach((section, i) => {
  const color = section.dataset.bgColor;
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    onEnter: () => gsap.to('body', { backgroundColor: color, duration: 0.5 }),
    onLeaveBack: () => gsap.to('body', { backgroundColor: sections[i - 1]?.dataset.bgColor ?? '#06070a', duration: 0.5 }),
  });
});
```

---

## DrawSVG (Free 2024+)

```ts
// Animate SVG path drawing — zero to full
gsap.from('.path', {
  drawSVG: '0%',
  duration: 2,
  ease: 'power2.inOut',
  stagger: 0.3,
  scrollTrigger: { trigger: svg, start: 'top 70%' },
});

// Animate from middle outward
gsap.from('.logo-path', {
  drawSVG: '50% 50%',
  duration: 1.5,
  ease: 'expo.out',
});

// Animate left-to-right
gsap.from('.line', {
  drawSVG: '0% 0%',
  duration: 1,
  ease: 'none',
});
```

---

## MorphSVG (Free 2024+)

```ts
// Shape morphing between SVG paths
gsap.to('#shape-a', {
  morphSVG: '#shape-b',
  duration: 1.2,
  ease: 'power2.inOut',
});

// Morph on hover
el.addEventListener('mouseenter', () => {
  gsap.to('#icon', { morphSVG: '#icon-hover', duration: 0.4 });
});
el.addEventListener('mouseleave', () => {
  gsap.to('#icon', { morphSVG: '#icon', duration: 0.4 });
});
```

---

## FLIP Plugin (Layout Transitions)

```ts
import { Flip } from 'gsap/Flip';

// 1. Capture current state
const state = Flip.getState('.cards');

// 2. Change DOM (reorder, reclassify, add/remove)
container.prepend(cards[0]);

// 3. Animate to new state
Flip.from(state, {
  duration: 0.6,
  ease: 'power2.out',
  stagger: 0.05,
  absolute: true,
});

// Grid filter animation
filterBtn.addEventListener('click', () => {
  const state = Flip.getState(allCards);
  cards.forEach(card => {
    card.style.display = card.dataset.category === activeFilter ? 'block' : 'none';
  });
  Flip.from(state, {
    duration: 0.5,
    ease: 'power2.inOut',
    stagger: 0.04,
    scale: true,
  });
});
```

---

## MotionPath Plugin

```ts
// Animate along SVG path
gsap.to('.particle', {
  motionPath: {
    path: '#curve',
    align: '#curve',
    autoRotate: true,
    alignOrigin: [0.5, 0.5],
  },
  duration: 3,
  ease: 'power1.inOut',
  repeat: -1,
  stagger: 0.5,
});
```

---

## CustomEase (Bespoke Curves)

```ts
// Define once at app level
CustomEase.create('cinematic', 'M0,0 C0.22,1 0.36,1 1,1');
CustomEase.create('snap', 'M0,0 C0.34,1.56 0.64,1 1,1');
CustomEase.create('dramaticIn', 'M0,0 C0.9,0 1,0.7 1,1');
CustomEase.create('dramaticOut', 'M0,0 C0,0.3 0.1,1 1,1');

// Use
gsap.to(el, { x: 100, ease: 'cinematic', duration: 0.8 });
```

---

## GSAP Context (Scoped + Cleanup)

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // All animations registered here auto-clean on ctx.revert()
    const tl = gsap.timeline();
    tl.from('.hero-title', { opacity: 0, y: 40, duration: 0.8 });
    tl.from('.hero-sub', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4');

    ScrollTrigger.create({
      trigger: sectionRef.current,
      animation: tl,
      start: 'top 80%',
    });
  }, scopeRef); // scope to ref — prevents targeting wrong elements

  return () => ctx.revert(); // kills ALL timelines and ScrollTriggers
}, []);
```

---

## Lenis + ScrollTrigger Integration

```ts
// Required — connect Lenis to GSAP's tick
const lenis = new Lenis({ lerp: 0.1, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0); // critical — prevents scroll lag on tab switch

// Cleanup
return () => {
  lenis.destroy();
  ScrollTrigger.getAll().forEach(t => t.kill());
};
```
