import { SiteHeader } from "@/components/site-header"
import { WaCtaButton } from "@/components/wa-cta-button"
import { AppverseFooter } from "@/components/appverse-footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Websites & Landing Pages — DANVERSE",
  description:
    "Modern websites and landing pages with clean UI and smooth motion. Built for conversion. Deployed fast. Looks premium.",
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
    desc: "Single-page landers in 3–5 days. Multi-page sites in 1–2 weeks. Clear scope, fast execution.",
  },
]

const PROCESS = [
  { step: "01", label: "Brief",    desc: "Goals, audience, key pages, and desired actions locked before design starts." },
  { step: "02", label: "Design",   desc: "Full Figma mockup reviewed and approved. No surprises in dev." },
  { step: "03", label: "Review",   desc: "Staging link for feedback. Two rounds of revisions included." },
  { step: "04", label: "Delivery", desc: "Live deploy + handoff. Code repo access included on Pro and Premium." },
]

export default function WebsitesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white">
        {/* Hero */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 uppercase tracking-widest">
              Websites & Landing Pages
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 uppercase">
              <span className="block text-white">Sites That</span>
              <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-red-400 bg-clip-text text-transparent">
                Convert
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              Modern websites and landing pages with clean UI and purposeful motion. We build for results —
              fast load, strong structure, premium look.
            </p>
            <div className="mt-8">
              <WaCtaButton source="websites-cta" label="Start Your Site" />
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
            <WaCtaButton source="websites-cta" label="Book a Call" />
          </div>
        </section>
      </main>
      <AppverseFooter />
    </>
  )
}
