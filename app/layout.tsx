import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Geist, Syne, JetBrains_Mono } from "next/font/google"
import { SiteNav } from "@/components/nav/SiteNav"
import { Observability } from "@/components/ui/Observability"
import { LayoutProviders } from "@/app/components/LayoutProviders"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body-next",
  display: "swap",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display-next",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-next",
  weight: ["400", "500", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://danverse.studio"),
  title: {
    default: "DANVERSE - Private Creative Assembly",
    template: "%s · DANVERSE",
  },
  description:
    "Private creative assembly for brand systems, motion objects, and digital environments from Alexandria.",
  keywords: [
    "creative direction studio",
    "cinematic branding",
    "brand identity design",
    "motion design studio",
    "digital design GCC",
    "AI-augmented creative",
    "Alexandria creative studio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://danverse.studio",
    siteName: "DANVERSE",
    title: "DANVERSE - Private Creative Assembly",
    description: "Origin objects, production places, and admission-led creative work.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "DANVERSE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DANVERSE - Private Creative Assembly",
    description: "Origin objects, production places, and admission-led creative work.",
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
  themeColor: "#06070a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${syne.variable} ${jetBrainsMono.variable}`}>
      <head />
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <LayoutProviders>
          <SiteNav />
          {children}
          <Observability />
        </LayoutProviders>
      </body>
    </html>
  )
}
