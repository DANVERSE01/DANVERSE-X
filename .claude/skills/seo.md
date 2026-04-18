---
name: seo
description: SEO optimization for DANVERSE-X — metadata, structured data, Open Graph, sitemap, and Core Web Vitals as ranking signals.
trigger: seo|metadata|og|open graph|twitter card|sitemap|robots|schema|structured data|canonical|ranking
---

# SEO — DANVERSE-X

## Metadata Strategy

### Root Layout Metadata
```tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://danverse.studio'),
  title: {
    default: 'DANVERSE — Cinematic Creative Studio',
    template: '%s | DANVERSE',
  },
  description:
    'Cinematic digital experiences for brands across Alexandria and the GCC. Motion design, 3D, and interactive development at AWWWARDS level.',
  keywords: ['creative studio', 'motion design', 'webgl', '3d', 'alexandria', 'uae', 'gcc', 'interactive'],
  authors: [{ name: 'DANVERSE' }],
  creator: 'DANVERSE',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

### Open Graph
```tsx
export const metadata: Metadata = {
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://danverse.studio',
    siteName: 'DANVERSE',
    title: 'DANVERSE — Cinematic Creative Studio',
    description: 'Motion design, 3D, and interactive development at AWWWARDS level.',
    images: [
      {
        url: '/og-image.jpg',    // 1200×630px, < 300kB
        width: 1200,
        height: 630,
        alt: 'DANVERSE Studio — Cinematic Digital Experiences',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DANVERSE — Cinematic Creative Studio',
    description: 'Motion design, 3D, and interactive development at AWWWARDS level.',
    images: ['/og-image.jpg'],
    creator: '@danverse_studio',
  },
};
```

### Arabic / GCC Locale Support
```tsx
// For Arabic pages
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://danverse.studio',
    languages: {
      'en': 'https://danverse.studio',
      'ar': 'https://danverse.studio/ar',
    },
  },
};

// In <html> tag
<html lang="en" dir="ltr">
// or for Arabic
<html lang="ar" dir="rtl">
```

## Sitemap

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://danverse.studio',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://danverse.studio/work',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
```

## Robots.txt

```ts
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: 'https://danverse.studio/sitemap.xml',
  };
}
```

## Structured Data (JSON-LD)

```tsx
// In app/layout.tsx or page.tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeAgency',
  name: 'DANVERSE',
  url: 'https://danverse.studio',
  logo: 'https://danverse.studio/logo.png',
  description: 'Cinematic creative studio specializing in motion design and interactive development.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Alexandria',
    addressCountry: 'EG',
  },
  areaServed: ['EG', 'AE', 'SA', 'KW', 'QA', 'BH', 'OM'],
  sameAs: [
    'https://twitter.com/danverse_studio',
    'https://instagram.com/danverse_studio',
    'https://linkedin.com/company/danverse',
  ],
};

// In JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

## SEO Checklist

- [ ] `<title>` and `<meta name="description">` on every page
- [ ] `og:image` is 1200×630px and < 300kB
- [ ] `hreflang` tags for Arabic/English alternates
- [ ] Sitemap at `/sitemap.xml`
- [ ] `robots.txt` at `/robots.txt`
- [ ] All images have descriptive `alt` text
- [ ] No `display:none` on critical above-fold content
- [ ] LCP element loads in < 2.5s
- [ ] No duplicate `<h1>` tags per page
- [ ] Canonical URLs set to avoid duplicate content

## Core Web Vitals as SEO Signals

Google uses CWV as ranking signals. Ensure:
- **LCP** < 2.5s — hero image uses `priority` on `next/image`
- **CLS** < 0.1 — all images have explicit `width`/`height`
- **INP** < 200ms — no blocking JS during scroll interactions
