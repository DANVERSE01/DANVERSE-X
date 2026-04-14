"use client"

import { useEffect } from "react"
import { TxLabel } from "@/components/ui/TxLabel"
import { emitter } from "@/lib/events"
import { useDanverseStore } from "@/lib/store"

const steps = [
  {
    number: "01 / SIGNAL",
    copy: "We understand what you need to say and to whom",
  },
  {
    number: "02 / CRAFT",
    copy: "We build the form that carries that signal",
  },
  {
    number: "03 / TRANSMIT",
    copy: "We put it in front of the people who need to see it",
  },
] as const

export function Process() {
  const setActiveSection = useDanverseStore((state) => state.setActiveSection)

  useEffect(() => {
    const section = document.getElementById("tx-04")
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries.find((entry) => entry.isIntersecting)
        if (active) {
          setActiveSection("tx-04")
          emitter.emit("section-change", { id: "tx-04" })
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [setActiveSection])

  return (
    <section id="tx-04" className="process-section tx-section">
      <div className="section-inner section-inner--narrow">
        <TxLabel>TX-04 / TRUST</TxLabel>
        <h2 className="process-statement">We don&apos;t manage projects. We make them impossible to ignore.</h2>
        <div className="process-steps">
          {steps.map((step) => (
            <article key={step.number} className="process-step">
              <span>{step.number}</span>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
