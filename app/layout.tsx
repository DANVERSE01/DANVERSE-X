import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import Script from "next/script"
import Plasma from "@/components/plasma"
import { ScrollTracker } from "@/components/scroll-tracker"
import { WebVitalsReporter } from "@/components/web-vitals-reporter"
import { env } from "@/lib/env"
import { Suspense } from "react"

const GTM_ID = env.NEXT_PUBLIC_GTM_ID
const GA_ID = env.NEXT_PUBLIC_GA_ID
const SITE_URL = env.NEXT_PUBLIC_SITE_URL

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
  },
  twitter: {
    card: "summary_large_image",
    title: "DANVERSE | AI-Powered Creative Studio",
    description:
      "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems for brands that want to stand out globally.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

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
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-black focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <ScrollTracker />
        <WebVitalsReporter />
        <Suspense fallback={null}>
          <div className="fixed inset-0 z-0 bg-black">
            <Plasma colorStops={["#ef4444", "#f97316", "#fbbf24"]} speed={1.0} amplitude={1.0} blend={0.6} />
          </div>
          <main id="main-content" tabIndex={-1} className="relative z-10">
            {children}
          </main>
        </Suspense>
      </body>
    </html>
  )
}
