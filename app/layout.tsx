import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Manrope, Sora } from "next/font/google"
import Script from "next/script"
import Plasma from "@/components/plasma"
import { ScrollTracker } from "@/components/scroll-tracker"
import { WebVitalsReporter } from "@/components/web-vitals-reporter"
import { env } from "@/lib/env"
import { Suspense } from "react"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

const GTM_ID = env.NEXT_PUBLIC_GTM_ID
const GA_ID = env.NEXT_PUBLIC_GA_ID
const SITE_URL = env.NEXT_PUBLIC_SITE_URL
const OG_IMAGE_PATH = "/images/danverse-logo.png"

const displayFont = Sora({
  subsets: ["latin"],
  variable: "--font-display-next",
  weight: ["600", "700", "800"],
  display: "swap",
})

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body-next",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "DANVERSE | AI-Powered Creative Studio",
  description:
    "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems for brands that want to stand out globally.",
  generator: "v0.app",
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "DANVERSE | AI-Powered Creative Studio",
    description:
      "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems for brands that want to stand out globally.",
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
  twitter: {
    card: "summary_large_image",
    title: "DANVERSE | AI-Powered Creative Studio",
    description:
      "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems for brands that want to stand out globally.",
    images: [OG_IMAGE_PATH],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://i.vimeocdn.com" />

        {/* Dynamic Favicon Script */}
        <Script id="dynamic-favicon" strategy="beforeInteractive">
          {`
            function updateFavicon() {
              const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const faviconHref = '/favicon.ico';
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-white focus:px-4 focus:py-2 focus:text-black"
          style={{ zIndex: "var(--z-cursor)" }}
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <ScrollTracker />
          <WebVitalsReporter />
          <Suspense fallback={null}>
            <div className="fixed inset-0 h-full w-full" style={{ zIndex: "var(--z-background)" }}>
              <Plasma colorStops={["#315dff", "#ff2f92", "#d9ff26"]} speed={0.74} amplitude={0.98} blend={0.62} />
              <div className="plasma-atmosphere" aria-hidden="true" />
              <div className="plasma-grain" aria-hidden="true" />
            </div>
            <main
              id="main-content"
              tabIndex={-1}
              className="relative overflow-x-hidden"
              style={{ zIndex: "var(--z-content)" }}
            >
              {children}
            </main>
          </Suspense>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
