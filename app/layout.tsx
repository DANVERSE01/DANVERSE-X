import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Manrope, Syne } from "next/font/google"
import Script from "next/script"
import { AmbientBackground } from "@/components/ambient-background"
import { ProgressiveEnhancements } from "@/components/progressive-enhancements"
import { env } from "@/lib/env"

const GTM_ID = env.NEXT_PUBLIC_GTM_ID
const GA_ID = env.NEXT_PUBLIC_GA_ID
const SITE_URL = env.NEXT_PUBLIC_SITE_URL
const OG_IMAGE_PATH = "/images/danverse-logo.png"

const displayFont = Syne({
  subsets: ["latin"],
  variable: "--font-display-next",
  weight: ["500", "600", "700", "800"],
  display: "swap",
})

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body-next",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  applicationName: "DANVERSE",
  title: "DANVERSE | Creative Studio",
  description:
    "DANVERSE is a director-led creative studio that builds cinematic ads, bold branding, and strategic content systems for brands that want to stand out globally.",
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DANVERSE",
  },
  authors: [{ name: "DANVERSE", url: SITE_URL }],
  category: "creative studio",
  creator: "DANVERSE",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  generator: "Next.js",
  icons: {
    apple: "/icons/apple-touch-icon.png",
    icon: [
      { url: "/favicon.ico" },
      { sizes: "192x192", type: "image/png", url: "/icons/icon-192.png" },
      { sizes: "512x512", type: "image/png", url: "/icons/icon-512.png" },
    ],
    shortcut: "/favicon.ico",
  },
  keywords: [
    "AI creative studio",
    "cinematic ads",
    "brand systems",
    "launch pages",
    "creative direction",
    "DANVERSE",
  ],
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "DANVERSE | AI-Powered Creative Studio",
    description:
      "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems for brands that want to stand out globally.",
    siteName: "DANVERSE",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: "DANVERSE creative studio preview",
      },
    ],
  },
  publisher: "DANVERSE",
  robots: {
    follow: true,
    index: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "DANVERSE | AI-Powered Creative Studio",
    description:
      "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems for brands that want to stand out globally.",
    images: [OG_IMAGE_PATH],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { color: "#06070a", media: "(prefers-color-scheme: dark)" },
    { color: "#06070a", media: "(prefers-color-scheme: light)" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://i.vimeocdn.com" />

        {GTM_ID ? (
          <Script id="gtm-script" strategy="lazyOnload">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        ) : null}

        {GA_ID ? <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" /> : null}
        {GA_ID ? (
          <Script id="gtag-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        ) : null}
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:border focus:border-white/12 focus:bg-[rgba(11,14,20,0.96)] focus:px-4 focus:py-2 focus:text-white"
          style={{ zIndex: "var(--z-cursor)" }}
        >
          Skip to content
        </a>
        <AmbientBackground />
        <ProgressiveEnhancements />
        <main id="main-content" tabIndex={-1} className="relative overflow-x-hidden" style={{ zIndex: "var(--z-content)" }}>
          {children}
        </main>
      </body>
    </html>
  )
}
