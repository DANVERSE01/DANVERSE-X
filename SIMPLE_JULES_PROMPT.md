# 🚀 DANVERSE-X: Simple Fix & Deploy

## Repository
https://github.com/DANVERSE01/DANVERSE-X

## Task
Fix all errors and deploy to Cloudflare Pages. Keep it simple - NO APIs, NO database, NO backend.

---

## STEP 1: Replace `app/layout.tsx` with this:

```tsx
import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://danverse.pages.dev'),
  title: {
    default: 'DANVERSE - AI Cinematic Studio',
    template: '%s | DANVERSE',
  },
  description: 'Premium AI-powered creative services for cinematic productions, visual effects, and digital content creation.',
  keywords: ['AI', 'Cinematic', 'Studio', 'Visual Effects', 'VFX', 'Video Production'],
  authors: [{ name: 'DANVERSE Team' }],
  creator: 'DANVERSE',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://danverse.pages.dev',
    siteName: 'DANVERSE',
    title: 'DANVERSE - AI Cinematic Studio',
    description: 'Premium AI-powered creative services.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DANVERSE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DANVERSE - AI Cinematic Studio',
    description: 'Premium AI-powered creative services.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-background font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## STEP 2: Update `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'date-fns'],
  },
};

export default nextConfig;
```

---

## STEP 3: Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

Remove any references to:
- `@cloudflare/next-on-pages`
- `@opennextjs/cloudflare`
- `wrangler`
- Any database packages

---

## STEP 4: Delete these files if they exist:
- `wrangler.toml`
- `open-next.config.ts`
- `drizzle.config.ts`
- Any files in `src/db/` folder
- Any files in `app/api/` folder

---

## STEP 5: Verify build works:

```bash
pnpm install
pnpm build
```

Build MUST complete with NO errors.

---

## STEP 6: Cloudflare Pages Settings

In Cloudflare Dashboard, set:
- **Framework preset:** Next.js
- **Build command:** `pnpm build`
- **Build output directory:** `.next`
- **Node.js version:** 20

---

## SUCCESS CRITERIA
✅ `pnpm build` completes without errors
✅ All pages render correctly
✅ Design is preserved
✅ Site is live on Cloudflare Pages

---

## DO NOT:
❌ Add any API routes
❌ Add any database
❌ Add any authentication
❌ Change the UI design
❌ Add unnecessary packages

Keep it SIMPLE. Just fix and deploy.
