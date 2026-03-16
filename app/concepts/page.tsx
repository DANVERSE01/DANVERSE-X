import type { Metadata } from "next"
import { Bebas_Neue, Courier_Prime } from "next/font/google"
import "./globals-concepts.css"
import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { ProjectorOpen } from "@/components/concepts/projector-open"
import { ProblemSection } from "@/components/concepts/problem-section"
import { ScreenplaySection } from "@/components/concepts/screenplay-section"
import { ReelSection } from "@/components/concepts/reel-section"

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" })
const courier = Courier_Prime({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-courier" })

export const metadata: Metadata = {
  title: "Creative Concepts | DANVERSE",
  description: "The craft behind every DANVERSE campaign. The script. The work.",
}

export default function ConceptsPage() {
  return (
    <>
      <div className="grain" aria-hidden="true" />

      <main style={{ background: "#060606", cursor: "none" }} className={`${bebas.variable} ${courier.variable}`}>
        <SiteHeader />
        <ProjectorOpen />
        <ProblemSection />
        <ScreenplaySection />
        <ReelSection />
        <AppverseFooter />
      </main>
    </>
  )
}
