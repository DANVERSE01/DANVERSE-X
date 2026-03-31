"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import { ArrowUpRight, Clapperboard, Rocket, Sparkles, type LucideIcon } from "lucide-react"
import { gsap } from "gsap"

type ProcessStep = {
  number: string
  label: string
  title: string
  description: string
  outcome: string
  tags: string[]
  accent: "lime" | "lavender" | "coral"
  icon: LucideIcon
  visual: "brief" | "build" | "launch"
  surface: string
}

const HEADLINE_WORDS = ["Built", "Like", "A", "Campaign", "Studio."]

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    label: "Brief Architecture",
    title: "Strategy Lock",
    description:
      "We sharpen the brief into a clear creative position: offer, audience tension, script angle, reference direction, and the visual standards the work has to meet before production starts.",
    outcome: "A signed-off direction board with script logic, platform priorities, and a clear taste level.",
    tags: ["Positioning", "Narrative Direction", "Reference System"],
    accent: "lime",
    icon: Sparkles,
    visual: "brief",
    surface: "linear-gradient(135deg, rgba(12,14,18,0.98) 0%, rgba(14,22,40,0.94) 42%, rgba(7,8,12,0.98) 100%)",
  },
  {
    number: "02",
    label: "Production Engine",
    title: "Frame & Build",
    description:
      "We build the campaign language itself: scenes, motion tests, lighting logic, edit rhythm, typography, and the AI-assisted production pipeline behind the final execution.",
    outcome: "Polished assets that already feel release-ready before the final export pass.",
    tags: ["Scene Design", "Motion Language", "Finish System"],
    accent: "lavender",
    icon: Clapperboard,
    visual: "build",
    surface: "linear-gradient(135deg, rgba(9,15,34,0.98) 0%, rgba(18,30,58,0.94) 42%, rgba(10,10,14,0.98) 100%)",
  },
  {
    number: "03",
    label: "Launch Delivery",
    title: "Ship & Scale",
    description:
      "We hand off masters, vertical cuts, paid-social ratios, stills, covers, and rollout guidance so your team can launch quickly and extend the campaign cleanly across channels.",
    outcome: "A complete launch pack built to publish now and scale into the next wave without rebuilding from zero.",
    tags: ["Platform Ratios", "Launch Pack", "Scale Assets"],
    accent: "coral",
    icon: Rocket,
    visual: "launch",
    surface: "linear-gradient(135deg, rgba(18,10,28,0.98) 0%, rgba(38,16,52,0.94) 46%, rgba(8,9,14,0.98) 100%)",
  },
]

const ACCENT_COLOR: Record<ProcessStep["accent"], string> = {
  lime: "var(--color-lime)",
  lavender: "var(--color-hot-pink)",
  coral: "var(--color-electric-blue-strong)",
}

const PANEL_SHAPES: CSSProperties[] = [
  { clipPath: "polygon(18% 0%, 100% 8%, 82% 100%, 0% 92%)" },
  { clipPath: "polygon(0% 10%, 84% 0%, 100% 90%, 16% 100%)" },
  { clipPath: "polygon(12% 0%, 100% 18%, 88% 100%, 0% 82%)" },
]

