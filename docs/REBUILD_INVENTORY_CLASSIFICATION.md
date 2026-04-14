# DANVERSE-X Rebuild Inventory + Classification

Date: 2026-04-10
Authority: `DANVERSE-X-CLAUDE-v4-final-english.md`
Execution note: this report is the required pre-removal inventory/classification gate. No broad deletion is approved before this report exists.

## 1. Locked Authority

- Execution authority: the brief only.
- Allowed visual/conceptual reference set only:
  - Vertex3D
  - Secret Level
  - Joseph Santamaria
  - Design By Brandin
  - Corentin Bernadou
  - Horned Hare
  - Lando Norris
- Asset rule:
  - local videos are source material only
  - no `/public/videos`
  - candidate case-study/showcase content is not source-of-truth until verified against the required Work schema

## 2. High-Level Mismatch Audit

### 2.1 Core stack mismatches

- `next@14.2.35` present; brief targets Next.js 15.3.
- `react@18.3.1` present; brief targets React 19.
- `three@^0.169.0` present; brief requires `three@^0.184.0`.
- `framer-motion` present; brief forbids it.
- `lenis` present; brief forbids it.
- `zustand`, `mitt`, `resend`, `@vercel/analytics`, `@netlify/plugin-nextjs` missing.
- `@types/three` is `^0.183.1`; brief requires `^0.184.0`.

### 2.2 Config mismatches

- [`next.config.mjs`](d:\Projects\DANVERSE-X\DANVERSE-X\next.config.mjs) uses `output: "export"`; brief expects a server build and Netlify plugin flow.
- [`next.config.mjs`](d:\Projects\DANVERSE-X\DANVERSE-X\next.config.mjs) still optimizes `framer-motion`.
- [`netlify.toml`](d:\Projects\DANVERSE-X\DANVERSE-X\netlify.toml) publishes `out`; brief requires `.next` with `@netlify/plugin-nextjs`.
- `.env.local` is missing; current `.env.example` reflects old domain/contact assumptions.

### 2.3 Design / concept mismatches

- Current site uses old dark ambient/plasma/cinematic identity instead of the locked `TRANSMISSION` concept.
- Current typography stack uses Bebas Neue, Syne, Inter, and Space Grotesk; brief requires Cabinet Grotesk + Geist + JetBrains Mono.
- Current tokens use a multi-accent palette; brief requires a strict two-color system.
- Current homepage sequence does not follow `TX-00` through `TX-06`.
- Current CTA/contact flow is WhatsApp-first; brief requires contact form + `studio@danverse.ai`.
- Current site contains multiple old service/product routes that conflict with the single-page narrative.

### 2.4 Motion / rendering mismatches

- Motion authority is split between GSAP and Framer Motion; brief requires GSAP only.
- Lenis integration exists in [`components/smooth-scroll-controller.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\smooth-scroll-controller.tsx) and [`lib/gsap.ts`](d:\Projects\DANVERSE-X\DANVERSE-X\lib\gsap.ts); brief requires ScrollSmoother instead.
- Current 3D/background system is legacy ambient/plasma instead of a device-tier-checked WebGPU transmission scene.
- Current project ships local videos from [`public/videos`](d:\Projects\DANVERSE-X\DANVERSE-X\public\videos); brief forbids that.

### 2.5 Content / schema mismatches

- No brief-compliant `lib/work.ts`.
- No `app/work/[slug]/page.tsx`.
- Existing showcase/case-study files use non-brief schema and mismatched labels.
- Existing route/copy set contains forbidden language and non-brief service architecture.
- Existing showcase stills are mislabeled:
  - [`public/images/showcase/jacob-bugatti.jpg`](d:\Projects\DANVERSE-X\DANVERSE-X\public\images\showcase\jacob-bugatti.jpg) visually matches the TAG Heuer Carrera watch image, not Jacob & Co x Bugatti.
  - [`public/images/showcase/new-year-reel.jpg`](d:\Projects\DANVERSE-X\DANVERSE-X\public\images\showcase\new-year-reel.jpg) duplicates the MISSHA image.

## 3. Route Inventory + Classification

### 3.1 Rewrite into brief architecture

- [`app/layout.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\layout.tsx)
- [`app/page.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\page.tsx)
- [`app/error.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\error.tsx)
- [`app/not-found.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\not-found.tsx)
- [`app/robots.ts`](d:\Projects\DANVERSE-X\DANVERSE-X\app\robots.ts)
- [`app/sitemap.ts`](d:\Projects\DANVERSE-X\DANVERSE-X\app\sitemap.ts)
- [`app/work/page.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\work\page.tsx)

