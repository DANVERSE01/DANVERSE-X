"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { emitter } from "@/lib/events"
import { useDanverseStore } from "@/lib/store"
import type { WorkItem } from "@/lib/work"
import { BLUR_DARK } from "@/lib/blur"

export function WorkCard({ work }: { work: WorkItem }) {
  const setCursorState = useDanverseStore((state) => state.setCursorState)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const remoteVideo = work.video?.startsWith("https://") ? work.video : null

  const playVideo = () => {
    if (!videoRef.current) return
    void videoRef.current.play().catch(() => undefined)
  }

  const resetVideo = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  return (
    <Link
      href={`/work/${work.slug}`}
      className="work-card"
      data-cursor="hover-work"
      onMouseEnter={() => {
        emitter.emit("work-hover", { slug: work.slug })
        setCursorState("hover-work")
        playVideo()
      }}
      onMouseLeave={() => {
        emitter.emit("work-hover", { slug: null })
        setCursorState("default")
        resetVideo()
      }}
      onFocus={() => {
        emitter.emit("work-hover", { slug: work.slug })
        setCursorState("hover-work")
        playVideo()
      }}
      onBlur={() => {
        emitter.emit("work-hover", { slug: null })
        setCursorState("default")
        resetVideo()
      }}
    >
      <div className="work-card__media">
        {work.cover ? (
          <Image
            src={work.cover}
            alt={work.title}
            fill
            sizes="(max-width: 959px) 100vw, 420px"
            className="work-card__image"
            quality={90}
            placeholder="blur"
            blurDataURL={BLUR_DARK}
          />
        ) : (
          <div className="work-card__placeholder" />
        )}
        {remoteVideo ? (
          <video
            ref={videoRef}
            className="work-card__video"
            muted
            loop
            playsInline
            preload="none"
            src={remoteVideo}
            aria-hidden="true"
          />
        ) : null}
      </div>
      <div className="work-card__panel">
        <div className="work-card__meta">
          {work.category ? <span>{work.category}</span> : null}
          {work.year ? <span>{work.year}</span> : null}
        </div>
        <h3>{work.title}</h3>
        {work.hook ? <p>{work.hook}</p> : null}
        <div className="work-card__tags">
          {work.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
