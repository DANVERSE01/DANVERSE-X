# DANVERSE-X Full Site Upgrade Report
**Date:** 2026-04-16
**Reference:** artefakt.mov (Awwwards SOTD 7.63, Dev Award 8.11)

---

## 1. REFERENCE ANALYSIS

### Color Palette (artefakt.mov)
- Background: `#000000` (pure black)
- Text primary: `#FFFFFF` (pure white)
- Surface: Near-black for card backgrounds
- Accent: Monochromatic — no color accent; video content provides all color

### Typography System
- Display: Geometric sans-serif (custom/proprietary), weights 400-700
- Body: Standard sans-serif, weight 400
- Tight letter-spacing on display text (-0.04em to -0.06em)
- Large fluid headings (estimated 8-10vw for hero)

### Animation Philosophy
- GSAP + WebGL core stack
- Easing: Heavy use of `power4.out` / `expo.out` curves — `cubic-bezier(0.16, 1, 0.3, 1)`
- Durations: 600ms-1800ms range for cinematic reveals
- Stagger: 0.06-0.12s between elements
- Scroll-driven animations with generous trigger points (top 78-85%)
- Key techniques: ASCII post-processing, particle mouse interaction, pixel reveal, 3D gallery transitions

### 3 Elements That Create the Premium Feel
1. **Monochromatic restraint** — Black/white palette forces the video work to be the visual protagonist. No UI chrome competes with the content.
2. **Generous whitespace and slow timing** — Sections breathe with large padding (16-20vw). Animations take 1-1.8s rather than snapping in. This creates the "unhurried luxury" feeling.
3. **Video-first hierarchy** — Every project presents as full-bleed video with minimal metadata overlay. The work speaks through motion, not description text.

---

## 2. ASSET AUDIT RESULTS

### Referenced Assets (22 total) — All Verified

