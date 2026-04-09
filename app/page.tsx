import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { AppverseFooter } from "@/components/appverse-footer"
import dynamic from "next/dynamic"

// Lazy load only essential sections to match Wacus rhythm
const CaseStudySpotlight = dynamic(
  () => import("@/components/case-study-spotlight").then((m) => m.CaseStudySpotlight),
  { ssr: false }
)

const Features = dynamic(
  () => import("@/components/features").then((m) => m.Features),
  { ssr: false }
)

export default function HomePage() {
  return (
    <div className="relative bg-black">
      <SiteHeader />
      
      <main id="main-content">
        <Hero />
        
        {/* Wacus-style section spacing and flow */}
        <div className="flex flex-col gap-0">
          <Features />
          <CaseStudySpotlight />
        </div>
      </main>

      <AppverseFooter />
    </div>
  )
}
