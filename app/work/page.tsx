import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { AppverseFooter } from "@/components/appverse-footer"
import { JsonLd } from "@/components/json-ld"
import { SiteHeader } from "@/components/site-header"
import { FEATURED_CASE_STUDIES } from "@/lib/case-studies"
import { env } from "@/lib/env"
import { SHOWCASE_WORKS } from "@/lib/showcase-works"

export const metadata: Metadata = {
  title: "Selected Work | DANVERSE",
  description:
    "Featured DANVERSE case files built around what was broken, what got decided, what was built, and what held after launch.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Selected Work | DANVERSE",
    description:
      "Featured DANVERSE case files built around what was broken, what got decided, what was built, and what held after launch.",
    type: "website",
    url: `${env.NEXT_PUBLIC_SITE_URL}/work`,
    images: [
      {
        url: `${env.NEXT_PUBLIC_SITE_URL}/images/showcase/jacob-bugatti.jpg`,
        width: 1200,
        height: 1600,
        alt: "DANVERSE selected work showcase",
      },
    ],
  },
}

export default function WorkPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: FEATURED_CASE_STUDIES.map((item, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: item.title,
      url: `${env.NEXT_PUBLIC_SITE_URL}/work#${item.slug}`,
    })),
  }

  return (
    <>
      <JsonLd id="work-item-list" data={itemListSchema} />
      <SiteHeader />
      <main className="section-shell min-h-screen py-10 text-white sm:py-14">
        <div className="content-shell">
          <section className="mx-auto max-w-[1120px]">
            <p className="section-label">Selected Work</p>
            <h1 className="section-heading mt-4 max-w-[10ch] text-white">
              Proof of what changed after the direction was locked.
            </h1>
            <p className="body-copy mt-5 max-w-[44ch] text-[1rem] leading-7">
              Each featured case answers the same four questions in the same order: what was broken, what got decided,
              what was built, and what held after launch.
            </p>
          </section>

          <section className="mx-auto mt-12 grid max-w-[1120px] gap-6">
            {FEATURED_CASE_STUDIES.map((caseStudy, index) => (
              <article
                id={caseStudy.slug}
                key={caseStudy.slug}
                className="statement-panel overflow-hidden rounded-[2rem] border-white/10"
              >
                <div className="grid gap-0 lg:grid-cols-[minmax(360px,0.82fr)_minmax(0,1.18fr)]">
                  <div className="relative min-h-[340px] lg:min-h-full">
                    <Image
                      src={caseStudy.image}
                      alt={`${caseStudy.client} campaign still`}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0.06),rgba(5,7,11,0.65))]" />
                    <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                      {caseStudy.tags.map((tag) => (
                        <span
                          key={tag}
                          className="accent-chip px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/82"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="px-5 py-6 sm:px-7 sm:py-7">
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-acid-lime)]">
                      {caseStudy.client}
                    </p>
                    <h2 className="mt-3 text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[0.94] tracking-[-0.05em] text-white">
                      {caseStudy.title}
                    </h2>
                    <p className="body-copy mt-5 max-w-[40ch] text-[1rem] leading-7">{caseStudy.engagementContext}</p>

                    <div className="mt-6 grid gap-3">
                      <NarrativeBlock label="What was broken" text={caseStudy.broken} />
                      <NarrativeBlock label="What got decided" text={caseStudy.decision} />
                      <NarrativeBlock label="What was built" text={caseStudy.built} />
                      <NarrativeBlock label="What happened after" text={caseStudy.after} />
                    </div>

                    <div className="mt-6 grid gap-4 rounded-[1.5rem] border border-white/10 bg-black/18 p-4">
                      <div>
                        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/38">
                          What shipped
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {caseStudy.deliverables.map((deliverable) => (
                            <span
                              key={deliverable}
                              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.72rem] font-semibold tracking-[-0.01em] text-white/80"
                            >
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/38">
                          Proof of impact
                        </p>
                        <div className="mt-3 grid gap-2">
                          {caseStudy.proofPoints.map((proofPoint) => (
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

                    <p className="mt-6 text-sm leading-7 text-white/62">{caseStudy.note}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="mx-auto mt-12 max-w-[1120px]">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="section-label">Archive Rail</p>
                <h2 className="section-heading mt-4 max-w-[14ch] text-white">More references, kept quieter.</h2>
              </div>
              <Link href="/#proof" className="accent-link hidden text-sm text-white/72 sm:inline-flex">
                Back to homepage proof
              </Link>
            </div>

            <div className="mt-6 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {SHOWCASE_WORKS.map((work) => (
                <article
                  key={work.slug}
                  className="brand-card min-w-[15rem] max-w-[15rem] overflow-hidden rounded-[1.4rem] border-white/10"
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={work.poster}
                      alt={`${work.client} archive poster frame`}
                      fill
                      sizes="240px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0.08),rgba(5,7,11,0.68))]" />
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/38">
                      {work.category}
                    </p>
                    <h3 className="mt-3 text-[1.05rem] font-bold leading-[1] tracking-[-0.04em] text-white">
                      {work.title}
                    </h3>
                    <p className="mt-2 text-[0.72rem] uppercase tracking-[0.16em] text-white/38">{work.client}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <AppverseFooter />
    </>
  )
}

function NarrativeBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4">
      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/38">{label}</p>
      <p className="mt-2 text-sm leading-7 text-white/74">{text}</p>
    </div>
  )
}
