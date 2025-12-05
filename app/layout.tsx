import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Plasma from "@/components/plasma"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"], display: "swap" })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://danverse.ai'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DANVERSE | AI-Powered Creative Studio",
    template: "%s | DANVERSE",
  },
  description:
    "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems for brands that want to stand out globally.",
  keywords: [
    "AI creative studio",
    "cinematic ads",
    "brand design",
    "creative agency",
    "AI content creation",
    "video production",
    "3D visualization",
    "digital marketing",
  ],
  authors: [{ name: "DANVERSE Studio" }],
  creator: "DANVERSE Studio",
  publisher: "DANVERSE Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "DANVERSE",
    title: "DANVERSE | AI-Powered Creative Studio",
    description:
      "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems for brands that want to stand out globally.",
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'DANVERSE | AI-Powered Creative Studio',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DANVERSE | AI-Powered Creative Studio",
    description:
      "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems for brands that want to stand out globally.",
    images: ['/opengraph-image'],
  },
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
  icons: {
    icon: [
      { url: '/icon', type: 'image/png', sizes: '32x32' },
      { url: '/icons/favicon-dark.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/favicon-dark.svg',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'DANVERSE',
  },
  applicationName: 'DANVERSE',
  category: 'business',
  classification: 'Creative Studio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Viewport Configuration */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover"
        />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#ef4444" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0f" media="(prefers-color-scheme: dark)" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#0a0a0f" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Font Preload */}
        <link
          rel="preload"
          href="/fonts/Inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Suspense fallback={null}>
          <div className="fixed inset-0 z-0 bg-black">
            <Plasma colorStops={["#ef4444", "#f97316", "#fbbf24"]} speed={1.0} amplitude={1.0} blend={0.6} />
          </div>
          <div className="relative z-10">{children}</div>
        </Suspense>
      </body>
    </html>
  )
}
