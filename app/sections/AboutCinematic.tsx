"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(SplitText, ScrollTrigger)

const STATS = [
  { value: "40+", label: "Projects delivered" },
  { value: "8", label: "Countries reached" },
  { value: "3×", label: "Avg. engagement lift" },
  { value: "12", label: "Brand systems built" },
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
          duration: 1.8,
          ease: "power3.out",
          onUpdate() {
            el.textContent = Math.round(obj.val) + suffix
          },
        })
      },
    })

    return () => trigger.kill()
  }, [value])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <span
        ref={ref}
        style={{
          fontFamily: "'Clash Display', var(--font-display, sans-serif)",
          fontSize: "clamp(2.75rem, 5.5vw, 5.5rem)",
          fontWeight: 800,
          color: "#c8ff00",
          letterSpacing: "-0.055em",
          lineHeight: 1,
        }}
      >
        0
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: "0.625rem",
          color: "rgba(244,244,240,0.35)",
          letterSpacing: "0.18em",
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
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  // Parallax on image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"])

  // Velocity skew on right column content
  const { scrollY } = useScroll()
  const velY = useVelocity(scrollY)
  const rawSkew = useTransform(velY, [-2500, 0, 2500], [-2.5, 0, 2.5])
  const skewX = useSpring(rawSkew, { stiffness: 400, damping: 90 })

  useEffect(() => {
    const h = headlineRef.current
    const section = sectionRef.current
    if (!h || !section) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    // GSAP 3.13 mask — char-level clip reveal
    const split = new SplitText(h, { type: "chars", mask: "chars" })

    const headlineTrigger = ScrollTrigger.create({
      trigger: h,
      start: "top 78%",
      onEnter() {
        gsap.from(split.chars, {
          yPercent: 115,
          duration: 0.95,
          stagger: { amount: 0.5 },
          ease: "power4.out",
        })
      },
    })

    // Staggered reveal for body + stats
    const bodyEl = bodyRef.current
    const statsEl = statsRef.current
    if (bodyEl && statsEl) {
      gsap.set([bodyEl, statsEl], { opacity: 0, y: 32 })
      ScrollTrigger.create({
        trigger: bodyEl,
        start: "top 80%",
        onEnter() {
          gsap.to([bodyEl, statsEl], {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.15,
          })
        },
      })
    }

    // Staggered reveal for right column process items
    const rightEl = rightRef.current
    if (rightEl) {
      const items = rightEl.querySelectorAll("[data-process-item]")
      gsap.set(items, { opacity: 0, x: 24 })
      ScrollTrigger.create({
        trigger: rightEl,
        start: "top 75%",
        onEnter() {
          gsap.to(items, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          })
        },
      })
    }

    // Pin left column while right scrolls
    const pin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: leftRef.current,
      pinSpacing: false,
    })

    return () => {
      headlineTrigger.kill()
      pin.kill()
      split.revert()
    }
  }, [])

  return (
    <section
      id="tx-01"
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#050507",
        padding: "clamp(7rem, 14vw, 16rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 6vw, 6rem)",
          maxWidth: "1400px",
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        {/* Left — pinned */}
        <div ref={leftRef} style={{ position: "sticky", top: "18vh" }}>
          <div style={{ marginBottom: "1.75rem" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: "0.6875rem",
                letterSpacing: "0.25em",
                color: "#c8ff00",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "1.5rem",
                  height: "1px",
                  background: "#c8ff00",
                  display: "inline-block",
                }}
              />
              About — 01
            </span>
          </div>

          <h2
            ref={headlineRef}
            style={{
              fontFamily: "'Clash Display', var(--font-display, sans-serif)",
              fontSize: "clamp(2.75rem, 5.5vw, 6.5rem)",
              fontWeight: 800,
              color: "rgba(244,244,240,1)",
              letterSpacing: "-0.05em",
              lineHeight: 0.92,
              margin: 0,
            }}
          >
            We build what doesn&apos;t exist yet.
          </h2>

          <p
            ref={bodyRef}
            style={{
              marginTop: "clamp(1.5rem, 3vw, 2.5rem)",
              fontSize: "clamp(0.875rem, 1.4vw, 1.0625rem)",
              color: "rgba(244,244,240,0.45)",
              lineHeight: 1.8,
              maxWidth: "28rem",
            }}
          >
            Alexandria-born creative studio operating at the intersection of AI systems, motion craft, and brand strategy — building visual languages that travel beyond borders.
          </p>

          {/* Stats */}
          <div
            ref={statsRef}
            style={{
              marginTop: "clamp(2.5rem, 5vw, 4rem)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            {STATS.map((s) => (
              <StatCounter key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>

        {/* Right — scrollable with velocity skew */}
        <motion.div
          style={{ skewX, display: "flex", flexDirection: "column", gap: "0" }}
        >
          {/* Image with parallax */}
          <motion.div
            style={{
              y: imgY,
              aspectRatio: "4/5",
              background:
                "linear-gradient(135deg, rgba(200,255,0,0.05) 0%, rgba(5,5,7,1) 55%)",
              border: "1px solid rgba(200,255,0,0.09)",
              overflow: "hidden",
              position: "relative",
              marginBottom: "2rem",
            }}
          >
            {/* Grid texture overlay */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Lime corner accent */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                width: "2.5rem",
                height: "2.5rem",
                borderTop: "1px solid rgba(200,255,0,0.3)",
                borderRight: "1px solid rgba(200,255,0,0.3)",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                width: "2.5rem",
                height: "2.5rem",
                borderBottom: "1px solid rgba(200,255,0,0.3)",
                borderLeft: "1px solid rgba(200,255,0,0.3)",
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
                  fontSize: "0.625rem",
                  color: "rgba(244,244,240,0.25)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Studio — Alexandria, EG
              </span>
            </div>
          </motion.div>

          {/* Process timeline */}
          <div ref={rightRef} style={{ display: "flex", flexDirection: "column" }}>
            {["Research & Discovery", "Strategy & Direction", "Design & Motion", "Launch & Iterate"].map(
              (step, i) => (
                <div
                  key={step}
                  data-process-item
                  style={{
                    padding: "1.75rem 0",
                    borderBottom: "1px solid rgba(200,255,0,0.07)",
                    display: "grid",
                    gridTemplateColumns: "2.5rem 1fr",
                    gap: "1.5rem",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.5625rem",
                      color: "#c8ff00",
                      letterSpacing: "0.12em",
                      lineHeight: 1,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Clash Display', var(--font-display, sans-serif)",
                      fontSize: "clamp(1.0625rem, 2vw, 1.5rem)",
                      fontWeight: 600,
                      color: "rgba(244,244,240,0.8)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {step}
                  </span>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

