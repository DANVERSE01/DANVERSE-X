import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, CheckCircle2, Layers3, Workflow } from "lucide-react"
import { AppverseFooter } from "@/components/appverse-footer"
import { CtaCluster } from "@/components/cta-cluster"
import { SiteHeader } from "@/components/site-header"
import { SERVICE_PAGE_DEFINITIONS } from "@/lib/service-page-definitions"
import { createServiceMetadata } from "@/lib/service-metadata"

const pageDefinition = SERVICE_PAGE_DEFINITIONS.websites

export function generateMetadata(): Metadata {
  return createServiceMetadata({
    path: "/websites",
    title: "Websites & Landing Pages | DANVERSE",
    description:
      "Conversion architecture, proof sequencing, and launch-ready websites for businesses that need the page to do commercial work immediately.",
  })
}

const PAGE_SEQUENCE = [
  {
    title: "Traffic enters with context",
    description: "The hero matches the promise, the source, and the first belief the buyer needs to keep reading.",
    icon: Workflow,
  },
  {
    title: "Proof answers the real objection",
    description: "Trust signals, deliverables, and results show up in the order doubt would otherwise kill action.",
    icon: Layers3,
  },
  {
    title: "The action point arrives with clarity",
    description: "The CTA tells the buyer what happens next, how long it takes, and why this is the right move now.",
    icon: CheckCircle2,
  },
] as const

export default function WebsitesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white">
        <section className="section-shell pb-12 pt-10 sm:pb-16 sm:pt-14">
          <div className="content-shell">
            <div className="mx-auto max-w-[1180px] rounded-[2.2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(8,10,14,0.96),rgba(12,18,28,0.92),rgba(8,10,14,0.96))] p-5 shadow-[0_26px_82px_rgba(0,0,0,0.4)] sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,0.56fr)_minmax(0,0.62fr)] lg:items-start">
                <div>
                  <p className="section-label">{pageDefinition.hero.eyebrow}</p>
                  <h1 className="section-heading mt-4 max-w-[11ch] text-white">{pageDefinition.hero.title}</h1>
                  <p className="mt-4 max-w-[40ch] text-sm leading-7 text-[var(--color-acid-lime)]">{pageDefinition.hero.kicker}</p>
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

                <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/38">Belief sequence</p>
                  <div className="mt-4 grid gap-3">
                    {PAGE_SEQUENCE.map((item, index) => (
                      <div key={item.title} className="rounded-[1.25rem] border border-white/10 bg-black/18 px-4 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[var(--color-acid-lime)]">
                            <item.icon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/34">0{index + 1}</p>
                            <h2 className="mt-1 text-[1rem] font-semibold tracking-[-0.03em] text-white">{item.title}</h2>
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-white/68">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-acid-lime)]">Launch architecture</p>
                  <div className="mt-4 grid gap-3">
                    <ArchitectureLine title="Traffic source" value="Paid, search, referral, or direct" />
                    <ArchitectureLine title="Primary proof" value="What has to be believed before the CTA appears" />
                    <ArchitectureLine title="Action" value="Book, buy, brief, or qualify" />
                    <ArchitectureLine title="Handoff" value="Live page, content, and CTA logic ready to ship" />
                  </div>
                  <Link
                    href={pageDefinition.archiveReference.href}
                    className="cta-secondary mt-6 inline-flex rounded-full px-5 py-3 text-sm font-semibold text-white"
                  >
                    {pageDefinition.archiveReference.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 sm:py-16">
          <div className="content-shell">
            <div className="mx-auto max-w-[1180px]">
              <div className="max-w-[52rem]">
                <p className="section-label">Section Jobs</p>
                <h2 className="section-heading mt-4 text-white">{pageDefinition.proofSection.heading}</h2>
                <p className="body-copy mt-4 max-w-[42ch] text-[1rem] leading-7">{pageDefinition.proofSection.intro}</p>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {pageDefinition.proofSection.cards.map((card) => (
                  <article key={card.label} className="brand-card rounded-[1.7rem] border-white/10 p-5">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-acid-lime)]">{card.label}</p>
                    <h3 className="mt-3 text-[1.35rem] font-bold leading-[0.96] tracking-[-0.04em] text-white">{card.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/70">{card.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 sm:py-16">
          <div className="content-shell">
            <div className="mx-auto grid max-w-[1180px] gap-4 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
              <div className="statement-panel rounded-[1.8rem] border-white/10 px-5 py-6 sm:px-6">
                <p className="section-label">Working Model</p>
                <h2 className="section-heading mt-4 text-white">{pageDefinition.operatingModel.heading}</h2>
                <p className="body-copy mt-4 max-w-[34ch] text-[1rem] leading-7">{pageDefinition.operatingModel.intro}</p>
              </div>

              <div className="grid gap-4">
                {pageDefinition.operatingModel.steps.map((step) => (
                  <article key={step.label} className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-5 py-5">
                    <div className="flex items-start gap-4">
                      <div className="text-[2.2rem] font-black leading-none tracking-[-0.08em] text-white/12">{step.label}</div>
                      <div>
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/34">Stage {step.label}</p>
                        <h3 className="mt-2 text-[1.35rem] font-bold leading-[0.96] tracking-[-0.04em] text-white">{step.title}</h3>
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
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end">
                <div>
                  <p className="section-label">Launch Outcome</p>
                  <h2 className="section-heading mt-4 text-white">The page should remove hesitation, not make the decision harder.</h2>
                </div>
                <p className="body-copy max-w-[42ch] text-[1rem] leading-7">
                  Each action point must tell the buyer what happens next within the next hour, otherwise the page still
                  has a conversion problem no matter how polished it looks.
                </p>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/72">
                <ArrowRight className="h-4 w-4 text-[var(--color-acid-lime)]" />
                Traffic fit, proof order, and CTA clarity stay aligned from brief to handoff.
              </div>
            </div>
          </div>
        </section>
      </main>
      <AppverseFooter />
    </>
  )
}

function ArchitectureLine({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-white/10 bg-black/18 px-4 py-4">
      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/34">{title}</p>
      <p className="mt-2 text-sm leading-6 text-white/72">{value}</p>
    </div>
  )
}
