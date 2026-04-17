"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap, registerGSAP, ScrollTrigger, SplitText } from "@/lib/gsap"

const STATS = [
  { value: 40, suffix: "+", label: "Projects" },
  { value: 8, suffix: "", label: "Markets" },
  { value: 3, suffix: "x", label: "Engagement" },
  { value: 12, suffix: "", label: "Systems" },
]

export function AboutCinematic() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const statsRef = useRef<(HTMLSpanElement | null)[]>([])
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"])

  useEffect(() => {
    const section = sectionRef.current
    const headline = headlineRef.current
    if (!section || !headline) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()
    const split = new SplitText(headline, { type: "words" })
    gsap.set(split.words, { yPercent: 110, opacity: 0 })

    const headlineTrigger = ScrollTrigger.create({
      trigger: headline,
      start: "top 78%",
      onEnter() {
        gsap.to(split.words, {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.045,
          ease: "power4.out",
        })
      },
    })

    const pin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: stickyRef.current,
      pinSpacing: false,
    })

    const statTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 45%",
      once: true,
      onEnter() {
        STATS.forEach((stat, index) => {
          const el = statsRef.current[index]
          if (!el) return

          const obj = { value: 0 }
          gsap.to(obj, {
            value: stat.value,
            duration: 1.4,
            ease: "power2.out",
            onUpdate() {
              el.textContent = `${Math.round(obj.value)}${stat.suffix}`
            },
          })
        })
      },
    })

    return () => {
      headlineTrigger.kill()
      pin.kill()
      statTrigger.kill()
      split.revert()
    }
  }, [])

  return (
    <section id="identity" ref={sectionRef} className="identity-section">
      <div className="identity-section__grid">
        <div ref={stickyRef} className="identity-section__sticky">
          <div className="ref-section-kicker">
            <span>[ 02 ]</span>
            <span>Our identity</span>
          </div>
          <h2 ref={headlineRef}>
            Creative direction
            <br />
            or code?
            <br />
            A hybrid.
          </h2>
        </div>

        <div className="identity-section__content">
          <motion.div className="identity-section__image" style={{ y: imageY }}>
            <Image
              src="/images/work/shelby-alexandria/stanley-golden.webp"
              alt="Automotive CGI scene from the DANVERSE archive"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              loading="lazy"
              quality={88}
            />
          </motion.div>

          <div className="identity-copy">
            <p>
              We build campaign systems with a film director's eye and an engineer's refusal to let the frame drift.
            </p>
            <p>
              Every surface is treated like a signal path: strategy, image, motion, interaction, and delivery tuned until the brand feels inevitable.
            </p>
            <p>
              Based in Alexandria and built for GCC markets, DANVERSE operates where premium taste, platform speed, and technical production overlap.
            </p>
          </div>

          <div className="identity-stats">
            {STATS.map((stat, index) => (
              <div key={stat.label}>
                <span ref={(el) => { statsRef.current[index] = el }}>0{stat.suffix}</span>
                <strong>{stat.label}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
