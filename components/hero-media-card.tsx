"use client"

import { motion, useReducedMotion } from "framer-motion"
import { HoverLift } from "@/components/hover-lift"

export interface HeroMediaItem {
  title: string
  sub: string
  vimeoId: string
}

type HeroMediaCardProps = HeroMediaItem & {
  index?: number
}

export function HeroMediaCard({ sub, title, vimeoId, index = 0 }: HeroMediaCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const cardIndex = String(index + 1).padStart(2, "0")
  const query = prefersReducedMotion
    ? "background=1&muted=1&autoplay=0&loop=0&autopause=0&dnt=1"
    : "background=1&muted=1&autoplay=1&loop=1&autopause=0&dnt=1"

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
          <iframe
            title={`${title} showcase reel`}
            src={`https://player.vimeo.com/video/${vimeoId}?${query}`}
            allow="autoplay; fullscreen; picture-in-picture"
            loading="lazy"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full scale-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            style={{ border: 0 }}
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,16,0.02)_0%,rgba(7,10,16,0.04)_30%,rgba(7,10,16,0.46)_64%,rgba(7,10,16,0.9)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

          <div className="absolute left-4 top-4 rounded-full border border-white/12 bg-[rgba(8,12,20,0.52)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/72 backdrop-blur-xl">
            Frame {cardIndex}
          </div>

          <div className="absolute inset-x-3 bottom-3 rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,20,0.3),rgba(8,10,18,0.72))] p-4 backdrop-blur-xl shadow-[0_20px_48px_rgba(0,0,0,0.28)]">
            <div className="mb-3 h-[2px] w-16 rounded-full bg-gradient-to-r from-[var(--color-electric-blue-strong)] via-[var(--color-hot-pink-strong)] to-[var(--color-acid-lime)] opacity-85" />
            <div className="max-w-[10ch] text-[clamp(1.55rem,2.4vw,2rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.36)]">
              {title}
            </div>
            <p className="body-copy mt-2 max-w-[18ch] text-sm leading-6 text-white/82">{sub}</p>
            <div className="mt-4 inline-flex items-center rounded-full border border-[rgba(73,107,255,0.28)] bg-[rgba(10,16,32,0.62)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-acid-lime)] shadow-[0_0_24px_rgba(73,107,255,0.14)]">
              DANVERSE Select
            </div>
          </div>
        </div>
      </HoverLift>
    </motion.div>
  )
}
