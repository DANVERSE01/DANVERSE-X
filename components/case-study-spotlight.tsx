"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { FEATURED_CASE_STUDIES } from "@/lib/case-studies"
import { TextReveal } from "@/components/text-reveal"
import { useGsapEnter } from "@/hooks/use-gsap-enter"
import { useParallax } from "@/hooks/use-parallax"

export function CaseStudySpotlight() {
  const featuredCaseStudy = FEATURED_CASE_STUDIES[0]
  const supportingCaseStudies = FEATURED_CASE_STUDIES.slice(1)
  const headerRef = useGsapEnter<HTMLDivElement>({ preset: "blur-rise", stagger: 0.12, childSelector: "[data-gsap-item]" })
  const featuredRef = useGsapEnter<HTMLElement>({ preset: "clip-left", start: "top 85%" })
  const supportingRef = useGsapEnter<HTMLDivElement>({ preset: "stagger-up", stagger: 0.18, start: "top 82%" })
  const featuredImgRef = useParallax<HTMLDivElement>({ speed: 0.12 })

  return (
    <section
      id="case-files"
      aria-label="Featured case studies"
      data-analytics-section="case-files"
      className="section-shell relative overflow-hidden py-[var(--section-block)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[18%] h-[20rem] w-[20rem] rounded-full bg-[rgba(106,129,255,0.09)] blur-[130px]" />
        <div className="absolute right-[-10rem] bottom-[6%] h-[20rem] w-[20rem] rounded-full bg-[rgba(39,24,36,0.32)] blur-[130px]" />
      </div>

      <div className="content-shell relative">
        <div className="mx-auto max-w-[1120px]">
          <div ref={headerRef} className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.75fr)_auto] lg:items-end">
            <div data-gsap-item>
              <p className="section-label">Case Files</p>
              <TextReveal
                as="h2"
                type="chars"
                preset="clip-up"
                stagger={0.02}
                className="section-heading mt-4 max-w-[11ch] text-white"
              >
                What was broken, what got decided, what shipped, and what held after launch.
              </TextReveal>
            </div>
            <p data-gsap-item className="body-copy max-w-[34ch] text-[0.96rem] leading-7 lg:justify-self-center">
              Every featured case has one job here: prove that the direction survives rollout pressure after the hero
              frame is approved.
            </p>
            <Link
              data-gsap-item
              href="/work"
              className="cta-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white lg:justify-self-end"
            >
              View All Case Studies
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-6">
            <article ref={featuredRef} className="statement-panel overflow-hidden rounded-[2rem] border-white/10">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,0.96fr)_minmax(360px,0.84fr)]">
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
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0.02)_0%,rgba(5,7,11,0.18)_42%,rgba(5,7,11,0.72)_100%)]" />
                  <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    {featuredCaseStudy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="accent-chip px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/82"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col px-5 py-6 sm:px-7 sm:py-7">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-acid-lime)]">
                    Featured Build
                  </p>
                  <h3 className="mt-3 max-w-[12ch] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[0.94] tracking-[-0.05em] text-white">
                    {featuredCaseStudy.title}
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/42">{featuredCaseStudy.client}</p>
                  <p className="body-copy mt-5 max-w-[36ch] text-[0.98rem] leading-7">{featuredCaseStudy.summary}</p>

                  <div className="mt-6 grid gap-3">
                    <NarrativeBlock label="What was broken" text={featuredCaseStudy.broken} />
                    <NarrativeBlock label="What got decided" text={featuredCaseStudy.decision} />
                    <NarrativeBlock label="What was built" text={featuredCaseStudy.built} />
                    <NarrativeBlock label="What happened after" text={featuredCaseStudy.after} />
                  </div>

                  <div className="mt-6">
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/38">Proof of impact</p>
                    <div className="mt-3 grid gap-2">
                      {featuredCaseStudy.proofPoints.map((proofPoint) => (
                        <div
                          key={proofPoint}
                          className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-3 py-3 text-sm leading-6 text-white/74"
                        >
                          {proofPoint}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <div ref={supportingRef} className="grid gap-5">
              {supportingCaseStudies.map((caseStudy) => (
                <article key={caseStudy.slug} className="brand-card overflow-hidden rounded-[1.7rem] border-white/10">
                  <div className="grid gap-0 sm:grid-cols-[180px_minmax(0,1fr)]">
                    <div className="relative min-h-[190px] overflow-hidden sm:min-h-full">
                      <Image
                        src={caseStudy.image}
                        alt={`${caseStudy.client} supporting case study frame`}
                        fill
                        sizes="(min-width: 640px) 180px, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0.08),rgba(5,7,11,0.42))]" />
                    </div>

                    <div className="px-5 py-5">
                      <div className="flex flex-wrap items-center gap-2">
                        {caseStudy.tags.map((tag) => (
                          <span key={tag} className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/38">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="mt-3 max-w-[16ch] text-[1.4rem] font-bold leading-[0.96] tracking-[-0.04em] text-white">
                        {caseStudy.title}
                      </h3>
                      <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/38">{caseStudy.client}</p>
                      <p className="mt-3 text-sm leading-7 text-white/70">{caseStudy.engagementContext}</p>

                      <div className="mt-4 grid gap-2">
                        <MiniNarrative label="Broken" text={caseStudy.broken} />
                        <MiniNarrative label="After" text={caseStudy.after} />
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-acid-lime)]">
                        <ArrowUpRight className="h-4 w-4" />
                        <span>{caseStudy.proofPoints[0]}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function NarrativeBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-black/18 px-4 py-4">
      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/38">{label}</p>
      <p className="mt-2 text-sm leading-7 text-white/74">{text}</p>
    </div>
  )
}

function MiniNarrative({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-3 py-3">
      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/34">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white/68">{text}</p>
    </div>
  )
}
