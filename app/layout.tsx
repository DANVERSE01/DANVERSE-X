import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter, Syne } from "next/font/google"
import { SiteNav } from "@/components/nav/SiteNav"
import { Observability } from "@/components/ui/Observability"
import { LayoutProviders } from "@/app/components/LayoutProviders"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-next",
  weight: ["300", "400", "500", "600"],
  display: "swap",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display-next",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://danverse.studio"),
  title: {
    default: "DANVERSE — Creative Direction Studio",
    template: "%s · DANVERSE",
  },
  description:
    "Creative direction studio. Brand, motion, and digital craft from Alexandria to the Gulf.",
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
    title: "DANVERSE — Creative Direction Studio",
    description: "Creative direction studio. Alexandria to the Gulf.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "DANVERSE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DANVERSE — Creative Direction Studio",
    description: "Creative direction studio. Alexandria to the Gulf.",
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
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head />
      <body>
        <LayoutProviders>
          <SiteNav />
          {children}
          <Observability />
        </LayoutProviders>
      </body>
    </html>
  )
}
