"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap, registerGSAP, ScrollTrigger, SplitText } from "@/lib/gsap"

const STATS = [
  { value: 40, suffix: "+", label: "Objects released" },
  { value: 12, suffix: "M+", label: "Organic reach" },
  { value: 6, suffix: "", label: "Active markets" },
  { value: 68, suffix: "%", label: "Avg view-through" },
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
  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-10%"])

  useEffect(() => {
    const section = sectionRef.current
    const headline = headlineRef.current
    if (!section || !headline) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()
    const split = new SplitText(headline, { type: "lines", mask: "lines" })

    const headlineTrigger = ScrollTrigger.create({
      trigger: headline,
      start: "top 78%",
      onEnter() {
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.09,
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
      start: "top 48%",
      once: true,
      onEnter() {
        STATS.forEach((stat, index) => {
          const el = statsRef.current[index]
          if (!el) return

          const obj = { value: 0 }
          gsap.to(obj, {
            value: stat.value,
            duration: 1.5,
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
    <section id="identity" ref={sectionRef} className="assembly-section">
      <div className="assembly-section__grid">
        <div ref={stickyRef} className="assembly-section__sticky">
          <div className="section-kicker">
            <span>[ 02 ]</span>
            <span>The assembly</span>
          </div>
          <h2 ref={headlineRef}>
            Direction
            <br />
            becomes
            <br />
            an object
          </h2>
        </div>

        <div>
          <motion.div className="assembly-arc" style={{ y: imageY }}>
            <div className="assembly-arc__image">
              <Image
                src="/images/work/kova-cosmetics/hero-shot.webp"
                alt="KOVA product image used as an origin object"
                fill
                sizes="(max-width: 900px) 100vw, 38rem"
                loading="lazy"
                quality={75}
              />
            </div>
          </motion.div>

          <div className="assembly-copy">
            <p>
              DANVERSE is a creative direction practice operating from Alexandria. The work covers brand systems, motion campaigns, CGI, and digital surfaces — each treated as an object with its own conditions for release.
            </p>
            <p>
              Nothing leaves until the image, motion, and message are aligned. That discipline is the service. Not speed, not volume — coherence under pressure.
            </p>
            <p>
              The clients are beauty brands, automotive studios, and luxury operators who need work that holds authority without announcement. GCC market fluency is built in.
            </p>
          </div>

          <div className="assembly-stats">
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
