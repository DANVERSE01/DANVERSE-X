import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import Act0ColdOpen from "@/components/experience/act-0-cold-open"
import Act1HeroScene from "@/components/experience/act-1-hero-scene"
import Act2WorkRail from "@/components/experience/act-2-work-rail"
import Act3ProofOffer from "@/components/experience/act-3-proof-offer"
import { ScrollToTop } from "./scroll-to-top"
import Script from "next/script"

// Structured data for SEO
const PRICING_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebPageElement",
  "@id": "https://danverse.ai/#pricing",
  name: "Pricing Plans",
  description:
    "Creative services pricing plans - packages for cinematic ads, branding, websites, and AI content systems",
  url: "https://danverse.ai/#pricing",
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
  "@id": "https://danverse.ai/",
  name: "DANVERSE | AI-Powered Creative Studio",
  description:
    "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems for brands that want to stand out globally.",
  url: "https://danverse.ai/",
  mainEntity: {
    "@type": "Organization",
    name: "DANVERSE",
    url: "https://danverse.ai",
    sameAs: ["https://www.instagram.com/muhammedd_adel"],
  },
  hasPart: [
    {
      "@type": "WebPageElement",
      "@id": "https://danverse.ai/#pricing",
      name: "Pricing Section",
      url: "https://danverse.ai/#pricing",
    },
  ],
} as const

export default function Page() {
  return (
    <>
      <main className="experience-shell relative z-10 min-h-[100dvh] overflow-hidden text-[var(--color-pearl)]">
        <SiteHeader />
        <Act0ColdOpen />
        <Act1HeroScene />
        <Act2WorkRail />
        <Act3ProofOffer />
        <AppverseFooter />
        <ScrollToTop />
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
