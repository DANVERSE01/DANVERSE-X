import { WorkCard } from "@/components/ui/WorkCard"
import { works } from "@/content/work"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Work Archive — DANVERSE",
  description: "Selected projects showcasing cinematic brand experiences and visual storytelling.",
}

export default function WorkPage() {
  return (
    <section className="work-archive tx-section">
      <div className="section-inner">
        <p className="tx-label">TX-02 / ARCHIVE</p>
        <h1 className="section-heading">Work that speaks</h1>
        <p className="work-archive__subtitle">
          Selected projects across brand identity, motion design, and digital experiences.
        </p>
        <div className="work-archive__grid" style={{ display: "grid", gap: "1.5rem" }}>
          {works.map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </div>
      </div>
    </section>
  )
}
