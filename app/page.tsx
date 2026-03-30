import Script from "next/script"
import { AppverseFooter } from "@/components/appverse-footer"
import { CinematicShowcase } from "@/components/cinematic-showcase"
import { Features } from "@/components/features"
import { Hero } from "@/components/hero"
import { LogoMarquee } from "@/components/logo-marquee"
import { ProcessSection } from "@/components/process-section"
import { SiteHeader } from "@/components/site-header"
import { ScrollToTop } from "./scroll-to-top"

const PROCESS_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://danverse.ai/#process",
  name: "DANVERSE Creative Process",
  description:
    "A premium three-step creative workflow covering strategy, production, and launch-ready delivery for cinematic brand campaigns.",
  url: "https://danverse.ai/#process",
  step: [
    {
      "@type": "HowToStep",
      name: "Strategy Lock",
      text: "Define the visual language, target format, and campaign objectives before production starts.",
    },
    {
      "@type": "HowToStep",
      name: "Production",
      text: "Build the cinematic assets with motion, 3D, lighting, and internal quality assurance.",
    },
    {
      "@type": "HowToStep",
      name: "Launch-Ready Delivery",
      text: "Deliver final assets in multiple ratios with structured revisions and source files.",
    },
  ],
} as const

const PAGE_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://danverse.ai/",
  name: "DANVERSE | AI-Powered Creative Studio",
  description:
    "DANVERSE is an AI-powered creative studio building cinematic ads, premium branding, and launch-ready content systems for ambitious brands.",
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
      "@id": "https://danverse.ai/#work",
      name: "Production Showcase",
      url: "https://danverse.ai/#work",
    },
    {
      "@type": "WebPageElement",
      "@id": "https://danverse.ai/#process",
      name: "Creative Process",
      url: "https://danverse.ai/#process",
    },
    {
      "@type": "WebPageElement",
      "@id": "https://danverse.ai/#contact",
      name: "Contact Section",
      url: "https://danverse.ai/#contact",
    },
  ],
} as const

export default function Page() {
  return (
    <>
      <div className="relative z-10 text-[var(--platinum)]">
        <SiteHeader />
        <Hero />
        <Features />
        <LogoMarquee />
        <CinematicShowcase />
        <ProcessSection />
        <AppverseFooter />
        <ScrollToTop />
      </div>

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
