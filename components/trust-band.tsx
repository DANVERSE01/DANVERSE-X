import Link from "next/link"
import { contactEmailHref, createWhatsAppUrl } from "@/lib/env"

const TRUST_METRICS = [
  {
    label: "Reply Window",
    value: "24h",
    detail: "Clear brief reply and first recommendation.",
  },
  {
    label: "Delivery Rhythm",
    value: "5-15 Days",
    detail: "Fast lanes for ads, deeper tracks for launch systems.",
  },
  {
    label: "Launch Coverage",
    value: "Multi-Ratio",
    detail: "Vertical, square, widescreen, and rollout-ready exports.",
  },
] as const

const TRUST_CHIPS = ["Director-Led QA", "Launch-Ready Handoff", "WhatsApp-First Support"] as const

export function TrustBand() {
  return (
    <section
      id="trust"
      aria-label="Studio trust signals"
      data-analytics-section="trust-signals"
      className="section-shell relative py-6 sm:py-8"
    >
      <div className="content-shell">
        <div className="mx-auto grid max-w-[1120px] gap-4 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(155deg,rgba(11,14,20,0.82),rgba(18,23,34,0.72),rgba(16,10,16,0.74))] p-4 shadow-[0_24px_72px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center">
          <div className="space-y-4">
            <div>
              <p className="section-label">Trust Layer</p>
              <h2 className="mt-3 text-[clamp(1.5rem,4vw,2.35rem)] font-bold leading-[0.96] tracking-[-0.045em] text-white">
                Enough proof to move forward before the call starts.
              </h2>
            </div>

            <p className="body-copy max-w-[42ch] text-sm leading-7 sm:text-[0.98rem]">
              The site now surfaces the same signals clients ask for in the first conversation: response speed,
              delivery rhythm, and the handoff standard.
            </p>

            <div className="flex flex-wrap gap-2">
              {TRUST_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="accent-chip px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/78"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <Link href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="accent-link text-white">
                Start the Brief
              </Link>
              <a href={contactEmailHref} className="accent-link text-white/72 transition-colors hover:text-white">
                {contactEmailHref.replace("mailto:", "")}
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {TRUST_METRICS.map((metric) => (
              <article
                key={metric.label}
                className="brand-card rounded-[1.35rem] border-white/10 px-4 py-4 sm:px-5"
              >
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-white/42">{metric.label}</p>
                <p className="mt-3 text-[1.55rem] font-bold tracking-[-0.05em] text-white">{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-white/62">{metric.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
