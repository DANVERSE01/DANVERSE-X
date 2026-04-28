import { HeroSection } from "@/app/sections/HeroSection"
import { MarqueeReel } from "@/app/sections/MarqueeReel"
import { AboutCinematic } from "@/app/sections/AboutCinematic"
import { WorkShowcase } from "@/app/sections/WorkShowcase"
import { ExpertiseAccordion } from "@/app/sections/ExpertiseAccordion"
import { ProcessSection } from "@/app/sections/ProcessSection"
import { ContactCinematic } from "@/app/sections/ContactCinematic"
import { FooterBanner } from "@/app/sections/FooterBanner"

export default function Page() {
  return (
    <main id="main-content" style={{ background: "var(--ref-bg)", overflowX: "clip" }}>
      {/* Act 1 — Identity Statement */}
      <HeroSection />
      {/* Act 2 — Brand Ticker */}
      <MarqueeReel />
      {/* Act 3 — About + Story */}
      <AboutCinematic />
      {/* Act 4 — Selected Work */}
      <div id="tx-02"><WorkShowcase /></div>
      {/* Act 5 — Expertise */}
      <div id="tx-03"><ExpertiseAccordion /></div>
      {/* Act 6 — Process */}
      <div id="tx-04"><ProcessSection /></div>
      {/* Act 7 — Contact */}
      <div id="tx-05"><ContactCinematic /></div>
      {/* Act 8 — Closing Statement */}
      <FooterBanner />
    </main>
  )
}
