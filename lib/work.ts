import { works, type WorkItem } from "@/content/work"

export type { WorkItem }

export const featuredWorks = works.filter((work) => work.featured)

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug) ?? null
}

export function getAllWorkSlugs() {
  return works.map((work) => work.slug)
}
