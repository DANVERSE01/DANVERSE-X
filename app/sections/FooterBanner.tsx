"use client"

import { useEffect, useRef } from "react"
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap"

const STATEMENT = "BRAND DIRECTION. MOTION CRAFT. VISUAL AUTHORITY."

export function FooterBanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const items = Array.from({ length: 6 }, (_, index) => index)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()

    const track = section.querySelector(".closing-banner__track")
    const terminal = section.querySelector(".closing-banner__terminal")
    if (!track || !terminal) return

    gsap.set(track, { opacity: 0, yPercent: 30 })
    gsap.set(terminal, { opacity: 0, y: 20 })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      once: true,
      onEnter() {
        gsap.to(track, {
          opacity: 1,
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
        })
        gsap.to(terminal, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.3,
          ease: "power3.out",
        })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <footer ref={sectionRef} className="closing-banner">
      <div className="closing-banner__track">
        {items.map((item) => (
          <span key={item}>{STATEMENT}</span>
        ))}
      </div>
      <div className="closing-banner__terminal">
        <span>For media inquiries</span>
        <a href="mailto:hello@danverse.studio" data-cursor="send">
          hello@danverse.studio
        </a>
        <strong>DANVERSE</strong>
      </div>
    </footer>
  )
}
