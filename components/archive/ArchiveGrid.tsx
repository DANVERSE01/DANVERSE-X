"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"
import type { WorkItem } from "@/content/work"

interface ArchiveGridProps {
  works: WorkItem[]
}

function GridCard({ work, index }: { work: WorkItem; index: number }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const onEnter = () => {
    videoRef.current?.play().catch(() => undefined)
  }
  const onLeave = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  return (
    <Link
      href={`/work/${work.slug}`}
      className="archive-card"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      data-cursor="text"
    >
      <div className="archive-card__media">
        {work.cover ? (
          <Image
            src={work.cover}
            alt=""
            fill
            sizes="(max-width: 1100px) 100vw, 50vw"
            quality={82}
          />
        ) : (
          <div className="archive-card__placeholder" aria-hidden="true" />
        )}
        {work.video ? (
          <video
            ref={videoRef}
            src={work.video}
            muted
            loop
            playsInline
            preload="none"
            poster={work.cover ?? undefined}
          />
        ) : null}
      </div>
      <div className="archive-card__body">
        <span className="archive-card__num">{String(index + 1).padStart(3, "0")}</span>
        <h3 className="archive-card__title">{work.title}</h3>
        <div className="archive-card__meta">
          <span>{work.category ?? "—"}</span>
          <span>{work.year ?? "—"}</span>
        </div>
      </div>
    </Link>
  )
}

export function ArchiveGrid({ works }: ArchiveGridProps) {
  return (
    <div className="archive-grid">
      {works.map((work, index) => (
        <GridCard key={work.slug} work={work} index={index} />
      ))}
    </div>
  )
}
