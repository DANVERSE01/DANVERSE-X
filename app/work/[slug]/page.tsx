import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getAllWorkSlugs, getWorkBySlug } from "@/lib/work"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const work = getWorkBySlug(slug)

  if (!work) {
    return { title: "Signal Lost" }
  }

  return {
    title: work.title,
    description: work.hook ?? "DANVERSE work archive",
    openGraph: {
      title: work.title,
      description: work.hook ?? "DANVERSE work archive",
      images: work.cover ? [work.cover] : undefined,
    },
  }
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params
  const work = getWorkBySlug(slug)

  if (!work) {
    notFound()
  }

  return (
    <main className="work-detail">
      <p className="tx-label">TX-02 / CASE FILE</p>
      <div className="work-detail__meta">
        <h1>{work.title}</h1>
        {work.category ? <p>{work.category}</p> : null}
      </div>
      {work.cover ? (
        <div className="work-detail__hero">
          <Image src={work.cover} alt={work.title} fill sizes="(max-width: 959px) 100vw, 1200px" priority />
        </div>
      ) : null}
      <div className="work-detail__copy">
        {work.hook ? (
          <div>
            <strong>Hook</strong>
            <p>{work.hook}</p>
          </div>
        ) : null}
        {work.solution ? (
          <div>
            <strong>Solution</strong>
            <p>{work.solution}</p>
          </div>
        ) : null}
        {work.tags.length ? (
          <div>
            <strong>Tags</strong>
            <p>{work.tags.join(" · ")}</p>
          </div>
        ) : null}
      </div>
    </main>
  )
}
