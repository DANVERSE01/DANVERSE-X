import Link from "next/link"
import type { Metadata } from "next"
import { AppverseFooter } from "@/components/appverse-footer"
import { JsonLd } from "@/components/json-ld"
import { SiteHeader } from "@/components/site-header"
import { resolveCtaHref } from "@/lib/cta"
import { GENERAL_BRIEF_CTA } from "@/lib/site-ctas"

export const metadata: Metadata = {
  title: "FAQ | DANVERSE",
  description: "Answers on process, timelines, revisions, handoff, collaboration, and production methods at DANVERSE.",
  alternates: {
    canonical: "/faq",
  },
}

const FAQ_GROUPS = [
  {
    title: "Process",
    intro: "How the work starts, what gets decided first, and how the direction stays controlled.",
    items: [
      {
        q: "What happens first after we send the brief?",
        a: "We review the offer, the audience, the bottleneck, and the deadline. The first reply comes back with the strongest next move, the likely scope, and whether the project needs a call before production starts.",
      },
      {
        q: "Do you begin with concepts or with direction?",
        a: "Direction comes first. The angle, the pressure point, and the proof sequence are locked before the work expands into scenes, assets, or rollout outputs.",
      },
    ],
  },
  {
    title: "Timelines",
    intro: "How quickly work moves once the scope and direction are approved.",
    items: [
      {
        q: "How fast can a project move?",
        a: "Cinematic ads usually move fastest. Identity systems and launch pages depend on scope, but the timeline is set against the handoff standard the launch actually needs.",
      },
      {
        q: "Can you work against a near launch deadline?",
        a: "Yes, if the brief is clear enough and the scope matches the window. Tight launches are easier to save when direction is decided early instead of revised late.",
      },
    ],
  },
  {
    title: "Revisions",
    intro: "How feedback is handled without breaking the line of direction.",
    items: [
      {
        q: "How do revisions work?",
        a: "Feedback is handled against the approved direction, not as random taste changes. The goal is to sharpen the work, protect the standard, and avoid drift.",
      },
      {
        q: "What if we change the brief halfway through?",
        a: "If the commercial goal changes, the scope can change with it. That is handled explicitly so the launch is not delayed by silent brief expansion.",
      },
    ],
  },
  {
    title: "Deliverables & Handoff",
    intro: "What ships and what your team receives after approval.",
    items: [
      {
        q: "What do we receive at the end?",
        a: "You receive the approved outputs plus the supporting rollout assets, ratios, usage guidance, and handoff clarity needed to keep moving after delivery.",
      },
      {
        q: "Do you deliver for multiple ratios and surfaces?",
        a: "Yes. Deliverables are mapped against the surfaces the launch actually needs so the handoff is usable in the real rollout, not only in the hero format.",
      },
    ],
  },
  {
    title: "Collaboration",
    intro: "How collaboration runs once production starts.",
    items: [
      {
        q: "Who do we communicate with during the project?",
        a: "You communicate directly with the person shaping the creative line. The goal is fewer layers, faster decisions, and less dilution between brief and build.",
      },
      {
        q: "Do you work with teams outside Egypt?",
        a: "Yes. The studio works remotely across Egypt, the Gulf, and international projects where speed, clarity, and premium control matter.",
      },
    ],
  },
  {
    title: "AI & Production Method",
    intro: "How production efficiency is approached and where human direction remains essential.",
    items: [
      {
        q: "Is the work fully AI-generated?",
        a: "No. Production uses computational tools where they compress time or increase control. Creative direction, aesthetic selection, pacing, revision logic, and final output standards remain human-led and human-reviewed.",
      },
      {
        q: "How do you approach production efficiency?",
        a: "We use optimization where it serves speed or precision: iterative testing, format variations, color grading, and rollout outputs. The commercial strategy, the aesthetic line, and the quality bar stay under direct creative control.",
      },
    ],
  },
] as const

export default function FAQPage() {
  const flattenedFaqs = FAQ_GROUPS.flatMap<{ q: string; a: string }>((group) => [...group.items])
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: flattenedFaqs.map((faq) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
      name: faq.q,
    })),
  }

  return (
    <>
      <JsonLd id="faq-structured-data" data={faqStructuredData} />
      <SiteHeader />
      <main className="section-shell min-h-screen py-10 text-white sm:py-14">
        <div className="content-shell">
          <div className="mx-auto max-w-[1120px]">
            <header className="statement-panel rounded-[2rem] px-5 py-6 sm:px-8 sm:py-8">
              <p className="section-label">FAQ</p>
              <h1 className="section-heading mt-4 text-white">The practical questions buyers ask before they move.</h1>
              <p className="body-copy mt-4 max-w-[42ch] text-[1rem] leading-7">
                Process, timing, revisions, handoff, and AI production are answered here so the first call can stay on
                the actual opportunity.
              </p>
            </header>

            <div className="mt-8 grid gap-6">
              {FAQ_GROUPS.map((group) => (
                <section key={group.title} className="brand-card rounded-[1.9rem] border-white/10 p-5 sm:p-6">
                  <div className="max-w-[42rem]">
                    <p className="section-label">{group.title}</p>
                    <p className="mt-3 text-sm leading-7 text-white/66">{group.intro}</p>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {group.items.map((item) => (
                      <details
                        key={item.q}
                        className="rounded-[1.2rem] border border-white/10 bg-black/18 px-4 py-4 open:bg-white/[0.04]"
                      >
                        <summary className="cursor-pointer list-none text-[1rem] font-semibold tracking-[-0.02em] text-white">
                          {item.q}
                        </summary>
                        <p className="mt-3 text-sm leading-7 text-white/72">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-8 rounded-[1.8rem] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-6 sm:px-8 sm:py-8">
              <p className="section-label">Still Deciding?</p>
              <h2 className="section-heading mt-4 text-white">Send the 4-point brief and get the next move back.</h2>
              <p className="body-copy mt-4 max-w-[42ch] text-[1rem] leading-7">
                Use WhatsApp if you already know the offer, the audience, the bottleneck, and the deadline. The first
                reply comes back with the strongest recommendation.
              </p>
              <Link
                href={resolveCtaHref(GENERAL_BRIEF_CTA)}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white"
              >
                {GENERAL_BRIEF_CTA.label}
              </Link>
            </section>
          </div>
        </div>
      </main>
      <AppverseFooter />
    </>
  )
}
