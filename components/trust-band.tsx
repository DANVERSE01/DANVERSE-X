"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { resolveCtaHref } from "@/lib/cta"
import { GENERAL_BRIEF_CTA, GENERAL_DISCOVERY_CTA } from "@/lib/site-ctas"
import { TextReveal } from "@/components/text-reveal"
import { useGsapEnter } from "@/hooks/use-gsap-enter"

const TRUST_METRICS = [
  {
    label: "Response Time",
    value: "24-48h",
    displayValue: "24",
    suffix: "–48h",
    detail: "The first reply comes back with direction, scope pressure, and the strongest next move.",
    color: "var(--color-electric-blue)",
  },
  {
    label: "Delivery Timeline",
    value: "7-21 Days",
    displayValue: "7",
    suffix: "–21 Days",
    detail: "Ads move fast. Identity systems and launch pages run on the timeline the handoff actually needs.",
    color: "var(--color-hot-pink)",
  },
  {
    label: "Handoff Standard",
    value: "Production-Ready",
    displayValue: null,
    suffix: null,
    detail: "Ratios, rollout assets, and decision clarity ship together so the team can move without re-briefing.",
    color: "var(--color-acid-lime)",
  },
] as const

const TRUST_CHIPS = ["Director-Led Review", "WhatsApp-First Intake", "Commercially Sharp Direction"] as const

/** Counts up from 0 to `end` when `active` becomes true */
function useCountUp(end: number, duration = 1200, active = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let startTime: number | null = null
    let rafId: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out-expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.round(eased * end))
      if (progress < 1) rafId = requestAnimationFrame(step)
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [active, end, duration])

  return count
}

function MetricCard({
  metric,
  index,
}: {
  metric: (typeof TRUST_METRICS)[number]
  index: number
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const numericEnd = metric.displayValue ? parseInt(metric.displayValue, 10) : 0
  const count = useCountUp(numericEnd, 1100, inView)

  return (
    <motion.article
      ref={ref}
      key={metric.label}
      className="brand-card group relative cursor-default rounded-[1.35rem] border-white/10 px-4 py-4 sm:px-5"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      whileHover={{ y: -4, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } }}
    >
      {/* Colour accent bar at top */}
      <div
        className="absolute left-4 right-4 top-0 h-px rounded-full opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)` }}
      />

      <p
        className="section-label"
        style={{ color: metric.color }}
      >
        {metric.label}
      </p>

      <p className="mt-3 text-[1.55rem] font-bold tracking-[-0.05em] text-white">
        {metric.displayValue ? (
          <>
            <motion.span
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {inView ? count : 0}
            </motion.span>
            {metric.suffix}
          </>
        ) : (
          metric.value
        )}
      </p>

      <p className="mt-2 text-sm leading-6 text-white/62">{metric.detail}</p>

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.35rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${metric.color}18 0%, transparent 70%)`,
          boxShadow: `inset 0 1px 0 ${metric.color}22`,
        }}
      />
    </motion.article>
  )
}

export function TrustBand() {
  const panelRef = useGsapEnter<HTMLDivElement>({ preset: "scale-in", start: "top 88%" })

  return (
    <section
      id="trust"
      aria-label="Studio trust signals"
      data-analytics-section="trust-signals"
      className="section-shell relative py-6 sm:py-8"
    >
      <div className="content-shell">
        <div
          ref={panelRef}
          className="mx-auto grid max-w-[1120px] gap-4 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(155deg,rgba(11,14,20,0.82),rgba(18,23,34,0.72),rgba(16,10,16,0.74))] p-4 shadow-[0_24px_72px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center"
        >
          <div className="space-y-4">
            <div>
              <p className="section-label">Trust Layer</p>
              <TextReveal
                as="h2"
                type="chars"
                preset="clip-up"
                stagger={0.02}
                className="mt-3 text-[clamp(1.5rem,4vw,2.35rem)] font-bold leading-[0.96] tracking-[-0.045em] text-white"
              >
                The answers serious buyers ask for before they approve the call.
              </TextReveal>
            </div>

            <p className="body-copy max-w-[42ch] text-sm leading-7 sm:text-[0.98rem]">
              Reply speed, delivery range, and handoff standard are clear before the brief starts, so the first
              conversation can stay on direction instead of logistics.
            </p>

            <motion.div
              className="flex flex-wrap gap-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {TRUST_CHIPS.map((chip) => (
                <motion.span
                  key={chip}
                  variants={{
                    hidden: { opacity: 0, scale: 0.88, y: 8 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
                  }}
                  className="accent-chip px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/78"
                >
                  {chip}
                </motion.span>
              ))}
            </motion.div>

            <div className="grid gap-3 sm:grid-cols-2">
              <motion.a
                href={resolveCtaHref(GENERAL_BRIEF_CTA)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[1.25rem] border border-[rgba(224,231,91,0.18)] bg-[rgba(224,231,91,0.06)] px-4 py-4 transition-colors hover:border-[rgba(224,231,91,0.32)] hover:bg-[rgba(224,231,91,0.09)]"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-sm font-semibold text-white">{GENERAL_BRIEF_CTA.label}</p>
                <p className="mt-2 text-[0.76rem] leading-6 text-white/66">{GENERAL_BRIEF_CTA.whatHappensText}</p>
              </motion.a>
              <motion.a
                href={resolveCtaHref(GENERAL_DISCOVERY_CTA)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 transition-colors hover:border-white/18 hover:bg-white/[0.05]"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-sm font-semibold text-white">{GENERAL_DISCOVERY_CTA.label}</p>
                <p className="mt-2 text-[0.76rem] leading-6 text-white/66">{GENERAL_DISCOVERY_CTA.whatHappensText}</p>
              </motion.a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {TRUST_METRICS.map((metric, index) => (
              <MetricCard key={metric.label} metric={metric} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
