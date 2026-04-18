---
name: awwwards-ux
description: AWWWARDS Site of the Day level UX patterns, micro-interactions, scroll storytelling, and interactive design standards. The complete guide to building experiences that win. Auto-loaded for any UX, interaction, or design quality work.
trigger: awwwards|awwward|sotd|site of the day|micro-interaction|scroll story|interactive|hover effect|cursor effect|magnetic|parallax|depth|scroll animation|cinematic ux|premium ux
---

# AWWWARDS-Level UX — DANVERSE Standard

## The AWWWARDS Criteria (What Judges Actually Score)

| Criterion | Weight | What Wins |
|-----------|--------|-----------|
| Design | 40% | Visual cohesion, typography, colour system, originality |
| Usability | 20% | Navigation clarity, performance, mobile |
| Creativity | 20% | Unexpected interactions, original concept |
| Content | 20% | Copy quality, value, structure |

**The hidden criterion no one mentions**: First 3 seconds. If it doesn't feel premium immediately, it doesn't win.

---

## The DANVERSE Interaction Stack

### Layer 1 — Page Entry (< 100ms to first frame)
- No blank white flash — background color in `<head>` style
- Preloader or instant hero paint
- First GSAP timeline fires within 200ms of DOMContentLoaded

### Layer 2 — Ambient Presence
- Custom cursor always active (desktop only)
- Film grain overlay running at 16fps
- Subtle background animation (shader, particles, or noise)

### Layer 3 — Scroll Response
- Lenis smooth scroll active (lag: 0, lerp: 0.1)
- ScrollTrigger on every section (scrub: 1.5 for premium feel)
- Parallax at 3 depth levels: foreground (fast), midground (normal), background (slow)

### Layer 4 — Element Interactions
- All interactive elements: magnetic pull effect
- Hover states with timing ≥ 200ms (no instant state changes)
- Every button has a layered hover: scale + glow + color shift

### Layer 5 — Content Reveals
- No element appears without animation
- Text: GSAP SplitText word/char reveal with stagger
- Images: clip-path reveal or scale from center
- Cards: stagger 80ms between siblings

---

## Cursor System (Desktop)

```tsx
// The DANVERSE cursor — 3 states
type CursorState = 'default' | 'hover' | 'drag' | 'text' | 'media' | 'hidden'

// Default: 12px circle, border 1.5px, mix-blend-mode: difference
// Hover: scale to 40px, fill with brand color, label appears
// Text: thin vertical bar, 2px × 24px
// Media: enlarged circle with "VIEW" label
// Hidden: scale(0) — on inputs/textareas
```

### Magnetic Effect
Every `<button>`, `<a>`, and `.magnetic` element pulls the cursor:
```ts
const MAGNETIC_STRENGTH = 0.4; // 40% of distance
const MAGNETIC_RADIUS = 80;    // pixels

// On mousemove: calculate distance from center
// If within radius: translate element toward cursor
// On mouseleave: spring back with GSAP
```

### Cursor Trail (optional, premium)
```ts
// Canvas overlay, mix-blend-mode: screen
// Circular particles that fade out over 400ms
// Follow cursor with 60ms delay (lerp: 0.15)
```

---

## Scroll Storytelling Patterns

### Pattern 1 — Horizontal Scroll Section
```ts
// Pin section, scroll horizontally as user scrolls vertically
gsap.to(track, {
  x: () => -(track.scrollWidth - viewport.width),
  ease: "none",
  scrollTrigger: {
    trigger: section,
    pin: true,
    scrub: 1.5,
    end: () => `+=${track.scrollWidth}`,
  }
});
```

### Pattern 2 — Count-Up Numbers
```ts
// Animate numbers when they enter viewport
gsap.from(numberEl, {
  textContent: 0,
  duration: 2,
  ease: "power2.out",
  snap: { textContent: 1 },
  scrollTrigger: { trigger: numberEl, start: "top 85%" }
});
```

### Pattern 3 — Staggered Grid Reveal
```ts
gsap.from(cards, {
  opacity: 0,
  y: 60,
  stagger: 0.08,
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: { trigger: container, start: "top 75%" }
});
```

### Pattern 4 — Section Background Color Morph
```ts
// Background transitions between sections as user scrolls
sections.forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => gsap.to(body, { backgroundColor: colors[i], duration: 0.6 }),
    onLeaveBack: () => gsap.to(body, { backgroundColor: colors[i - 1], duration: 0.6 }),
  });
});
```

### Pattern 5 — Pinned Text Reveal
```ts
// Text types out character by character as user scrolls
gsap.to(textEl, {
  text: { value: fullText, delimiter: "" },
  ease: "none",
  scrollTrigger: {
    trigger: section,
    pin: true,
    scrub: 0.5,
    start: "top top",
    end: "+=2000"
  }
});
```

