"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass, DraftingCompass, Rocket } from "lucide-react"

const STEPS = [
  {
    step: "01",
    title: "Project Alignment",
    description: "We review plans, references, mood, and delivery goals before a frame is rendered.",
    bullets: ["Asset audit", "Camera direction", "Mood + material lock"],
    icon: Compass,
  },
  {
    step: "02",
    title: "Visualization Production",
    description: "Photoreal stills and walkthroughs are built with lighting, styling, and review checkpoints.",
    bullets: ["Exterior and interior staging", "Lighting development", "Structured feedback rounds"],
    icon: DraftingCompass,
  },
  {
    step: "03",
    title: "Launch Delivery",
    description: "You receive final stills, walkthrough files, and presentation-ready outputs for approvals or marketing.",
    bullets: ["Approval-ready exports", "Marketing ratios", "Final source package"],
    icon: Rocket,
  },
] as const

export function PricingArchviz() {
  return (
    <section id="process" className="text-white">
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 inline-flex items-center rounded-full border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.1)] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--gold-primary)]">
            The Process
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">From plans to presentation-ready visuals.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-neutral-300">
            The ArchViz workflow is built for clarity: align the direction, produce the renders, deliver approval-ready
            assets without scope drift.
          </p>
          <div className="mt-6">
            <Button asChild className="btn-primary h-auto border-0 px-6 py-3 text-[0.74rem]">
              <Link href="https://wa.link/65mf3i" target="_blank" rel="noopener noreferrer">
                Start Your Project
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {STEPS.map((step) => (
            <article key={step.step} className="liquid-glass rounded-3xl border border-white/10 p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="text-5xl font-black leading-none text-[rgba(201,168,76,0.28)]">{step.step}</div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.06)]">
                  <step.icon className="h-6 w-6 text-[var(--gold-primary)]" />
                </div>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-300">{step.description}</p>

              <ul className="mt-6 grid gap-3">
                {step.bullets.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-300">
                    <span className="h-px w-5 bg-[var(--gold-primary)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
