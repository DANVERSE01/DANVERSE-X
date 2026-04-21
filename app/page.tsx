import { HeroSection } from "@/app/sections/HeroSection"
import { KineticStatement } from "@/app/sections/KineticStatement"
import { WorkShowcase } from "@/app/sections/WorkShowcase"
import { AboutCinematic } from "@/app/sections/AboutCinematic"
import { MotionVault } from "@/app/sections/MotionVault"
import { ExpertiseTimeline } from "@/app/sections/ExpertiseTimeline"
import { ProcessSection } from "@/app/sections/ProcessSection"
import { ContactCinematic } from "@/app/sections/ContactCinematic"
import { AtmosphericHold } from "@/app/sections/AtmosphericHold"

export default function Page() {
  return (
    <main id="main-content" className="artifact-page">
      {/* 01 — Entry */}
      <HeroSection />
      {/* 02 — Thesis */}
      <KineticStatement />
      {/* 03 — Selected works */}
      <div id="chapter-works"><WorkShowcase /></div>
      {/* 04 — Identity */}
      <div id="chapter-identity"><AboutCinematic /></div>
      {/* 05 — Motion vault */}
      <div id="chapter-motion"><MotionVault /></div>
      {/* 06 — Discipline */}
      <div id="chapter-expertise"><ExpertiseTimeline /></div>
      {/* 07 — Method */}
      <div id="chapter-process"><ProcessSection /></div>
      {/* 08 — Admission */}
      <div id="chapter-contact"><ContactCinematic /></div>
      {/* 09 — Close */}
      <AtmosphericHold />
    </main>
  )
}
