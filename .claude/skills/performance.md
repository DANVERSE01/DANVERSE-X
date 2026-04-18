---
name: performance
description: Performance optimization patterns for DANVERSE-X — Core Web Vitals, bundle size, lazy loading, GSAP/Three.js optimization, and Netlify edge caching.
trigger: performance|bundle|cwv|lcp|cls|inp|fid|ttfb|lazy|optimize|speed|lighthouse|web vitals|cache
---

# Performance — DANVERSE-X

## Target Metrics (Lighthouse Desktop)

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| Performance score | ≥ 90 | < 70 is a failure |
| LCP | < 1.5s | < 2.5s acceptable |
| CLS | < 0.05 | < 0.1 acceptable |
| INP | < 100ms | < 200ms acceptable |
| FCP | < 1.0s | < 1.8s acceptable |
| TBT | < 150ms | < 300ms acceptable |
| Bundle (First Load JS) | < 150kB/route | < 250kB acceptable |

## Next.js Configuration

```js
// next.config.mjs — required optimizations
const config = {
  output: 'export',
  images: { unoptimized: true }, // for static export
  experimental: {
    optimizePackageImports: ['gsap', 'framer-motion', 'lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
```

## Dynamic Imports (Critical)

Three.js, heavy GSAP plugins, and overlay components MUST be lazy-loaded:

```tsx
// ✅ Correct — SSR disabled for WebGL
const WebGLCanvas = dynamic(() => import('./webgl-canvas'), { ssr: false });
const FilmGrain = dynamic(() => import('./film-grain'), { ssr: false });

// ✅ Correct — heavy component with loading state
const CapabilitiesGrid = dynamic(
  () => import('./capabilities-grid'),
  { loading: () => <div className="h-96 animate-pulse bg-surface" /> }
);
```

## GSAP Optimization

```ts
// ✅ Always use the singleton — never direct imports
import { gsap } from '@/lib/gsap';

// ✅ Kill ScrollTrigger instances on unmount
useEffect(() => {
  const ctx = gsap.context(() => {
    ScrollTrigger.create({ ... });
  }, containerRef);
  return () => ctx.revert(); // kills all triggers in context
}, []);

// ✅ Use gsap.context for scoped animations
const ctx = gsap.context(() => {
  gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1 });
}, scopeRef);
```

## Three.js Memory Management

```ts
// ✅ Always dispose on unmount
useEffect(() => {
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.ShaderMaterial({ ... });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return () => {
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    scene.remove(mesh);
  };
}, []);
```

## Image Optimization

```tsx
// ✅ Hero images — use priority
<Image src="/hero.webp" alt="..." width={1440} height={900} priority />

// ✅ Below-fold images — lazy by default
<Image src="/project.webp" alt="..." width={800} height={600} />

// ✅ Always specify dimensions to prevent CLS
// ❌ Never use raw <img> tags
```

## Font Loading

```tsx
// app/layout.tsx — use next/font for zero layout shift
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], display: 'swap' });
```

## Netlify Edge Cache

```toml
# netlify.toml — long-cache for immutable assets
[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.webp"
  [headers.values]
    Cache-Control = "public, max-age=86400, stale-while-revalidate=604800"
```

## Lenis + GSAP ScrollTrigger Integration

```ts
// ✅ Correct — wire Lenis to GSAP ticker
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ✅ Destroy on unmount
return () => {
  lenis.destroy();
  gsap.ticker.remove(rafFn);
};
```

## Bundle Budget

Run after every major dependency addition:
```bash
npx next build
# Check output — routes should stay within budget
```

Heavy deps to watch:
| Package | Gzipped | Alternative |
|---------|---------|-------------|
| `three` | ~580kB | Dynamic import only |
| `gsap` | ~90kB | Use `optimizePackageImports` |
| `framer-motion` | ~60kB | Use `optimizePackageImports` |
| `lucide-react` | varies | Use `optimizePackageImports` |
