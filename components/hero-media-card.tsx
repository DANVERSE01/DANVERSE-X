"use client"

import { motion, useReducedMotion } from "framer-motion"
import LazyVideo from "@/components/lazy-video"
import { HoverLift } from "@/components/hover-lift"

export interface HeroMediaItem {
  posterSrc?: string
  title: string
  sub: string
  videoSrc: string
}

type HeroMediaCardProps = HeroMediaItem & {
  index?: number
}

export function HeroMediaCard({ posterSrc, sub, title, videoSrc, index = 0 }: HeroMediaCardProps) {
  const prefersReducedMotion = useReducedMotion()

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
      <HoverLift className="group relative mx-auto w-full max-w-[320px] rounded-[28px] border border-[rgba(99,117,255,0.18)] bg-[linear-gradient(180deg,rgba(12,16,28,0.96),rgba(7,9,15,0.94))] p-1.5 shadow-[0_28px_90px_rgba(0,0,0,0.26)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-3 h-16 rounded-full opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, rgba(49,93,255,0.22) 0%, rgba(255,47,146,0.16) 52%, rgba(217,255,38,0.12) 100%)",
          }}
        />

        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[22px] bg-black">
          <LazyVideo
            src={videoSrc}
            poster={posterSrc}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            autoplay
            loop
            muted
            playsInline
            aria-label={`${title} - ${sub}`}
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,16,0.08)_0%,rgba(7,10,16,0.08)_30%,rgba(7,10,16,0.56)_64%,rgba(7,10,16,0.95)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="mb-3 h-[2px] w-16 rounded-full bg-gradient-to-r from-[var(--color-electric-blue-strong)] via-[var(--color-hot-pink-strong)] to-[var(--color-acid-lime)] opacity-85" />
            <div className="text-[clamp(1.7rem,2.8vw,2.1rem)] font-semibold leading-none tracking-[-0.05em] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.36)]">
              {title}
            </div>
            <p className="body-copy mt-2 max-w-[18ch] text-sm leading-6 text-white/72">{sub}</p>
            <div className="mt-4 inline-flex items-center rounded-full border border-[rgba(49,93,255,0.24)] bg-[rgba(10,16,32,0.62)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-acid-lime)] shadow-[0_0_24px_rgba(49,93,255,0.12)]">
              DANVERSE
            </div>
          </div>
        </div>
      </HoverLift>
    </motion.div>
  )
}
