import { WorkCard } from "@/components/ui/WorkCard"
import { works } from "@/content/work"

export default function WorkPage() {
  return (
    <main className="work-archive">
      <p className="tx-label">TX-02 / ARCHIVE</p>
      <h1 className="section-heading">Work that speaks</h1>
      <div className="work-archive__grid">
        {works.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </div>
    </main>
  )
}
