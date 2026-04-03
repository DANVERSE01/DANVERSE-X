"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { HoverLift } from "@/components/hover-lift"
import LazyVideo from "@/components/lazy-video"

export interface HeroMediaItem {
  title: string
  sub: string
  eyebrow?: string
  vimeoId?: string
  videoSrc?: string
  posterSrc: string
}

type HeroMediaCardProps = HeroMediaItem & {
  featured?: boolean
  index?: number
}

export function HeroMediaCard({
  posterSrc,
  sub,
  title,
  eyebrow,
  vimeoId,
  videoSrc,
  featured = false,
  index = 0,
}: HeroMediaCardProps) {
  const frameRef = useRef<HTMLDivElement | null>(null)
  const revealTimeoutRef = useRef<number | null>(null)
  const readyTimeoutRef = useRef<number | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(index === 0 || Boolean(videoSrc))
  const [isLoaded, setIsLoaded] = useState(false)
  const cardIndex = String(index + 1).padStart(2, "0")
  const query = prefersReducedMotion
    ? "background=1&muted=1&autoplay=0&loop=0&autopause=0&quality=1080p&title=0&byline=0&portrait=0&playsinline=1&dnt=1"
    : "background=1&muted=1&autoplay=1&loop=1&autopause=0&quality=1080p&title=0&byline=0&portrait=0&playsinline=1&dnt=1"

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setPrefersReducedMotion(media.matches)

    updatePreference()
    media.addEventListener?.("change", updatePreference)

    return () => {
      media.removeEventListener?.("change", updatePreference)
    }
  }, [])

  useEffect(() => {
    if (videoSrc) {
      return () => {
        if (readyTimeoutRef.current) window.clearTimeout(readyTimeoutRef.current)
      }
    }

    const frame = frameRef.current
    if (!frame) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (index === 0) {
          setShouldLoad(true)
        } else {
          revealTimeoutRef.current = window.setTimeout(() => setShouldLoad(true), 100 + index * 90)
        }
        observer.disconnect()
      },
      { rootMargin: "360px 0px" }
    )

    observer.observe(frame)
    return () => {
      observer.disconnect()
      if (revealTimeoutRef.current) window.clearTimeout(revealTimeoutRef.current)
      if (readyTimeoutRef.current) window.clearTimeout(readyTimeoutRef.current)
    }
  }, [index, videoSrc])

  return (
    <HoverLift
      className={`group relative mx-auto h-full w-full ${featured ? "max-w-[20.5rem] sm:max-w-[370px]" : "max-w-[18.5rem] sm:max-w-[308px]"}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-4 h-14 rounded-full opacity-65 blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:inset-x-10 sm:top-5 sm:h-16"
        style={{
          background:
            featured
              ? "linear-gradient(90deg, rgba(106,129,255,0.24) 0%, rgba(198,235,104,0.18) 100%)"
              : "linear-gradient(90deg, rgba(106,129,255,0.18) 0%, rgba(168,101,133,0.12) 54%, rgba(198,235,104,0.1) 100%)",
        }}
      />

      <article
        className={`flex h-full flex-col rounded-[30px] p-1.5 shadow-[0_34px_90px_rgba(0,0,0,0.36)] ${
          featured
            ? "border border-[rgba(198,235,104,0.18)] bg-[linear-gradient(180deg,rgba(14,18,29,0.96),rgba(9,11,16,0.99))]"
            : "border border-[rgba(152,165,235,0.14)] bg-[linear-gradient(180deg,rgba(11,15,22,0.96),rgba(7,9,13,0.99))]"
        }`}
      >
        <div
          ref={frameRef}
          className={`relative w-full overflow-hidden rounded-[24px] bg-[#05070b] ${featured ? "aspect-[9/14]" : "aspect-[9/15.5]"}`}
        >
          <div
            className={`absolute inset-0 ${
              featured
                ? "bg-[radial-gradient(circle_at_24%_16%,rgba(106,129,255,0.22),transparent_24%),radial-gradient(circle_at_78%_76%,rgba(198,235,104,0.14),transparent_28%),radial-gradient(circle_at_52%_54%,rgba(39,24,36,0.18),transparent_34%)]"
                : "bg-[radial-gradient(circle_at_24%_16%,rgba(106,129,255,0.16),transparent_24%),radial-gradient(circle_at_80%_78%,rgba(168,101,133,0.12),transparent_28%),radial-gradient(circle_at_52%_54%,rgba(198,235,104,0.06),transparent_28%)]"
            }`}
          />
          <Image
            src={posterSrc}
            alt=""
            aria-hidden="true"
            fill
            priority={featured || index === 0}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 42vw, 320px"
            className={`bg-[#05070b] object-cover transition-all duration-700 ease-out ${isLoaded ? "scale-[1.1] blur-xl opacity-0" : "scale-[1.06] opacity-65"}`}
          />
          {videoSrc ? (
            <LazyVideo
              src={videoSrc}
              poster={posterSrc}
              autoplay={!prefersReducedMotion}
              loop
              muted
              playsInline
              eager={featured || index === 0}
              rootMargin={featured || index === 0 ? "0px" : "360px 0px"}
              background="#05070b"
              aria-label={`${title} showcase reel`}
              onReady={() => {
                if (readyTimeoutRef.current) window.clearTimeout(readyTimeoutRef.current)
                readyTimeoutRef.current = window.setTimeout(() => setIsLoaded(true), featured || index === 0 ? 80 : 140)
              }}
              className={`absolute inset-0 h-full w-full scale-[1.04] object-cover transition-all duration-700 ease-out group-hover:scale-[1.065] ${isLoaded ? "opacity-100" : "opacity-0"}`}
            />
          ) : shouldLoad && vimeoId ? (
            <iframe
              title={`${title} showcase reel`}
              src={`https://player.vimeo.com/video/${vimeoId}?${query}`}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              loading={index === 0 ? "eager" : "lazy"}
              tabIndex={-1}
              onLoad={() => {
                if (readyTimeoutRef.current) window.clearTimeout(readyTimeoutRef.current)
                readyTimeoutRef.current = window.setTimeout(() => setIsLoaded(true), 220)
              }}
              className={`absolute inset-0 h-full w-full scale-[1.04] transition-all duration-700 ease-out group-hover:scale-[1.065] ${isLoaded ? "opacity-100" : "opacity-0"}`}
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ border: 0, background: "#05070b" }}
            />
          ) : null}

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,16,0.14)_0%,rgba(7,10,16,0.08)_20%,rgba(7,10,16,0.04)_48%,rgba(7,10,16,0.24)_80%,rgba(7,10,16,0.48)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

          <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2 sm:left-4 sm:top-4">
            <div className="rounded-full border border-white/12 bg-[rgba(8,12,20,0.36)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/68 backdrop-blur-xl sm:px-3 sm:text-[10px] sm:tracking-[0.24em]">
              Frame {cardIndex}
            </div>
            {eyebrow ? (
              <div className="rounded-full border border-white/10 bg-black/22 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/54 backdrop-blur-xl sm:px-3 sm:text-[9px]">
                {eyebrow}
              </div>
            ) : null}
          </div>

          <div className="absolute inset-x-3 bottom-3 h-px bg-gradient-to-r from-[var(--color-electric-blue-strong)] via-white/30 to-[var(--color-acid-lime)] opacity-75 sm:inset-x-4 sm:bottom-4" />
        </div>

        <div className={`flex flex-1 flex-col px-3 pb-3.5 pt-3.5 sm:px-4 sm:pb-4 sm:pt-4 ${featured ? "sm:px-5 sm:pb-5 sm:pt-5" : ""}`}>
          <h3
            className={`max-w-[11ch] font-semibold leading-[0.96] tracking-[-0.04em] text-white ${
              featured
                ? "min-h-[4.8rem] text-[clamp(1.3rem,5.8vw,1.92rem)] sm:min-h-[5.2rem] sm:max-w-[9.8ch]"
                : "min-h-[4.5rem] text-[clamp(1.16rem,5.5vw,1.62rem)] sm:min-h-[4.9rem] sm:max-w-[9.5ch]"
            }`}
          >
            {title}
          </h3>
          <p
            className={`body-copy mt-2 max-w-[22ch] text-white/74 ${
              featured
                ? "min-h-[4.8rem] text-[0.95rem] leading-6 sm:min-h-[5.6rem] sm:max-w-[21ch] sm:text-[1rem] sm:leading-7"
                : "min-h-[4.5rem] text-[0.92rem] leading-6 sm:min-h-[5.25rem] sm:max-w-[20ch] sm:text-[0.98rem] sm:leading-7"
            }`}
          >
            {sub}
          </p>
          <div className="mt-auto pt-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/38 sm:text-[10px]">
              {featured ? "Lead Campaign Frame" : "Supporting Frame"}
            </div>
          </div>
        </div>
      </article>
    </HoverLift>
  )
}
