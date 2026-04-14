import { Hero } from "@/components/sections/Hero"
import { MarqueeReel } from "@/components/sections/MarqueeReel"
import { Work } from "@/components/sections/Work"
import { Services } from "@/components/sections/Services"
import { Process } from "@/components/sections/Process"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"

export default function Page() {
  return (
    <main className="page-shell">
      {/* Act 1 — Identity statement */}
      <Hero />
      {/* Act 2 — Scrolling brand reel */}
      <MarqueeReel />
      {/* Act 3-5 — Work, capabilities, process */}
      <Work />
      <Services />
      <Process />
      {/* Act 6-7 — Contact + footer */}
      <Contact />
      <Footer />
    </main>
  )
}
