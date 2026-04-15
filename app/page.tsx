import dynamic from "next/dynamic"
import { HeroSection } from "@/app/sections/HeroSection"
import { MarqueeReel } from "@/app/sections/MarqueeReel"
import { AboutCinematic } from "@/app/sections/AboutCinematic"
import { WorkShowcase } from "@/app/sections/WorkShowcase"
import { ProcessSection } from "@/app/sections/ProcessSection"
import { ContactCinematic } from "@/app/sections/ContactCinematic"
import { CapabilitiesGridLazy } from "@/app/components/CapabilitiesGridLazy"

export default function Page() {
  return (
    <main id="main-content" style={{ background: "#050507", overflowX: "clip" }}>
      {/* Act 1 — Identity Statement */}
      <HeroSection />
      {/* Act 2 — Scrolling Brand Reel */}
      <MarqueeReel />
      {/* Act 3 — About + Story */}
      <AboutCinematic />
      {/* Act 4 — Selected Work */}
      <WorkShowcase />
      {/* Act 5 — Capabilities */}
      <CapabilitiesGridLazy />
      {/* Act 6 — Process */}
      <ProcessSection />
      {/* Act 7 — Contact + Footer */}
      <ContactCinematic />
    </main>
  )
}
