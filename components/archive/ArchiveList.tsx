"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import type { WorkItem } from "@/content/work"

interface ArchiveListProps {
  works: WorkItem[]
}

export function ArchiveList({ works }: ArchiveListProps) {
  const [hoverSlug, setHoverSlug] = useState<string | null>(null)
  const hoverWork = works.find((w) => w.slug === hoverSlug) ?? null

  return (
    <div className="archive-list">
      <div className="archive-list__table" role="table" aria-label="Work index">
        <div className="archive-list__row archive-list__row--head" role="row">
          <span role="columnheader">No.</span>
          <span role="columnheader">Title</span>
          <span role="columnheader">Category</span>
          <span role="columnheader">Year</span>
          <span role="columnheader">Duration</span>
          <span role="columnheader" className="archive-list__cell--role">Role</span>
        </div>
        {works.map((work, index) => (
          <Link
            key={work.slug}
            href={`/work/${work.slug}`}
            className="archive-list__row archive-list__row--link"
            role="row"
            onMouseEnter={() => setHoverSlug(work.slug)}
            onMouseLeave={() => setHoverSlug(null)}
            onFocus={() => setHoverSlug(work.slug)}
            onBlur={() => setHoverSlug(null)}
            data-cursor="text"
          >
            <span role="cell" className="archive-list__num">
              {String(index + 1).padStart(3, "0")}
            </span>
            <span role="cell" className="archive-list__title">
              {work.title}
            </span>
            <span role="cell" className="archive-list__meta">{work.category ?? "—"}</span>
            <span role="cell" className="archive-list__meta">{work.year ?? "—"}</span>
            <span role="cell" className="archive-list__meta">{work.duration ?? "—"}</span>
            <span role="cell" className="archive-list__cell--role">
              {(work.roles && work.roles.length > 0 ? work.roles.slice(0, 2).join(" · ") : "—")}
            </span>
          </Link>
        ))}
      </div>

      <aside className="archive-list__preview" aria-live="polite" aria-label="Hover preview">
        {hoverWork?.cover ? (
          <div className="archive-list__preview-media" key={hoverWork.slug}>
            <Image
              src={hoverWork.cover}
              alt=""
              fill
              sizes="(max-width: 1100px) 100vw, 34vw"
              quality={82}
            />
            <div className="archive-list__preview-meta">
              <span>{hoverWork.category}</span>
              <strong>{hoverWork.title}</strong>
            </div>
          </div>
        ) : (
          <div className="archive-list__preview-empty" aria-hidden="true">
            <span>Hover an entry</span>
          </div>
        )}
      </aside>
    </div>
  )
}
