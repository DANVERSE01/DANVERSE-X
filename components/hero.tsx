"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { HeroMediaCard, type HeroMediaItem } from "@/components/hero-media-card"
import { HoverLift } from "@/components/hover-lift"
import { createWhatsAppUrl } from "@/lib/env"

const HERO_MEDIA: HeroMediaItem[] = [
  {
    title: "Desire on Screen",
    sub: "Crafted to make luxury feel inevitable",
    vimeoId: "1178894778",
    posterSrc: "/images/hero/1178894778.jpg",
  },
  {
    title: "Speed That Looks Expensive",
    sub: "High-speed creative that never looks rushed",
    vimeoId: "1178894721",
    posterSrc: "/images/hero/1178894721.jpg",
  },
  {
    title: "Scroll Stopped. Attention Held.",
    sub: "Built for the feed. Engineered to convert",
    vimeoId: "1178894835",
    posterSrc: "/images/hero/1178894835.jpg",
  },
]

const HERO_HEADLINE_LINES: ReadonlyArray<{ text: string; accent?: string }> = [{ text: "We Build Visual Advantage" }]

const HERO_EASE = [0.16, 1, 0.3, 1] as const
const HERO_LINE_DELAYS = [0.08, 0.18, 0.28] as const

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement | null>(null)
  const logoDriftRef = useRef<HTMLDivElement | null>(null)
  const logoBaseRef = useRef<HTMLDivElement | null>(null)
  const logoGlowRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const hero = heroRef.current
    const logoDrift = logoDriftRef.current
    const logoBase = logoBaseRef.current
    const logoGlow = logoGlowRef.current

    if (!hero || !logoDrift || !logoBase || !logoGlow || prefersReducedMotion) {
      return
    }

    const context = gsap.context(() => {
      gsap.set(logoDrift, {
        transformOrigin: "50% 56%",
        willChange: "transform",
      })
      gsap.set([logoBase, logoGlow], {
        transformOrigin: "50% 56%",
        willChange: "transform, opacity, filter",
      })

      const sweepTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      })

      sweepTimeline
        .to(
          logoDrift,
          {
            x: () => window.innerWidth * 0.08,
            y: () => window.innerHeight * 0.18,
            rotate: 8,
            scale: 1.08,
            ease: "none",
          },
          0
        )
        .to(
          logoBase,
          {
            x: () => window.innerWidth * -0.024,
            y: () => window.innerHeight * 0.055,
            rotate: -5,
            scale: 1.035,
            opacity: 0.66,
            ease: "none",
          },
          0
        )
        .to(
          logoGlow,
          {
            x: () => window.innerWidth * 0.12,
            y: () => window.innerHeight * 0.23,
            rotate: 13,
            scale: 1.18,
            opacity: 0.6,
            filter: "blur(34px) saturate(1.24) brightness(1.08)",
            ease: "none",
          },
          0
        )
    }, hero)

    return () => {
      context.revert()
    }
  }, [prefersReducedMotion])

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
      ref={heroRef}
      aria-label="Hero introduction"
      className="section-shell relative overflow-hidden pt-4 sm:pt-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[640px] sm:h-[720px] lg:h-[800px]"
      >
        <div
          className="absolute left-[55%] top-[49%] h-[min(126vw,820px)] w-[min(126vw,820px)] -translate-x-1/2 -translate-y-1/2 sm:left-[57%] sm:top-[49%] sm:h-[min(104vw,980px)] sm:w-[min(104vw,980px)] lg:left-[59%] lg:top-[50%] lg:h-[min(82vw,1180px)] lg:w-[min(82vw,1180px)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="relative h-full w-full"
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.84, y: 56, rotate: -8 },
                  animate: { opacity: 1, scale: 1, y: 0, rotate: 0 },
                  transition: { duration: 1.05, delay: 0.14, ease: HERO_EASE },
                })}
          >
            <div ref={logoDriftRef} className="relative h-full w-full">
              <div
                ref={logoGlowRef}
                className="absolute inset-0 opacity-[0.34] mix-blend-screen sm:opacity-[0.42] lg:opacity-[0.48]"
                style={{
                  filter: "blur(26px) saturate(1.18) brightness(1.06)",
                }}
              >
                <Image
                  src="/images/hero/hero-backdrop-logo.png"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 640px) 126vw, (max-width: 1024px) 104vw, 82vw"
                  className="object-contain"
                />
              </div>

              <div
                ref={logoBaseRef}
                className="absolute inset-0 opacity-[0.5] sm:opacity-[0.56] lg:opacity-[0.6]"
                style={{
                  filter:
                    "saturate(1.14) contrast(1.18) brightness(0.98) drop-shadow(0 0 28px rgba(40, 109, 255, 0.16)) drop-shadow(0 0 54px rgba(210, 255, 58, 0.12))",
                }}
              >
                <Image
                  src="/images/hero/hero-backdrop-logo.png"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 640px) 126vw, (max-width: 1024px) 104vw, 82vw"
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="content-shell relative z-[2]">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center py-10 text-center sm:py-14 lg:py-16">
          <motion.div className="mb-6 inline-flex items-center gap-3 sm:mb-7" {...reveal(0, 18)}>
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent via-white/42 to-white/8" />
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/60">
              Cinematic Systems. Commercial Results.
            </p>
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent via-white/42 to-white/8" />
          </motion.div>

          <div className="relative mx-auto flex w-full justify-center">
            <h1 className="relative z-10 mx-auto max-w-full text-center text-[clamp(3.6rem,7.8vw,6.8rem)] font-extrabold leading-[0.88] tracking-[-0.06em] text-white">
              {HERO_HEADLINE_LINES.map((line, index) => (
                <motion.span
                  key={line.text}
                  className="block"
                  style={{ willChange: "clip-path, opacity" }}
                  {...revealLine(HERO_LINE_DELAYS[index] ?? HERO_LINE_DELAYS[HERO_LINE_DELAYS.length - 1])}
                >
                  {line.text}{" "}
                  {line.accent ? (
                    <span className="bg-gradient-to-r from-[var(--color-electric-blue-strong)] to-[var(--color-hot-pink-strong)] bg-clip-text text-transparent">
                      {line.accent}
                    </span>
                  ) : null}
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.p
            className="mx-auto mt-7 max-w-[42ch] text-[clamp(1rem,1.4vw,1.12rem)] leading-[1.65] text-white/65"
            {...reveal(0.42, 20)}
          >
            Every frame deliberate. Every asset launch-ready
          </motion.p>

          <div className="mt-9 flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <motion.div {...reveal(0.52, 16)}>
                <HoverLift>
                  <Button asChild size="lg" className="cta-primary rounded-full px-8 py-3 font-medium text-white">
                    <a href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                      Start the Brief
                    </a>
                  </Button>
                </HoverLift>
              </motion.div>

              <motion.div {...reveal(0.6, 16)}>
                <HoverLift>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="cta-secondary rounded-full px-8 py-3 text-white"
                  >
                    <a href="#showcase">See the Work</a>
                  </Button>
                </HoverLift>
              </motion.div>
            </div>
          </div>

          <div className="mt-14 w-full">
            <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {HERO_MEDIA.map((item, index) => (
                <motion.div key={item.title} className="h-full" {...reveal(0.62 + index * 0.1, 24)}>
                  <HeroMediaCard index={index} {...item} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
