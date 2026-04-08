"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { TextReveal } from "@/components/text-reveal"
import { resolveCtaHref } from "@/lib/cta"
import { contactEmailHref, createWhatsAppUrl, publicEnv } from "@/lib/public-env"
import { GENERAL_DISCOVERY_CTA } from "@/lib/site-ctas"
import { useGsapEnter } from "@/hooks/use-gsap-enter"

const OFFER_OPTIONS = ["Hero product", "New launch", "Founder brand", "Sales page"] as const
const AUDIENCE_OPTIONS = ["Cold paid traffic", "Premium consumer", "B2B buyer", "Existing community"] as const
const BOTTLENECK_OPTIONS = ["Weak hook", "Weak trust", "Weak clarity", "No rollout system"] as const
const DEADLINE_OPTIONS = ["This week", "In 2 weeks", "This month", "Planned launch"] as const

export function BriefQualifier() {
  const [offer, setOffer] = useState<(typeof OFFER_OPTIONS)[number]>("Hero product")
  const [audience, setAudience] = useState<(typeof AUDIENCE_OPTIONS)[number]>("Cold paid traffic")
  const [bottleneck, setBottleneck] = useState<(typeof BOTTLENECK_OPTIONS)[number]>("Weak hook")
  const [deadline, setDeadline] = useState<(typeof DEADLINE_OPTIONS)[number]>("In 2 weeks")
  const panelRef = useGsapEnter<HTMLDivElement>({ preset: "scale-in", start: "top 88%" })
  const leftRef = useGsapEnter<HTMLDivElement>({ preset: "blur-rise", stagger: 0.14, childSelector: "[data-gsap-item]", start: "top 85%" })
  const rightRef = useGsapEnter<HTMLDivElement>({ preset: "clip-bottom", start: "top 85%" })

  const message = useMemo(
    () =>
      [
        "Hi DANVERSE,",
        "",
        "I want to start the 4-point brief.",
        `Offer: ${offer}`,
        `Audience: ${audience}`,
        `Bottleneck: ${bottleneck}`,
        `Deadline: ${deadline}`,
        "",
        "Send the strongest next move and the right scope.",
      ].join("\n"),
    [audience, bottleneck, deadline, offer]
  )

  return (
    <section
      id="brief-planner"
      aria-label="Project brief qualifier"
      data-analytics-section="brief-qualifier"
      className="section-shell relative overflow-hidden py-[var(--section-block)]"
    >
      <div className="content-shell">
        <div ref={panelRef} className="statement-panel mx-auto max-w-[1120px] rounded-[2rem] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <div ref={leftRef}>
              <p data-gsap-item className="section-label">4-Point Brief</p>
              <TextReveal
                as="h2"
                type="chars"
                preset="clip-up"
                stagger={0.02}
                className="section-heading mt-4 max-w-[11ch] text-white"
              >
                Send the four answers that decide the next move.
              </TextReveal>
              <p data-gsap-item className="body-copy mt-4 max-w-[40ch] text-[0.98rem] leading-7">
                Tell us what is being sold, who needs to care first, what is blocking response, and when the work has
                to move. The first reply comes back with direction, scope pressure, and the right next step.
              </p>

              <div data-gsap-item className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <MetricCard label="Response Time" value="24-48h" note="Direction first, not a generic reply." />
                <MetricCard label="What You Send" value="4 Answers" note="Offer, audience, bottleneck, and deadline." />
                <MetricCard label="Channel" value="WhatsApp" note={`Fastest route to ${publicEnv.NEXT_PUBLIC_CONTACT_EMAIL}.`} />
              </div>
            </div>

            <div ref={rightRef} className="grid gap-6 rounded-[1.75rem] border border-white/10 bg-[rgba(7,10,16,0.4)] p-4 sm:p-6">
              <QualifierGroup
                label="What needs to move?"
                options={OFFER_OPTIONS}
                value={offer}
                onChange={setOffer}
              />
              <QualifierGroup
                label="Who needs to act first?"
                options={AUDIENCE_OPTIONS}
                value={audience}
                onChange={setAudience}
              />
              <QualifierGroup
                label="What is blocking response?"
                options={BOTTLENECK_OPTIONS}
                value={bottleneck}
                onChange={setBottleneck}
              />
              <QualifierGroup
                label="When does it have to move?"
                options={DEADLINE_OPTIONS}
                value={deadline}
                onChange={setDeadline}
              />

              <div className="rounded-[1.5rem] border border-white/10 bg-black/18 p-4">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/38">Brief Preview</p>
                <pre className="mt-3 whitespace-pre-wrap font-[var(--font-body)] text-sm leading-7 text-white/78">
                  {message}
                </pre>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="cta-primary flex-1 rounded-full text-white">
                    <a href={createWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer">
                      Send the 4-Point Brief on WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="cta-secondary flex-1 rounded-full text-white">
                    <a href={resolveCtaHref(GENERAL_DISCOVERY_CTA)} target="_blank" rel="noopener noreferrer">
                      {GENERAL_DISCOVERY_CTA.label}
                    </a>
                  </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <MetaCard
                    duration="Under 3 minutes"
                    text="WhatsApp opens with the four selected answers already loaded, so the first reply can start with direction instead of clarification."
                  />
                  <MetaCard duration={GENERAL_DISCOVERY_CTA.durationLabel} text={GENERAL_DISCOVERY_CTA.whatHappensText} />
                </div>
              </div>

              <p className="text-sm leading-7 text-white/58">
                Prefer email?{" "}
                <a href={contactEmailHref} className="accent-link text-white">
                  Send the same 4-point brief to {publicEnv.NEXT_PUBLIC_CONTACT_EMAIL}
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

function MetaCard({ duration, text }: { duration: string; text: string }) {
  return (
    <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.03] px-4 py-4">
      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-acid-lime)]">{duration}</p>
      <p className="mt-2 text-sm leading-6 text-white/66">{text}</p>
    </div>
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
              value === option ? "cta-primary text-white" : "cta-secondary text-white/78 hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
