import { SiteHeader } from "@/components/site-header"
import { WaCtaButton } from "@/components/wa-cta-button"
import { AppverseFooter } from "@/components/appverse-footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Branding & Visual Identity — DANVERSE",
  description:
    "Logos, visual systems, hero graphics, and brand worlds built for brands that want to stand out. Identity that scales from social to OOH.",
}

const FEATURES = [
  {
    tag: "IDENTITY",
    title: "Logo systems that last",
    desc: "Not just a mark — a full system. Primary, secondary, icon variants, and usage rules that keep every touchpoint on-model.",
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
  { step: "01", label: "Brief",    desc: "Define brand positioning, audience, and tone before any design starts." },
  { step: "02", label: "Explore",  desc: "2–3 distinct visual directions presented with rationale. You choose one path." },
  { step: "03", label: "Refine",   desc: "Sharpen the chosen direction across all required touchpoints." },
  { step: "04", label: "Delivery", desc: "Full brand file kit — SVG, PNG, PDF — plus a brand guide PDF." },
]

export default function BrandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white">
        {/* Hero */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 uppercase tracking-widest">
              Branding & Visual Identity
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 uppercase">
              <span className="block text-white">Brand Systems</span>
              <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-red-400 bg-clip-text text-transparent">
                Built to Scale
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              Logos, visual systems, and brand worlds for teams that demand consistency. We lock the direction,
              then build every asset on-model.
            </p>
            <div className="mt-8">
              <WaCtaButton source="branding-cta" label="Start Your Brand" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-3">
              {FEATURES.map((f) => (
                <div
                  key={f.tag}
                  className="liquid-glass rounded-2xl p-6 border border-white/10 hover:border-red-500/30 transition-all"
                >
                  <p className="text-[10px] tracking-widest text-red-400 uppercase mb-2">{f.tag}</p>
                  <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-sm text-white/50">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-12 uppercase tracking-tight">
              The Process
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p) => (
                <div key={p.step} className="liquid-glass rounded-2xl p-6 border border-white/10">
                  <p className="text-4xl font-black text-red-500/30 mb-3">{p.step}</p>
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">{p.label}</h4>
                  <p className="text-xs text-white/50">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing CTA */}
        <section className="py-20 px-4 text-center">
          <div className="container mx-auto max-w-2xl liquid-glass rounded-2xl border border-white/10 p-10">
            <p className="text-[10px] tracking-widest text-red-400 uppercase mb-3">Pricing</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Ready to build?</h2>
            <p className="text-white/50 mb-8 text-sm">
              Starter at $299 · Professional at $699 · Premium at $2,049. All plans include revisions.
            </p>
            <WaCtaButton source="branding-cta" label="Book a Call" />
          </div>
        </section>
      </main>
      <AppverseFooter />
    </>
  )
}
