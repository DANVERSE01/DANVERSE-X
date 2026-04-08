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
  accent: string
  icon: LucideIcon
  visual: "brief" | "build" | "launch"
  tone: string
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    label: "Brief architecture",
    title: "Strategy lock",
    description:
      "We extract the real commercial problem, set the creative angle, and decide the visual standard before a single frame is built.",
    outcome: "A locked creative position instead of a loose stack of references.",
    tags: ["Positioning", "Narrative direction", "Reference system"],
    accent: "var(--color-electric-blue)",
    icon: Sparkles,
    visual: "brief",
    tone: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01) 20%, transparent 100%)",
  },
  {
    number: "02",
    label: "Production engine",
    title: "Frame and build",
    description:
      "Scene by scene and shot by shot, the motion language gets decided before it ever has a chance to drift in revision.",
    outcome: "Assets that already feel finished before they hit the final render queue.",
    tags: ["Scene design", "Motion language", "Finish system"],
    accent: "var(--color-acid-lime)",
    icon: Clapperboard,
    visual: "build",
    tone: "linear-gradient(180deg, rgba(141,121,255,0.08), rgba(255,255,255,0.01) 22%, transparent 100%)",
  },
  {
    number: "03",
    label: "Launch delivery",
    title: "Ship and scale",
    description:
      "Everything the team needs to launch now and scale later ships together, so rollout speed never comes from cutting corners.",
    outcome: "One pack, every ratio, no rebuild required for launch pressure.",
    tags: ["Platform ratios", "Launch pack", "Scale assets"],
    accent: "var(--color-hot-pink)",
    icon: Rocket,
    visual: "launch",
    tone: "linear-gradient(180deg, rgba(240,113,69,0.08), rgba(255,255,255,0.01) 22%, transparent 100%)",
  },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const headlineRevealRef = useScrollReveal<HTMLDivElement>({ y: 22 })

  useEffect(() => {
    const section = sectionRef.current
    const stepsElement = stepsRef.current
    if (!section || !stepsElement || typeof window === "undefined") return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    registerGSAP()

    const steps = Array.from(stepsElement.querySelectorAll<HTMLElement>(".process-banner"))
    if (steps.length === 0) return

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches

    if (isCoarsePointer) {
      const triggers = steps.map((step) => {
        gsap.set(step, { clipPath: "inset(0 0 100% 0)" })
        return ScrollTrigger.create({
          trigger: step,
          start: "top 88%",
          onEnter: () => {
            gsap.to(step, { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "expo.out" })
          },
          once: true,
        })
      })

      return () => {
        triggers.forEach((trigger) => trigger.kill())
        steps.forEach((step) => gsap.set(step, { clearProps: "clipPath" }))
      }
    }

    gsap.set(steps, { clipPath: "inset(0 0 100% 0)" })

    const timeline = gsap.timeline()
    steps.forEach((step) => {
      timeline.to(step, { clipPath: "inset(0 0 0% 0)", duration: 0.95, ease: "expo.out" })
    })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * 2.25}`,
      pin: true,
      scrub: 1,
      animation: timeline,
      invalidateOnRefresh: true,
    })

    return () => {
      trigger.kill()
      timeline.kill()
      steps.forEach((step) => gsap.set(step, { clearProps: "clipPath" }))
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="section-shell relative isolate overflow-hidden bg-[var(--color-bg)] text-white"
    >
      <div className="content-shell relative py-[var(--section-block)]">
        <div className="mx-auto max-w-[1240px]">
          <div
            ref={headlineRevealRef}
            className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-end"
          >
            <div className="max-w-[56rem]">
              <p className="section-label" data-reveal-item>
                Process
              </p>
              <h2 id="process-heading" className="section-heading mt-4 max-w-[11ch] text-white" data-reveal-item>
                Three stages. One locked direction.
              </h2>
              <p className="body-copy mt-5 max-w-[42ch] text-[1rem] leading-8" data-reveal-item>
                The sequence stays simple on purpose: define the angle, build the frame language, then ship the rollout
                pack without reopening the brief.
              </p>
            </div>

            <div className="brand-card rounded-[1.25rem] p-5" data-reveal-item>
              <p className="section-label text-white/40">Studio discipline</p>
              <p className="mt-3 text-sm leading-7 text-white/66">
                Each step has a different job. Strategy chooses the line, production protects the line, delivery makes
                that line usable by the team the same day it is approved.
              </p>
            </div>
          </div>

          <div ref={stepsRef} className="mt-10 space-y-5 sm:mt-14 sm:space-y-6">
            {PROCESS_STEPS.map((step) => {
              const Icon = step.icon

              return (
                <article
                  key={step.number}
                  className="process-banner group relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[var(--color-surface)] text-white"
                >
                  <div className="absolute inset-0 opacity-100" style={{ background: step.tone }} />
                  <div className="absolute inset-x-0 top-0 h-px bg-white/12" />
                  <div className="pointer-events-none absolute right-5 top-4 text-[4rem] font-semibold tracking-[-0.08em] text-white/[0.05] sm:right-8 sm:top-6 sm:text-[5.5rem]">
                    {step.number}
                  </div>

                  <div className="relative grid gap-6 px-4 py-5 sm:gap-8 sm:px-8 sm:py-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(340px,0.96fr)] lg:items-center lg:gap-10 lg:px-10 lg:py-10">
                    <div className="flex h-full min-w-0 flex-col">
                      <div className="flex items-center gap-4">
                        <span
                          className="inline-flex h-11 w-11 items-center justify-center rounded-[1rem] border border-white/10 bg-white/[0.03] sm:h-12 sm:w-12"
                          style={{ color: step.accent }}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="section-label text-white/44">Stage {step.number}</p>
                          <p className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-white/38">{step.label}</p>
                        </div>
                      </div>

                      <h3 className="mt-6 max-w-[11ch] text-[clamp(1.9rem,7vw,3.4rem)] font-bold leading-[0.94] text-white sm:mt-8">
                        {step.title}
                      </h3>

                      <p className="body-copy mt-4 max-w-[36ch] text-[0.98rem] leading-7 sm:mt-5 sm:text-[1.02rem] sm:leading-8">
                        {step.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-white/72 sm:px-4 sm:py-2"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-6 sm:pt-8">
                        <div className="rounded-[1.2rem] border border-white/10 bg-black/16 p-4 sm:p-5">
                          <div className="flex items-start gap-3">
                            <span
                              className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]"
                              style={{ color: step.accent }}
                            >
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                            <p className="text-[0.96rem] leading-6 text-white/78 sm:text-[1rem] sm:leading-7">
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
