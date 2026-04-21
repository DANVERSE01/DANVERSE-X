"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap, registerGSAP, ScrollTrigger, SplitText } from "@/lib/gsap"

export function AtmosphericHold() {
  const sectionRef = useRef<HTMLElement>(null)
  const holdRef = useRef<HTMLHeadingElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const hold = holdRef.current
    const rail = railRef.current
    if (!section || !hold || !rail) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()

    const split = new SplitText(hold, { type: "chars" })
    gsap.set(split.chars, { yPercent: 110, opacity: 0 })
    gsap.set(rail.children, { opacity: 0, y: 12 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 30%",
        scrub: 0.5,
      },
    })

    tl.to(split.chars, {
      yPercent: 0,
      opacity: 1,
      ease: "cinematic",
      stagger: 0.015,
      duration: 0.6,
    }).to(rail.children, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }, "<0.4")

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      split.revert()
    }
  }, [])

  const year = new Date().getFullYear()

  return (
    <footer ref={sectionRef} className="hold" aria-labelledby="hold-title">
      <div className="hold__stage">
        <span className="eyebrow eyebrow--signal">
          <span className="eyebrow__num">08</span>
          <span className="eyebrow__divider" aria-hidden="true" />
          <span>Close</span>
        </span>
        <h2 ref={holdRef} id="hold-title" className="hold__title">
          DANVERSE
        </h2>
        <p className="hold__tagline">Private creative assembly. Alexandria — GCC — worldwide release.</p>
      </div>

      <div ref={railRef} className="hold__rail">
        <div className="hold__col">
          <span className="hold__label">Admission</span>
          <a href="mailto:danverseai@gmail.com" data-cursor="magnetic">danverseai@gmail.com</a>
        </div>
        <div className="hold__col">
          <span className="hold__label">Surface</span>
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/people">People</Link>
        </div>
        <div className="hold__col">
          <span className="hold__label">Origin</span>
          <span>Alexandria</span>
          <span>31.2°N 29.9°E</span>
        </div>
        <div className="hold__col">
          <span className="hold__label">{year}</span>
          <span>All objects released under DANVERSE assembly.</span>
        </div>
      </div>
    </footer>
  )
}
