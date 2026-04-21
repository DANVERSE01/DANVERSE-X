"use client"

import { useEffect, useRef } from "react"
import { gsap, registerGSAP, ScrollTrigger, SplitText } from "@/lib/gsap"

export function KineticStatement() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<HTMLHeadingElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = wordsRef.current
    const meta = metaRef.current
    if (!section || !heading || !meta) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      heading.style.opacity = "1"
      meta.style.opacity = "1"
      return
    }

    registerGSAP()

    const split = new SplitText(heading, { type: "lines,words", linesClass: "split-line" })
    gsap.set(split.words, { yPercent: 120, opacity: 0 })
    gsap.set(meta.children, { opacity: 0, y: 20 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 72%",
        end: "bottom 40%",
        scrub: 0.8,
      },
    })

    tl.to(split.words, {
      yPercent: 0,
      opacity: 1,
      ease: "cinematic",
      stagger: { each: 0.02, from: "start" },
      duration: 0.8,
    })
      .to(
        meta.children,
        {
          opacity: 1,
          y: 0,
          ease: "appear",
          stagger: 0.08,
          duration: 0.6,
        },
        "<0.25"
      )

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      split.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="kinetic-statement" aria-labelledby="kinetic-statement-heading">
      <div className="kinetic-statement__rail">
        <span className="eyebrow">
          <span className="eyebrow__num">02</span>
          <span className="eyebrow__divider" aria-hidden="true" />
          <span>Thesis</span>
        </span>
        <span ref={indexRef} className="eyebrow eyebrow--bright">
          ALX · 31.2°N 29.9°E
        </span>
      </div>

      <h2 ref={wordsRef} id="kinetic-statement-heading" className="kinetic-statement__heading display-severe">
        We don&apos;t chase trends. We assemble origin objects — brand systems, motion films, and digital surfaces that hold their weight a decade from now.
      </h2>

      <div ref={metaRef} className="kinetic-statement__meta">
        <span>
          <strong>Alexandria origin.</strong>
          <span>GCC practice. International release.</span>
        </span>
        <span>
          <strong>Private assembly.</strong>
          <span>No stock-style thinking. Every frame authored.</span>
        </span>
        <span>
          <strong>Admission-led.</strong>
          <span>We pick the work. The work picks the pace.</span>
        </span>
      </div>
    </section>
  )
}
