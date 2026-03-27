import type { Metadata } from "next"
import { AppverseFooter } from "@/components/appverse-footer"
import { SiteHeader } from "@/components/site-header"
import { WaCtaButton } from "@/components/wa-cta-button"
import { createServiceMetadata } from "@/lib/service-metadata"

export function generateMetadata(): Metadata {
  return createServiceMetadata({
    path: "/cinematic-ads",
    title: "Cinematic Ads & UGC | DANVERSE",
    description:
      "High-impact vertical and horizontal ad creatives for TikTok, Reels, and paid campaigns. Built to stop the scroll and convert attention into action.",
  })
}

const FEATURES = [
  {
    tag: "PERFORMANCE",
    title: "Ads that convert",
    desc: "Every frame is engineered to capture attention within the first 2 seconds. We build for the algorithm and the human at the same time.",
  },
  {
    tag: "PLATFORM-NATIVE",
    title: "Built for TikTok, Reels & Meta",
    desc: "We shoot and edit natively for each platform. Aspect ratios, pacing, captions - optimized for how people actually consume content.",
  },
  {
    tag: "SCALE",
    title: "Volume without quality drops",
    desc: "Need 10 variations from one shoot? That's the plan. Our systems turn one brief into a full content calendar.",
  },
]

const PROCESS = [
  { step: "01", label: "Brief", desc: "Lock direction, tone, and target audience before a single frame is shot." },
  { step: "02", label: "Design", desc: "Storyboard, shoot plan, and edit structure reviewed and approved." },
  { step: "03", label: "Review", desc: "Two revision rounds. Feedback handled fast, no back-and-forth spirals." },
  { step: "04", label: "Delivery", desc: "Final files in every format you need - platform-ready, same week." },
]

export default function CinematicAdsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white">
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400">
              Cinematic Ads & UGC
            </div>
            <h1 className="mb-6 font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl lg:text-6xl">
              <span className="block text-white">Ads That</span>
              <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-red-400 bg-clip-text text-transparent">
                Stop the Scroll
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/60 md:text-xl">
              High-impact vertical and horizontal videos built for TikTok, Reels, and paid campaigns. Every shot has a
              purpose. Every edit has a reason.
            </p>
            <div className="mt-8">
              <WaCtaButton source="cinematic-ads-cta" label="Start Your Project" />
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
            <WaCtaButton source="cinematic-ads-cta" label="Book a Call" />
          </div>
        </section>
      </main>
      <AppverseFooter />
    </>
  )
}
