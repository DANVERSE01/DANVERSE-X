"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { contactEmailHref, createWhatsAppUrl, publicEnv } from "@/lib/public-env"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const SERVICE_OPTIONS = [
  "Cinematic Ads",
  "Brand Systems",
  "Launch Pages",
  "AI Content Engine",
] as const

const TIMELINE_OPTIONS = ["This Week", "2-4 Weeks", "This Quarter"] as const

const PRIORITY_OPTIONS = ["Need premium perception", "Need a launch system", "Need content velocity"] as const

export function BriefQualifier() {
  const [service, setService] = useState<(typeof SERVICE_OPTIONS)[number]>("Cinematic Ads")
  const [timeline, setTimeline] = useState<(typeof TIMELINE_OPTIONS)[number]>("2-4 Weeks")
  const [priority, setPriority] = useState<(typeof PRIORITY_OPTIONS)[number]>("Need premium perception")

  const message = useMemo(
    () =>
      [
        "Hi DANVERSE,",
        "",
        "I want to start a project.",
        `Service: ${service}`,
        `Timeline: ${timeline}`,
        `Priority: ${priority}`,
        "",
        "Send me the best next step for the brief.",
      ].join("\n"),
    [priority, service, timeline]
  )

  return (
    <section
      id="brief-planner"
      aria-label="Project brief qualifier"
      data-analytics-section="brief-qualifier"
      className="section-shell relative overflow-hidden py-[var(--section-block)]"
    >
      <div className="content-shell">
        <div className="statement-panel mx-auto max-w-[1120px] rounded-[2rem] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <div>
              <p className="section-label">Brief Qualifier</p>
              <h2 className="section-heading mt-4 max-w-[10ch] text-white">
                Shape the first conversation before we even reply.
              </h2>
              <p className="body-copy mt-4 max-w-[38ch] text-[0.98rem] leading-7">
                This replaces vague outreach with a clearer project signal. Choose the kind of work, the timeline, and
                the pressure point so the first response already sounds prepared.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <MetricCard label="Response Window" value="24h" note="First recommendation, not just a greeting." />
                <MetricCard label="Typical Scope" value="1 Brief" note="One direction across ads, pages, and rollout assets." />
                <MetricCard
                  label="Preferred Channel"
                  value="WhatsApp"
                  note={`Fastest path to ${publicEnv.NEXT_PUBLIC_CONTACT_EMAIL}.`}
                />
              </div>
            </div>

            <div className="grid gap-6 rounded-[1.75rem] border border-white/10 bg-[rgba(7,10,16,0.4)] p-4 sm:p-6">
              <QualifierGroup
                label="What are you building?"
                options={SERVICE_OPTIONS}
                value={service}
                onChange={setService}
              />
              <QualifierGroup
                label="When does it need to move?"
                options={TIMELINE_OPTIONS}
                value={timeline}
                onChange={setTimeline}
              />
              <QualifierGroup
                label="What matters most?"
                options={PRIORITY_OPTIONS}
                value={priority}
                onChange={setPriority}
              />

              <div className="rounded-[1.5rem] border border-white/10 bg-black/18 p-4">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/38">Brief Preview</p>
                <pre className="mt-3 whitespace-pre-wrap font-[var(--font-body)] text-sm leading-7 text-white/78">
                  {message}
                </pre>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  className="cta-primary flex-1 rounded-full text-white"
                  onClick={() => fireCTAAndOpenWhatsApp("brief-qualifier-cta", message)}
                >
                  Send This Brief
                </Button>
                <Button asChild variant="outline" className="cta-secondary flex-1 rounded-full text-white">
                  <Link href={createWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer">
                    Open in WhatsApp
                  </Link>
                </Button>
              </div>

              <p className="text-sm leading-7 text-white/58">
                Prefer email?{" "}
                <a href={contactEmailHref} className="accent-link text-white">
                  Send the same brief to {publicEnv.NEXT_PUBLIC_CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="brand-card rounded-[1.25rem] border-white/10 px-4 py-4">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/38">{label}</p>
      <p className="mt-2 text-[1.4rem] font-bold tracking-[-0.04em] text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-white/62">{note}</p>
    </div>
  )
}

function QualifierGroup<T extends string>({
  label,
  onChange,
  options,
  value,
}: {
  label: string
  onChange: (value: T) => void
  options: readonly T[]
  value: T
}) {
  return (
    <div>
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/42">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
              value === option
                ? "cta-primary text-white"
                : "cta-secondary text-white/78 hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
