import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import Script from "next/script"
import { Suspense } from "react"
import { DM_Sans, Syne } from "next/font/google"
import Plasma from "@/components/plasma"
import { ScrollTracker } from "@/components/scroll-tracker"
import { SiteEffects } from "@/components/site-effects"
import { WebVitalsReporter } from "@/components/web-vitals-reporter"
import { env } from "@/lib/env"

const GTM_ID = env.NEXT_PUBLIC_GTM_ID
const GA_ID = env.NEXT_PUBLIC_GA_ID
const SITE_URL = env.NEXT_PUBLIC_SITE_URL

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "700"],
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
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />

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
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-full focus:bg-[var(--gold-primary)] focus:px-4 focus:py-2 focus:text-[var(--bg-void)]"
        >
          Skip to content
        </a>
        <SiteEffects />
        <ScrollTracker />
        <WebVitalsReporter />
        <Suspense fallback={null}>
          <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[var(--bg-void)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_60%_at_50%_40%,rgba(201,168,76,0.08)_0%,rgba(79,195,247,0.04)_40%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_30%_60%,rgba(201,168,76,0.07)_0%,transparent_60%),radial-gradient(ellipse_60%_40%_at_70%_30%,rgba(79,195,247,0.05)_0%,transparent_55%),radial-gradient(ellipse_100%_80%_at_50%_50%,rgba(108,92,231,0.03)_0%,transparent_70%)] opacity-80" />
            <Plasma colorStops={["#c9a84c", "#4fc3f7", "#6c5ce7"]} speed={0.72} amplitude={0.58} blend={0.28} />
          </div>
          <main id="main-content" tabIndex={-1} className="relative z-10">
            {children}
          </main>
        </Suspense>
      </body>
    </html>
  )
}
