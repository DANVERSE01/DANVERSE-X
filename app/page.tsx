import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { LogoMarquee } from "@/components/logo-marquee"
import { Pricing } from "@/components/pricing"
import { AppverseFooter } from "@/components/appverse-footer"
import { ScrollToTop } from "./scroll-to-top"
import Script from "next/script"

// Move structured data objects outside of the component so they are only created
// once during module initialization. This prevents unnecessary re-creation on
// every render and makes the component easier to read. These objects contain
// JSON‑LD for search engine optimization.
const PRICING_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebPageElement",
  "@id": "https://danverse.com/#pricing",
  name: "Pricing Plans",
  description:
    "Creative services pricing plans - packages for cinematic ads, branding, websites, and AI content systems",
  url: "https://danverse.com/#pricing",
  mainEntity: {
    "@type": "PriceSpecification",
    name: "Creative Services",
    description: "Professional creative services with multiple pricing tiers",
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: "299",
        priceCurrency: "USD",
        description: "Basic creative services package",
      },
      {
        "@type": "Offer",
        name: "Professional",
        price: "699",
        priceCurrency: "USD",
        description: "Professional creative services package",
      },
      {
        "@type": "Offer",
        name: "Premium",
        price: "2049",
        priceCurrency: "USD",
        description: "Premium creative services package",
      },
    ],
  },
} as const

const PAGE_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://danverse.com/",
  name: "DANVERSE | AI-Powered Creative Studio",
  description:
    "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems for brands that want to stand out globally.",
  url: "https://danverse.com/",
  mainEntity: {
    "@type": "Organization",
    name: "DANVERSE",
    url: "https://danverse.com",
    sameAs: ["https://instagram.com/danverse.creative"],
  },
  hasPart: [
    {
      "@type": "WebPageElement",
      "@id": "https://danverse.com/#pricing",
      name: "Pricing Section",
      url: "https://danverse.com/#pricing",
    },
  ],
} as const

export default function Page() {
  return (
    <>
      {/* Aurora background is now rendered in layout.tsx */}

      <main className="min-h-[100dvh] text-white relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <SiteHeader />
        </div>
        <div className="pointer-events-auto">
          <Hero />
        </div>
        <div className="pointer-events-auto">
          <Features />
        </div>
        <div className="pointer-events-auto">
          <LogoMarquee />
        </div>
        <div className="pointer-events-auto">
          <Pricing />
        </div>
        <div className="pointer-events-auto">
          <AppverseFooter />
        </div>
        <div className="pointer-events-auto">
          {/* Scroll-to-top button for improved navigation */}
          <ScrollToTop />
        </div>
      </main>

      {/* JSON-LD structured data */}
      <Script
        id="pricing-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PRICING_STRUCTURED_DATA),
        }}
      />

      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PAGE_STRUCTURED_DATA),
        }}
      />
    </>
  )
}
