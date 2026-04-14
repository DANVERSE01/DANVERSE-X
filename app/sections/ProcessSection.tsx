"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "Deep research into market, audience, and competitive landscape. We find what everyone else missed.",
    detail: "Brand audits · Market research · Audience mapping · Competitive analysis",
  },
  {
    num: "02",
    title: "Define",
    desc: "Strategy becomes clarity. Every visual decision from here is backed by logic, not taste.",
    detail: "Brand positioning · Creative brief · Visual direction · System architecture",
  },
  {
    num: "03",
    title: "Design",
    desc: "Execution at craft level. Motion, type, color, and space working as one unified language.",
    detail: "Identity systems · Motion design · Digital production · Content systems",
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Launch with precision. Every asset delivered, documented, and ready to scale.",
    detail: "Asset delivery · Brand guidelines · Team handoff · Ongoing support",
  },
]

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])
  const svgLineRef = useRef<SVGLineElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    STEPS.forEach((_, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: `top+=${i * 25}% center`,
        end: `top+=${(i + 1) * 25}% center`,
        onEnter() { setActiveStep(i) },
        onEnterBack() { setActiveStep(i) },
      })

      const el = numbersRef.current[i]
      if (!el) return

      ScrollTrigger.create({
        trigger: section,
        start: `top+=${i * 25}% center`,
        end: `top+=${(i + 1) * 25}% center`,
        onEnter() {
          gsap.to(el, { scale: 1.4, duration: 0.5, ease: "power2.out" })
        },
        onLeave() {
          gsap.to(el, { scale: 1, duration: 0.4, ease: "power2.out" })
        },
        onEnterBack() {
          gsap.to(el, { scale: 1.4, duration: 0.5, ease: "power2.out" })
        },
        onLeaveBack() {
          gsap.to(el, { scale: 1, duration: 0.4, ease: "power2.out" })
        },
      })
    })

    // Animate connecting SVG line via stroke-dashoffset
    const line = svgLineRef.current
    if (line) {
      const len = line.getTotalLength?.() ?? 200
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        scrub: true,
        onUpdate(self) {
          gsap.set(line, { strokeDashoffset: len * (1 - self.progress) })
        },
      })
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#050507",
        padding: "clamp(6rem, 12vw, 14rem) clamp(1.5rem, 6vw, 6rem)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "5rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "#c8ff00",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Process — 04
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 800,
              color: "#f0f0f0",
              letterSpacing: "-0.05em",
              margin: "0.5rem 0 0",
            }}
          >
            How we work
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          {/* Connecting SVG line */}
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "2.75rem",
              top: 0,
              bottom: 0,
              width: "2px",
              height: "100%",
              zIndex: 0,
            }}
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
          >
            <line
              ref={svgLineRef}
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              stroke="rgba(200,255,0,0.3)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "6rem 1fr 1fr",
                  gap: "2rem",
                  padding: "3rem 0",
                  borderBottom: "1px solid rgba(200,255,0,0.06)",
                  position: "relative",
                  zIndex: 1,
                  opacity: activeStep === i ? 1 : 0.35,
                  transition: "opacity 0.5s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>
                  <span
                    ref={(el) => { numbersRef.current[i] = el }}
                    style={{
                      fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      fontWeight: 800,
                      color: activeStep === i ? "#c8ff00" : "rgba(240,240,240,0.15)",
                      letterSpacing: "-0.05em",
                      lineHeight: 1,
                      display: "block",
                      transformOrigin: "left center",
                      transition: "color 0.4s ease",
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
                      fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                      fontWeight: 800,
                      color: "#f0f0f0",
                      letterSpacing: "-0.04em",
                      margin: "0 0 1rem",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
                      color: "rgba(240,240,240,0.5)",
                      lineHeight: 1.75,
                      maxWidth: "28rem",
                    }}
                  >
                    {step.desc}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <AnimatePresence>
                    {activeStep === i && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.75rem",
                          color: "#c8ff00",
                          letterSpacing: "0.04em",
                          lineHeight: 2,
                        }}
                      >
                        {step.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
