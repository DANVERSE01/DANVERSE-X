"use client"

import { useEffect, useState } from "react"
import { registerGSAP, ScrollTrigger } from "@/lib/gsap"

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "showcase", label: "Work" },
  { id: "process", label: "Process" },
  { id: "proof", label: "Proof" },
  { id: "brief-planner", label: "Brief" },
  { id: "contact", label: "Contact" },
]

export function SectionIndicator() {
  const [activeId, setActiveId] = useState("hero")

  useEffect(() => {
    if (typeof window === "undefined") return

    const coarse = window.matchMedia("(pointer: coarse)").matches
    if (coarse) return

    registerGSAP()

    const triggers = SECTIONS.flatMap(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return []

      return [
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setActiveId(id),
          onEnterBack: () => setActiveId(id),
        }),
      ]
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    const lenis = window.__DANVERSE_LENIS__
    if (lenis) {
      lenis.scrollTo(el, { offset: -80 })
    } else {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-auto fixed right-5 top-1/2 z-[9996] hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          aria-label={`Scroll to ${label}`}
          onClick={() => scrollToSection(id)}
          className="group flex items-center justify-end gap-2"
        >
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/0 transition-all duration-300 group-hover:text-white/55">
            {label}
          </span>
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width: activeId === id ? "8px" : "5px",
              height: activeId === id ? "8px" : "5px",
              background: activeId === id ? "var(--color-electric-blue)" : "rgba(255,255,255,0.25)",
              boxShadow: activeId === id ? "0 0 12px rgba(201,255,57,0.24)" : "none",
            }}
          />
        </button>
      ))}
    </nav>
  )
}
