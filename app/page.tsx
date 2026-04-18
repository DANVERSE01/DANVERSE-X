import { HeroSection } from "@/app/sections/HeroSection"
import { MarqueeReel } from "@/app/sections/MarqueeReel"
import { AboutCinematic } from "@/app/sections/AboutCinematic"
import { WorkShowcase } from "@/app/sections/WorkShowcase"
import { MotionVault } from "@/app/sections/MotionVault"
import { ExpertiseAccordion } from "@/app/sections/ExpertiseAccordion"
import { ProcessSection } from "@/app/sections/ProcessSection"
import { ContactCinematic } from "@/app/sections/ContactCinematic"
import { FooterBanner } from "@/app/sections/FooterBanner"

export default function Page() {
  return (
    <main id="main-content" className="artifact-page">
      {/* Act 1: entry object */}
      <HeroSection />
      {/* Act 2: threshold */}
      <MarqueeReel />
      {/* Act 3: assembly */}
      <AboutCinematic />
      {/* Act 4: origin objects */}
      <div id="tx-02"><WorkShowcase /></div>
      {/* Act 5: motion archive */}
      <div id="tx-03"><MotionVault /></div>
      {/* Act 6: places */}
      <div id="tx-04"><ExpertiseAccordion /></div>
      {/* Act 7: method */}
      <div id="tx-05"><ProcessSection /></div>
      {/* Act 8: admission */}
      <div id="tx-06"><ContactCinematic /></div>
      {/* Act 9: closing */}
      <FooterBanner />
    </main>
  )
}
