import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { FEATURED_CASE_STUDIES } from "@/lib/case-studies"

export function CaseStudySpotlight() {
  const featuredCaseStudy = FEATURED_CASE_STUDIES[0]
  const supportingCaseStudies = FEATURED_CASE_STUDIES.slice(1)

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
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.75fr)_auto] lg:items-end">
            <div>
              <p className="section-label">Case Files</p>
              <h2 className="section-heading mt-4 max-w-[11ch] text-white">
                Proof that the direction holds after the first beautiful frame.
              </h2>
            </div>
            <p className="body-copy max-w-[34ch] text-[0.96rem] leading-7 lg:justify-self-center">
              These are not generic gallery cards. Each one explains what had to be solved, what was built, and why the
              system feels premium under pressure.
            </p>
            <Link
              href="/work"
              className="cta-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white lg:justify-self-end"
            >
              Open Work Archive
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-6">
            <article className="statement-panel overflow-hidden rounded-[2rem] border-white/10">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,0.96fr)_minmax(360px,0.84fr)]">
                <div className="relative min-h-[340px] border-b border-white/10 lg:min-h-full lg:border-b-0 lg:border-r">
                  <Image
                    src={featuredCaseStudy.image}
                    alt={`${featuredCaseStudy.client} case study cover frame`}
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
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

                  <div className="mt-6 grid gap-4 rounded-[1.5rem] border border-white/10 bg-black/18 p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/38">Challenge</p>
                      <p className="mt-2 text-sm leading-7 text-white/72">{featuredCaseStudy.challenge}</p>
                    </div>
                    <div>
                      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/38">Focus</p>
                      <p className="mt-2 text-sm leading-7 text-white/72">{featuredCaseStudy.focus}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/38">What Shipped</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {featuredCaseStudy.deliverables.map((deliverable) => (
                        <span
                          key={deliverable}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.72rem] font-semibold tracking-[-0.01em] text-white/80"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-6 text-sm leading-7 text-white/62">{featuredCaseStudy.note}</p>
                </div>
              </div>
            </article>

            <div className="grid gap-5">
              {supportingCaseStudies.map((caseStudy) => (
                <article key={caseStudy.slug} className="brand-card overflow-hidden rounded-[1.7rem] border-white/10">
                  <div className="grid gap-0 sm:grid-cols-[180px_minmax(0,1fr)]">
                    <div className="relative min-h-[190px] sm:min-h-full">
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
                      <p className="mt-3 text-sm leading-7 text-white/70">{caseStudy.summary}</p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-acid-lime)]">
                        <ArrowUpRight className="h-4 w-4" />
                        <span>{caseStudy.deliverables[0]}</span>
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
