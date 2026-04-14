import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Geist, JetBrains_Mono } from "next/font/google"
import { MobileMenu } from "@/components/nav/MobileMenu"
import { SiteNav } from "@/components/nav/SiteNav"
import { Preloader } from "@/components/sections/Preloader"
import { FilmGrain } from "@/components/canvas/FilmGrain"
import { Observability } from "@/components/ui/Observability"
import { ClientProviders } from "@/components/ui/ClientProviders"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body-next",
  weight: ["300", "400", "500"],
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-next",
  weight: ["400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://danverse.studio"),
  title: {
    default: "DANVERSE — AI Creative Studio",
    template: "%s · DANVERSE",
  },
  description:
    "AI-powered creative studio. We build cinematic brand experiences, interactive digital products, and content systems that make you impossible to ignore.",
  keywords: [
    "AI creative studio",
    "cinematic branding",
    "interactive digital experiences",
    "AI content systems",
    "GCC creative agency",
    "AI-powered design",
    "motion design studio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://danverse.studio",
    siteName: "DANVERSE",
    title: "DANVERSE — AI Creative Studio",
    description: "We build what's next. AI Creative Studio.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "DANVERSE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DANVERSE — AI Creative Studio",
    description: "We build what's next.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <head />
      <body>
        <FilmGrain />
        <ClientProviders />
        <Preloader />
        <SiteNav />
        <MobileMenu />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children}
            <Observability />
          </div>
        </div>
      </body>
    </html>
  )
}
