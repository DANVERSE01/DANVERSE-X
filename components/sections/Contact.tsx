"use client"

import { useEffect } from "react"
import { ContactForm } from "@/components/ui/ContactForm"
import { TxLabel } from "@/components/ui/TxLabel"
import { emitter } from "@/lib/events"
import { useDanverseStore } from "@/lib/store"

export function Contact() {
  const setActiveSection = useDanverseStore((state) => state.setActiveSection)

  useEffect(() => {
    const section = document.getElementById("tx-05")
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries.find((entry) => entry.isIntersecting)
        if (active) {
          setActiveSection("tx-05")
          emitter.emit("section-change", { id: "tx-05" })
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [setActiveSection])

  return (
    <section id="tx-05" className="contact-section tx-section">
      <div className="section-inner contact-shell">
        <div className="contact-block">
          <TxLabel>TX-05 / OPEN SIGNAL</TxLabel>
          <p className="contact-availability">● OPEN TO PROJECTS — Q3 2026</p>
          <h2 className="contact-headline">Let&apos;s build something that doesn&apos;t exist yet.</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-aside">
            <a className="contact-email" href="mailto:studio@danverse.ai">
              studio@danverse.ai
            </a>
            <p>Working globally.</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
