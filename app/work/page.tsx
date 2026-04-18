import { WorkCard } from "@/components/ui/WorkCard"
import { works } from "@/content/work"

export default function WorkPage() {
  return (
    <main className="work-archive">
      <section className="work-archive__hero">
        <div className="section-kicker">
          <span>[ Archive ]</span>
          <span>Object index</span>
        </div>
        <h1>
          The work
          <br />
          archive
        </h1>
        <p>
          A complete index of released objects, active studies, and campaign systems currently carried by DANVERSE.
        </p>
      </section>
      <div className="work-archive__grid">
        {works.map((work, index) => (
          <WorkCard key={work.slug} work={work} index={index} />
        ))}
      </div>
    </main>
  )
}
