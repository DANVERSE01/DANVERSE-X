"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(SplitText, ScrollTrigger)

const STATS = [
  { value: "40+", label: "Projects directed" },
  { value: "8", label: "Markets active" },
  { value: "3×", label: "Engagement lift" },
  { value: "12", label: "Systems shipped" },
]

function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const numPart = parseFloat(value.replace(/[^0-9.]/g, ""))
    const suffix = value.replace(/[0-9.]/g, "")

    const obj = { val: 0 }
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter() {
        gsap.to(obj, {
          val: numPart,
          duration: 1.6,
          ease: "power2.out",
          onUpdate() {
            el.textContent = Math.round(obj.val) + suffix
          },
        })
      },
    })

    return () => trigger.kill()
  }, [value])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <span
        ref={ref}
        style={{
          fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
          fontSize: "clamp(2.5rem, 5vw, 5rem)",
          fontWeight: 800,
          color: "#c8ff00",
          letterSpacing: "-0.05em",
          lineHeight: 1,
        }}
      >
        0
      </span>
      <span
        style={{
          fontFamily: "var(--font-body, 'Inter', sans-serif)",
          fontSize: "0.8125rem",
          color: "rgba(240,240,240,0.4)",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  )
}

export function AboutCinematic() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"])

  useEffect(() => {
    const h = headlineRef.current
    const section = sectionRef.current
    if (!h || !section) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const split = new SplitText(h, { type: "words" })
    gsap.set(split.words, { yPercent: 100, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: h,
      start: "top 75%",
      onEnter() {
        gsap.to(split.words, {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.05,
          ease: "power4.out",
        })
      },
    })

    // Pin left column while right scrolls
    const pin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: leftRef.current,
      pinSpacing: false,
    })

    return () => {
      trigger.kill()
      pin.kill()
      split.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#050507",
        padding: "clamp(6rem, 12vw, 14rem) clamp(1.5rem, 6vw, 6rem)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          maxWidth: "1400px",
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        {/* Left — pinned */}
        <div ref={leftRef} style={{ position: "sticky", top: "20vh" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                color: "#c8ff00",
                textTransform: "uppercase",
              }}
            >
              About — 01
            </span>
          </div>

          <h2
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 800,
              color: "#f0f0f0",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              margin: 0,
              overflow: "hidden",
            }}
          >
            We build what doesn&apos;t exist yet.
          </h2>

          <p
            style={{
              marginTop: "2rem",
              fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
              color: "rgba(240,240,240,0.5)",
              lineHeight: 1.75,
              maxWidth: "28rem",
            }}
          >
            Alexandria-based creative studio. We direct brand systems, motion, and digital
            experiences for clients who know the difference between good enough and unforgettable.
          </p>

          {/* Stats */}
          <div
            style={{
              marginTop: "3.5rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
            }}
          >
            {STATS.map((s) => (
              <StatCounter key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>

        {/* Right — scrollable */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Image with parallax */}
          <motion.div
            ref={imageRef}
            style={{
              y: imgY,
              aspectRatio: "4/5",
              background:
                "linear-gradient(135deg, rgba(200,255,0,0.06) 0%, rgba(5,5,7,1) 60%)",
              border: "1px solid rgba(200,255,0,0.08)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(200,255,0,0.015) 2px, rgba(200,255,0,0.015) 4px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "2rem",
                right: "2rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "rgba(240,240,240,0.3)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Studio — Alexandria, EG
              </span>
            </div>
          </motion.div>

          {/* Process timeline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {["Research", "Strategy", "Craft", "Delivery"].map(
              (step, i) => (
                <div
                  key={step}
                  style={{
                    padding: "1.5rem 0",
                    borderBottom: "1px solid rgba(200,255,0,0.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      color: "#c8ff00",
                      letterSpacing: "0.1em",
                      minWidth: "2rem",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
                      fontSize: "clamp(1rem, 2vw, 1.375rem)",
                      fontWeight: 600,
                      color: "rgba(240,240,240,0.8)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {step}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
