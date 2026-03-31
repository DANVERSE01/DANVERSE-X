import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { Button } from "@/components/ui/button"
import { createWhatsAppUrl, env } from "@/lib/env"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - DANVERSE",
  description:
    "DANVERSE builds AI-powered cinematic ads, visual identities, websites, and creative systems for brands across Egypt and the Gulf.",
}

const FEATURES = [
  {
    title: "Cinematic Ads & UGC",
    desc: "Scroll-stopping vertical and horizontal ads built for TikTok, Reels, and paid campaigns - with cinematic direction and sharp hooks.",
  },
  {
    title: "Branding & Visual Identity",
    desc: "Logo systems, visual languages, and brand worlds that feel premium, consistent, and built to last.",
  },
  {
    title: "Websites & Landing Pages",
    desc: "Conversion-first websites and landing pages - clean motion, strong copy, and zero generic templates.",
  },
  {
    title: "AI Content Systems",
    desc: "Custom AI pipelines that generate scripts, posts, and campaign assets on demand - your brand on autopilot.",
  },
  {
    title: "Creative Direction",
    desc: "We lead the vision - concept, script, visual language - so every frame serves the strategy.",
  },
  {
    title: "Egypt & Gulf Market",
    desc: "Built for Arabic-market brands. We understand the culture, the platforms, and what actually converts.",
  },
]

export default function AboutPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DANVERSE",
    url: env.NEXT_PUBLIC_SITE_URL,
    logo: `${env.NEXT_PUBLIC_SITE_URL}/images/danverse-logo.webp`,
    description:
      "DANVERSE is an AI-powered creative studio building cinematic ads, brand systems, and production infrastructure for modern brands.",
    sameAs: ["https://www.instagram.com/danverse.creative"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: env.NEXT_PUBLIC_CONTACT_EMAIL,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <SiteHeader />

      <main className="min-h-screen text-white">
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="section-label mb-4">About DANVERSE</p>
            <h1 className="section-heading text-4xl text-white md:text-5xl lg:text-6xl">
              Built to make brands impossible to ignore.
            </h1>
            <p className="body-copy mx-auto mt-6 max-w-3xl text-lg md:text-xl">
              We don&apos;t make content. We build brand weapons. AI-powered, director-grade, built to convert.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 pb-20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="brand-card rounded-2xl p-6">
                  <p className="section-label mb-3 text-[11px]">Capability</p>
                  <h2 className="section-heading text-xl text-white">{feature.title}</h2>
                  <p className="body-copy mt-3 text-sm leading-7">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 text-center">
          <div className="container mx-auto max-w-2xl">
            <p className="section-label mb-4">Start Here</p>
            <h2 className="section-heading text-3xl text-white md:text-4xl">Your Next Campaign Starts Here.</h2>
            <p className="body-copy mb-8 mt-4">
              Tell us what you&apos;re building. We&apos;ll tell you exactly how to make it hit.
            </p>
            <Button asChild size="lg" className="cta-primary rounded-full px-8 text-white font-medium">
              <Link href={createWhatsAppUrl()} target="_blank">
                Start Your Project
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <AppverseFooter />
    </>
  )
}
