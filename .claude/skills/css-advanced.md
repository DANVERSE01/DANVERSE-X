---
name: css-advanced
description: Advanced CSS techniques for DANVERSE-X — CSS Houdini paint worklets, View Transitions API, Scroll-Driven Animations, CSS Anchor Positioning, container queries, and cutting-edge CSS patterns.
trigger: css houdini|paint worklet|view transition|scroll driven|anchor positioning|container query|@property|css animation|css scroll|at property|native animation|css layer|cascade layer
---

# Advanced CSS — DANVERSE Production Patterns

## CSS Scroll-Driven Animations (Zero JS, Native)

The most performant animation method — runs off main thread entirely.

### Basic Scroll Progress
```css
/* Animate element based on scroll position */
@keyframes reveal {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal-on-scroll {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%; /* triggers when entering viewport */
}
```

### Progress Bar
```css
#progress-bar {
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  background: var(--color-electric-blue);
  transform-origin: left;
  animation: scaleX linear;
  animation-timeline: scroll(root);
}

@keyframes scaleX {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
```

### Parallax Sections
```css
.parallax-bg {
  animation: parallax linear both;
  animation-timeline: view();
  animation-range: entry 0% exit 100%;
}

@keyframes parallax {
  from { transform: translateY(-20%); }
  to   { transform: translateY(20%); }
}
```

### Staggered Cards
```css
.card {
  animation: cardReveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}

.card:nth-child(1) { animation-delay: 0ms; }
.card:nth-child(2) { animation-delay: 80ms; }
.card:nth-child(3) { animation-delay: 160ms; }
```

---

## View Transitions API (Native Page Transitions)

Zero JS needed for basic transitions. Safari 18+ universal support.

### Auto Page Transitions
```css
/* Enable in global CSS */
@view-transition {
  navigation: auto;
}

/* Customize transition */
::view-transition-old(root) {
  animation: 400ms var(--ease-cinematic) both fade-and-slide-out;
}

::view-transition-new(root) {
  animation: 400ms var(--ease-cinematic) both fade-and-slide-in;
}

@keyframes fade-and-slide-out {
  to { opacity: 0; transform: translateX(-40px); }
}

@keyframes fade-and-slide-in {
  from { opacity: 0; transform: translateX(40px); }
}
```

### Shared Element Morphing
```css
/* Source element (e.g. project card) */
.project-card[data-id="1"] {
  view-transition-name: project-1;
}

/* Target element (e.g. project hero) */
.project-hero {
  view-transition-name: project-1;
}
/* Browser auto-morphs between them — size, position, everything */
```

### Programmatic Transition
```ts
// With JS control (for complex scenarios)
document.startViewTransition(async () => {
  // Make DOM changes here
  await navigateTo('/work');
});
```

---

## CSS Houdini Paint Worklet

Custom CSS paint functions — registered once, used like `background-image`.

### Noise Background Worklet
```js
/* noise-worklet.js */
class NoisePaint {
  static get inputProperties() {
    return ['--noise-opacity', '--noise-scale'];
  }

  paint(ctx, size, props) {
    const opacity = parseFloat(props.get('--noise-opacity')) || 0.05;
    const scale = parseFloat(props.get('--noise-scale')) || 100;
    const imageData = ctx.createImageData(size.width, size.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Xorshift32 PRNG — same as film grain
      const val = Math.random() * 255;
      data[i] = data[i+1] = data[i+2] = val;
      data[i+3] = opacity * 255;
    }

    ctx.putImageData(imageData, 0, 0);
  }
}

registerPaint('noise', NoisePaint);
```

```ts
// Register in app
if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('/noise-worklet.js');
}
```

```css
/* Use it */
.noise-bg {
  background-image: paint(noise);
  --noise-opacity: 0.04;
  --noise-scale: 200;
}
```

### Glowing Border Worklet
```js
class GlowBorderPaint {
  static get inputProperties() {
    return ['--glow-color', '--glow-blur', '--border-width'];
  }

  paint(ctx, size, props) {
    const color = props.get('--glow-color').toString().trim() || '#E0E75B';
    const blur = parseFloat(props.get('--glow-blur')) || 20;
    const bw = parseFloat(props.get('--border-width')) || 1;

    ctx.strokeStyle = color;
    ctx.lineWidth = bw;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.strokeRect(bw/2, bw/2, size.width - bw, size.height - bw);
  }
}
registerPaint('glow-border', GlowBorderPaint);
```

