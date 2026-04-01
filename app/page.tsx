import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { LogoMarquee } from "@/components/logo-marquee"
import { CinematicShowcase } from "@/components/cinematic-showcase"
import { Pricing } from "@/components/pricing"
import { AppverseFooter } from "@/components/appverse-footer"
import { ScrollToTop } from "./scroll-to-top"
import Script from "next/script"
import { StoryRail } from "@/components/story-rail"

// Structured data for SEO
const PROCESS_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebPageElement",
  "@id": "https://danverse.ai/#process",
  name: "The Process",
  description:
    "A three-step cinematic production workflow covering strategy lock, frame and build, and ship and scale.",
  url: "https://danverse.ai/#process",
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
      "@id": "https://danverse.ai/#process",
      name: "Process Section",
      url: "https://danverse.ai/#process",
    },
  ],
} as const

export default function Page() {
  return (
    <>
      <div className="min-h-[100dvh] text-white">
        <StoryRail />
        <SiteHeader />
        <Hero />
        <Features />
        <LogoMarquee />
        <CinematicShowcase />
        <Pricing />
        <AppverseFooter />
        <ScrollToTop />
      </div>

      {/* JSON-LD structured data */}
      <Script
        id="process-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PROCESS_STRUCTURED_DATA),
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
