import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import Plasma from "@/components/plasma"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "DANVERSE | AI-Powered Creative Studio",
  description:
    "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems for brands that want to stand out globally.",
  generator: "DANVERSE Studio",
  openGraph: {
    title: "DANVERSE | AI-Powered Creative Studio",
    description:
      "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems for brands that want to stand out globally.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DANVERSE | AI-Powered Creative Studio",
    description:
      "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems for brands that want to stand out globally.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />

        {/* Font Preload */}
        <link
          rel="preload"
          href="/fonts/Inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />

        {/* Dynamic Favicon Script */}
        <Script id="dynamic-favicon" strategy="beforeInteractive">
          {`
            function updateFavicon() {
              const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const faviconHref = darkMode ? '/icons/skitbit-white.svg' : '/icons/favicon-dark.svg';
              let link = document.querySelector("link[rel~='icon']");
              if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
              }
              link.href = faviconHref;
            }
            updateFavicon();
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
          `}
        </Script>
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
