---
name: danverse-design-system
description: DANVERSE-X complete design system — color tokens, typography, spacing, animation, shadows, and component patterns. Auto-loaded for any UI or styling work.
trigger: color|token|design system|brand|aesthetic|css variable|animation|shadow|typography
---

# DANVERSE-X Design System

## Color Tokens (lib/tokens.css — source of truth)

### Backgrounds
```css
--color-bg: #06070a               /* page background — true black */
--color-surface: #0d1015          /* cards, panels */
--color-surface-2: #141923        /* elevated cards */
--color-surface-3: #1c2431        /* modals, tooltips */
--color-deep-navy: #141d31        /* hero dark areas */
--color-smoked-plum: #271824      /* dark accent sections */
```

### Brand Colors
```css
--color-electric-blue: #E0E75B    /* citrus-lime — primary brand */
--color-electric-blue-strong: #F5F87E
--color-hot-pink: #00A6A6         /* aqua-teal — secondary brand */
--color-hot-pink-strong: #00C6C6
--color-acid-lime: #EF786A        /* coral — accent */
--color-lavender: #C48BB4         /* lavender — accent */
```

### Text
```css
--color-text-primary: #f4eee5     /* main body text */
--color-text-secondary: #d8d1c5  /* secondary text */
--color-text-muted: #989189       /* captions, placeholders */
--color-text-inverse: #05070b    /* text on light backgrounds */
```

### Borders
```css
--color-border: rgba(152, 165, 235, 0.12)
--color-border-strong: rgba(239, 120, 106, 0.24)
```

### Material & Glass
```css
--color-material-gold: #FFD700
--color-material-silver: #C0C0C0
--color-material-glass: rgba(255, 255, 255, 0.08)
--color-material-chrome: #E8E8E8
```

## Glow Effects
```css
--glow-primary:   0 16px 48px rgba(232, 248, 91, 0.32), 0 0 64px rgba(248, 255, 123, 0.24)
--glow-secondary: 0 16px 48px rgba(0, 184, 184, 0.28), 0 0 64px rgba(0, 216, 216, 0.20)
--glow-lime:      0 12px 36px rgba(255, 127, 106, 0.24), 0 0 48px rgba(255, 159, 138, 0.16)
```

## Shadow System
```css
--shadow-panel:    0 40px 120px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)
--shadow-material: 0 8px 32px rgba(0,0,0,0.4), 0 0 16px rgba(232,248,91,0.12)
--shadow-glass:    0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)
--shadow-soft:     0 20px 56px rgba(0,0,0,0.4), 0 0 48px rgba(232,248,91,0.10)
--shadow-focus:    0 0 0 4px rgba(232,248,91,0.28), 0 0 32px rgba(255,127,106,0.16)
```

## Typography
```css
--font-display: var(--font-display-next), "Bebas Neue", "Syne", sans-serif
--font-body: var(--font-body-next), "Inter", "Manrope", sans-serif
```

## Animation Tokens
```css
--ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1)   /* smooth decelerate */
--ease-snap:      cubic-bezier(0.34, 1.56, 0.64, 1) /* spring overshoot */
--ease-premium:   cubic-bezier(0.4, 0, 0.2, 1)      /* material standard */

--duration-fast: 180ms
--duration-base: 320ms
--duration-slow: 640ms
```

## Spacing & Layout
```css
--section-inline: clamp(1rem, 5vw, 6rem)       /* horizontal padding */
--section-block:  clamp(4.5rem, 10vw, 8rem)    /* vertical padding */
--content-max: 1440px
--content-narrow: 1180px
```

## Z-Index System
```css
--z-background: 0    /* Three.js canvas, video bg */
--z-content: 10      /* page content */
--z-overlay: 20      /* floating overlays */
--z-nav: 100         /* navigation */
--z-modal: 200       /* modals, drawers */
--z-cursor: 9999     /* custom cursor */
```

## Focus & Selection
```css
--focus-ring-color: rgba(255, 127, 106, 0.85)
--focus-ring-offset: 3px
--selection-bg: rgba(232, 248, 91, 0.38)
--selection-text: #ffffff
```

## Component Patterns

### Glass Card
```css
background: var(--color-material-glass);
border: 1px solid var(--color-border);
box-shadow: var(--shadow-glass);
backdrop-filter: blur(12px);
```

### Brand Button
```css
background: var(--color-electric-blue);
color: var(--color-text-inverse);
box-shadow: var(--glow-primary);
transition: box-shadow var(--duration-base) var(--ease-cinematic);
```

### Section Layout
```css
padding: var(--section-block) var(--section-inline);
max-width: var(--content-max);
margin-inline: auto;
```

## Tailwind Aliases (via CSS vars in tailwind.config.ts)
```
bg-background    → var(--background)
bg-card          → var(--card)
text-primary     → var(--primary)
border-border    → var(--border)
```
For DANVERSE colors, use CSS variables directly — they're not all mapped to Tailwind tokens.
