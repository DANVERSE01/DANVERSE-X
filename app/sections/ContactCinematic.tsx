"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MagneticButton } from "@/app/components/MagneticButton"

gsap.registerPlugin(SplitText, ScrollTrigger)

function LiveClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Africa/Cairo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.6875rem",
        color: "rgba(240,240,240,0.25)",
        letterSpacing: "0.1em",
      }}
    >
      CAI {time}
    </span>
  )
}

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/danverse.studio" },
  { label: "LinkedIn", href: "https://linkedin.com/company/danverse" },
  { label: "Behance", href: "https://behance.net/danverse" },
]

function SocialLink({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "relative",
        display: "inline-block",
        fontFamily: "var(--font-body, 'Inter', sans-serif)",
        fontSize: "0.875rem",
        color: "rgba(240,240,240,0.5)",
        letterSpacing: "0.02em",
        cursor: "none",
        paddingBottom: "2px",
      }}
      whileHover="hovered"
      data-cursor="magnetic"
    >
      {label}
      <motion.span
        variants={{
          hovered: { scaleX: 1, transformOrigin: "left" },
          initial: { scaleX: 0, transformOrigin: "left" },
        }}
        initial="initial"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "#c8ff00",
          display: "block",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.a>
  )
}

export function ContactCinematic() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const [pulse, setPulse] = useState(false)

  // Velocity skew
  const { scrollY } = useScroll()
  const velY = useVelocity(scrollY)
  const rawSkew = useTransform(velY, [-2500, 0, 2500], [-2, 0, 2])
  const skewX = useSpring(rawSkew, { stiffness: 400, damping: 90 })

  useEffect(() => {
    const h = headlineRef.current
    if (!h) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const split = new SplitText(h, { type: "chars", mask: "chars" })
    const trigger = ScrollTrigger.create({
      trigger: h,
      start: "top 75%",
      onEnter() {
        gsap.from(split.chars, {
          yPercent: 115,
          duration: 1.1,
          stagger: { amount: 0.5 },
          ease: "power4.out",
        })
      },
    })

    return () => {
      trigger.kill()
      split.revert()
    }
  }, [])

  return (
    <section
      id="tx-05"
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#050507",
        padding: "clamp(8rem, 16vw, 18rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}
    >
      {/* Subtle gradient mesh */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(200,255,0,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: "1400px", margin: "0 auto" }}>
        <motion.div style={{ skewX, transformOrigin: "center" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: "0.6875rem",
            color: "#c8ff00",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}
        >
          <span style={{ width: "1.5rem", height: "1px", background: "#c8ff00", display: "inline-block" }} />
          Let&apos;s Connect — 05
        </span>

        <h2
          ref={headlineRef}
          style={{
            fontFamily: "'Clash Display', var(--font-display, sans-serif)",
            fontSize: "clamp(6rem, 16vw, 18rem)",
            fontWeight: 800,
            color: "rgba(244,244,240,1)",
            letterSpacing: "-0.06em",
            lineHeight: 0.88,
            margin: 0,
          }}
        >
          LET&apos;S
          <br />
          <span style={{ color: "#c8ff00" }}>BUILD</span>
        </h2>

        <div
          style={{
            marginTop: "clamp(3rem, 6vw, 6rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <p
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
              color: "rgba(240,240,240,0.5)",
              maxWidth: "32rem",
              lineHeight: 1.7,
              letterSpacing: "-0.01em",
            }}
          >
            Open to brand identity, motion campaigns, and long-term creative partnerships across the GCC and beyond.
          </p>

          <a
            href="mailto:hello@danverse.studio"
            style={{ textDecoration: "none" }}
            data-cursor="magnetic"
          >
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={() => setPulse(true)}
            onMouseLeave={() => setPulse(false)}
          >
            {/* Pulse ring */}
            {pulse && (
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: 0,
                  border: "1px solid #c8ff00",
                  pointerEvents: "none",
                }}
              />
            )}

            <MagneticButton
              style={{
                padding: "1.25rem 3rem",
                background: "#c8ff00",
                color: "#050507",
                fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                border: "none",
                cursor: "none",
                position: "relative",
                zIndex: 1,
              }}
            >
              Start a Project →
            </MagneticButton>
          </div>
          </a>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "clamp(6rem, 10vw, 10rem)",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(200,255,0,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
              fontSize: "clamp(1rem, 2vw, 1.375rem)",
              fontWeight: 700,
              color: "#f0f0f0",
              letterSpacing: "-0.03em",
            }}
          >
            DANVERSE
          </span>

          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {SOCIAL_LINKS.map((link) => (
              <SocialLink key={link.label} {...link} />
            ))}
          </div>

          <a
            href="mailto:hello@danverse.studio"
            data-cursor="magnetic"
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "0.75rem",
              color: "rgba(240,240,240,0.35)",
              letterSpacing: "0.08em",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#c8ff00")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,240,240,0.35)")}
          >
            hello@danverse.studio
          </a>

          <LiveClock />
        </div>

        {/* Copyright Bar */}
        <div
          style={{
            marginTop: "2rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(244,244,240,0.04)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "0.6875rem",
              color: "rgba(244,244,240,0.25)",
              letterSpacing: "0.1em",
            }}
          >
            © {new Date().getFullYear()} DANVERSE. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a
              href="/privacy"
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: "0.6875rem",
                color: "rgba(244,244,240,0.25)",
                letterSpacing: "0.1em",
                textDecoration: "none",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(244,244,240,0.5)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(244,244,240,0.25)")}
            >
              Privacy
            </a>
            <a
              href="/terms"
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: "0.6875rem",
                color: "rgba(244,244,240,0.25)",
                letterSpacing: "0.1em",
                textDecoration: "none",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(244,244,240,0.5)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(244,244,240,0.25)")}
            >
              Terms
            </a>
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  )
}
