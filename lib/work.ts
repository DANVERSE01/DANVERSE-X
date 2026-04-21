import { works, type WorkItem } from "@/content/work"

export type { WorkItem }

export const featuredWorks = works.filter((work) => work.featured)

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug) ?? null
}

export function getAllWorkSlugs() {
  return works.map((work) => work.slug)
}

export function getAdjacentWorks(slug: string) {
  const index = works.findIndex((work) => work.slug === slug)
  if (index === -1) {
    return { previous: null, next: null }
  }
  const previous = index > 0 ? works[index - 1] : works[works.length - 1]
  const next = index < works.length - 1 ? works[index + 1] : works[0]
  return { previous, next }
}
