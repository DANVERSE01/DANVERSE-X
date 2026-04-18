"use client"

import { useEffect, useRef } from "react"
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap"

const PLACES = [
  {
    title: "Lower hall",
    meta: "Strategy room",
    desc: "Market pressure, reference audits, and the first visual rule set — established before any frame is committed.",
  },
  {
    title: "Image chamber",
    meta: "Visual formation",
    desc: "Campaign stills, product renders, and editorial direction systems shaped until the object feels inevitable.",
  },
  {
    title: "Motion passage",
    meta: "Film and rhythm",
    desc: "Social films, broadcast motion, and transition choreography cut for attention without noise.",
  },
  {
    title: "Interface vault",
    meta: "Digital surface",
    desc: "Web surfaces and interaction states composed as rooms — every state intentional, no dead ends.",
  },
]

export function ExpertiseAccordion() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()
    const cards = gsap.utils.toArray<HTMLElement>(".place-card")
    gsap.set(cards, { opacity: 0, y: 50 })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 72%",
      once: true,
      onEnter() {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power4.out",
        })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <section id="places" ref={sectionRef} className="places-section">
      <div className="places-section__header">
        <div>
          <div className="section-kicker">
            <span>[ 04 ]</span>
            <span>Places</span>
          </div>
          <h2>
            Conditions
            <br />
            before
            <br />
            output
          </h2>
        </div>
        <p>
          The assembly is organized by rooms of work, each one responsible for a different pressure on the final object.
        </p>
      </div>

      <div className="places-grid">
        {PLACES.map((place, index) => (
          <article className="place-card" key={place.title}>
            <span className="place-card__num">{String(index + 1)}</span>
            <div>
              <span className="place-card__meta">{place.meta}</span>
              <h3>{place.title}</h3>
            </div>
            <p>{place.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
