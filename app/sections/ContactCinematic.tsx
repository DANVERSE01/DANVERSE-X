"use client"

import type { FormEvent } from "react"
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

  return <span>CAI {time}</span>
}

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/muhammedd_adel" },
  { label: "Email", href: "mailto:danverseai@gmail.com" },
  { label: "WhatsApp", href: "https://wa.link/rc25na" },
]

export function ContactCinematic() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
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
          duration: 1,
          stagger: 0.03,
          ease: "power4.out",
        })
      },
    })

    return () => {
      trigger.kill()
      split.revert()
    }
  }, [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setStatus("submitting")

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        projectType: formData.get("projectType"),
        message: formData.get("message"),
      }),
    })

    if (response.ok) {
      setStatus("success")
      form.reset()
    } else {
      setStatus("error")
    }
  }

  return (
    <section id="admission" ref={sectionRef} className="admission-section">
      <div className="admission-section__top">
        <span className="contact-status">Admission / selective cycle</span>
        <span className="contact-status">31.2001 N 29.9187 E / Alexandria</span>
        <span className="contact-status"><LiveClock /></span>
      </div>

      <h2 ref={headlineRef}>
        Seek
        <br />
        admission
      </h2>

      <div className="admission-section__body">
        <div className="contact-copy">
          <p>
            Bring a brand, object, campaign, or digital room that needs to be formed with discipline.
          </p>
          <MagneticButton href="mailto:danverseai@gmail.com" className="contact-email-display">
            danverseai@gmail.com
          </MagneticButton>
        </div>

        <form className="admission-form" onSubmit={onSubmit}>
          <label>
            <span>Name</span>
            <input name="name" required autoComplete="name" />
          </label>
          <label>
            <span>Email</span>
            <input name="email" required type="email" autoComplete="email" />
          </label>
          <label>
            <span>Object type</span>
            <select name="projectType" defaultValue="Brand system">
              <option>Brand system</option>
              <option>Motion film</option>
              <option>Digital place</option>
              <option>Campaign object</option>
            </select>
          </label>
          <label>
            <span>What should be formed?</span>
            <textarea name="message" required rows={5} />
          </label>
          <button type="submit" className="assembly-button" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending" : "Submit admission"}
          </button>
          <p className="contact-status" aria-live="polite">
            {status === "success"
              ? "Admission request received."
              : status === "error"
                ? "Admission endpoint is not configured yet."
                : "Replies arrive from danverseai@gmail.com."}
          </p>
        </form>
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
            <em>Open</em>
          </a>
        ))}
      </div>

      <div className="contact-bottom">
        <span>2026 DANVERSE. Independent practice.</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top
        </button>
        <LiveClock />
      </div>
    </section>
  )
}
