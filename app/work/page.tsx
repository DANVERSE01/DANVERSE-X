import type { Metadata } from "next"
import { WorkCard } from "@/components/ui/WorkCard"
import { works } from "@/content/work"

export const metadata: Metadata = {
  title: "Objects — DANVERSE",
  description: "A complete index of objects released from the DANVERSE assembly. Brand systems, motion campaigns, CGI, and digital surfaces.",
}

export default function WorkPage() {
  const released = works.filter((w) => w.cover || w.gallery.length > 0)
  const all = works

  return (
    <main className="work-archive">
      <section className="work-archive__hero">
        <div className="section-kicker">
          <span>[ Archive ]</span>
          <span>Origin objects / {all.length.toString().padStart(2, "0")}</span>
        </div>
        <h1>
          Object
          <br />
          index
        </h1>
        <p>
          Every project released from the assembly. Brand systems, motion campaigns, CGI, and digital surfaces — each one formed under its own conditions.
        </p>
      </section>
      <div className="work-archive__grid">
        {all.map((work, index) => (
          <WorkCard key={work.slug} work={work} index={index} />
        ))}
      </div>
    </main>
  )
}