---

## @property (Type-Safe Custom Properties)

Enables animating CSS custom properties with transitions:

```css
/* Without @property, you cannot transition custom properties */
@property --glow-spread {
  syntax: '<length>';
  initial-value: 0px;
  inherits: false;
}

@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@property --text-gradient-stop {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}

/* Now you can animate them */
.card {
  --glow-spread: 0px;
  box-shadow: 0 0 var(--glow-spread) var(--color-electric-blue);
  transition: --glow-spread 0.4s var(--ease-cinematic);
}

.card:hover {
  --glow-spread: 30px;
}

/* Animated gradient border */
.gradient-border {
  --gradient-angle: 0deg;
  background: conic-gradient(
    from var(--gradient-angle),
    var(--color-electric-blue),
    var(--color-hot-pink),
    var(--color-acid-lime),
    var(--color-electric-blue)
  );
  animation: spin 3s linear infinite;
}

@keyframes spin {
  to { --gradient-angle: 360deg; }
}
```

---

## CSS Anchor Positioning (Replaces Floating UI)

```css
/* Anchor element */
.trigger-button {
  anchor-name: --my-button;
}

/* Positioned relative to anchor */
.tooltip {
  position: absolute;
  position-anchor: --my-button;

  /* Position above the anchor */
  bottom: calc(anchor(top) + 8px);
  left: anchor(center);
  transform: translateX(-50%);
}
```

---

## Container Queries (Component-Level Responsive)

Better than media queries — component responds to its container, not the viewport:

```css
/* Define containment context */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* Component adapts to container width */
@container card (min-width: 400px) {
  .card {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
}

@container card (min-width: 700px) {
  .card {
    grid-template-columns: 2fr 1fr;
    font-size: 1.2rem;
  }
}
```

---

## CSS Layers (Cascade Control)

```css
/* Define layer order — lower layers lose specificity battles */
@layer reset, tokens, base, components, utilities;

@layer tokens {
  :root { --color-electric-blue: #E0E75B; }
}

@layer base {
  body { font-family: var(--font-body); }
}

@layer components {
  .btn { /* component styles */ }
}

@layer utilities {
  .sr-only { /* utility — highest priority */ }
}
```

---

## Advanced Selectors for Interactive States

```css
/* Has() — parent targeting */
.card:has(.card__image:hover) {
  box-shadow: var(--glow-primary);
  transform: scale(1.02);
  transition: all 0.3s var(--ease-cinematic);
}

/* :is() — grouping */
:is(h1, h2, h3, .heading) {
  font-family: var(--font-display);
  letter-spacing: -0.02em;
}

/* :where() — zero specificity utility */
:where(.card, .panel, .modal) > :first-child {
  margin-top: 0;
}

/* :not() */
.btn:not(.btn--ghost):not(.btn--link) {
  background: var(--color-electric-blue);
}
```

---

## Fluid Type Scale (clamp)

```css
/* Viewport-responsive typography — zero media queries needed */
:root {
  --text-hero:    clamp(4rem,    10vw + 1rem, 10rem);
  --text-display: clamp(2.5rem,  5vw + 1rem,  6rem);
  --text-heading: clamp(1.75rem, 3vw + 0.5rem, 3rem);
  --text-subhead: clamp(1.1rem,  1.5vw + 0.3rem, 1.5rem);
  --text-body:    clamp(0.875rem, 0.9vw + 0.1rem, 1.0625rem);
}
```

---

## Performance CSS Patterns

```css
/* GPU layer hints — use sparingly */
.animated-element {
  will-change: transform; /* only when animation is imminent */
}

/* After animation ends, remove will-change */
.animated-element.done {
  will-change: auto;
}

/* Contain layout for performance */
.card-grid {
  contain: layout style;
}

/* content-visibility — skip off-screen rendering */
.below-fold-section {
  content-visibility: auto;
  contain-intrinsic-size: auto 600px;
}
```
