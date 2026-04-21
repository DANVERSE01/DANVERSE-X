import type { Metadata } from "next"
import { Suspense } from "react"
import { works } from "@/content/work"
import { ArchiveClient } from "./ArchiveClient"

export const metadata: Metadata = {
  title: "Archive — DANVERSE",
  description:
    "A complete index of objects released from the DANVERSE assembly — brand systems, motion campaigns, CGI, and digital surfaces.",
}

export default function WorkPage() {
  return (
    <main className="work-archive">
      <section className="work-archive__hero">
        <span className="eyebrow eyebrow--signal">Archive / {works.length.toString().padStart(2, "0")} objects</span>
        <h1 className="display-severe">
          Object
          <br />
          index
        </h1>
        <p className="work-archive__lead">
          Every project released from the assembly. Filter by discipline, toggle between list and grid — the index remains authored, never generated.
        </p>
      </section>

      <Suspense
        fallback={
          <div className="archive-skeleton" aria-hidden="true">
            <span>Loading index…</span>
          </div>
        }
      >
        <ArchiveClient works={works} />
      </Suspense>
    </main>
  )
}
