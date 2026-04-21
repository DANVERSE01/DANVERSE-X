"use client"

import { useEffect, useRef } from "react"
import { staggerStack } from "@/lib/motion-presets"

const DISCIPLINES = [
  {
    id: "direction",
    number: "01",
    title: "Creative direction",
    body: "Brand positioning, cinematic art direction, narrative frameworks. We set the rules the work lives inside.",
    tools: ["Strategy", "Positioning", "Art direction"],
  },
  {
    id: "systems",
    number: "02",
    title: "Brand systems",
    body: "Identity architecture, wordmarks, motion logos, editorial type systems, guidelines that survive contact with production.",
    tools: ["Identity", "Typography", "Guidelines"],
  },
  {
    id: "film",
    number: "03",
    title: "Film & motion",
    body: "Brand films, product films, campaign spots, title sequences, motion systems engineered to loop cleanly and release clean.",
    tools: ["Direction", "Motion design", "Color"],
  },
  {
    id: "cgi",
    number: "04",
    title: "CGI & image",
    body: "Automotive, product, architecture, still and motion. Photoreal render pipelines paired with AI-augmented imaging.",
    tools: ["3D", "Render", "AI imaging"],
  },
  {
    id: "interfaces",
    number: "05",
    title: "Digital surfaces",
    body: "Portfolio sites, campaign microsites, interactive case studies. Cinematic on the screen, shippable on the web.",
    tools: ["Web", "Interaction", "Performance"],
  },
]

export function ExpertiseTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rows = rowsRef.current
    if (!rows) return
    const items = rows.querySelectorAll<HTMLElement>(".discipline-row")
    if (!items.length) return
    staggerStack(items, { y: 40, stagger: 0.08, once: true, trigger: rows })
  }, [])

  return (
    <section ref={sectionRef} className="expertise-timeline" id="expertise" aria-labelledby="expertise-heading">
      <header className="expertise-timeline__head">
        <span className="eyebrow">
          <span className="eyebrow__num">05</span>
          <span className="eyebrow__divider" aria-hidden="true" />
          <span>Capability</span>
        </span>
        <h2 id="expertise-heading" className="expertise-timeline__title display-severe">
          Five disciplines.<br />One assembly.
        </h2>
        <p className="expertise-timeline__lede">
          We run a small, senior team across a tight surface area. Work crosses disciplines only when the story asks for it — not for padding.
        </p>
      </header>

      <div ref={rowsRef} className="expertise-timeline__rows">
        {DISCIPLINES.map((d) => (
          <article key={d.id} className="discipline-row" id={`discipline-${d.id}`}>
            <div className="discipline-row__number">{d.number}</div>
            <div className="discipline-row__body">
              <h3 className="discipline-row__title">{d.title}</h3>
              <p className="discipline-row__copy">{d.body}</p>
            </div>
            <ul className="discipline-row__tools" aria-label={`${d.title} tools`}>
              {d.tools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
