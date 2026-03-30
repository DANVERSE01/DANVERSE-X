"use client"
import { useEffect, useRef } from "react"

const STATS = [
  { num: "0.8s", label: "Average scroll attention span" },
  { num: "83%", label: "Of digital ads go completely unseen" },
  { num: "4.2x", label: "Average DANVERSE client ROAS" },
]

const SURFACE_BASE = "var(--color-surface-base)"
const TEXT_PRIMARY = "var(--color-text-primary)"
const TEXT_SECONDARY = "var(--color-text-secondary)"
const TEXT_MUTED = "var(--color-text-muted)"
const ACCENT_CORAL = "var(--color-accent-coral)"

export function ProblemSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".clip-reveal")
    if (!els) return
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible")
        }),
      { threshold: 0.15 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100svh",
        background: SURFACE_BASE,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,20rem),1fr))",
        alignItems: "center",
        padding: "clamp(3rem,10vw,5rem) clamp(1.5rem,6vw,5rem)",
        gap: "clamp(1.5rem,5vw,3.75rem)",
      }}
    >
      <div className="clip-reveal" style={{ transitionDelay: "0s" }}>
        <p
          style={{
            fontFamily: "Courier Prime,monospace",
            fontSize: "clamp(0.7rem,1.5vw,0.8rem)",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: ACCENT_CORAL,
            margin: "0 0 clamp(0.875rem,2vw,1.25rem)",
          }}
        >
          INT. THE PROBLEM -- DIGITAL SPACE
        </p>
        <h2
          style={{
            fontFamily: "Bebas Neue,Arial Black,sans-serif",
            fontSize: "clamp(2.5rem,8vw,4.75rem)",
            lineHeight: 0.88,
            color: TEXT_PRIMARY,
            margin: "0 0 clamp(1rem,2.5vw,1.5rem)",
          }}
        >
          83% of ads
          <br />
          die in
          <br />
          <span style={{ color: ACCENT_CORAL }}>0.8 seconds.</span>
        </h2>
        <p
          style={{
            fontFamily: "Courier Prime,monospace",
            fontSize: "clamp(0.875rem,2vw,0.95rem)",
            lineHeight: 1.9,
            color: TEXT_MUTED,
            maxWidth: "40ch",
            margin: 0,
          }}
        >
          Not because the product is wrong.
          <br />
          Because the story was never written.
          <br />
          <br />
          DANVERSE engineers cinematic ads that stop the scroll -- before the brain decides to move on.
        </p>
      </div>
      <div className="clip-reveal" style={{ transitionDelay: "0.15s" }}>
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "clamp(1rem,3vw,1.5rem) 0",
              borderBottom: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "Bebas Neue,Arial Black,sans-serif",
                fontSize: "clamp(3rem,10vw,5.5rem)",
                color: ACCENT_CORAL,
                lineHeight: 1,
                letterSpacing: "0.04em",
              }}
            >
              {s.num}
            </div>
            <div
              style={{
                fontFamily: "Courier Prime,monospace",
                fontSize: "clamp(0.7rem,1.5vw,0.8rem)",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: TEXT_SECONDARY,
                marginTop: "clamp(0.25rem,1vw,0.375rem)",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
