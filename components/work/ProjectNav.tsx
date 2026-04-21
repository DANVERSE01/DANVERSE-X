"use client"

import Link from "next/link"
import type { WorkItem } from "@/content/work"

interface ProjectNavProps {
  previous: Pick<WorkItem, "slug" | "title" | "category"> | null
  next: Pick<WorkItem, "slug" | "title" | "category"> | null
}

export function ProjectNav({ previous, next }: ProjectNavProps) {
  return (
    <nav className="project-nav" aria-label="Project navigation">
      {previous ? (
        <Link
          href={`/work/${previous.slug}`}
          className="project-nav__cell project-nav__cell--prev"
          data-cursor="text"
        >
          <span className="project-nav__kicker">
            <span aria-hidden="true">←</span> Previous object
          </span>
          <span className="project-nav__title">{previous.title}</span>
          <span className="project-nav__category">{previous.category ?? "Object"}</span>
        </Link>
      ) : (
        <div className="project-nav__cell project-nav__cell--empty" aria-hidden="true" />
      )}
      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="project-nav__cell project-nav__cell--next"
          data-cursor="text"
        >
          <span className="project-nav__kicker">
            Next object <span aria-hidden="true">→</span>
          </span>
          <span className="project-nav__title">{next.title}</span>
          <span className="project-nav__category">{next.category ?? "Object"}</span>
        </Link>
      ) : (
        <div className="project-nav__cell project-nav__cell--empty" aria-hidden="true" />
      )}
    </nav>
  )
}
