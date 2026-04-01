"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { HoverLift } from "@/components/hover-lift"

export interface HeroMediaItem {
  title: string
  sub: string
  vimeoId: string
  posterSrc: string
}

type HeroMediaCardProps = HeroMediaItem & {
  index?: number
}

export function HeroMediaCard({ posterSrc, sub, title, vimeoId, index = 0 }: HeroMediaCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const frameRef = useRef<HTMLDivElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const cardIndex = String(index + 1).padStart(2, "0")
  const query = prefersReducedMotion
    ? "background=1&muted=1&autoplay=0&loop=0&autopause=0&quality=1080p&title=0&byline=0&portrait=0&playsinline=1&dnt=1"
    : "background=1&muted=1&autoplay=1&loop=1&autopause=0&quality=1080p&title=0&byline=0&portrait=0&playsinline=1&dnt=1"

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        window.setTimeout(() => setShouldLoad(true), index === 0 ? 0 : 100 + index * 90)
        observer.disconnect()
      },
      { rootMargin: "160px 0px" }
    )

    observer.observe(frame)
    return () => observer.disconnect()
  }, [index])

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 26, scale: 0.985 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.58,
        delay: prefersReducedMotion ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full"
    >
      <HoverLift className="group relative mx-auto w-full max-w-[336px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-5 h-16 rounded-full opacity-65 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, rgba(49,93,255,0.24) 0%, rgba(255,47,146,0.16) 54%, rgba(217,255,38,0.14) 100%)",
          }}
        />

        <article className="rounded-[30px] border border-[rgba(92,118,255,0.22)] bg-[linear-gradient(180deg,rgba(10,14,24,0.94),rgba(6,8,14,0.98))] p-1.5 shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
          <div
            ref={frameRef}
            className="relative aspect-[9/16] w-full overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(8,11,18,0.92),rgba(5,7,12,0.98))]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_16%,rgba(49,93,255,0.2),transparent_24%),radial-gradient(circle_at_80%_78%,rgba(255,47,146,0.16),transparent_28%),radial-gradient(circle_at_52%_54%,rgba(217,255,38,0.08),transparent_28%)]" />
            <Image
              src={posterSrc}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 42vw, 320px"
              className={`object-cover transition-all duration-700 ease-out ${isLoaded ? "scale-[1.1] blur-xl opacity-0" : "scale-[1.06] opacity-50"}`}
            />
            {shouldLoad ? (
              <iframe
                title={`${title} showcase reel`}
                src={`https://player.vimeo.com/video/${vimeoId}?${query}`}
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                loading={index === 0 ? "eager" : "lazy"}
                tabIndex={-1}
                onLoad={() => setIsLoaded(true)}
                className={`absolute inset-0 h-full w-full scale-[1.04] transition-all duration-700 ease-out group-hover:scale-[1.065] ${isLoaded ? "opacity-100" : "opacity-0"}`}
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ border: 0 }}
              />
            ) : null}

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,16,0.14)_0%,rgba(7,10,16,0.08)_20%,rgba(7,10,16,0.04)_48%,rgba(7,10,16,0.24)_80%,rgba(7,10,16,0.48)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

            <div className="absolute left-4 top-4 rounded-full border border-white/12 bg-[rgba(8,12,20,0.36)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/68 backdrop-blur-xl">
              Frame {cardIndex}
            </div>

            <div className="absolute inset-x-4 bottom-4 h-px bg-gradient-to-r from-[var(--color-electric-blue-strong)] via-[var(--color-hot-pink-strong)] to-[var(--color-acid-lime)] opacity-75" />
          </div>

          <div className="px-3 pb-4 pt-4 sm:px-4">
            <h3 className="max-w-[9.5ch] text-[clamp(1.35rem,2vw,1.72rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white">
              {title}
            </h3>
            <p className="body-copy mt-2 max-w-[20ch] text-[0.96rem] leading-7 text-white/68">{sub}</p>
          </div>
        </article>
      </HoverLift>
    </motion.div>
  )
}
