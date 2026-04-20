"use client"

import { useCallback, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap"

function ChapterVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const video = videoRef.current
    if (!video) return
    if (entries[0]?.isIntersecting) {
      video.play().catch(() => undefined)
    } else {
      video.pause()
    }
  }, [])

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches
    if (coarse) return

    const el = wrapRef.current
    if (!el) return

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.22 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onIntersect])

  return (
    <div ref={wrapRef} className="artifact-chapter__media" aria-hidden="true">
      <video
        ref={videoRef}
        src="/videos/optimized/showreel-hero.mp4"
        poster="/videos/optimized/posters/showreel-hero.jpg"
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  )
}

export function MarqueeReel() {
  const sectionRef = useRef<HTMLElement>(null)
  const kickerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const copyRef = useRef<HTMLParagraphElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  useEffect(() => {
    const section = sectionRef.current
    const kicker = kickerRef.current
    const heading = headingRef.current
    const copy = copyRef.current
    if (!section || !kicker || !heading || !copy) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()
    gsap.set([kicker, heading, copy], { y: 40, opacity: 0 })

    const tl = gsap.timeline()
    tl.to(kicker, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .to(heading, { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, "-=0.5")
      .to(copy, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")

    ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      end: "bottom 25%",
      scrub: 2,
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="artifact-chapter" id="threshold">
      <ChapterVideo />
      <motion.div className="artifact-chapter__content" style={{ y, opacity }}>
        <div className="artifact-chapter__header">
          <div ref={kickerRef} className="section-kicker">
            <span>[ 01 ]</span>
            <span>The threshold</span>
          </div>
          <h2 ref={headingRef} className="artifact-chapter__title">
            Form before
            <br />
            <em>announcement</em>
          </h2>
        </div>
        <p ref={copyRef} className="artifact-chapter__body">
          Every image, film, and surface is held until the system that carries it is strong enough to require no explanation.
        </p>
      </motion.div>
    </section>
  )
}
