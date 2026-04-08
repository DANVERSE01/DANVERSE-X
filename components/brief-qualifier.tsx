"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { contactEmailHref, createWhatsAppUrl, publicEnv } from "@/lib/public-env"
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
  const leftRef = useGsapEnter<HTMLDivElement>({
    preset: "fade-up",
    stagger: 0.12,
    childSelector: "[data-gsap-item]",
    start: "top 86%",
  })
  const rightRef = useGsapEnter<HTMLDivElement>({ preset: "clip-bottom", start: "top 86%" })

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
      className="section-shell relative overflow-hidden bg-[var(--color-bg)] py-[var(--section-block)]"
    >
      <div className="content-shell">
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
          <div ref={leftRef}>
            <p data-gsap-item className="section-label">
              4-point brief
            </p>
            <h2 data-gsap-item className="section-heading mt-4 max-w-[11ch] text-white">
              Send the answers that decide the next move.
            </h2>
            <p data-gsap-item className="body-copy mt-5 max-w-[38ch] text-[0.98rem] leading-8">
              Tell us what is being sold, who needs to care first, what is blocking response, and when the work has to
              move. The first reply comes back with direction, scope pressure, and the right next step.
            </p>

            <div data-gsap-item className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <MetaLine label="Response" value="24-48h" note="Direction first, not a generic reply." />
              <MetaLine label="What you send" value="4 answers" note="Offer, audience, bottleneck, and deadline." />
              <MetaLine label="Preferred route" value="WhatsApp" note="Fastest path to a structured first reply." />
            </div>
          </div>

          <div ref={rightRef} className="brand-card rounded-[1.4rem] p-4 sm:p-6">
            <div className="grid gap-6">
              <QualifierGroup label="What needs to move?" options={OFFER_OPTIONS} value={offer} onChange={setOffer} />
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

              <div className="rounded-[1.1rem] border border-white/10 bg-black/16 p-4">
                <p className="section-label text-white/34">Brief preview</p>
                <pre className="mt-3 whitespace-pre-wrap font-[var(--font-body)] text-sm leading-7 text-white/78">
                  {message}
                </pre>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="flex-1">
                  <a href={createWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer">
                    Send the 4-point brief on WhatsApp
                  </a>
                </Button>
                <a href={contactEmailHref} className="accent-link text-sm leading-7 text-white/62 sm:max-w-[18rem]">
                  Prefer email? Send the same brief to {publicEnv.NEXT_PUBLIC_CONTACT_EMAIL}.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MetaLine({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="brand-card rounded-[1.05rem] px-4 py-4">
      <p className="section-label text-white/34">{label}</p>
      <p className="mt-2 text-[1.2rem] font-bold tracking-[-0.03em] text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-white/60">{note}</p>
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
      <p className="section-label text-white/34">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={`rounded-full px-4 py-2.5 text-sm transition ${
              value === option ? "cta-primary" : "cta-secondary text-white/78 hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
