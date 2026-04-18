"use client"

import { useEffect, useRef } from "react"
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap"

const STATEMENT = "ORIGIN OBJECTS. CONTROLLED PLACES. QUIET RELEASE. — "

export function FooterBanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const items = Array.from({ length: 8 }, (_, index) => index)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()

    const track = section.querySelector(".footer-assembly__track")
    const terminal = section.querySelector(".footer-assembly__terminal")
    if (!track || !terminal) return

    gsap.set(track, { opacity: 0, yPercent: 25 })
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
          delay: 0.25,
          ease: "power3.out",
        })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <footer ref={sectionRef} className="footer-assembly">
      <div className="footer-assembly__track">
        {items.map((item) => (
          <span key={item}>{STATEMENT}</span>
        ))}
      </div>
      <div className="footer-assembly__terminal">
        <span>Admission requests</span>
        <a href="mailto:danverseai@gmail.com" data-cursor="magnetic">
          danverseai@gmail.com
        </a>
        <strong>DANVERSE</strong>
      </div>
    </footer>
  )
}