| Asset | Status | Notes |
|-------|--------|-------|
| /videos/showreel-hero.mp4 | OK | 2.5MB, 1280x720, H.264 |
| /videos/kova-3d-showcase.mp4 | OK | 1.4MB, 1280x720, H.264 |
| /videos/capabilities-reel.mp4 | OK | 1.4MB, 480x854, H.264 |
| /images/work/kova-cosmetics/*.webp (7 files) | OK | All WebP format |
| /images/work/shelby-alexandria/*.webp (7 files) | OK | All WebP format |
| /images/work/tag-heuer-carrera/cover.webp | OK | WebP format |
| /images/work/missha-time-revolution/cover.webp | OK | WebP format |
| /images/work/modern-skincare/cover.webp | OK | WebP format |

### Orphaned Assets (not referenced in code)

| Asset | Size | Type | Recommendation |
|-------|------|------|---------------|
| danverse fiilm.mp4 | 88MB | 1920x1080 H.264 + audio | Studio reel. Too large for web without heavy compression. Candidate for hero upgrade with CRF 22 H.265 encoding. |
| other vision.mp4 | 66MB | 1080x1920 vertical H.264 + audio | Vertical content reel. Usable for mobile hero or social showcase. |
| out (7).mp4 | 50MB | 1078x1920 vertical H.264 | Raw vertical content. Needs compression + renaming. |
| brand-film.mp4 | 24MB | 1920x1080 H.264 + audio | Already well-optimized (H.265 attempt produced larger file). Candidate for about/identity section background. |
| hf_...mp4 (21MB) | 21MB | 1928x1076 H.264 | AI-generated content. Candidate for capabilities section. |
| Various download/out files | 8-16MB | Mixed resolutions | Raw exports. Rename and assign or archive. |
| 40+ orphaned images | 0.9-16MB | PNG/JPEG | Hash-named AI generations and portfolio images. Should be renamed to semantic names and assigned to projects. |

### Missing Assets
**Zero.** All 22 code references resolve to existing files.

---

## 3. COMPRESSION RESULTS

### Poster Frame Generation
| File | Size | Source Video |
|------|------|-------------|
| showreel-hero-poster.jpg | 66KB | showreel-hero.mp4 |
| kova-3d-showcase-poster.jpg | 82KB | kova-3d-showcase.mp4 |
| capabilities-reel-poster.jpg | 23KB | capabilities-reel.mp4 |
| brand-film-poster.jpg | 142KB | brand-film.mp4 |

### Video Compression Evaluation
| File | Original | H.265 CRF 23 | Decision |
|------|----------|--------------|----------|
| brand-film.mp4 | 24MB | 26MB (+8%) | **Kept original** — already well-optimized |
| showreel-hero.mp4 | 2.5MB | N/A | Already optimal at 720p |
| kova-3d-showcase.mp4 | 1.4MB | N/A | Already optimal |
| capabilities-reel.mp4 | 1.4MB | N/A | Already optimal |

**Total referenced video weight:** 5.3MB (already excellent for 3 videos)
**Poster frames added:** 4 files, 313KB total

---

## 4. DESIGN DECISIONS

### Motion Timing Upgrade
- **Observed:** artefakt.mov uses 600ms-1800ms duration range with heavy expo-out easing
- **Implemented:** Upgraded `--dur-fast` from 200ms to 300ms, `--dur-base` from 400ms to 600ms, `--dur-slow` from 700ms to 1000ms, `--dur-xslow` from 1200ms to 1400ms. Added `--dur-cinematic: 1800ms`
- **Why:** The original durations felt snappy/app-like. The reference achieves its cinematic quality through longer, more deliberate timing. The upgrade makes reveals feel intentional rather than mechanical.

### Additional Easing Curves
- **Observed:** artefakt.mov uses smooth in-out-quart and out-quint curves alongside expo-out
- **Implemented:** Added `--ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1)` and `--ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1)`
- **Why:** More curve variety allows different animation characters — cinematic reveals (expo-out) vs smooth section transitions (in-out-quart) vs gentle parallax (out-quint).

### Spacing Token Addition
- **Observed:** artefakt.mov uses generous component-level spacing (4-6rem between content blocks)
- **Implemented:** Added `--space-component: clamp(2rem, 4vw, 4rem)` token
- **Why:** Fills the gap between `--space-block` (section-level) and individual element margins.

### Media Aspect Ratio Tokens
- **Implemented:** Added `--ratio-hero`, `--ratio-card`, `--ratio-portrait`, `--ratio-square` tokens
- **Why:** Consistent aspect ratios prevent CLS (Cumulative Layout Shift). Named tokens ensure all media containers share the same ratios.

### Colors Preserved
- **Decision:** All existing color tokens kept exactly as-is per CLAUDE.md session rule
- **Why:** DANVERSE's dark-with-lime identity is already distinctive and premium. Copying artefakt.mov's monochromatic palette would erase brand identity.

---

## 5. COMPONENTS CHANGED

| File | Change | Why |
|------|--------|-----|
| `lib/tokens.css` | Added motion timing tokens (dur-cinematic, ease-in-out-quart, ease-out-quint), spacing token (space-component), media ratio tokens. Upgraded duration values. | Aligns timing with artefakt.mov's cinematic pace. |
| `app/sections/HeroSection.tsx` | Added `poster` attribute to hero video element | Prevents blank frame before video loads; improves LCP. |
| `app/sections/WorkShowcase.tsx` | Added `poster` to work card videos, `loading="lazy"` on non-first images, `data-vt` for View Transitions | Poster prevents layout flash; lazy loading reduces initial payload; View Transitions enable shared-element morphs. |
| `app/sections/AboutCinematic.tsx` | Added `loading="lazy"` and `quality={88}` to below-fold image | Below-fold image was loading eagerly, wasting bandwidth. |
| `app/sections/ExpertiseAccordion.tsx` | Added GSAP staggered entrance animation for accordion items, fixed `aria-expanded` attribute | Items now slide up with stagger on scroll entry (artefakt.mov style). Fixed accessibility warning. |
| `app/sections/FooterBanner.tsx` | Added GSAP ScrollTrigger entrance animation for track and terminal | Was the only section without a cinematic entrance. Now slides up on scroll. |
| `app/sections/CapabilitiesGrid.tsx` | Added `poster` attribute to video (unused component) | Completeness — every video element now has a poster. |
| `app/work/[slug]/CaseStudyVideo.tsx` | Added poster, loading state with skeleton, moved inline styles to CSS | Production-grade video loading pattern with visual feedback. |
| `app/work/[slug]/page.tsx` | Added `fetchPriority="high"` to hero image, `data-vt` for View Transitions | LCP optimization and shared-element transition support. |
| `components/ui/WorkCard.tsx` | Added `poster` attribute to preview video | Prevents blank video frame on work archive page. |
| `app/globals.css` | Added `.case-study__video-wrap/el/skeleton` classes, View Transitions CSS, pulse keyframe | Proper CSS for video loading states and page transitions. |

---

## 6. COMPONENTS PRESERVED

| Component | Why Preserved |
|-----------|--------------|
| `HeroSection.tsx` (animation logic) | SplitText char reveal, velocity-based skew, parallax copy/media — already exceeds reference quality. GSAP timeline with proper cleanup. |
| `AboutCinematic.tsx` (structure) | Sticky pin + SplitText word reveal + counter animation. Premium pattern matching reference. |
| `ProcessSection.tsx` | SVG line draw + scroll-driven step activation. Unique interaction pattern. |
| `ContactCinematic.tsx` | Live clock, coordinate tracker, SplitText char reveal. Cinematic and functional. |
| `MarqueeReel.tsx` | Velocity-driven ticker. Clean implementation of a classic pattern. |
| `SmoothScroll.tsx` | Lenis + GSAP ticker sync. Correct architecture per Lenis docs. |
| `CustomCursor.tsx` | Blend-mode cursor with label states. Already premium. |
| All color tokens | Session rule: never change color tokens. |

---

## 7. BUILD STATUS

| Check | Result |
|-------|--------|
| TypeScript (`tsc --noEmit`) | **PASS** — 0 errors |
| Lint (`eslint .`) | **PASS** — 0 errors |
| Build (`next build`) | **PASS** — 11/11 pages generated, exit 0 |
| Asset coverage | **PASS** — 22/22 references resolve correctly |
| Video poster coverage | **PASS** — All video elements have `poster` attribute |
| Video `muted` attribute | **PASS** — All video elements have `muted` |
| Video `playsInline` attribute | **PASS** — All video elements have `playsInline` |
| Media `aspect-ratio` CSS | **PASS** — 8 CSS rules with aspect-ratio |
| `prefers-reduced-motion` | **PASS** — 8 section files check reduced motion |
| `will-change` audit | **PASS** — Only on `.marquee-track` (actively animating) |
| Lenis smooth scroll | **PASS** — `lerp: 0.08, duration: 1.2` via lenis/react |

---

## 8. REMAINING OPPORTUNITIES

### 1. Orphaned Video Assignment + Compression Pipeline
The `public/videos/` directory contains ~290MB of orphaned video files. A compression pipeline using H.265 CRF 22-26 with `ffmpeg` could reduce this to ~60-80MB while assigning the best content to:
- `danverse fiilm.mp4` (88MB) as full-screen hero showreel replacement
- `brand-film.mp4` (24MB) as AboutCinematic section background
- `kova-social.mp4` (1MB) as secondary kova-cosmetics gallery item

**Implementation:** Compress with `ffmpeg -vcodec libx265 -crf 22 -preset slow -tag:v hvc1 -movflags +faststart -an`, rename to semantic slugs, update content/work.ts references.

### 2. Image Format Modernization (AVIF + WebP `<picture>`)
All work images are WebP — excellent baseline. Adding AVIF variants would achieve 30-50% further compression. Use `sharp` (already in devDependencies) to batch-generate AVIF alongside existing WebP, then wrap in `<picture>` elements:
```tsx
<picture>
  <source srcSet="/images/work/project/cover.avif" type="image/avif" />
  <source srcSet="/images/work/project/cover.webp" type="image/webp" />
  <img src="/images/work/project/cover.jpg" alt="..." loading="lazy" />
</picture>
```

### 3. CapabilitiesGrid.tsx Refactor
This unused component has extensive inline styles (10+ linter warnings) and a Three.js Canvas dependency. If brought into the page layout, it should be refactored to use CSS classes in globals.css and the Canvas should be code-split with `dynamic(() => import(...), { ssr: false })` to avoid loading Three.js for users who never scroll to that section.