### Pattern 6 — Image Sequence (Like Apple)
```ts
// Canvas frames from image sequence as user scrolls
const canvas = document.querySelector('canvas');
const frameCount = 120;
const images = Array.from({ length: frameCount }, (_, i) =>
  new Image().src = `/frames/${String(i).padStart(4, '0')}.webp`
);

ScrollTrigger.create({
  scrub: true,
  onUpdate: ({ progress }) => {
    const frame = Math.round(progress * (frameCount - 1));
    ctx.drawImage(images[frame], 0, 0);
  }
});
```

---

## Page Transitions

### Option 1 — Full-Screen Curtain (Current DANVERSE)
```ts
// Out: brand-color panel sweeps in from bottom-left
// In: panel sweeps out, new page fades
```

### Option 2 — View Transitions API (Native, Zero JS)
```css
@view-transition { navigation: auto; }

::view-transition-old(root) {
  animation: 400ms var(--ease-out-expo) both slide-out;
}
::view-transition-new(root) {
  animation: 400ms var(--ease-out-expo) both slide-in;
}
```

### Option 3 — Shared Element Morphing
```css
/* Source page */
.project-card { view-transition-name: project-1; }

/* Target page */
.project-hero { view-transition-name: project-1; }
/* Browser auto-morphs between the two */
```

---

## Typography Motion (GSAP SplitText)

```ts
// Word-by-word slide up (standard)
const tl = gsap.timeline();
const split = SplitText.create(heading, { type: "words,lines" });

tl.from(split.words, {
  opacity: 0,
  y: "100%",
  clipPath: "inset(0 0 100% 0)",
  duration: 0.7,
  stagger: 0.05,
  ease: "power3.out"
});

// Character scramble (tech/cyber)
gsap.to(el, {
  scrambleText: {
    text: "DANVERSE STUDIO",
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    speed: 0.5,
    delimiter: ""
  },
  duration: 1.2
});

// Variable font weight morph
gsap.to(el, {
  fontVariationSettings: "'wght' 700",
  duration: 0.6,
  ease: "power2.inOut"
});
```

---

## Micro-Interaction Library

### Button Hover (Premium)
```css
.btn {
  position: relative;
  overflow: hidden;
  transition: transform 0.2s var(--ease-spring);
}
.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-electric-blue);
  transform: translateY(101%);
  transition: transform 0.4s var(--ease-out-expo);
}
.btn:hover { transform: scale(1.02); }
.btn:hover::after { transform: translateY(0); }
```

### Card Lift (3D Tilt)
```ts
// Rotate card based on mouse position within card
card.addEventListener('mousemove', (e) => {
  const { left, top, width, height } = card.getBoundingClientRect();
  const x = (e.clientX - left) / width - 0.5;  // -0.5 to 0.5
  const y = (e.clientY - top) / height - 0.5;

  gsap.to(card, {
    rotateY: x * 12,
    rotateX: -y * 12,
    transformPerspective: 1000,
    duration: 0.4,
    ease: "power2.out"
  });
});
card.addEventListener('mouseleave', () => {
  gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power2.out" });
});
```

### Link Underline Draw
```css
.link {
  background: linear-gradient(var(--color-electric-blue), var(--color-electric-blue))
    no-repeat 0 100% / 0% 1px;
  transition: background-size 0.4s var(--ease-out-expo);
}
.link:hover { background-size: 100% 1px; }
```

### Number Counter Hover
```ts
el.addEventListener('mouseenter', () => {
  let count = 0;
  const target = parseInt(el.dataset.value);
  const interval = setInterval(() => {
    count = Math.min(count + Math.ceil(target / 20), target);
    el.textContent = count.toLocaleString();
    if (count >= target) clearInterval(interval);
  }, 30);
});
```

---

## Performance for AWWWARDS

AWWWARDS judges run Lighthouse. Your score must be ≥ 90 Performance.

| Rule | Reason |
|------|--------|
| Preload hero image/video | LCP < 2.5s |
| `font-display: swap` | No invisible text |
| Three.js dynamic import + SSR:false | Reduces initial bundle |
| GSAP loaded after hydration | No blocking |
| Image sequence in WebP | 5× smaller than JPG |
| `will-change: transform` only when needed | GPU layer management |

---

## AWWWARDS Self-Assessment Checklist

Before submitting for review:

**Design (40%)**
- [ ] Colour system is intentional and consistent
- [ ] Typography has hierarchy and character
- [ ] Grid system is clear
- [ ] Every element has a purpose
- [ ] Mobile version is just as considered

**Usability (20%)**
- [ ] Nav is always reachable
- [ ] Page loads in < 3s on 3G
- [ ] Works without JavaScript (graceful degradation)
- [ ] No layout shift (CLS < 0.1)

**Creativity (20%)**
- [ ] At least one unexpected interaction
- [ ] Transitions are non-standard
- [ ] Something makes the jury say "I haven't seen that before"

**Content (20%)**
- [ ] Copy is sharp, not filler
- [ ] Case studies/work has depth
- [ ] Contact/CTA is clear
