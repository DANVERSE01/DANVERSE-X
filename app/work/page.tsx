import Image from "next/image"
import type { Metadata } from "next"
import { AppverseFooter } from "@/components/appverse-footer"
import { JsonLd } from "@/components/json-ld"
import { SiteHeader } from "@/components/site-header"
import { FEATURED_CASE_STUDIES } from "@/lib/case-studies"
import { SHOWCASE_WORKS } from "@/lib/showcase-works"
import { env } from "@/lib/env"

export const metadata: Metadata = {
  title: "Selected Work | DANVERSE",
  description: "Featured DANVERSE case files covering cinematic ads, luxury motion, beauty launches, and rollout-ready visual systems.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Selected Work | DANVERSE",
    description: "Featured DANVERSE case files covering cinematic ads, luxury motion, beauty launches, and rollout-ready visual systems.",
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
            <h1 className="section-heading mt-4 max-w-[9ch] text-white">
              Direction, proof, and rollout logic in one archive.
            </h1>
            <p className="body-copy mt-5 max-w-[44ch] text-[1rem] leading-7">
              This page is the slower read. It shows how DANVERSE frames premium work, packages outputs, and keeps the
              quality line consistent across luxury, beauty, and social-first campaigns.
            </p>
          </section>

          <section className="mx-auto mt-12 grid max-w-[1120px] gap-6">
            {FEATURED_CASE_STUDIES.map((caseStudy) => (
              <article
                id={caseStudy.slug}
                key={caseStudy.slug}
                className="statement-panel overflow-hidden rounded-[2rem] border-white/10"
              >
                <div className="grid gap-0 lg:grid-cols-[minmax(360px,0.86fr)_minmax(0,1.14fr)]">
                  <div className="relative min-h-[320px] lg:min-h-full">
                    <Image
                      src={caseStudy.image}
                      alt={`${caseStudy.client} campaign still`}
                      fill
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0.06),rgba(5,7,11,0.65))]" />
                  </div>

                  <div className="px-5 py-6 sm:px-7 sm:py-7">
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.tags.map((tag) => (
                        <span
                          key={tag}
                          className="accent-chip px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/82"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="mt-4 text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[0.94] tracking-[-0.05em] text-white">
                      {caseStudy.title}
                    </h2>
                    <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/38">{caseStudy.client}</p>
                    <p className="body-copy mt-5 max-w-[40ch] text-[1rem] leading-7">{caseStudy.summary}</p>

                    <div className="mt-6 grid gap-4 rounded-[1.5rem] border border-white/10 bg-black/18 p-4 sm:grid-cols-2">
                      <div>
                        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/38">Challenge</p>
                        <p className="mt-2 text-sm leading-7 text-white/72">{caseStudy.challenge}</p>
                      </div>
                      <div>
                        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/38">Focus</p>
                        <p className="mt-2 text-sm leading-7 text-white/72">{caseStudy.focus}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/38">Deliverables</p>
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

                    <p className="mt-6 text-sm leading-7 text-white/62">{caseStudy.note}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="mx-auto mt-12 max-w-[1120px]">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SHOWCASE_WORKS.map((work) => (
                <article key={work.slug} className="brand-card overflow-hidden rounded-[1.6rem] border-white/10">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={work.poster}
                      alt={`${work.client} poster frame`}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0.08),rgba(5,7,11,0.68))]" />
                  </div>
                  <div className="px-4 py-5">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/38">{work.category}</p>
                    <h3 className="mt-3 text-[1.2rem] font-bold leading-[1] tracking-[-0.04em] text-white">{work.title}</h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/38">{work.client}</p>
                    <p className="mt-3 text-sm leading-7 text-white/70">{work.desc}</p>
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