export function Pricing() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const headlineRef = useRef<HTMLHeadingElement | null>(null)
  const cardsWrapRef = useRef<HTMLDivElement | null>(null)
  const wordRefs = useRef<HTMLSpanElement[]>([])
  const cardRefs = useRef<HTMLElement[]>([])
  const visualRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    let cancelled = false

    const ctx = gsap.context(() => {
      const words = wordRefs.current.filter(Boolean)
      const cards = cardRefs.current.filter(Boolean)
      const visuals = visualRefs.current.filter(Boolean)

      const setReducedState = () => {
        gsap.set(words, { yPercent: 0, opacity: 1 })
        gsap.set(cards, { y: 0, opacity: 1 })
        gsap.set(visuals, { x: 0, opacity: 1, scale: 1 })
      }

      if (prefersReducedMotion) {
        setReducedState()
        return
      }

      const animateIn = () => {
        if (cancelled) return

        gsap.set(words, { yPercent: 112, opacity: 0.18 })
        gsap.set(cards, { y: 56, opacity: 0 })
        gsap.set(visuals, { x: 36, opacity: 0, scale: 0.96 })

        gsap.to(words, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
            once: true,
          },
        })

        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.16,
          scrollTrigger: {
            trigger: cardsWrapRef.current,
            start: "top 85%",
            once: true,
          },
        })

        gsap.to(visuals, {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.16,
          scrollTrigger: {
            trigger: cardsWrapRef.current,
            start: "top 85%",
            once: true,
          },
        })
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
      className="section-shell relative isolate bg-transparent text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[-12rem] top-8 h-[28rem] w-[28rem] rounded-full blur-[150px]"
          style={{ background: "rgba(49,93,255,0.16)" }}
        />
        <div
          className="absolute right-[-10rem] top-[18rem] h-[24rem] w-[24rem] rounded-full blur-[140px]"
          style={{ background: "rgba(255,47,146,0.15)" }}
        />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 18%, rgba(255,47,146,0.06) 55%, rgba(49,93,255,0.08) 100%)",
          }}
        />
      </div>

      <div className="content-shell relative py-[var(--section-block)]">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="section-label">The Process</p>
            <h2
              id="process-heading"
              ref={headlineRef}
              className="section-heading mt-5 flex max-w-5xl flex-wrap gap-x-4 gap-y-2 text-[2.7rem] leading-[0.96] text-white sm:text-[4.3rem] lg:text-[5.5rem]"
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

            <p className="body-copy mt-6 max-w-3xl text-base leading-8 sm:text-lg">
              Every project moves through a compact studio system: we lock the idea, build the image language, then
              deliver a rollout-ready package that can launch immediately without losing the brand.
            </p>
          </div>

          <div ref={cardsWrapRef} className="mt-12 space-y-6 sm:mt-14">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon
              const accent = ACCENT_COLOR[step.accent]

              return (
                <article
                  key={step.number}
                  ref={(element) => {
                    if (element) cardRefs.current[index] = element
                  }}
                  className="process-banner group relative overflow-hidden rounded-[2rem] border border-white/10 text-white sm:rounded-[2.4rem]"
                  style={{ background: step.surface }}
                >
                  <div
                    className="absolute inset-0 opacity-90"
                    style={{
                      background:
                        "radial-gradient(circle at top left, rgba(255,255,255,0.08) 0%, transparent 32%), radial-gradient(circle at bottom right, rgba(255,255,255,0.04) 0%, transparent 28%)",
                    }}
                  />
                  <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

                  <div className="relative grid gap-8 px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-10 lg:px-10 lg:py-10">
                    <div className="flex h-full flex-col">
                      <div className="flex items-center gap-4">
                        <span
                          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/25"
                          style={{ color: accent, boxShadow: `0 0 24px ${accent}22` }}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="section-label text-[0.68rem]">Stage {step.number}</p>
                          <p className="mt-1 text-[0.72rem] uppercase tracking-[0.28em] text-white/40">{step.label}</p>
                        </div>
                      </div>

                      <h3 className="mt-8 max-w-[11ch] text-[clamp(2.2rem,5vw,4.7rem)] font-extrabold leading-[0.94] tracking-[-0.05em] text-white">
                        {step.title}
                      </h3>

                      <p className="body-copy mt-5 max-w-2xl text-base leading-8 sm:text-lg">{step.description}</p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-8">
                        <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-4 backdrop-blur-sm sm:p-5">
                          <div className="flex items-start gap-3">
                            <span
                              className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30"
                              style={{ color: accent }}
                            >
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                            <p className="text-sm leading-7 text-white/80 sm:text-[0.97rem]">
                              <span className="font-semibold text-white">Outcome:</span> {step.outcome}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      ref={(element) => {
                        if (element) visualRefs.current[index] = element
                      }}
                      className="process-banner-visual relative min-h-[270px] lg:min-h-[360px]"
                      aria-hidden="true"
                    >
                      {renderVisual(step)}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function renderVisual(step: ProcessStep) {
  switch (step.visual) {
    case "brief":
      return <BriefVisual />
    case "build":
      return <BuildVisual />
    case "launch":
      return <LaunchVisual />
    default:
      return null
  }
}

function BriefVisual() {
  return (
    <>
      <div className="absolute inset-y-5 left-0 w-[64%] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5 backdrop-blur-sm">
        <div className="inline-flex rounded-full bg-[var(--color-lime)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--color-bg)]">
          Danverse Method
        </div>
        <div className="mt-5 space-y-3">
          {["Hook first", "Taste locked", "Frame references aligned"].map((item) => (
            <div
              key={item}
              className="rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-sm font-medium text-white/80"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-[12%] top-2 h-[74%] w-[36%] -rotate-[14deg] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03))]">
        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_20%,rgba(49,93,255,0.24),transparent_42%)]" />
        <div className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.24em] text-white/60">Offer</div>
        <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-[rgba(49,93,255,0.58)] to-transparent" />
      </div>

      <div className="absolute bottom-1 right-0 h-[56%] w-[42%] rotate-[8deg] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))]">
        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_60%_25%,rgba(255,47,146,0.22),transparent_42%)]" />
        <div className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.24em] text-white/60">Visual Tone</div>
        <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-[rgba(255,47,146,0.52)] to-transparent" />
      </div>
    </>
  )
}

function BuildVisual() {
  const sliceHeights = ["72%", "100%", "82%"]
  const sliceLabels = ["Shot / Light", "Motion / Pace", "Grade / Finish"]

  return (
    <>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[clamp(3.4rem,8vw,6rem)] font-black tracking-[-0.08em] text-white/[0.05]">
        FRAME
      </div>

      <div className="absolute inset-y-2 right-0 left-[16%] flex items-end gap-4">
        {sliceLabels.map((label, index) => (
          <div
            key={label}
            className="relative flex-1 overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))]"
            style={{
              ...PANEL_SHAPES[index],
              height: sliceHeights[index],
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(160,224,255,0.22),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(8,14,20,0.55))]" />
            <div className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.24em] text-white/60">{label}</div>
            <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-[rgba(255,47,146,0.52)] via-white/20 to-transparent" />
          </div>
        ))}
      </div>
    </>
  )
}

function LaunchVisual() {
  const ratios = [
    { value: "9:16", label: "Reels" },
    { value: "1:1", label: "Paid" },
    { value: "16:9", label: "Hero" },
  ]

  return (
    <div className="absolute inset-0 flex items-end">
      <div className="w-full rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <div className="grid grid-cols-3 gap-2 rounded-[1.2rem] border border-white/10 bg-black/20 p-3">
            {ratios.map((ratio) => (
              <div key={ratio.value} className="text-center">
                <div className="text-lg font-extrabold leading-none text-white">{ratio.value}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/50">{ratio.label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 sm:text-white/50">
              Ready across paid, social, launch pages, and internal handoff
            </p>
            <p className="mt-2 text-lg font-semibold leading-7 text-white">
              Masters, cutdowns, cover frames, stills, and rollout logic delivered as one launch-ready pack.
            </p>
          </div>

          <div className="inline-flex items-center justify-center rounded-full bg-[var(--color-electric-blue-strong)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(49,77,255,0.22)]">
            Launch Pack
          </div>
        </div>
      </div>
    </div>
  )
}
