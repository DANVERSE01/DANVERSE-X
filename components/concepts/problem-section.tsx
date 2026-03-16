"use client"
import { useEffect, useRef } from "react"

const STATS = [
  { num: "0.8s", label: "Average scroll attention span" },
  { num: "83%",  label: "Of digital ads go completely unseen" },
  { num: "4.2x", label: "Average DANVERSE client ROAS" },
]

export function ProblemSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".clip-reveal")
    if (!els) return
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible") }), { threshold: 0.15 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ minHeight: "100vh", background: "#060606", borderTop: "1px solid rgba(255,255,255,0.04)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", alignItems: "center", padding: "80px clamp(24px, 6vw, 80px)", gap: "60px" }}>
      <div className="clip-reveal" style={{ transitionDelay: "0s" }}>
        <p style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "6px", textTransform: "uppercase", color: "#e63c2f", marginBottom: "20px" }}>
          INT. THE PROBLEM -- DIGITAL SPACE
        </p>
        <h2 style={{ fontFamily: "Bebas Neue, Arial Black, sans-serif", fontSize: "clamp(40px, 7vw, 76px)", lineHeight: 0.88, color: "#fff", marginBottom: "24px" }}>
          83% of ads<br />die in<br />
          <span style={{ color: "#e63c2f" }}>0.8 seconds.</span>
        </h2>
        <p style={{ fontFamily: "Courier Prime, monospace", fontSize: "13px", lineHeight: 1.9, color: "rgba(255,255,255,0.35)", maxWidth: "40ch" }}>
          Not because the product is wrong.<br />
          Because the story was never written.<br /><br />
          DANVERSE engineers cinematic ads that stop the scroll -- before the brain decides to move on.
        </p>
      </div>
      <div className="clip-reveal" style={{ transitionDelay: "0.15s" }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{ padding: "24px 0", borderBottom: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <div style={{ fontFamily: "Bebas Neue, Arial Black, sans-serif", fontSize: "clamp(52px,9vw,88px)", color: "#e63c2f", lineHeight: 1, letterSpacing: "2px" }}>{s.num}</div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginTop: "4px" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
