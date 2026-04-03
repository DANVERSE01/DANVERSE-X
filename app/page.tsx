import dynamic from "next/dynamic"
import { ScrollToTop } from "./scroll-to-top"
import { BriefQualifier } from "@/components/brief-qualifier"
import { CaseStudySpotlight } from "@/components/case-study-spotlight"
import { Hero } from "@/components/hero"
import { JsonLd } from "@/components/json-ld"
import { SiteHeader } from "@/components/site-header"
import { TrustBand } from "@/components/trust-band"

const Features = dynamic(() => import("@/components/features").then((module) => module.Features), {
  loading: () => <SectionFallback id="features" label="Studio principles" />,
})
const LogoMarquee = dynamic(() => import("@/components/logo-marquee").then((module) => module.LogoMarquee), {
  loading: () => <SectionFallback id="logo-marquee" label="Featured brands" />,
})
const CinematicShowcase = dynamic(
  () => import("@/components/cinematic-showcase").then((module) => module.CinematicShowcase),
  {
    loading: () => <SectionFallback id="showcase" label="Selected work" />,
  }
)
const Pricing = dynamic(() => import("@/components/pricing").then((module) => module.Pricing), {
  loading: () => <SectionFallback id="process" label="Operating model" />,
})
const AppverseFooter = dynamic(() => import("@/components/appverse-footer").then((module) => module.AppverseFooter), {
  loading: () => <SectionFallback id="contact" label="Contact" />,
})

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
      "@id": "https://danverse.ai/#process",
      name: "Process Section",
      url: "https://danverse.ai/#process",
    },
    {
      "@type": "WebPageElement",
      "@id": "https://danverse.ai/#case-files",
      name: "Case Files Section",
      url: "https://danverse.ai/#case-files",
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
        <TrustBand />
        <Features />
        <LogoMarquee />
        <CaseStudySpotlight />
        <CinematicShowcase />
        <Pricing />
        <BriefQualifier />
        <AppverseFooter />
        <ScrollToTop />
      </div>

      <JsonLd id="process-structured-data" data={PROCESS_STRUCTURED_DATA} />
      <JsonLd id="page-structured-data" data={PAGE_STRUCTURED_DATA} />
    </>
  )
}

function SectionFallback({ id, label }: { id: string; label: string }) {
  return (
    <section id={id} aria-busy="true" aria-label={label} className="section-shell py-[var(--section-block)]">
      <div className="content-shell">
        <div className="mx-auto h-32 max-w-[1120px] rounded-[1.75rem] border border-white/8 bg-white/[0.03] backdrop-blur-xl" />
      </div>
    </section>
  )
}
