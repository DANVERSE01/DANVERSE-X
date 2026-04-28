"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap"

const EXPERTISE = [
  {
    title: "Creative direction",
    items: ["Concept development", "Brand strategy", "Visual direction", "Creative consulting"],
  },
  {
    title: "Digital production",
    items: ["UI and product design", "Social content systems", "Platform-native formats", "End-to-end production"],
  },
  {
    title: "Motion and 3D",
    items: ["Motion design", "Real-time 3D", "CGI product visualization", "Campaign motion"],
  },
  {
    title: "AI creative",
    items: ["AI-augmented workflows", "Generative visual systems", "AI integration strategy", "Hybrid production models"],
  },
]

export function ExpertiseAccordion() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const panelsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()
    panelsRef.current.forEach((panel, index) => {
      if (!panel) return

      if (index === active) {
        gsap.to(panel, { height: "auto", opacity: 1, duration: 0.5, ease: "power4.out" })
      } else {
        gsap.to(panel, { height: 0, opacity: 0, duration: 0.4, ease: "power4.inOut" })
      }
    })
  }, [active])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()
    const items = gsap.utils.toArray<HTMLElement>(".expertise-item")
    gsap.set(items, { opacity: 0, y: 40 })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 68%",
      once: true,
      onEnter() {
        setActive(0)
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
        })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <section id="expertise" ref={sectionRef} className="expertise-section">
      <div className="ref-section-header">
        <span>[ 03 ]</span>
        <h2>Expertise</h2>
        <p>From vision to screen</p>
      </div>

      <div className="expertise-list">
        {EXPERTISE.map((item, index) => (
          <div key={item.title} className={`expertise-item ${active === index ? "is-active" : ""}`}>
            <button
              type="button"
              onClick={() => setActive(active === index ? -1 : index)}
              data-cursor="magnetic"
              aria-expanded={active === index ? "true" : "false"}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              <em>{active === index ? "Close" : "Open"}</em>
            </button>
            <div
              ref={(el) => {
                panelsRef.current[index] = el
              }}
              className="expertise-item__panel"
            >
              <ul>
                {item.items.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
