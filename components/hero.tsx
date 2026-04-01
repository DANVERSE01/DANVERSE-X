"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HeroMediaCard, type HeroMediaItem } from "@/components/hero-media-card"
import { HoverLift } from "@/components/hover-lift"
import { createWhatsAppUrl } from "@/lib/env"

const HERO_MEDIA: HeroMediaItem[] = [
  {
    title: "Desire on Screen",
    eyebrow: "Luxury / Macro",
    sub: "Luxury product worlds staged with the weight and restraint of a real campaign.",
    videoSrc: "/videos/premium.mp4",
    posterSrc: "/images/hero/1178894778.jpg",
  },
  {
    title: "Speed That Looks Expensive",
    eyebrow: "Beauty / Velocity",
    sub: "High-speed direction that still feels controlled, tactile, and impossible to fake.",
    videoSrc: "/videos/speed.mp4",
    posterSrc: "/images/hero/1178894721.jpg",
  },
  {
    title: "Scroll Stopped. Attention Held.",
    eyebrow: "Social / Vertical",
    sub: "Vertical-first assets built to win the thumb without losing the premium feel.",
    videoSrc: "/videos/social-ready.mp4",
    posterSrc: "/images/hero/1178894835.jpg",
  },
]

const HERO_HEADLINE_LINES: ReadonlyArray<{ text: string; accent?: string }> = [
  { text: "We Build" },
  { text: "Visual" },
  { text: "Advantage" },
]
const HERO_SIGNAL_CHIPS = ["Cinematic Ads", "Brand Systems", "Launch Pages", "AI Content Engines"] as const

