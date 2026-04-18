---
name: motion-design
description: Motion design principles and systems for web — timing, easing, choreography, stagger systems, and the complete DANVERSE animation language. For any animation design decision.
trigger: motion design|easing|timing|choreography|stagger|animation language|animation system|animation principle|animation theory|enter animation|exit animation|transition|flow
---

# Motion Design — DANVERSE Animation Language

## The 12 Principles Applied to Web

| Principle | Web Application |
|-----------|----------------|
| **Squash & Stretch** | Scale elements on click (0.95 → 1.05 → 1.0) |
| **Anticipation** | Slight move before action (button dips before launch) |
| **Staging** | Most important element animates first |
| **Straight-ahead / pose-to-pose** | GSAP timelines = pose-to-pose |
| **Follow-through** | Spring easing (`elastic.out`) on UI elements |
| **Slow-in / Slow-out** | `power3.out` — fast arrival, slow finish |
| **Arc** | Motion paths follow arcs, not straight lines |
| **Secondary action** | Particles/sparks follow primary interaction |
| **Timing** | Faster = lighter, Smaller; Slower = heavier, Larger |
| **Exaggeration** | 10% beyond target — then settle |
| **Solid drawing** | 3D transforms, perspective, depth |
| **Appeal** | Every animation has personality |

---

## Easing Reference — When to Use What

### DANVERSE Easing System

```ts
// Smooth decelerate — most section entrances
ease: 'power3.out'        // [0.22, 1, 0.36, 1]

// Spring overshoot — buttons, UI interactions
ease: 'elastic.out(1, 0.4)'   // bouncy, physical
ease: 'back.out(2)'           // slight overshoot

// Fast ease-out — text reveals (arrives quickly, no overshoot)
ease: 'expo.out'              // [0.16, 1, 0.3, 1]

// Equal — scrub animations, progress
ease: 'none'                  // linear

// Fast in, slow out — hero exits, dramatic
ease: 'power4.inOut'          // symmetrical, cinematic

// Custom cinematic
CustomEase.create('cinematic', 'M0,0 C0.22,1 0.36,1 1,1');
CustomEase.create('snap', 'M0,0 C0.34,1.56 0.64,1 1,1');
```

### Visual Mental Model
- `power1.out` — gentle drift
- `power2.out` — natural, web standard
- `power3.out` — DANVERSE standard, premium feel
- `power4.out` — dramatic, bold
- `expo.out` — instant, assertive
- `elastic.out` — spring, physical, playful
- `back.out(2)` — slight overshoot, satisfying

---

## Timing System

### Duration Guidelines

| Element Type | Duration | Reason |
|-------------|----------|--------|
| Micro-interactions (buttons, toggles) | 150–250ms | Feels responsive |
| Icon animations | 200–350ms | Not too quick to miss |
| Card hover states | 250–400ms | Deliberate |
| Section entrances | 600–900ms | Cinematic, earned |
| Page transitions | 500–800ms | Full-screen, dramatic |
| Hero sequence | 1000–2000ms | Establishing moment |
| Scrub animations | No duration — scrub | Frame-perfect |

### The Stagger Bible

```ts
// Text words — tight rhythm
stagger: 0.05

// Heading lines — slightly more air
stagger: 0.08

// Cards / grid items — clear separation
stagger: 0.07

// List items — medium
stagger: 0.06

// Navigation items — fast
stagger: 0.04

// Icon set — very fast
stagger: 0.03

// Particles — very fast with random variance
stagger: { amount: 0.8, from: 'center', ease: 'power2.out' }
```

---

## Animation Choreography System

### Section Entry Sequence (DANVERSE Standard)

```
Frame 0ms:    Section background animates (opacity, scale)
Frame 80ms:   Eyebrow label slides in from left
Frame 200ms:  Main heading begins word-by-word reveal
Frame 480ms:  Subheading fades in (stagger 0.05 per word)
Frame 680ms:  Body copy fades in
Frame 800ms:  CTA button reveals (scale + fade)
Frame 900ms:  Supporting visual/image reveals
Frame 1100ms: Decorative elements (lines, dots, accents) draw
```

