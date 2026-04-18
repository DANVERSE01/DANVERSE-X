---
name: accessibility
description: WCAG 2.1 AA accessibility patterns for DANVERSE-X. Auto-loaded for any component work involving interactive elements, focus management, or ARIA.
trigger: accessibility|a11y|aria|wcag|keyboard|focus|screen reader|tab order|alt text|contrast
---

# Accessibility (A11y) — DANVERSE-X

## Target Standard
**WCAG 2.1 Level AA** — minimum. Strive for AAA on critical paths.

## Colour Contrast
- Body text on `--color-bg` (#06070a): must achieve ≥ 4.5:1
- `--color-text-primary` (#f4eee5) on `#06070a` → contrast ratio: ~18:1 ✅
- `--color-electric-blue` (#E0E75B) on `#06070a` → ratio: ~12:1 ✅
- Never use `--color-text-muted` (#989189) for primary content — contrast is borderline
- Use `--color-text-secondary` (#d8d1c5) minimum for secondary text

## Focus Management

### Visible Focus Ring
```css
/* Required on all interactive elements */
:focus-visible {
  outline: 2px solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}
```

### Custom Cursor & Focus
When using the custom cursor, NEVER remove the native focus ring — suppress only when
the custom visual is present AND focus is not keyboard-triggered.

### Skip Link (required)
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[var(--color-electric-blue)] focus:text-black focus:px-4 focus:py-2 focus:rounded">
  Skip to content
</a>
```

## Semantic HTML

| Use | Instead of |
|-----|-----------|
| `<button>` | `<div onClick>` |
| `<nav aria-label="Main">` | `<div class="nav">` |
| `<main id="main-content">` | `<div class="main">` |
| `<h1>` → `<h6>` in order | Skipped headings |
| `<img alt="...">` | `<img alt="">` for informative images |
| `<img alt="">` | No `alt` attribute (always required) |

## ARIA Patterns

### Animated Elements
```tsx
// For marquees and auto-playing content
<div aria-hidden="true">  {/* decorative marquee */}
  ...
</div>

// For interactive carousels
<div role="region" aria-label="Project showcase" aria-roledescription="carousel">
  <button aria-label="Previous project">←</button>
  <div aria-live="polite" aria-atomic="true">
    Project 1 of 5
  </div>
  <button aria-label="Next project">→</button>
</div>
```

### Canvas (Three.js / Film Grain)
```tsx
<canvas
  role="img"
  aria-label="Decorative animated background — WebGL plasma effect"
/>
```

### Modal / Overlay
```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
>
```

## Keyboard Navigation

- All interactive elements must be reachable via `Tab`
- Logical tab order matches visual order
- Custom components (dropdowns, modals) must trap focus when open
- `Escape` must close any overlay/modal
- Arrow keys for carousels/sliders

## Motion & Animation

```css
/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

In GSAP, check before registering ScrollTrigger:
```ts
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  // register animations
}
```

## Screen Reader Support

- Decorative icons: `aria-hidden="true"`
- Icon buttons: `aria-label="<action>"`
- Loading states: `aria-busy="true"` on container
- Progress: use `role="progressbar"` with `aria-valuenow` / `aria-valuemax`

## Testing Checklist

- [ ] Tab through entire page — no focus traps
- [ ] Screen reader (VoiceOver / NVDA) reads meaningful content
- [ ] All images have descriptive `alt` text
- [ ] Contrast ratios pass for all text
- [ ] Animations stop/pause with `prefers-reduced-motion`
- [ ] Form inputs have visible labels (not just placeholder)
- [ ] Error messages are announced via `aria-live`