const HERO_EASE = [0.16, 1, 0.3, 1] as const
const HERO_LINE_DELAYS = [0.08, 0.18, 0.28] as const

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const reveal = (delay: number, y = 20, duration = 0.5) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay, ease: HERO_EASE },
        }

  const revealLine = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
          animate: { clipPath: "inset(0 0 0% 0)", opacity: 1 },
          transition: { duration: 0.7, delay, ease: HERO_EASE },
        }

  return (
    <section
      id="hero"
      aria-label="Hero introduction"
      className="section-shell relative overflow-x-hidden pt-3 sm:pt-6"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="content-shell relative h-[560px] sm:h-[760px] lg:h-[840px]">
          <motion.div
            className="hero-light-architecture absolute inset-0"
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.97, y: 20 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  transition: { duration: 0.9, delay: 0.1, ease: HERO_EASE },
                })}
          >
            <div className="hero-light-grid" />
            <div className="hero-light-frame" />
            <div className="hero-light-beam" />
            <div className="hero-light-beam hero-light-beam--secondary" />
            <div className="hero-light-scan" />
            <div className="absolute inset-x-[18%] top-[34%] h-px bg-gradient-to-r from-transparent via-white/22 to-transparent" />
            <div className="absolute inset-x-[24%] bottom-[22%] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            <div className="absolute left-[18%] top-[24%] h-[30%] w-px bg-gradient-to-b from-transparent via-[rgba(106,129,255,0.34)] to-transparent" />
            <div className="absolute right-[18%] top-[30%] h-[28%] w-px bg-gradient-to-b from-transparent via-[rgba(198,235,104,0.24)] to-transparent" />
          </motion.div>

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 42%, rgba(6, 8, 14, 0.02) 0%, rgba(6, 8, 14, 0.12) 34%, rgba(6, 8, 14, 0.28) 66%, transparent 84%)",
            }}
          />
        </div>
      </div>

      <div className="content-shell relative z-[2]">
        <div className="mx-auto flex max-w-[1160px] flex-col items-center py-8 text-center sm:py-14 lg:py-16">
          <motion.div
            className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl sm:mb-7 sm:gap-4 sm:px-5"
            {...reveal(0, 18)}
          >
            <span className="h-2 w-2 rounded-full bg-[var(--color-acid-lime)] shadow-[0_0_14px_rgba(198,235,104,0.42)]" />
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/62 sm:text-[10px] sm:tracking-[0.32em]">
              Chapter 01 / Editorial Launch System
            </p>
          </motion.div>

          <div className="grid w-full max-w-[1140px] items-end gap-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,15rem)]">
            <motion.div
              className="hidden rounded-[1.5rem] border border-white/8 bg-[linear-gradient(165deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-4 text-left backdrop-blur-xl lg:block"
              {...reveal(0.16, 18)}
            >
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-acid-lime)]">
                Positioning
              </p>
              <p className="mt-3 text-sm leading-6 text-white/68">
                Director-led systems for luxury, beauty, and launch-driven brands that need cinema and clarity in one
                move.
              </p>
            </motion.div>

            <div className="relative mx-auto flex w-full max-w-full justify-center px-1">
              <h1 className="relative z-10 mx-auto w-full max-w-[11ch] break-normal text-center text-[clamp(2.5rem,10vw,4.8rem)] font-bold leading-[0.88] tracking-[-0.06em] text-white sm:max-w-[10ch] sm:text-[clamp(3.4rem,7.8vw,5.8rem)] lg:max-w-[10.8ch] lg:text-[clamp(4.9rem,6.6vw,7rem)]">
                {HERO_HEADLINE_LINES.map((line, index) => (
                  <motion.span
                    key={line.text}
                    className="block"
                    style={{ willChange: "clip-path, opacity" }}
                    {...revealLine(HERO_LINE_DELAYS[index] ?? HERO_LINE_DELAYS[HERO_LINE_DELAYS.length - 1])}
                  >
                    {line.text}{" "}
                    {line.accent ? (
                      <span className="bg-gradient-to-r from-[var(--color-electric-blue-strong)] to-[var(--color-acid-lime)] bg-clip-text text-transparent">
                        {line.accent}
                      </span>
                    ) : null}
                  </motion.span>
                ))}
              </h1>
            </div>

            <motion.div
              className="hidden rounded-[1.5rem] border border-white/8 bg-[linear-gradient(165deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-4 text-left backdrop-blur-xl lg:block"
              {...reveal(0.22, 18)}
            >
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-electric-blue-strong)]">
                Delivery
              </p>
              <p className="mt-3 text-sm leading-6 text-white/68">
                Campaign films, launch pages, and AI-native production flows shaped as one coherent narrative.
              </p>
            </motion.div>
          </div>

          <motion.p
            className="mx-auto mt-5 max-w-[42ch] text-[clamp(1rem,4vw,1.16rem)] leading-[1.7] text-white/74 sm:mt-7 sm:max-w-[48ch]"
            {...reveal(0.42, 20)}
          >
            Director-led creative systems for brands that need cinema, identity, and launch-readiness to arrive as one
            deliberate experience.
          </motion.p>

          <motion.div
            className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-6 sm:gap-2.5"
            {...reveal(0.48, 18)}
          >
            {HERO_SIGNAL_CHIPS.map((chip) => (
              <div
                key={chip}
                className="accent-chip px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/78"
              >
                {chip}
              </div>
            ))}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/66 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-[var(--color-acid-lime)] shadow-[0_0_14px_rgba(198,235,104,0.45)]" />
              Open for select launches
            </div>
          </motion.div>

          <div className="mt-8 flex w-full max-w-[19rem] flex-col items-center gap-4 sm:mt-9 sm:max-w-none">
            <div className="flex w-full flex-col items-center justify-center gap-3.5 sm:flex-row sm:justify-center">
              <motion.div className="w-full sm:w-auto" {...reveal(0.52, 16)}>
                <HoverLift>
                  <Button
                    asChild
                    size="lg"
                    className="cta-primary w-full rounded-full px-8 py-3 font-semibold tracking-[-0.02em] text-white sm:w-auto"
                  >
                    <a href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                      Start the Brief
                    </a>
                  </Button>
                </HoverLift>
              </motion.div>

              <motion.div className="w-full sm:w-auto" {...reveal(0.6, 16)}>
                <HoverLift>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="cta-secondary w-full rounded-full px-8 py-3 font-semibold tracking-[-0.02em] text-white sm:w-auto"
                  >
                    <a href="#showcase">See the Work</a>
                  </Button>
                </HoverLift>
              </motion.div>
            </div>
          </div>

          <div className="mt-10 w-full sm:mt-14">
            <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-[0.9fr_1.1fr_0.9fr] lg:items-end lg:gap-6">
              {HERO_MEDIA.map((item, index) => (
                <motion.div
                  key={item.title}
                  className={`h-full ${index === 1 ? "lg:-translate-y-6" : index === 0 ? "lg:translate-y-4" : "lg:translate-y-8"}`}
                  {...reveal(0.62 + index * 0.1, 24)}
                >
                  <HeroMediaCard index={index} featured={index === 1} {...item} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
