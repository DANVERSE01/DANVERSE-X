"use client"

import LazyVideo from "@/components/lazy-video"
import { HoverLift } from "@/components/hover-lift"

export interface HeroMediaItem {
  posterSrc?: string
  title: string
  sub: string
  videoSrc: string
}

export function HeroMediaCard({ posterSrc, sub, title, videoSrc }: HeroMediaItem) {
  return (
    <HoverLift className="relative rounded-[24px] border border-[var(--color-border)] bg-[rgba(13,17,23,0.82)] p-1.5 shadow-[var(--shadow-soft)]">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[20px] bg-black">
        <LazyVideo
          src={videoSrc}
          poster={posterSrc}
          className="absolute inset-0 h-full w-full object-cover"
          autoplay
          loop
          muted
          playsInline
          aria-label={`${title} - ${sub}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,11,16,0.92)] via-transparent to-[rgba(8,11,16,0.14)]" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="mb-1 text-xl font-semibold text-white">{title}</div>
          <p className="body-copy text-xs">{sub}</p>
          <div className="mt-2 inline-flex items-center rounded-full border border-[rgba(245,245,0,0.16)] bg-[rgba(245,245,0,0.08)] px-2 py-0.5 text-[10px] uppercase tracking-[0.24em] text-[var(--color-lime)]">
            DANVERSE
          </div>
        </div>
      </div>
    </HoverLift>
  )
}
