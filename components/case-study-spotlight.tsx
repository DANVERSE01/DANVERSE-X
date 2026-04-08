"use client"

import Image from "next/image"
import { FEATURED_CASE_STUDIES } from "@/lib/case-studies"
import { useGsapEnter } from "@/hooks/use-gsap-enter"
import { useParallax } from "@/hooks/use-parallax"

const TRUST_METRICS = [
  {
    label: "Response time",
    value: "24-48h",
    detail: "The first reply comes back with direction, scope pressure, and the strongest next move.",
  },
  {
    label: "Delivery window",
    value: "7-21 days",
    detail: "Ads move faster. Identity systems and launch pages move on the timeline the handoff actually needs.",
  },
  {
    label: "Handoff standard",
    value: "Production-ready",
    detail: "Ratios, rollout assets, and decision clarity ship together so the team can move without re-briefing.",
  },
] as const

const TRUST_CHIPS = ["Director-led review", "Commercially sharp direction", "Launch-ready delivery"] as const

export function ProofSection() {
  const featuredCaseStudy = FEATURED_CASE_STUDIES[0]
  const supportingCaseStudy = FEATURED_CASE_STUDIES[1]
  const headerRef = useGsapEnter<HTMLDivElement>({
    preset: "fade-up",
    stagger: 0.12,
    childSelector: "[data-gsap-item]",
    start: "top 88%",
  })
  const metricsRef = useGsapEnter<HTMLDivElement>({
    preset: "stagger-up",
    stagger: 0.1,
    childSelector: "[data-proof-item]",
    start: "top 84%",
  })
  const featuredRef = useGsapEnter<HTMLElement>({ preset: "clip-left", start: "top 84%" })
  const supportingRef = useGsapEnter<HTMLDivElement>({ preset: "fade-up", start: "top 86%" })
  const featuredImgRef = useParallax<HTMLDivElement>({ speed: 0.12 })

  return (
    <section
      id="proof"
      aria-label="Proof and featured case study"
      data-analytics-section="proof"
      className="section-shell relative overflow-hidden bg-[var(--color-surface)] py-[var(--section-block)]"
    >
      <div className="content-shell relative">
        <div className="mx-auto max-w-[1240px]">
          <div ref={headerRef} className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.8fr)] lg:items-end">
            <div data-gsap-item>
              <p className="section-label">Proof</p>
              <h2 className="section-heading mt-4 max-w-[11ch] text-white">
                Evidence the direction survives after the hero frame is approved.
              </h2>
            </div>
            <p data-gsap-item className="body-copy max-w-[38ch] text-[0.98rem] leading-8 lg:justify-self-end">
              Proof lives here to do one thing well: show the working standard, then let the case study demonstrate how
              it held under rollout pressure.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-6">
            <div ref={metricsRef} className="grid gap-5">
              <div className="brand-card rounded-[1.35rem] p-6" data-proof-item>
                <p className="section-label text-white/40">Trust layer</p>
                <p className="mt-4 text-[1.2rem] leading-8 text-white/78">
                  Serious buyers want the decision standard up front, not buried after five sections of selling.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {TRUST_CHIPS.map((chip) => (
                    <span
                      key={chip}
                      className="accent-chip px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-white/76"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {TRUST_METRICS.map((metric) => (
                  <article key={metric.label} className="brand-card rounded-[1.25rem] p-5" data-proof-item>
                    <p className="section-label text-white/36">{metric.label}</p>
                    <p className="mt-3 text-[1.55rem] font-bold tracking-[-0.04em] text-white">{metric.value}</p>
                    <p className="mt-3 text-sm leading-7 text-white/62">{metric.detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <article ref={featuredRef} className="statement-panel overflow-hidden rounded-[1.45rem] border-white/10">
                <div className="grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.94fr)]">
                  <div className="relative min-h-[340px] overflow-hidden border-b border-white/10 lg:min-h-full lg:border-b-0 lg:border-r">
                    <div ref={featuredImgRef} className="absolute inset-[-10%]">
                      <Image
                        src={featuredCaseStudy.image}
                        alt={`${featuredCaseStudy.client} case study cover frame`}
                        fill
                        sizes="(min-width: 1024px) 38vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,9,0.04)_0%,rgba(7,7,9,0.18)_42%,rgba(7,7,9,0.78)_100%)]" />
                    <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                      {featuredCaseStudy.tags.map((tag) => (
                        <span
                          key={tag}
                          className="accent-chip px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/78"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col px-5 py-6 sm:px-7 sm:py-7">
                    <p className="section-label text-white/40">Featured case</p>
                    <h3 className="mt-3 max-w-[12ch] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[0.95] text-white">
                      {featuredCaseStudy.title}
                    </h3>
                    <p className="mt-2 text-[0.72rem] uppercase tracking-[0.14em] text-white/38">
                      {featuredCaseStudy.client}
                    </p>
                    <p className="body-copy mt-5 max-w-[36ch] text-[0.98rem] leading-7">{featuredCaseStudy.summary}</p>

                    <div className="mt-6 grid gap-3">
                      <NarrativeBlock label="What was broken" text={featuredCaseStudy.broken} />
                      <NarrativeBlock label="What happened after" text={featuredCaseStudy.after} />
                    </div>

                    <div className="mt-6">
                      <p className="section-label text-white/34">Proof points</p>
                      <div className="mt-3 grid gap-2">
                        {featuredCaseStudy.proofPoints.slice(0, 3).map((proofPoint) => (
                          <div
                            key={proofPoint}
                            className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-3 py-3 text-sm leading-6 text-white/72"
                          >
                            {proofPoint}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              <div ref={supportingRef}>
                <article className="brand-card overflow-hidden rounded-[1.25rem] border-white/10">
                  <div className="grid gap-0 sm:grid-cols-[180px_minmax(0,1fr)]">
                    <div className="relative min-h-[190px] overflow-hidden sm:min-h-full">
                      <Image
                        src={supportingCaseStudy.image}
                        alt={`${supportingCaseStudy.client} supporting proof frame`}
                        fill
                        sizes="(min-width: 640px) 180px, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,9,0.08),rgba(7,7,9,0.58))]" />
                    </div>

                    <div className="px-5 py-5">
                      <p className="section-label text-white/34">Supporting case</p>
                      <h3 className="mt-3 max-w-[16ch] text-[1.4rem] font-bold leading-[0.98] text-white">
                        {supportingCaseStudy.title}
                      </h3>
                      <p className="mt-2 text-[0.72rem] uppercase tracking-[0.14em] text-white/38">
                        {supportingCaseStudy.client}
                      </p>
                      <p className="mt-4 text-sm leading-7 text-white/68">{supportingCaseStudy.engagementContext}</p>

                      <div className="mt-4 grid gap-2">
                        <MiniNarrative label="Broken" text={supportingCaseStudy.broken} />
                        <MiniNarrative label="After" text={supportingCaseStudy.after} />
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function NarrativeBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[1.1rem] border border-white/10 bg-black/14 px-4 py-4">
      <p className="section-label text-white/34">{label}</p>
      <p className="mt-2 text-sm leading-7 text-white/74">{text}</p>
    </div>
  )
}

function MiniNarrative({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[0.95rem] border border-white/10 bg-white/[0.03] px-3 py-3">
      <p className="section-label text-white/32">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white/68">{text}</p>
    </div>
  )
}