### 3.2 Add missing brief-required routes/files

- `app/opengraph-image.tsx`
- `app/work/[slug]/page.tsx`
- `app/work/[slug]/opengraph-image.tsx`
- `app/api/contact/route.ts`
- `lib/motion.ts`
- `lib/store.ts`
- `lib/webgpu.ts`
- `lib/events.ts`
- `lib/work.ts`
- `content/work.ts`
- `components/canvas/*`
- `components/cursor/*`
- `components/sections/*`
- `components/nav/*`
- new brief UI primitives

### 3.3 Delete after replacement is in place

These routes are outside the brief architecture and are not surfaced by the locked TX-00 → TX-06 flow:

- [`app/about/page.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\about\page.tsx)
- [`app/branding/page.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\branding\page.tsx)
- [`app/websites/page.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\websites\page.tsx)
- [`app/cinematic-ads/page.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\cinematic-ads\page.tsx)
- [`app/concepts/page.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\concepts\page.tsx)
- [`app/revisions/page.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\revisions\page.tsx)
- [`app/faq/page.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\faq\page.tsx)
- [`app/offline/page.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\offline\page.tsx)
- [`app/t&c/page.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\t&c\page.tsx)
- [`app/checkout/page.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\checkout\page.tsx)
- [`app/3d-product-rendering/page.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\3d-product-rendering\page.tsx)
- [`app/3D-architecture-visualization-studio/page.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\3D-architecture-visualization-studio\page.tsx)
- [`app/api/vitals/route.ts`](d:\Projects\DANVERSE-X\DANVERSE-X\app\api\vitals\route.ts)
- [`app/api/webhook/route.ts`](d:\Projects\DANVERSE-X\DANVERSE-X\app\api\webhook\route.ts)
- [`app/global-error.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\app\global-error.tsx) if superseded cleanly by the new error handling layer

## 4. Component Inventory + Classification

### 4.1 Rewrite / replace fully

Existing names overlap with brief concerns but not with brief implementation. These are rewrite targets, not keep targets:

- [`components/hero.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\hero.tsx)
- [`components/preloader.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\preloader.tsx)
- [`components/site-header.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\site-header.tsx)
- [`components/text-reveal.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\text-reveal.tsx)
- [`components/cinematic-cursor.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\cinematic-cursor.tsx)
- [`components/appverse-footer.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\appverse-footer.tsx)

### 4.2 Delete after replacement

These encode the old visual system, old funnel, or forbidden dependencies:

- [`components/ambient-background.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\ambient-background.tsx)
- [`components/plasma.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\plasma.tsx)
- [`components/plasma-layer.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\plasma-layer.tsx)
- [`components/page-transition.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\page-transition.tsx)
- [`components/smooth-scroll-controller.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\smooth-scroll-controller.tsx)
- [`components/trust-band.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\trust-band.tsx)
- [`components/features.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\features.tsx)
- [`components/logo-marquee.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\logo-marquee.tsx)
- [`components/case-study-spotlight.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\case-study-spotlight.tsx)
- [`components/cinematic-showcase.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\cinematic-showcase.tsx)
- [`components/masterclass-showcase.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\masterclass-showcase.tsx)
- [`components/pricing.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\pricing.tsx)
- [`components/pricing-cards.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\pricing-cards.tsx)
- [`components/PricingExamplesStrip.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\PricingExamplesStrip.tsx)
- [`components/brief-qualifier.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\brief-qualifier.tsx)
- [`components/wa-cta-button.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\wa-cta-button.tsx)
- [`components/hero-media-card.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\hero-media-card.tsx)
- [`components/lazy-video.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\lazy-video.tsx)
- [`components/phone-video.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\phone-video.tsx)
- [`components/process-visuals.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\process-visuals.tsx)
- [`components/showcase-control-rail.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\showcase-control-rail.tsx)
- [`components/concepts/*`](d:\Projects\DANVERSE-X\DANVERSE-X\components\concepts)

