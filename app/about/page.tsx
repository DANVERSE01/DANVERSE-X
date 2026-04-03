import type { Metadata } from "next"
import { AppverseFooter } from "@/components/appverse-footer"
import { CtaCluster } from "@/components/cta-cluster"
import { JsonLd } from "@/components/json-ld"
import { SiteHeader } from "@/components/site-header"
import { publicEnv } from "@/lib/public-env"
import { GENERAL_BRIEF_CTA, GENERAL_DISCOVERY_CTA } from "@/lib/site-ctas"

export const metadata: Metadata = {
  title: "About | DANVERSE",
  description:
    "DANVERSE is a director-led creative studio for brands that need strategic direction, proven results, and reliable delivery.",
  alternates: {
    canonical: "/about",
  },
}

const BELIEFS = [
  {
    title: "Strategy before execution",
    description:
      "Every visual decision should solve a commercial problem, not just look good. Pretty without purpose is just expensive distraction.",
  },
  {
    title: "Standards over surprises",
    description:
      "The work gets approved faster when the direction is clear. Stakeholders trust coherence. You build that trust by showing the line and holding it.",
  },
  {
    title: "Systems not one-shots",
    description:
      "One hero asset is never enough. The real win is building a ruleset that scales across formats, platforms, and launch moments without losing control.",
  },
] as const

const WORKING_MODEL = [
  {
    title: "We start with the commercial problem, not the aesthetic.",
    description:
      "Offer, audience, bottleneck, and deadline are defined first. This keeps the work sharp from day one instead of wandering toward something beautiful that doesn't work.",
  },
  {
    title: "We build to a standard, not a concept.",
    description:
      "Once the direction locks, every frame reinforces it. That's how you move through reviews without reopening the brief or losing consistency across formats.",
  },
  {
    title: "We deliver work that teams can actually use.",
    description:
      "Specs, ratios, asset rules, and next steps ship together. Your team gets handed a system, not a beautiful thing they have to figure out how to scale.",
  },
] as const

const EXPECTATIONS = [
  "Response within 24-48 hours with a strategic recommendation, not a placeholder reply.",
  "Clear review logic that sharpens direction instead of introducing scope creep or concept drift.",
  "Production-ready delivery designed for the formats, ratios, and rollout surfaces your team actually uses.",
  "Direct contact with the creative director, not a pass-through account manager.",
] as const

export default function AboutPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DANVERSE",
    url: publicEnv.NEXT_PUBLIC_SITE_URL,
    logo: `${publicEnv.NEXT_PUBLIC_SITE_URL}/images/danverse-logo.png`,
    description:
      "DANVERSE is a director-led creative studio building cinematic campaigns, identity systems, and launch infrastructure for modern brands.",
    sameAs: ["https://www.instagram.com/danverse.creative"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: publicEnv.NEXT_PUBLIC_CONTACT_EMAIL,
      },
    ],
  }

  return (
    <>
      <JsonLd id="about-organization-schema" data={schemaData} />
      <SiteHeader />

      <main className="min-h-screen text-white">
        <section className="section-shell pb-12 pt-10 sm:pb-16 sm:pt-14">
          <div className="content-shell">
            <div className="mx-auto max-w-[1120px] rounded-[2.2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(10,13,18,0.92),rgba(14,18,28,0.88),rgba(19,10,19,0.88))] px-5 py-6 shadow-[0_24px_72px_rgba(0,0,0,0.34)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <p className="section-label">About DANVERSE</p>
              <h1 className="section-heading mt-4 max-w-[10ch] text-white">
                Confidence starts with clear direction.
              </h1>
              <p className="mt-4 max-w-[44ch] text-sm leading-7 text-[var(--color-acid-lime)]">
                Your team should know what to trust before anyone starts building. That clarity is what separates work that lands from work that stalls.
              </p>
              <p className="body-copy mt-5 max-w-[46ch] text-[1rem] leading-7">
                DANVERSE is director-led strategy and production. We work with brands that know the hook, proof, and handoff have to work together or the whole system breaks.
              </p>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 sm:py-16">
          <div className="content-shell">
            <div className="mx-auto max-w-[1120px]">
              <div className="max-w-[48rem]">
                <p className="section-label">What We Believe</p>
                <h2 className="section-heading mt-4 text-white">The creative line only matters if it changes the commercial outcome.</h2>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {BELIEFS.map((belief) => (
                  <article key={belief.title} className="brand-card rounded-[1.75rem] border-white/10 p-5">
                    <h3 className="text-[1.5rem] font-bold leading-[0.95] tracking-[-0.04em] text-white">{belief.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/72">{belief.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 sm:py-16">
          <div className="content-shell">
            <div className="mx-auto grid max-w-[1120px] gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
              <div className="statement-panel rounded-[1.9rem] border-white/10 px-5 py-6 sm:px-6">
                <p className="section-label">How the Studio Thinks</p>
                <h2 className="section-heading mt-4 text-white">The work starts where the pressure is highest.</h2>
                <p className="body-copy mt-4 max-w-[34ch] text-[1rem] leading-7">
                  We do not begin with decoration. We begin with the point where attention is weak, trust is delayed,
                  or the launch system is about to break under speed.
                </p>
              </div>

              <div className="grid gap-4">
                {WORKING_MODEL.map((item, index) => (
                  <article key={item.title} className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-5 py-5">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/34">0{index + 1}</p>
                    <h3 className="mt-3 text-[1.4rem] font-bold leading-[0.96] tracking-[-0.04em] text-white">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/72">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 sm:py-16">
          <div className="content-shell">
            <div className="mx-auto grid max-w-[1120px] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
              <div className="brand-card rounded-[1.9rem] border-white/10 p-6">
                <p className="section-label">Working With Us</p>
                <h2 className="section-heading mt-4 text-white">What working together looks like in practice.</h2>
                <div className="mt-6 grid gap-3">
                  {EXPECTATIONS.map((expectation) => (
                    <div key={expectation} className="rounded-[1.2rem] border border-white/10 bg-black/18 px-4 py-4 text-sm leading-7 text-white/72">
                      {expectation}
                    </div>
                  ))}
                </div>
              </div>

              <div className="statement-panel rounded-[1.9rem] border-white/10 px-5 py-6 sm:px-6">
                <p className="section-label">Regional Edge</p>
                <h2 className="section-heading mt-4 text-white">Egypt and Gulf context without flattening the ambition.</h2>
                <p className="body-copy mt-4 text-[1rem] leading-7">
                  The studio works with Arabic-speaking markets, premium offers, and founder-led launches that need local
                  fluency without losing global standards. The goal is not regional styling. The goal is sharper trust,
                  clearer positioning, and better commercial timing inside the market you are actually selling to.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell pb-16 pt-6 sm:pb-20">
          <div className="content-shell">
            <div className="mx-auto max-w-[1120px] rounded-[2rem] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-6 sm:px-8 sm:py-8">
              <p className="section-label text-center">Start Here</p>
              <h2 className="section-heading mt-4 text-center text-white">Tell us what has to move, and we will tell you the next move.</h2>
              <p className="body-copy mx-auto mt-4 max-w-[42ch] text-center text-[1rem] leading-7">
                Use the 4-point brief if you already know the pressure. Request the 15-minute discovery call if you
                need the direction mapped live.
              </p>
              <div className="mt-8">
                <CtaCluster primary={GENERAL_BRIEF_CTA} secondary={GENERAL_DISCOVERY_CTA} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <AppverseFooter />
    </>
  )
}
