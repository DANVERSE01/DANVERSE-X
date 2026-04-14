import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { SiteNav } from "@/components/nav/SiteNav"
import { MobileMenu } from "@/components/nav/MobileMenu"
import { LayoutProviders } from "@/app/components/LayoutProviders"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-next",
  weight: ["300", "400", "500", "600"],
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
    <html lang="en" className={inter.variable}>
      <head />
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <LayoutProviders>
          <SiteNav />
          <MobileMenu />
          <main id="main-content">
            {children}
          </main>
        </LayoutProviders>
      </body>
    </html>
  )
}
