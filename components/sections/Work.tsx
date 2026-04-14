"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { WorkCard } from "@/components/ui/WorkCard"
import { TxLabel } from "@/components/ui/TxLabel"
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap"
import { emitter } from "@/lib/events"
import { featuredWorks, type WorkItem } from "@/lib/work"
import { useDanverseStore } from "@/lib/store"

function CaseStudyOverlay({ work, onClose }: { work: WorkItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <motion.div
      className="showcase-overlay"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        className="showcase-overlay__close"
        onClick={onClose}
        aria-label="Close case study"
      >
        ✕
      </button>
      <div className="showcase-overlay__inner">
        <div style={{ marginBottom: "1rem" }}>
          <TxLabel>{work.category ?? "Work"}</TxLabel>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 7vw, 7rem)",
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "var(--color-white)",
            marginBottom: "2rem",
          }}
        >
          {work.title}
        </h2>
        {work.hook && (
          <p
            style={{
              fontSize: "var(--text-subhead)",
              color: "var(--color-white-60)",
              maxWidth: "52ch",
              lineHeight: 1.5,
              marginBottom: "3rem",
            }}
          >
            {work.hook}
          </p>
        )}
        {work.solution && (
          <p
            style={{
              fontSize: "var(--t-lg)",
              color: "var(--color-white-60)",
              maxWidth: "52ch",
              lineHeight: 1.6,
              marginBottom: "3rem",
            }}
          >
            {work.solution}
          </p>
        )}
        <div className="showcase-metrics">
          {work.tags.map((tag) => (
            <div key={tag} className="showcase-metric">
              <div className="showcase-metric__value">{tag}</div>
              <div className="showcase-metric__label">Discipline</div>
            </div>
          ))}
          {work.year && (
            <div className="showcase-metric">
              <div className="showcase-metric__value">{work.year}</div>
              <div className="showcase-metric__label">Year</div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{
            marginTop: "4rem",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--color-white-60)",
            borderBottom: "1px solid var(--color-white-30)",
            paddingBottom: "0.25rem",
            transition: "color 0.2s ease",
          }}
        >
          ← Back to work
        </button>
      </div>
    </motion.div>
  )
}

export function Work() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const setActiveSection = useDanverseStore((state) => state.setActiveSection)
  const [activeWork, setActiveWork] = useState<WorkItem | null>(null)

  useEffect(() => {
    registerGSAP()

    const section = sectionRef.current
    const track = trackRef.current
    const progress = progressRef.current

    if (!section || !track) return

    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries.find((entry) => entry.isIntersecting)
        if (active) {
          setActiveSection("tx-02")
          emitter.emit("section-change", { id: "tx-02" })
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(section)

    if (window.innerWidth < 960) {
      return () => observer.disconnect()
    }

    const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth)

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getDistance() + window.innerHeight * 0.75}`,
        pin: true,
        scrub: 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progress) {
            progress.style.transform = `scaleX(${self.progress})`
          }
        },
      },
    })

    return () => {
      observer.disconnect()
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [setActiveSection])

  return (
    <>
      <section id="tx-02" className="work-section tx-section" ref={sectionRef} data-section="work">
        <div className="section-full">
          <TxLabel>TX-02 / PROOF</TxLabel>
          <h2 className="section-heading">Work that speaks</h2>
        </div>
        <div className="work-rail">
          <div className="work-track" ref={trackRef}>
            {featuredWorks.map((work) => (
              <div key={work.slug} onClick={() => setActiveWork(work)} style={{ cursor: "pointer" }}>
                <WorkCard work={work} />
              </div>
            ))}
          </div>
        </div>
        <div className="work-progress">
          <div ref={progressRef} />
        </div>
      </section>
      <AnimatePresence>
        {activeWork && (
          <CaseStudyOverlay work={activeWork} onClose={() => setActiveWork(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
