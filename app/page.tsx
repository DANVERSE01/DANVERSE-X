import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { LogoMarquee } from "@/components/logo-marquee"
import { Pricing } from "@/components/pricing"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

// ✅ Force static generation for low TTFB
export const dynamic = "force-static"

export default function Page() {
  const pricingStructuredData = {
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
  }

  const pageStructuredData = {
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
  }

  return (
    <>
      {/* Aurora background is now rendered in layout.tsx */}

      <main className="min-h-[100dvh] text-white relative z-10">
        <SiteHeader />
        <section id="hero">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="work">
          <LogoMarquee />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <section id="contact">
          <AppverseFooter />
        </section>
      </main>

      {/* JSON-LD structured data */}
      <Script
        id="pricing-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingStructuredData),
        }}
      />

      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />
    </>
  )
}
