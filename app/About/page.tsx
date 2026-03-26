import { SiteHeader } from "../../components/site-header"
import { AppverseFooter } from "../../components/appverse-footer"
import { Button } from "../../components/ui/button"
import { AnimatedCounter } from "@/components/AnimatedCounter"
import { WaCtaButton } from "@/components/wa-cta-button"

// ── Data ───────────────────────────────────────────────────────────────────
const PHILOSOPHY = [
  {
    tag: "DIRECTION FIRST",
    title: "Lock before you build",
    desc: "Every project starts with a creative direction session. We define the tone, audience, and visual language before a single frame is captured or a pixel is placed. Ambiguity is the enemy of great creative.",
  },
  {
    tag: "SYSTEMS THINKING",
    title: "Output that repeats",
    desc: "We build creative systems, not one-off pieces. Brand rules, edit templates, and AI workflows that make every next deliverable faster and more consistent than the last.",
  },
  {
    tag: "PRECISION",
    title: "Details ship with the work",
    desc: "Color grade, typography hierarchy, motion easing — these are not afterthoughts. They are the difference between work that looks premium and work that just exists.",
  },
]

const STATS = [
  { target: 120, suffix: "+", label: "Projects delivered" },
  { target: 98,  suffix: "%", label: "On-time rate" },
  { target: 5,   suffix: "★", label: "Avg. client rating" },
  { target: 3,   suffix: "x", label: "Avg. ROAS on ad content" },
]

const PROCESS = [
  { step: "01", label: "Brief",     desc: "Goal, audience, deadline. We ask the questions most studios skip — platform context, competitor gaps, tone constraints." },
  { step: "02", label: "Direction", desc: "Creative direction locked in writing before execution starts. Reference board, format plan, asset list." },
  { step: "03", label: "Build",     desc: "Execution with visibility. Shoot, edit, design, or develop — you see work in progress, not just a final drop." },
  { step: "04", label: "Review",    desc: "Two structured revision rounds. Feedback collected clearly, actioned fast. No email chains with 12 stakeholders." },
  { step: "05", label: "Delivery",  desc: "Final files in every format needed — platform-ready, organized, labeled. Plus a handoff note with usage guidance." },
]

// ── Page ───────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white">

        {/* Hero Identity */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 uppercase tracking-widest animate-fade-in-up">
              About DANVERSE
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 uppercase animate-fade-in-up animate-fade-in-up-delay-1">
              <span className="block text-white">A Creative Studio</span>
              <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-red-400 bg-clip-text text-transparent">
                Built for Output
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-fade-in-up-delay-2">
              DANVERSE is not an agency. It&apos;s a creative operating system — built around locked direction,
              repeatable systems, and cinematic execution for brands that cannot afford to look average.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-up animate-fade-in-up-delay-3">
              <WaCtaButton source="about-hero-cta" label="Initialize a Project" />
              <Button asChild variant="outline" size="lg" className="rounded-full border-white/20 bg-white/5 px-8 text-white font-medium hover:bg-white/10 transition-all">
                <a href="#process">See How We Work</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Philosophy — 3 glass cards */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <p className="text-center text-[11px] tracking-widest text-red-400 uppercase mb-10">Philosophy</p>
            <div className="grid gap-6 md:grid-cols-3">
              {PHILOSOPHY.map((card) => (
                <div key={card.tag} className="liquid-glass rounded-2xl p-7 border border-white/10 hover:border-red-500/30 transition-all flex flex-col gap-4">
                  <p className="text-[10px] tracking-widest text-red-400 uppercase">{card.tag}</p>
                  <h3 className="font-display text-xl font-bold text-white">{card.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Studio Numbers — Intersection Observer counter animation */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <p className="text-center text-[11px] tracking-widest text-red-400 uppercase mb-12">By the Numbers</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="liquid-glass rounded-2xl p-6 border border-white/10 text-center">
                  <p className="font-display text-4xl md:text-5xl font-black text-white">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs text-white/40 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process — horizontal timeline */}
        <section id="process" className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <p className="text-center text-[11px] tracking-widest text-red-400 uppercase mb-4">How We Work</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white text-center uppercase tracking-tight mb-16">
              The Process
            </h2>
            <div className="relative">
              {/* Connecting line — desktop only */}
              <div className="hidden lg:block absolute top-[28px] left-[calc(10%+1rem)] right-[calc(10%+1rem)] h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
                {PROCESS.map((p) => (
                  <div key={p.step} className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full liquid-glass border border-red-500/30 mb-5">
                      <span className="text-xs font-black text-red-400 tracking-widest">{p.step}</span>
                    </div>
                    <h4 className="font-display text-sm font-bold text-white uppercase tracking-widest mb-2">{p.label}</h4>
                    <p className="text-xs text-white/40 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 text-center">
          <div className="container mx-auto max-w-2xl liquid-glass rounded-2xl border border-white/10 p-10">
            <p className="text-[11px] tracking-widest text-red-400 uppercase mb-4">Ready?</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-4 uppercase">
              Let&apos;s Build Something Bold
            </h2>
            <p className="text-white/50 mb-8 text-sm max-w-md mx-auto">One conversation. Direction locked. Work starts within 48 hours.</p>
            <WaCtaButton source="about-cta" />
          </div>
        </section>

      </main>
      <AppverseFooter />
    </>
  )
}
