import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllWorkSlugs, getWorkBySlug } from "@/lib/work"
import { CaseStudy } from "./CaseStudy"

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

  return <CaseStudy work={work} />
}
