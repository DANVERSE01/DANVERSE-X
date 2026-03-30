import Image from "next/image"
import { ArrowUpRight, Sparkles, Star } from "lucide-react"
import { createWhatsAppUrl } from "@/lib/env"

export function Features() {
  return (
    <section id="features" className="section-shell" data-analytics-section="Built Different">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-10 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center reveal-on-scroll" data-reveal>
          <span className="section-tag">Built Different</span>
          <h2 className="mt-7 text-balance text-[clamp(2.5rem,6vw,4.6rem)] font-black leading-[0.95]">
            Built different.
            <span className="headline-accent block">By design.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 text-[var(--platinum-muted)] sm:text-lg">
            Premium output only happens when strategy, execution, and quality control are locked before production
            starts. That discipline is what clients actually feel on screen.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="panel-surface reveal-on-scroll overflow-hidden rounded-[28px] p-6 sm:p-8" data-reveal>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[var(--gold-primary)]">
              Craft + Control
            </span>
            <h3 className="mt-4 text-3xl font-bold leading-tight text-[var(--platinum)] sm:text-[2.1rem]">
              Direction before a single frame gets approved.
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--platinum-muted)] sm:text-base">
              We define pacing, framing, ratios, and visual language upfront. That means fewer revisions, cleaner
              decision-making, and a sharper final cut.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] border border-white/10">
                <Image
                  src="/images/intuitive-1.webp"
                  alt="Precision product composition"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 260px, 45vw"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] border border-white/10">
                <Image
                  src="/images/intuitive-2.webp"
                  alt="Luxury detail study"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 260px, 45vw"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-[var(--platinum-muted)]">
              {["Brand alignment audit", "Visual direction brief", "Format and launch strategy"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--gold-primary)]" />
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="panel-surface reveal-on-scroll rounded-[28px] p-6 sm:p-8" data-reveal>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[var(--gold-primary)]">
              Client Feedback
            </span>
            <h3 className="mt-4 text-3xl font-bold leading-tight text-[var(--platinum)] sm:text-[2.1rem]">
              We ship launch-ready work, not almost-there drafts.
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--platinum-muted)] sm:text-base">
              Internal QA covers motion, pacing, copy, and format delivery before the work reaches you. The result is a
              cleaner approval cycle and a stronger final impression.
            </p>

            <div className="mt-8 rounded-[24px] border border-[rgba(201,168,76,0.18)] bg-[rgba(201,168,76,0.05)] p-5">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-[var(--gold-primary)] text-[var(--gold-primary)]" />
                ))}
              </div>
              <p className="mt-4 text-lg font-medium leading-7 text-[var(--platinum)]">
                Finished work. Structured revisions. Assets delivered in the ratios your team actually needs.
              </p>
              <span className="mt-4 block text-[0.68rem] uppercase tracking-[0.24em] text-[var(--gold-primary)]">
                Post-project feedback
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Image
                src="/images/top-rated-1.webp"
                width={420}
                height={320}
                alt="Storyboard and concept materials"
                className="h-full w-full rounded-[20px] border border-white/10 object-cover"
              />
              <Image
                src="/images/top-rated-2.webp"
                width={420}
                height={320}
                alt="Campaign presentation environment"
                className="h-full w-full rounded-[20px] border border-white/10 object-cover"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {["3 QA passes", "Motion review", "Format ready", "Source files delivered"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--platinum-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        </div>

        <article
          className="panel-surface reveal-on-scroll flex flex-col gap-6 rounded-[32px] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          data-reveal
        >
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.26em] text-[var(--gold-primary)]">
              <Sparkles className="h-4 w-4" />
              AI Content Systems
            </span>
            <h3 className="mt-4 text-3xl font-bold text-[var(--platinum)] sm:text-[2.2rem]">
              One brief. A complete content engine.
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--platinum-muted)] sm:text-base">
              Scripts, hooks, launch assets, and repurposed edits can all live inside the same system. DANVERSE builds
              the visual layer and the operating rhythm behind it.
            </p>
          </div>

          <a href={createWhatsAppUrl("Tell me more about DANVERSE AI content systems.")} className="btn-secondary" data-hover>
            Explore the System
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </article>
      </div>
    </section>
  )
}
