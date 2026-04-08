import { ScrollToTop } from "./scroll-to-top"
import { AppverseFooter } from "@/components/appverse-footer"
import { BriefQualifier } from "@/components/brief-qualifier"
import { CinematicShowcase } from "@/components/cinematic-showcase"
import { Hero } from "@/components/hero"
import { JsonLd } from "@/components/json-ld"
import { ProofSection } from "@/components/case-study-spotlight"
import { ProcessSection } from "@/components/pricing"
import { SiteHeader } from "@/components/site-header"

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
  name: "DANVERSE | Creative Studio",
  description:
    "DANVERSE is a director-led creative studio that builds cinematic ads, bold branding, and strategic content systems for brands that want to stand out globally.",
  url: "https://danverse.ai/",
  mainEntity: {
    "@type": "Organization",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "danverseai@gmail.com",
    },
    name: "DANVERSE",
    url: "https://danverse.ai",
    sameAs: ["https://www.instagram.com/muhammedd_adel"],
  },
  hasPart: [
    {
      "@type": "WebPageElement",
      "@id": "https://danverse.ai/#showcase",
      name: "Selected Work Section",
      url: "https://danverse.ai/#showcase",
    },
    {
      "@type": "WebPageElement",
      "@id": "https://danverse.ai/#process",
      name: "Process Section",
      url: "https://danverse.ai/#process",
    },
    {
      "@type": "WebPageElement",
      "@id": "https://danverse.ai/#proof",
      name: "Proof Section",
      url: "https://danverse.ai/#proof",
    },
  ],
  potentialAction: {
    "@type": "ContactAction",
    name: "Start the brief",
    target: "https://wa.me/201207346648",
  },
} as const

export default function Page() {
  return (
    <>
      <div className="min-h-[100dvh] text-white">
        <SiteHeader />
        <Hero />
        <CinematicShowcase />
        <ProcessSection />
        <ProofSection />
        <BriefQualifier />
        <AppverseFooter />
        <ScrollToTop />
      </div>

      <JsonLd id="process-structured-data" data={PROCESS_STRUCTURED_DATA} />
      <JsonLd id="page-structured-data" data={PAGE_STRUCTURED_DATA} />
    </>
  )
}
