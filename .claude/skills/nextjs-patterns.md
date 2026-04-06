---
name: nextjs-patterns
description: Next.js 15 App Router patterns for DANVERSE-X — server components, data fetching, routing, metadata, and deployment to Netlify. Auto-loaded for Next.js, routing, or server-side work.
trigger: next.js|app router|server component|page.tsx|layout.tsx|metadata|route handler|fetch|server action
---

# Next.js 15 App Router — DANVERSE-X Patterns

## File Structure
```
app/
├── layout.tsx          ← root layout (HTML, fonts, providers)
├── page.tsx            ← homepage (/ route)
├── globals.css         ← global styles
├── (marketing)/        ← route group (no URL segment)
│   └── about/page.tsx
├── [slug]/             ← dynamic route
│   ├── page.tsx
│   └── generateStaticParams.ts
├── api/                ← Route Handlers
│   └── contact/route.ts
└── not-found.tsx       ← 404 page

components/             ← shared components (Server by default)
lib/                    ← utilities, data fetchers
```

## Server vs Client Components

### Server Component (default — no directive needed)
```tsx
// app/page.tsx — runs on server, no hooks, no browser APIs
import { fetchProjects } from '@/lib/data'

export default async function HomePage() {
  const projects = await fetchProjects()  // direct async/await
  return <ProjectGrid projects={projects} />
}
```

### Client Component (interactive)
```tsx
'use client'  // ← required directive — TOP of file, before imports

import { useState, useEffect } from 'react'

export function AnimatedHero() {
  const [isLoaded, setIsLoaded] = useState(false)
  // GSAP, Framer Motion, event handlers — all fine here
}
```

### Passing Server Data to Client Component
```tsx
// app/page.tsx (Server)
import { ClientTimeline } from '@/components/ClientTimeline'

export default async function Page() {
  const data = await fetchData()
  return <ClientTimeline initialData={data} />  // pass as prop
}
```

## Data Fetching

### Server Component Fetch (with caching)
```tsx
async function fetchProjects() {
  const res = await fetch('https://api.danverse.ai/projects', {
    next: { revalidate: 3600 }  // revalidate every hour
    // cache: 'no-store'        // or: always fresh
    // cache: 'force-cache'     // or: static (default)
  })
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json()
}
```

### Server Actions (form handling)
```tsx
'use server'  // top of file OR inline action

export async function submitContact(formData: FormData) {
  const email = formData.get('email') as string
  // validate, send email, etc.
  // return { success: true } or { error: 'message' }
}
```

## Metadata API

### Static Metadata
```tsx
// app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DANVERSE — Creative Director',
  description: 'Cinematic portfolio. Alexandria → GCC.',
  openGraph: {
    title: 'DANVERSE',
    images: ['/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image' }
}
```

### Dynamic Metadata
```tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await fetchProject(params.slug)
  return {
    title: `${project.title} — DANVERSE`,
    description: project.summary,
  }
}
```

## Route Handlers (API)
```tsx
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  // validate body
  return NextResponse.json({ success: true }, { status: 200 })
}
```

## Dynamic Routes + Static Generation
```tsx
// app/work/[slug]/page.tsx
export async function generateStaticParams() {
  const projects = await fetchAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await fetchProject(params.slug)
  return <ProjectDetail project={project} />
}
```

## Font Loading (next/font)
```tsx
// app/layout.tsx
import { Syne } from 'next/font/google'
import localFont from 'next/font/local'

const syne = Syne({ subsets: ['latin'], variable: '--font-display-next' })
const inter = Inter({ subsets: ['latin'], variable: '--font-body-next' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

## Dynamic Imports (for heavy components)
```tsx
import dynamic from 'next/dynamic'

// Three.js scene — no SSR, load only client-side
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), {
  ssr: false,
  loading: () => <div className="aspect-video animate-pulse bg-surface-2" />
})
```

## Netlify Deployment Config
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NEXT_TELEMETRY_DISABLED = "1"
```

**Never use Vercel. Netlify handles Next.js 15 natively via the plugin.**

## Common Mistakes
```tsx
// ❌ Browser API in Server Component
export default function Page() {
  const width = window.innerWidth  // ← crashes at build
}

// ✅ Move to Client Component or useEffect
'use client'
export function Page() {
  const [width, setWidth] = useState(0)
  useEffect(() => setWidth(window.innerWidth), [])
}

// ❌ Async Client Component (not supported)
'use client'
export default async function Page() { ... }  // ← TS error

// ✅ Use Server Component for async, pass data down
export default async function Page() {
  const data = await fetchData()
  return <ClientComponent data={data} />
}
```
