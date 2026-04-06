"use client"

import { useEffect, useRef } from "react"
import styles from "@/styles/masterclass.module.css"
import { resolveCtaHref } from "@/lib/cta"
import { GENERAL_BRIEF_CTA } from "@/lib/site-ctas"
import { useGsapEnter } from "@/hooks/use-gsap-enter"

const STATS = [
  { value: "7–21", unit: "days", label: "Delivery window" },
  { value: "3×", unit: "avg", label: "Conversion uplift" },
  { value: "01", unit: "standard", label: "Director-led QA" },
] as const

export function MasterclassShowcase() {
  const stageRef = useRef<HTMLElement>(null)
  const contentRef = useGsapEnter<HTMLDivElement>({
    preset: "blur-rise",
    stagger: 0.14,
    childSelector: "[data-mc-item]",
    start: "top 82%",
  })

  useEffect(() => {
    const el = stageRef.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty("--mx", `${x}%`)
      el.style.setProperty("--my", `${y}%`)
    }

    el.addEventListener("mousemove", handleMouseMove)
    return () => el.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={stageRef}
      className={styles.stage}
      aria-label="Studio identity statement"
      role="region"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.ring} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.mouseGlow} aria-hidden="true" />

      <div ref={contentRef} className={styles.content}>
        <p data-mc-item className={styles.eyebrow}>Director&apos;s Standard</p>

        <h2 data-mc-item className={styles.title}>
          Frame
          <span>One Decides</span>
        </h2>

        <p data-mc-item className={styles.subtitle}>
          Every campaign starts with a single question: what does the first frame have to prove?
        </p>

        <div data-mc-item className={styles.stats}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>
                {stat.value}
                <span className={styles.statUnit}>{stat.unit}</span>
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        <div data-mc-item className={styles.buttons}>
          <a
            href={resolveCtaHref(GENERAL_BRIEF_CTA)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primary}
          >
            Start the Brief
          </a>
          <a href="#showcase" className={styles.secondary}>
            See the Work
          </a>
        </div>
      </div>
    </section>
  )
}
