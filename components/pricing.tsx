"use client"

import { useEffect, useRef } from "react"
import { ArrowUpRight, Clapperboard, Rocket, Sparkles, type LucideIcon } from "lucide-react"
import { ProcessVisual } from "@/components/process-visuals"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap"

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

const HEADLINE_WORDS = ["No", "Brief", "Leaves", "Without", "a", "Direction"]

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    label: "Strategy Lock",
    title: "Creative Direction Locked",
    description:
      "Commercial positioning. Creative angle. Visual language. Reference system. Client approval before production begins.",
    outcome: "Locked Creative Brief + Approved Direction Document",
    tags: ["Positioning", "Visual Language", "Director Approval"],
    accent: "lime",
    icon: Sparkles,
    visual: "brief",
    surface: "linear-gradient(135deg, rgba(12,14,18,0.98) 0%, rgba(14,22,40,0.94) 42%, rgba(7,8,12,0.98) 100%)",
  },
  {
    number: "02",
    label: "Frame & Build",
    title: "Production Complete",
    description: "Scene design. Motion language. Color grading. All deliverables finished. Client reviews final output. Director-approved.",
    outcome: "Final Assets Ready for Review + QA Report",
    tags: ["Scene Design", "Motion Control", "Director QA"],
    accent: "lavender",
    icon: Clapperboard,
    visual: "build",
    surface: "linear-gradient(135deg, rgba(9,15,34,0.98) 0%, rgba(18,30,58,0.94) 42%, rgba(10,10,14,0.98) 100%)",
  },
  {
    number: "03",
    label: "Ship & Scale",
    title: "Launch Ready",
    description: "Every platform ratio. Every format. Upload specs. CDN setup. Ready to deploy today. Scale without rebuild.",
    outcome: "Launch Pack + All Ratios + Deployment Guide",
    tags: ["All Platforms", "Ready to Deploy", "Scale System"],
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

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const headlineRevealRef = useScrollReveal<HTMLDivElement>({ y: 28 })

  useEffect(() => {
    const section = sectionRef.current
    const stepsEl = stepsRef.current
    if (!section || !stepsEl || typeof window === "undefined") return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    registerGSAP()

    const steps = Array.from(stepsEl.querySelectorAll<HTMLElement>(".process-banner"))
    if (steps.length === 0) return

    const isCoarse = window.matchMedia("(pointer: coarse)").matches

    if (isCoarse) {
      // Mobile: simple per-step ScrollTrigger, no pin
      const triggers = steps.map((step) => {
        gsap.set(step, { clipPath: "inset(0 0 100% 0)" })
        return ScrollTrigger.create({
          trigger: step,
          start: "top 88%",
          onEnter: () =>
            gsap.to(step, { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "expo.out" }),
          once: true,
        })
      })
      return () => {
        triggers.forEach((t) => t.kill())
        steps.forEach((s) => gsap.set(s, { clearProps: "clipPath" }))
      }
    }

    // Desktop: pin section, reveal steps sequentially
    gsap.set(steps, { clipPath: "inset(0 0 100% 0)" })

    const tl = gsap.timeline()
    steps.forEach((step) => {
      tl.to(step, { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "expo.out" })
    })

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * steps.length}`,
      pin: true,
      scrub: 1,
      animation: tl,
      invalidateOnRefresh: true,
    })

    return () => {
      st.kill()
      tl.kill()
      steps.forEach((s) => gsap.set(s, { clearProps: "clipPath" }))
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="section-shell relative isolate overflow-hidden bg-transparent text-white"
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
        <div className="mx-auto max-w-[1180px]">
          <div ref={headlineRevealRef} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-end">
            <div className="max-w-[54rem]">
              <p className="section-label" data-reveal-item>
                Operating Model
              </p>
              <h2
                id="process-heading"
                className="section-heading mt-4 flex max-w-[11ch] flex-wrap gap-x-2.5 gap-y-2 text-[clamp(2.25rem,9vw,3.9rem)] leading-[0.93] text-white sm:mt-5 sm:gap-x-3.5 sm:gap-y-2.5 sm:text-[4.5rem] lg:text-[5.25rem]"
              >
                {HEADLINE_WORDS.map((word, index) => (
                  <span key={`${word}-${index}`} className="inline-flex overflow-hidden pb-1 sm:pb-3">
                    <span data-reveal-item className="inline-block will-change-transform">
                      {word}
                    </span>
                  </span>
                ))}
              </h2>

              <p
                className="body-copy mt-5 max-w-[46ch] text-[1rem] leading-7 sm:mt-6 sm:text-[1.05rem] sm:leading-8"
                data-reveal-item
              >
                Three stages. One locked direction. Zero wasted rounds.
              </p>
            </div>

            <div className="brand-card rounded-[1.6rem] p-5 text-left sm:p-6" data-reveal-item>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-acid-lime)]">
                Studio Discipline
              </p>
              <p className="mt-3 text-sm leading-7 text-white/68">
                Each stage has a different job: define the angle, build the frame language, then package the launch so
                the team can move without re-briefing.
              </p>
            </div>
          </div>

          <div ref={stepsRef} className="mt-10 space-y-5 sm:mt-14 sm:space-y-6">
            {PROCESS_STEPS.map((step) => {
              const Icon = step.icon
              const accent = ACCENT_COLOR[step.accent]

              return (
                <article
                  key={step.number}
                  className="process-banner group relative overflow-hidden rounded-[1.85rem] border border-white/10 text-white sm:rounded-[2.4rem]"
                  style={{ background: step.surface }}
                >
                  <div className="pointer-events-none absolute right-5 top-4 text-[4.2rem] font-black leading-none tracking-[-0.08em] text-white/[0.04] sm:right-8 sm:top-6 sm:text-[6rem]">
                    {step.number}
                  </div>
                  <div
                    className="absolute inset-0 opacity-90"
                    style={{
                      background:
                        "radial-gradient(circle at top left, rgba(255,255,255,0.08) 0%, transparent 32%), radial-gradient(circle at bottom right, rgba(255,255,255,0.04) 0%, transparent 28%)",
                    }}
                  />
                  <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

                  <div className="relative grid gap-6 px-4 py-5 sm:gap-8 sm:px-8 sm:py-8 lg:grid-cols-[minmax(0,1.06fr)_minmax(340px,0.94fr)] lg:items-center lg:gap-10 lg:px-10 lg:py-10">
                    <div className="flex h-full min-w-0 flex-col">
                      <div className="flex items-center gap-4">
                        <span
                          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/25 sm:h-12 sm:w-12 sm:rounded-2xl"
                          style={{ color: accent, boxShadow: `0 0 24px ${accent}22` }}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="section-label text-[0.68rem]">Stage {step.number}</p>
                          <p className="mt-1 text-[0.72rem] uppercase tracking-[0.28em] text-white/38">{step.label}</p>
                        </div>
                      </div>

                      <h3 className="mt-6 max-w-[11ch] text-[clamp(1.9rem,10vw,3.3rem)] font-extrabold leading-[0.93] tracking-[-0.042em] text-white sm:mt-8 sm:max-w-[10ch] sm:text-[clamp(2.4rem,5vw,4.55rem)]">
                        {step.title}
                      </h3>

                      <p className="body-copy mt-4 max-w-[36ch] text-[0.98rem] leading-7 sm:mt-5 sm:text-[1.03rem] sm:leading-8">
                        {step.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/72 sm:px-4 sm:py-2 sm:text-[0.72rem] sm:tracking-[0.18em]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-6 sm:pt-8">
                        <div className="max-w-[34rem] rounded-[1.35rem] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4 backdrop-blur-sm sm:rounded-[1.6rem] sm:p-5">
                          <div className="flex items-start gap-3">
                            <span
                              className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30"
                              style={{ color: accent }}
                            >
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                            <p className="text-[0.95rem] leading-6 text-white/82 sm:text-[1rem] sm:leading-7">
                              <span className="font-semibold text-white">Outcome:</span> {step.outcome}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="process-banner-visual relative min-h-[220px] sm:min-h-[290px] lg:min-h-[380px]"
                      aria-hidden="true"
                    >
                      <ProcessVisual mode={step.visual} />
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