### 4.3 Candidate utility keep

These are generic enough to evaluate case by case during rebuild:

- [`components/ui/button.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\ui\button.tsx)
- [`components/ui/input.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\ui\input.tsx)
- [`components/ui/label.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\ui\label.tsx)
- [`components/ui/dialog.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\ui\dialog.tsx)
- [`components/ErrorBoundary.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\ErrorBoundary.tsx)
- [`components/error-screen.tsx`](d:\Projects\DANVERSE-X\DANVERSE-X\components\error-screen.tsx)

## 5. Library / Asset Inventory + Classification

### 5.1 Rewrite

- [`lib/tokens.css`](d:\Projects\DANVERSE-X\DANVERSE-X\lib\tokens.css)
- [`lib/gsap.ts`](d:\Projects\DANVERSE-X\DANVERSE-X\lib\gsap.ts)
- [`public/manifest.webmanifest`](d:\Projects\DANVERSE-X\DANVERSE-X\public\manifest.webmanifest)
- [`netlify.toml`](d:\Projects\DANVERSE-X\DANVERSE-X\netlify.toml)
- [`next.config.mjs`](d:\Projects\DANVERSE-X\DANVERSE-X\next.config.mjs) or replace with `next.config.ts`

### 5.2 Candidate source material only

These contain useful raw material but are not formal source-of-truth:

- [`lib/showcase-works.ts`](d:\Projects\DANVERSE-X\DANVERSE-X\lib\showcase-works.ts)
- [`lib/case-studies.ts`](d:\Projects\DANVERSE-X\DANVERSE-X\lib\case-studies.ts)
- [`public/images/showcase/*`](d:\Projects\DANVERSE-X\DANVERSE-X\public\images\showcase)
- local folder `C:\Users\Mohamed\Desktop\SHOWCASE`

### 5.3 Delete after replacement

- [`public/videos`](d:\Projects\DANVERSE-X\DANVERSE-X\public\videos)
- old hero posters if no longer referenced:
  - [`public/images/hero-posters`](d:\Projects\DANVERSE-X\DANVERSE-X\public\images\hero-posters)
- old hero photography if not selected into the new system:
  - [`public/images/hero`](d:\Projects\DANVERSE-X\DANVERSE-X\public\images\hero)

## 6. Work Data Contract Gate

The only allowed formal work fields are:

- `slug`
- `title`
- `year`
- `date`
- `category`
- `hook`
- `solution`
- `tags`
- `cover`
- `gallery`
- `featured`
- optional: `video`
- optional: `results`

Rules:

- no `poster`
- no reduced subset contract
- no custom substitute fields
- if a required field is unresolved, keep it unresolved and hide dependent UI rather than inventing a replacement

## 7. Confirmed Removals After This Gate

After the new brief architecture is in place, the following classes are confirmed removal targets:

- Framer Motion usage
- Lenis usage
- WhatsApp-first intake/copy
- old service/detail routes outside `/` and `/work`
- local videos in `/public/videos`
- old ambient/plasma identity system
- mismatched showcase labels

## 8. Immediate Execution Consequence

Implementation may now proceed in this order:

1. dependency and config replacement
2. new brief architecture creation
3. source-material mapping into brief work schema
4. only then remove superseded routes/components/assets
