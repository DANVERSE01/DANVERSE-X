"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap"

const STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "Market, audience, competition. We find the gap before we design anything.",
    detail: "Brand audits · Market research · Audience mapping · Competitive analysis",
  },
  {
    num: "02",
    title: "Define",
    desc: "Strategy crystallized. Every visual decision from here is backed by evidence, not preference.",
    detail: "Brand positioning · Creative brief · Visual direction · System architecture",
  },
  {
    num: "03",
    title: "Design",
    desc: "Craft-level execution. Motion, type, color, and space — unified.",
    detail: "Identity systems · Motion design · Digital production · Content systems",
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Delivered, documented, and production-ready. No loose ends.",
    detail: "Asset delivery · Brand guidelines · Team handoff · Ongoing support",
  },
]

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<SVGLineElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()

    const ctx = gsap.context(() => {
      STEPS.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: `top+=${i * 25}% center`,
          end: `top+=${(i + 1) * 25}% center`,
          onEnter() {
            setActiveStep(i)
          },
          onEnterBack() {
            setActiveStep(i)
          },
        })
      })

      const line = lineRef.current
      if (line) {
        const len = line.getTotalLength?.() ?? 1000
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
        ScrollTrigger.create({
          trigger: section,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
          onUpdate(self) {
            gsap.set(line, { strokeDashoffset: len * (1 - self.progress) })
          },
        })
      }

      const cards = gsap.utils.toArray<HTMLElement>(".process-card")
      gsap.set(cards, { opacity: 0, y: 24 })

      ScrollTrigger.create({
        trigger: section,
        start: "top 72%",
        once: true,
        onEnter() {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power4.out",
          })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="process-ref-section">
      <div className="ref-section-header">
        <span>[ 04 ]</span>
        <h2>How it works</h2>
        <p>Four-step production protocol</p>
      </div>

      <div className="process-line">
        <svg aria-hidden="true" viewBox="0 0 1000 2" preserveAspectRatio="none">
          <line
            ref={lineRef}
            x1="0"
            y1="1"
            x2="1000"
            y2="1"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="process-grid">
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className={`process-card${activeStep === i ? " is-active" : ""}`}
          >
            <span>{step.num}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
            <strong>{step.detail}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}
