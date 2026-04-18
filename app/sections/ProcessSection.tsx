"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap"

const STEPS = [
  {
    num: "01",
    title: "Observe",
    desc: "The brand is studied before it is named. Context, market pressure, and visual debt are made visible.",
    detail: "Audit / Research / Reference control",
  },
  {
    num: "02",
    title: "Form",
    desc: "A visual grammar is built around what the work must hold, not what the feed expects.",
    detail: "Direction / System / Image rules",
  },
  {
    num: "03",
    title: "Move",
    desc: "Motion, interaction, and scroll timing are tuned until the experience feels inevitable.",
    detail: "Film / Interaction / Release rhythm",
  },
  {
    num: "04",
    title: "Release",
    desc: "Files, pages, and campaign surfaces leave the room only when they behave as one object.",
    detail: "Delivery / QA / Handoff",
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
          end: "top 25%",
          scrub: 1.5,
          onUpdate(self) {
            gsap.set(line, { strokeDashoffset: len * (1 - self.progress) })
          },
        })
      }

      const cards = gsap.utils.toArray<HTMLElement>(".method-card")
      gsap.set(cards, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: section,
        start: "top 72%",
        once: true,
        onEnter() {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power4.out",
          })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="method-section">
      <div className="method-section__header">
        <div>
          <div className="section-kicker">
            <span>[ 05 ]</span>
            <span>Method</span>
          </div>
          <h2>
            Release
            <br />
            follows
            <br />
            formation
          </h2>
        </div>
        <p>
          The process is quiet on purpose. Each stage removes noise until the final surface has nowhere left to drift.
        </p>
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
          <article
            key={step.num}
            className={`method-card${activeStep === i ? " is-active" : ""}`}
          >
            <span>{step.num}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
            <strong>{step.detail}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}
