import type { Metadata } from "next"
import { WorkCard } from "@/components/ui/WorkCard"
import { MotionVault } from "@/app/sections/MotionVault"
import { works } from "@/content/work"

export const metadata: Metadata = {
  title: "Objects",
  description: "Origin objects from the DANVERSE work archive.",
}

export default function ObjectsPage() {
  return (
    <main className="objects-page">
      <section className="objects-page__hero">
        <div className="section-kicker">
          <span>[ Objects ]</span>
          <span>Released work</span>
        </div>
        <h1>
          Origin
          <br />
          objects
        </h1>
        <p>
          Campaigns, motion systems, product images, and digital surfaces formed inside the assembly and released into circulation.
        </p>
      </section>

      <section className="objects-page__grid">
        {works.map((work, index) => (
          <WorkCard key={work.slug} work={work} index={index} />
        ))}
      </section>

      <MotionVault />
    </main>
  )
}
