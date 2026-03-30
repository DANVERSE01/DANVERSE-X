"use client"

import { useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

type ProcessStep = {
  number: string
  title: string
  description: string
}

const HEADLINE_WORDS = ["The", "Process"]

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Strategy Lock",
    description: "We define your visual language before a single frame is touched.",
  },
  {
    number: "02",
    title: "Production",
    description: "Cinematic lighting, 3D modelling, color grade - built inside your brand system.",
  },
  {
    number: "03",
    title: "Delivery",
    description: "Final assets. All platform ratios. Source files. Ready on day one.",
  },
]

export function Pricing() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const headlineRef = useRef<HTMLHeadingElement | null>(null)
  const stepsRef = useRef<HTMLDivElement | null>(null)
  const lineFillRef = useRef<HTMLDivElement | null>(null)
  const wordRefs = useRef<HTMLSpanElement[]>([])
  const cardRefs = useRef<HTMLDivElement[]>([])
  const numberShellRefs = useRef<HTMLDivElement[]>([])
  const numberTextRefs = useRef<SVGTextElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.registerPlugin(ScrollTrigger)

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    let cancelled = false

    const ctx = gsap.context(() => {
      const words = wordRefs.current.filter(Boolean)
      const cards = cardRefs.current.filter(Boolean)
      const numberShells = numberShellRefs.current.filter(Boolean)
      const numberTexts = numberTextRefs.current.filter(Boolean)

      const setStrokeState = (revealed: boolean) => {
        numberTexts.forEach((node) => {
          const length = Math.max(node.getComputedTextLength(), 1)
          node.style.strokeDasharray = `${length}`
          node.style.strokeDashoffset = revealed ? "0" : `${length}`
        })
      }

      const setReducedState = () => {
        setStrokeState(true)
        gsap.set(words, { yPercent: 0, opacity: 1 })
        gsap.set(cards, { x: 0, opacity: 1, rotate: 0 })
        gsap.set(numberShells, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0 })
        if (lineFillRef.current) {
          gsap.set(lineFillRef.current, { scaleY: 1, transformOrigin: "top center" })
        }
      }

      if (prefersReducedMotion) {
        const fontReady = document.fonts?.ready
        if (fontReady) {
          fontReady.then(() => {
            if (!cancelled) setReducedState()
          })
        } else {
          setReducedState()
        }
        return
      }

      const animateIn = () => {
        if (cancelled) return

        setStrokeState(false)
        gsap.set(words, { yPercent: 115, opacity: 0.2 })
        gsap.set(cards, { x: -48, opacity: 0, rotate: -1.5 })
        gsap.set(numberShells, { clipPath: "inset(0 100% 0 0)", opacity: 0, y: 36 })

        if (lineFillRef.current) {
          gsap.set(lineFillRef.current, { scaleY: 0, transformOrigin: "top center" })
        }

        gsap.to(words, {
          yPercent: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            once: true,
          },
        })

        gsap.to(cards, {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 74%",
            once: true,
          },
        })

        numberShells.forEach((shell, index) => {
          const stroke = numberTexts[index]
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: shell,
              start: "top 84%",
              once: true,
            },
          })

          timeline.to(shell, {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power4.out",
          })

          if (stroke) {
            timeline.to(
              stroke,
              {
                strokeDashoffset: 0,
                duration: 1.15,
                ease: "power2.out",
              },
              0.05
            )
          }
        })

        if (lineFillRef.current && stepsRef.current) {
          gsap.to(lineFillRef.current, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 76%",
              end: "bottom 26%",
              scrub: 1.1,
            },
          })
        }
      }

      const fontReady = document.fonts?.ready
      if (fontReady) {
        fontReady.then(() => {
          animateIn()
        })
      } else {
        animateIn()
      }
    }, section)

    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="relative isolate overflow-hidden bg-transparent text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[-8rem] top-[-6rem] h-[22rem] w-[22rem] rounded-full blur-[140px]"
          style={{ background: "rgba(224,231,91,0.12)" }}
        />
        <div className="absolute right-[-10rem] top-[8rem] h-[24rem] w-[24rem] rounded-full bg-white/[0.04] blur-[160px]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(224,231,91,0.14) 0%, rgba(224,231,91,0.04) 20%, rgba(224,231,91,0) 82%, rgba(224,231,91,0.1) 100%)",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p
              className="text-[0.68rem] uppercase tracking-[0.42em]"
              style={{ fontFamily: "var(--font-process-body)", color: "rgba(224,231,91,0.72)" }}
            >
              The Process
            </p>
            <h2
              id="process-heading"
              ref={headlineRef}
              className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[2.8rem] font-semibold leading-none sm:text-[4.4rem] lg:text-[5.6rem]"
              style={{ fontFamily: "var(--font-process-display)" }}
            >
              {HEADLINE_WORDS.map((word, index) => (
                <span key={word} className="inline-flex overflow-hidden pb-2 sm:pb-3">
                  <span
                    ref={(element) => {
                      if (element) wordRefs.current[index] = element
                    }}
                    className="inline-block will-change-transform"
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
            <p
              className="mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-lg"
              style={{ fontFamily: "var(--font-process-body)" }}
            >
              A three-step production system built to lock the concept, shape the frame, and ship launch-ready assets
              without breaking the brand.
            </p>
          </div>

          <div ref={stepsRef} className="relative mt-16 sm:mt-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-14 left-8 top-12 w-px sm:left-11 lg:left-[3.25rem]"
            >
              <div className="absolute inset-0 rounded-full" style={{ backgroundColor: "rgba(224,231,91,0.16)" }} />
              <div
                ref={lineFillRef}
                className="absolute inset-0 origin-top scale-y-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(224,231,91,0.2) 0%, rgba(224,231,91,0.8) 55%, rgba(224,231,91,0.16) 100%)",
                  boxShadow: "0 0 18px rgba(224,231,91,0.42)",
                }}
              />
            </div>

            <div className="space-y-8 sm:space-y-12">
              {PROCESS_STEPS.map((step, index) => {
                const gradientId = `process-number-stroke-${step.number}`

                return (
                  <article
                    key={step.number}
                    className="process-step relative grid grid-cols-[4rem_1fr] gap-4 sm:grid-cols-[5.5rem_1fr] sm:gap-8 lg:grid-cols-[6.5rem_1fr]"
                  >
                    <div className="relative flex justify-center pt-4 sm:pt-5">
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-[4.5rem] z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[rgba(5,5,7,0.48)] backdrop-blur-sm sm:top-[5.5rem] lg:top-[6rem]"
                        style={{
                          border: "1px solid rgba(224,231,91,0.55)",
                          boxShadow: "0 0 24px rgba(224,231,91,0.42)",
                        }}
                      />
                      <div
                        ref={(element) => {
                          if (element) numberShellRefs.current[index] = element
                        }}
                        className="process-number-shell relative z-20 w-[5rem] overflow-hidden will-change-transform sm:w-[6.75rem] lg:w-[7.75rem]"
                        style={{ filter: "drop-shadow(0 0 18px rgba(201, 168, 76, 0.14))" }}
                      >
                        <svg viewBox="0 0 320 180" className="h-auto w-full" aria-hidden="true">
                          <defs>
                            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#E0E75B" />
                              <stop offset="100%" stopColor="#BBD54A" />
                            </linearGradient>
                          </defs>
                          <text
                            ref={(element) => {
                              if (element) numberTextRefs.current[index] = element
                            }}
                            x="8"
                            y="144"
                            fill="transparent"
                            stroke={`url(#${gradientId})`}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fontSize="152"
                            style={{
                              fontFamily: "var(--font-process-display)",
                              fontWeight: 800,
                              letterSpacing: "-0.08em",
                            }}
                          >
                            {step.number}
                          </text>
                        </svg>
                      </div>
                    </div>

                    <div
                      ref={(element) => {
                        if (element) cardRefs.current[index] = element
                      }}
                      className="process-card relative overflow-hidden rounded-[1.75rem] border border-[rgba(28,28,38,0.88)] bg-[rgba(17,17,24,0.62)] px-6 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-[22px] will-change-transform sm:px-8 sm:py-9 lg:px-10 lg:py-10"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.12),transparent_38%),radial-gradient(circle_at_left,rgba(255,255,255,0.045),transparent_28%)] opacity-80" />
                      <div className="relative">
                        <div className="flex items-start justify-between gap-6">
                          <div>
                            <p
                              className="text-[0.65rem] uppercase tracking-[0.38em]"
                              style={{ fontFamily: "var(--font-process-body)", color: "rgba(224,231,91,0.72)" }}
                            >
                              Stage {step.number}
                            </p>
                            <h3
                              className="mt-4 text-2xl font-semibold leading-none text-white sm:text-[2rem] lg:text-[2.35rem]"
                              style={{ fontFamily: "var(--font-process-display)" }}
                            >
                              {step.title}
                            </h3>
                          </div>
                          <span
                            className="mt-1 rounded-full border border-white/10 bg-white/[0.03] p-3"
                            style={{ color: "rgba(224,231,91,0.82)" }}
                          >
                            <ArrowUpRight className="h-5 w-5" />
                          </span>
                        </div>

                        <p
                          className="mt-8 max-w-3xl text-base leading-8 text-white/72 sm:text-lg"
                          style={{ fontFamily: "var(--font-process-body)" }}
                        >
                          {step.description}
                        </p>

                        <div
                          className="mt-8 h-px w-full"
                          style={{
                            background:
                              "linear-gradient(to right, rgba(224,231,91,0.45), rgba(255,255,255,0.08), transparent)",
                          }}
                        />
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
