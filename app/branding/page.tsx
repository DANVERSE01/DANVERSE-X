import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight, BadgeCheck, Layers3, Type } from "lucide-react"
import { AppverseFooter } from "@/components/appverse-footer"
import { CtaCluster } from "@/components/cta-cluster"
import { SiteHeader } from "@/components/site-header"
import { FEATURED_CASE_STUDIES } from "@/lib/case-studies"
import { SERVICE_PAGE_DEFINITIONS } from "@/lib/service-page-definitions"
import { createServiceMetadata } from "@/lib/service-metadata"

const pageDefinition = SERVICE_PAGE_DEFINITIONS.branding
const referenceCaseStudy = FEATURED_CASE_STUDIES[2]

export function generateMetadata(): Metadata {
  return createServiceMetadata({
    path: "/branding",
    title: "Branding & Visual Identity | DANVERSE",
    description:
      "Identity systems, rollout rules, and visual control for founders who need trust, clarity, and a production-ready brand standard.",
  })
}

const BRAND_SYSTEM_SURFACES = [
  {
    label: "Mark system",
    title: "The symbol has to carry trust without explanation.",
    detail: "Primary, secondary, and utility marks are defined around use, not decoration.",
    icon: BadgeCheck,
  },
  {
    label: "Type grammar",
    title: "Typography sets authority before the founder speaks.",
    detail: "Pairings, hierarchy, and weight logic are locked so every page and deck stays on-model.",
    icon: Type,
  },
  {
    label: "Rollout system",
    title: "The identity has to survive delegation and launch speed.",
    detail: "Motion rules, surface logic, and usage guidance ship with the assets so the brand stays controlled.",
    icon: Layers3,
  },
] as const

export default function BrandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white">
        <section className="section-shell pb-12 pt-10 sm:pb-16 sm:pt-14">
          <div className="content-shell">
            <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(12,15,20,0.9),rgba(19,12,20,0.88),rgba(8,9,13,0.96))] shadow-[0_26px_82px_rgba(0,0,0,0.4)]">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1.06fr)_minmax(360px,0.94fr)]">
                <div className="relative overflow-hidden px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(198,235,104,0.12),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(106,129,255,0.16),transparent_42%)]" />
                  <div className="relative">
                    <p className="section-label">{pageDefinition.hero.eyebrow}</p>
                    <h1 className="section-heading mt-4 max-w-[10ch] text-white">{pageDefinition.hero.title}</h1>
                    <p className="mt-4 max-w-[42ch] text-sm leading-7 text-[var(--color-acid-lime)]">{pageDefinition.hero.kicker}</p>
                    <p className="body-copy mt-5 max-w-[42ch] text-[1rem] leading-7">{pageDefinition.hero.intro}</p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      {pageDefinition.hero.chips.map((chip, index) => (
                        <div key={chip} className="rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4">
                          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white/34">0{index + 1}</p>
                          <p className="mt-2 text-sm font-semibold leading-6 text-white">{chip}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <CtaCluster align="left" primary={pageDefinition.cta.primary} secondary={pageDefinition.cta.secondary} />
                    </div>
                  </div>
                </div>

                <div className="grid gap-0 border-t border-white/10 lg:border-l lg:border-t-0">
                  <div className="grid min-h-[220px] place-items-center border-b border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-6 py-8">
                    <div className="grid gap-4 text-center">
                      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-white/12 bg-[radial-gradient(circle_at_top,rgba(198,235,104,0.18),rgba(255,255,255,0.02))] text-[3rem] font-black tracking-[-0.12em] text-white">
                        DV
                      </div>
                      <div>
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/38">Identity Read</p>
                        <p className="mt-2 text-[1rem] leading-7 text-white/70">
                          The brand should read as established before the founder has to over-explain the company.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-3 px-6 py-6">
                    {BRAND_SYSTEM_SURFACES.map((surface) => (
                      <article key={surface.label} className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 text-[var(--color-acid-lime)]">
                            <surface.icon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white/34">{surface.label}</p>
                            <h2 className="mt-1 text-[1rem] font-semibold tracking-[-0.03em] text-white">{surface.title}</h2>
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-white/68">{surface.detail}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 sm:py-16">
          <div className="content-shell">
            <div className="mx-auto grid max-w-[1180px] gap-6 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)]">
              <div className="brand-card rounded-[1.8rem] border-white/10 p-6">
                <p className="section-label">Proof Standard</p>
                <h2 className="section-heading mt-4 text-white">{pageDefinition.proofSection.heading}</h2>
                <p className="body-copy mt-4 max-w-[34ch] text-[1rem] leading-7">{pageDefinition.proofSection.intro}</p>
                <div className="mt-6 rounded-[1.35rem] border border-white/10 bg-black/18 px-4 py-4">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/38">Reference case</p>
                  <p className="mt-2 text-sm leading-7 text-white/72">{referenceCaseStudy.after}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {pageDefinition.proofSection.cards.map((card) => (
                  <article key={card.label} className="statement-panel rounded-[1.7rem] border-white/10 px-5 py-5">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-acid-lime)]">{card.label}</p>
                    <h3 className="mt-3 text-[1.35rem] font-bold leading-[0.96] tracking-[-0.04em] text-white">{card.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/72">{card.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 sm:py-16">
          <div className="content-shell">
            <div className="mx-auto max-w-[1180px]">
              <div className="max-w-[52rem]">
                <p className="section-label">Working Model</p>
                <h2 className="section-heading mt-4 text-white">{pageDefinition.operatingModel.heading}</h2>
                <p className="body-copy mt-4 max-w-[42ch] text-[1rem] leading-7">{pageDefinition.operatingModel.intro}</p>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {pageDefinition.operatingModel.steps.map((step) => (
                  <article key={step.label} className="brand-card rounded-[1.7rem] border-white/10 p-5">
                    <p className="text-[2.2rem] font-black leading-none tracking-[-0.08em] text-white/12">{step.label}</p>
                    <h3 className="mt-3 text-[1.4rem] font-bold leading-[0.95] tracking-[-0.04em] text-white">{step.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/70">{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell pb-16 pt-6 sm:pb-20">
          <div className="content-shell">
            <div className="mx-auto max-w-[1180px] rounded-[2rem] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-end">
                <div>
                  <p className="section-label">After Launch</p>
                  <h2 className="section-heading mt-4 text-white">The identity has to keep reading clearly once the speed picks up.</h2>
                </div>
                <p className="body-copy max-w-[42ch] text-[1rem] leading-7">
                  {referenceCaseStudy.after} The system kept moving because {referenceCaseStudy.proofPoints[2].toLowerCase()} and{" "}
                  {referenceCaseStudy.proofPoints[3].toLowerCase()}.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-[var(--color-acid-lime)]">
                <ArrowUpRight className="h-4 w-4" />
                <Link href={pageDefinition.archiveReference.href} className="accent-link text-white">
                  {pageDefinition.archiveReference.label}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <AppverseFooter />
    </>
  )
}
