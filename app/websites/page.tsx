import type { Metadata } from "next"
import { AppverseFooter } from "@/components/appverse-footer"
import { SiteHeader } from "@/components/site-header"
import { WaCtaButton } from "@/components/wa-cta-button"
import { createServiceMetadata } from "@/lib/service-metadata"

export function generateMetadata(): Metadata {
  return createServiceMetadata({
    path: "/websites",
    title: "Websites & Landing Pages | DANVERSE",
    description:
      "Conversion-focused websites and landing pages with premium motion, clean structure, and fast deployment for brands that need results now.",
  })
}

const FEATURES = [
  {
    tag: "CONVERSION",
    title: "Built to close",
    desc: "Every section has a job. Hero captures, features build trust, CTA converts. No decorative filler.",
  },
  {
    tag: "MOTION",
    title: "Premium feel, zero lag",
    desc: "Smooth scroll animations and micro-interactions that signal quality without killing load time.",
  },
  {
    tag: "FAST DELIVERY",
    title: "Live in days, not months",
    desc: "Single-page landers in 3-5 days. Multi-page sites in 1-2 weeks. Clear scope, fast execution.",
  },
]

const PROCESS = [
  { step: "01", label: "Brief", desc: "Goals, audience, key pages, and desired actions locked before design starts." },
  { step: "02", label: "Design", desc: "Full Figma mockup reviewed and approved. No surprises in dev." },
  { step: "03", label: "Review", desc: "Staging link for feedback. Two rounds of revisions included." },
  { step: "04", label: "Delivery", desc: "Live deploy + handoff. Code repo access included on Pro and Premium." },
]

export default function WebsitesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white">
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="accent-chip mb-4 px-4 py-1.5 text-xs font-medium uppercase tracking-widest">
              Websites & Landing Pages
            </div>
            <h1 className="mb-6 font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl lg:text-6xl">
              <span className="block text-white">Sites That</span>
              <span className="block bg-gradient-to-r from-[var(--color-electric-blue-strong)] via-[var(--color-hot-pink)] to-[var(--color-acid-lime)] bg-clip-text text-transparent">
                Convert
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/60 md:text-xl">
              Modern websites and landing pages with clean UI and purposeful motion. We build for results - fast load,
              strong structure, premium look.
            </p>
            <div className="mt-8">
              <WaCtaButton source="websites-cta" label="Start Your Site" />
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-3">
              {FEATURES.map((feature) => (
                <div
                  key={feature.tag}
                  className="liquid-glass rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-[var(--color-border-strong)]"
                >
                  <p className="accent-kicker mb-2">{feature.tag}</p>
                  <h3 className="mb-3 text-lg font-bold text-white">{feature.title}</h3>
                  <p className="body-copy text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl">
              The Process
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((item) => (
                <div key={item.step} className="liquid-glass rounded-2xl border border-white/10 p-6">
                  <p className="accent-step mb-3 text-4xl font-black">{item.step}</p>
                  <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-white">{item.label}</h4>
                  <p className="body-copy text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 text-center">
          <div className="container mx-auto max-w-2xl rounded-2xl border border-white/10 p-10 liquid-glass">
            <p className="section-label mb-3 text-[10px]">Pricing</p>
            <h2 className="mb-4 text-2xl font-extrabold text-white md:text-3xl">Ready to build?</h2>
            <p className="body-copy mb-8 text-sm">
              Starter at $299 - Professional at $699 - Premium at $2,049. All plans include revisions.
            </p>
            <WaCtaButton source="websites-cta" label="Book a Call" />
          </div>
        </section>
      </main>
      <AppverseFooter />
    </>
  )
}
