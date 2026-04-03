import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight, Clapperboard, Layers3, Zap } from "lucide-react"
import { AppverseFooter } from "@/components/appverse-footer"
import { CtaCluster } from "@/components/cta-cluster"
import { SiteHeader } from "@/components/site-header"
import { FEATURED_CASE_STUDIES } from "@/lib/case-studies"
import { SERVICE_PAGE_DEFINITIONS } from "@/lib/service-page-definitions"
import { createServiceMetadata } from "@/lib/service-metadata"

const pageDefinition = SERVICE_PAGE_DEFINITIONS["cinematic-ads"]
const heroCaseStudy = FEATURED_CASE_STUDIES[0]

export function generateMetadata(): Metadata {
  return createServiceMetadata({
    path: "/cinematic-ads",
    title: "Cinematic Ads & UGC | DANVERSE",
    description:
      "Paid-social creative direction, opening-frame logic, and rollout-ready ad systems built to stop scroll and convert attention into action.",
  })
}

const HERO_SIGNAL_CARDS = [
  {
    label: "Buyer",
    value: pageDefinition.buyer,
    detail: "Needs the first three seconds to carry authority before budget starts burning.",
    icon: Zap,
  },
  {
    label: "Primary Pressure",
    value: "Hook + rollout",
    detail: "The hero cut and the variations have to ship as one usable paid-social system.",
    icon: Layers3,
  },
  {
    label: "Delivery Standard",
    value: "Launch-ready",
    detail: "Hook variants, cutdowns, still covers, and ratio-ready exports move together.",
    icon: Clapperboard,
  },
] as const

export default function CinematicAdsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white">
        <section className="section-shell pb-12 pt-10 sm:pb-16 sm:pt-14">
          <div className="content-shell">
            <div className="mx-auto grid max-w-[1180px] gap-6 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-stretch">
              <div className="statement-panel rounded-[2rem] px-5 py-6 sm:px-8 sm:py-8">
                <p className="section-label">{pageDefinition.hero.eyebrow}</p>
                <h1 className="section-heading mt-4 max-w-[11ch] text-white">{pageDefinition.hero.title}</h1>
                <p className="mt-4 max-w-[40ch] text-sm leading-7 text-[var(--color-acid-lime)]">
                  {pageDefinition.hero.kicker}
                </p>
                <p className="body-copy mt-5 max-w-[42ch] text-[1rem] leading-7">{pageDefinition.hero.intro}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {pageDefinition.hero.chips.map((chip) => (
                    <span
                      key={chip}
                      className="accent-chip px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/78"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <CtaCluster align="left" primary={pageDefinition.cta.primary} secondary={pageDefinition.cta.secondary} />
                </div>
              </div>

              <div className="grid gap-4">
                <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(155deg,rgba(12,15,20,0.84),rgba(21,27,39,0.74),rgba(12,10,15,0.86))] p-4 shadow-[0_24px_72px_rgba(0,0,0,0.36)]">
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                    <div className="grid gap-3">
                      {HERO_SIGNAL_CARDS.map((card) => (
                        <div key={card.label} className="rounded-[1.35rem] border border-white/10 bg-black/18 px-4 py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[var(--color-acid-lime)]">
                              <card.icon className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/38">{card.label}</p>
                              <p className="mt-1 text-[1rem] font-semibold tracking-[-0.03em] text-white">{card.value}</p>
                            </div>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-white/68">{card.detail}</p>
                        </div>
                      ))}
                    </div>

                    <div className="relative min-h-[420px] overflow-hidden rounded-[1.6rem] border border-white/10">
                      <Image
                        src={heroCaseStudy.image}
                        alt={`${heroCaseStudy.client} cinematic ads reference frame`}
                        fill
                        priority
                        sizes="(min-width: 1024px) 34vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0.1),rgba(5,7,11,0.74))]" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-acid-lime)]">
                          Paid-social proof
                        </p>
                        <h2 className="mt-3 max-w-[12ch] text-[1.8rem] font-bold leading-[0.94] tracking-[-0.04em] text-white">
                          {heroCaseStudy.title}
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-white/72">{heroCaseStudy.after}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 sm:py-16">
          <div className="content-shell">
            <div className="mx-auto max-w-[1180px]">
              <div className="max-w-[52rem]">
                <p className="section-label">What Gets Locked First</p>
                <h2 className="section-heading mt-4 text-white">{pageDefinition.proofSection.heading}</h2>
                <p className="body-copy mt-4 max-w-[42ch] text-[1rem] leading-7">{pageDefinition.proofSection.intro}</p>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {pageDefinition.proofSection.cards.map((card) => (
                  <article key={card.label} className="brand-card rounded-[1.6rem] border-white/10 p-5">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-acid-lime)]">{card.label}</p>
                    <h3 className="mt-3 text-[1.45rem] font-bold leading-[0.95] tracking-[-0.04em] text-white">{card.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/70">{card.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 sm:py-16">
          <div className="content-shell">
            <div className="mx-auto grid max-w-[1180px] gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start">
              <div className="brand-card rounded-[1.8rem] border-white/10 p-6">
                <p className="section-label">Operating Model</p>
                <h2 className="section-heading mt-4 text-white">{pageDefinition.operatingModel.heading}</h2>
                <p className="body-copy mt-4 max-w-[34ch] text-[1rem] leading-7">{pageDefinition.operatingModel.intro}</p>
                <Link
                  href={pageDefinition.archiveReference.href}
                  className="cta-secondary mt-6 inline-flex rounded-full px-5 py-3 text-sm font-semibold text-white"
                >
                  {pageDefinition.archiveReference.label}
                </Link>
              </div>

              <div className="grid gap-4">
                {pageDefinition.operatingModel.steps.map((step) => (
                  <article
                    key={step.label}
                    className="statement-panel rounded-[1.8rem] border-white/10 px-5 py-5 sm:px-6"
                  >
                    <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start">
                      <div className="text-[2.4rem] font-black leading-none tracking-[-0.08em] text-white/12">{step.label}</div>
                      <div>
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/34">Stage {step.label}</p>
                        <h3 className="mt-2 text-[1.45rem] font-bold leading-[0.95] tracking-[-0.04em] text-white">{step.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-white/72">{step.description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell pb-16 pt-6 sm:pb-20">
          <div className="content-shell">
            <div className="mx-auto max-w-[1180px] rounded-[2rem] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end">
                <div>
                  <p className="section-label">Case Reference</p>
                  <h2 className="section-heading mt-4 text-white">What the rollout has to prove after approval.</h2>
                </div>
                <p className="body-copy max-w-[42ch] text-[1rem] leading-7">
                  {heroCaseStudy.after} The campaign pack shipped with {heroCaseStudy.proofPoints[0].toLowerCase()} and{" "}
                  {heroCaseStudy.proofPoints[1].toLowerCase()}.
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