```ts
const tl = gsap.timeline({
  scrollTrigger: { trigger: section, start: 'top 75%' }
});

const headingSplit = SplitText.create(heading, { type: 'words,lines', mask: 'lines' });

tl.from(eyebrow,       { opacity: 0, x: -20, duration: 0.5, ease: 'power3.out' })
  .from(headingSplit.words, { yPercent: 100, duration: 0.7, stagger: 0.05, ease: 'power4.out' }, '-=0.3')
  .from(subheading,    { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.3')
  .from(body,          { opacity: 0, y: 15, duration: 0.5, ease: 'power2.out' }, '-=0.2')
  .from(cta,           { opacity: 0, scale: 0.9, duration: 0.5, ease: 'back.out(2)' }, '-=0.1')
  .from(visual,        { opacity: 0, scale: 1.05, duration: 0.8, ease: 'power3.out' }, '-=0.5');
```

### Hero Entry (Full Cinematic Sequence)

```ts
const masterTl = gsap.timeline({ delay: 0.2 }); // slight delay after paint

// 1. Stage: reveal from black
masterTl
  .from(hero, { opacity: 0, duration: 0.3 })
  
  // 2. Background elements (WebGL canvas, grain)
  .from('.hero-bg', { opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.1')
  
  // 3. Eyebrow label
  .from('.hero-eyebrow', { opacity: 0, x: -30, duration: 0.6, ease: 'expo.out' }, '-=0.3')
  
  // 4. Main headline — word by word
  .from(headlineWords, {
    opacity: 0, yPercent: 110,
    duration: 0.7, stagger: 0.06,
    ease: 'power4.out',
  }, '-=0.2')
  
  // 5. Sub-headline
  .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.2')
  
  // 6. CTAs
  .from('.hero-cta', {
    opacity: 0, y: 15,
    duration: 0.5, stagger: 0.12,
    ease: 'back.out(2)',
  }, '-=0.1')
  
  // 7. Scroll indicator
  .from('.scroll-indicator', { opacity: 0, y: -10, duration: 0.5 }, '+=0.3');
```

---

## Exit Animations

Elements should exit as deliberately as they enter:

```ts
// Scroll-out: element leaves viewport top
ScrollTrigger.create({
  trigger: section,
  start: 'bottom top',
  onLeave: () => gsap.to(element, {
    opacity: 0, y: -40, duration: 0.5, ease: 'power3.in'
  }),
  onEnterBack: () => gsap.to(element, {
    opacity: 1, y: 0, duration: 0.5, ease: 'power3.out'
  }),
});
```

---

## The "Nothing Just Appears" Rule

Every element that enters the viewport must animate in. No exceptions.

✅ Correct animation checklist:
- [ ] Text: GSAP SplitText word/char reveal
- [ ] Images: clip-path or scale reveal
- [ ] Cards: translate + opacity, staggered
- [ ] Numbers/stats: count-up animation
- [ ] Lines/borders: DrawSVG or width:0→100%
- [ ] Icons: SVG path draw or pop-in
- [ ] Sections: background color morph

❌ Never allowed:
- Element just appears with no animation
- `opacity: 0` → `opacity: 1` only (no transform)
- Instant state changes (< 150ms)

---

## Reduced Motion (Mandatory)

```ts
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReduced) {
  // Instant reveals — no animation
  gsap.set(elements, { opacity: 1 });
} else {
  // Full animation
  tl.from(elements, { opacity: 0, y: 40, stagger: 0.06 });
}
```

---

## Animation Performance Rules

1. **Animate only `transform` and `opacity`** — never `width`, `height`, `top`, `left`
2. **Use GSAP's `will-change: transform`** — only during animation, auto-cleaned
3. **Batch DOM reads** before writing — avoid layout thrashing
4. **`scrub: 1.5` not `scrub: true`** — smoothed scrub for premium feel
5. **Max 3 concurrent GSAP timelines** per section — more causes jank
6. **Kill ScrollTrigger instances** on component unmount
7. **`gsap.context()`** always — scopes cleanup
