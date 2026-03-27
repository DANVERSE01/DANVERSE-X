import type { Metadata } from "next"
import { AppverseFooter } from "@/components/appverse-footer"
import { SiteHeader } from "@/components/site-header"
import { WaCtaButton } from "@/components/wa-cta-button"
import { createServiceMetadata } from "@/lib/service-metadata"

export function generateMetadata(): Metadata {
  return createServiceMetadata({
    path: "/branding",
    title: "Branding & Visual Identity | DANVERSE",
    description:
      "Logo systems, visual identities, and brand worlds engineered for bold launches, premium positioning, and consistent execution across every touchpoint.",
  })
}

const FEATURES = [
  {
    tag: "IDENTITY",
    title: "Logo systems that last",
    desc: "Not just a mark - a full system. Primary, secondary, icon variants, and usage rules that keep every touchpoint on-model.",
  },
  {
    tag: "VISUAL SYSTEM",
    title: "Colors, type, and motion",
    desc: "We build brand worlds with defined palettes, typography pairings, and motion principles that make every asset feel intentional.",
  },
  {
    tag: "BRAND WORLDS",
    title: "From brief to brand bible",
    desc: "End-to-end identity work. Competitive research, positioning, visual exploration, final delivery. One package, one vision.",
  },
]

const PROCESS = [
  { step: "01", label: "Brief", desc: "Define brand positioning, audience, and tone before any design starts." },
  {
    step: "02",
    label: "Explore",
    desc: "2-3 distinct visual directions presented with rationale. You choose one path.",
  },
  { step: "03", label: "Refine", desc: "Sharpen the chosen direction across all required touchpoints." },
  { step: "04", label: "Delivery", desc: "Full brand file kit - SVG, PNG, PDF - plus a brand guide PDF." },
]

export default function BrandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white">
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400">
              Branding & Visual Identity
            </div>
            <h1 className="mb-6 font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl lg:text-6xl">
              <span className="block text-white">Brand Systems</span>
              <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-red-400 bg-clip-text text-transparent">
                Built to Scale
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/60 md:text-xl">
              Logos, visual systems, and brand worlds for teams that demand consistency. We lock the direction, then
              build every asset on-model.
            </p>
            <div className="mt-8">
              <WaCtaButton source="branding-cta" label="Start Your Brand" />
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-3">
              {FEATURES.map((feature) => (
                <div
                  key={feature.tag}
                  className="liquid-glass rounded-2xl border border-white/10 p-6 transition-all hover:border-red-500/30"
                >
                  <p className="mb-2 text-[10px] uppercase tracking-widest text-red-400">{feature.tag}</p>
                  <h3 className="mb-3 text-lg font-bold text-white">{feature.title}</h3>
                  <p className="text-sm text-white/50">{feature.desc}</p>
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
                  <p className="mb-3 text-4xl font-black text-red-500/30">{item.step}</p>
                  <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-white">{item.label}</h4>
                  <p className="text-xs text-white/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 text-center">
          <div className="container mx-auto max-w-2xl rounded-2xl border border-white/10 p-10 liquid-glass">
            <p className="mb-3 text-[10px] uppercase tracking-widest text-red-400">Pricing</p>
            <h2 className="mb-4 text-2xl font-extrabold text-white md:text-3xl">Ready to build?</h2>
            <p className="mb-8 text-sm text-white/50">
              Starter at $299 - Professional at $699 - Premium at $2,049. All plans include revisions.
            </p>
            <WaCtaButton source="branding-cta" label="Book a Call" />
          </div>
        </section>
      </main>
      <AppverseFooter />
    </>
  )
}
