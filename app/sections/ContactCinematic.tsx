"use client"

import { useEffect, useRef, useState } from "react"
import { MagneticButton } from "@/app/components/MagneticButton"
import { gsap, registerGSAP, ScrollTrigger, SplitText } from "@/lib/gsap"

function LiveClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Africa/Cairo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <span className="contact-clock">CAI {time}</span>
}

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/muhammedd_adel" },
  { label: "Email", href: "mailto:danverseai@gmail.com" },
  { label: "WhatsApp", href: "https://wa.link/rc25na" },
]

export function ContactCinematic() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const h = headlineRef.current
    if (!h) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()
    const split = new SplitText(h, { type: "chars" })
    gsap.set(split.chars, { yPercent: 110, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: h,
      start: "top 80%",
      onEnter() {
        gsap.to(split.chars, {
          yPercent: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.035,
          ease: "power4.out",
        })
      },
    })

    return () => {
      trigger.kill()
      split.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="contact-ref-section">
      <div className="contact-ref-section__top">
        <span>Let&apos;s connect — 07</span>
        <span className="contact-coordinates">31.2001°N 29.9187°E — Alexandria</span>
        <LiveClock />
      </div>

      <h2 ref={headlineRef}>
        Let&apos;s
        <br />
        work
      </h2>

      <div className="contact-ref-section__body">
        <p>
          Taking on select brand, motion, and digital projects.
          <br />
          If the work matters, we should talk.
        </p>
        <MagneticButton
          href="mailto:danverseai@gmail.com"
          className="contact-email-display"
        >
          danverseai@gmail.com
        </MagneticButton>
      </div>

      <div className="contact-socials">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="magnetic"
          >
            {link.label}
            <em>↗</em>
          </a>
        ))}
      </div>

      <div className="contact-bottom">
        <span>© 2026 DANVERSE. All rights reserved.</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑ Back to top
        </button>
        <LiveClock />
      </div>
    </section>
  )
}
