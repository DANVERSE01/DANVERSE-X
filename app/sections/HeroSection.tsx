"use client"

import { useCallback, useEffect, useRef } from "react"
import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"
import { MagneticButton } from "@/app/components/MagneticButton"
import { gsap, registerGSAP, ScrollTrigger, SplitText } from "@/lib/gsap"

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.2 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onIntersect])

  return (
    <div ref={containerRef} className="hero-ref__media" aria-hidden="true">
      <video
        ref={videoRef}
        src="/videos/showreel-hero.mp4"
        poster="/videos/posters/showreel-hero-poster.jpg"
        muted
        loop
        playsInline
        preload="none"
      />
    </div>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const { scrollY, scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const velocity = useVelocity(scrollY)
  const skew = useTransform(velocity, [-2200, 0, 2200], [-2, 0, 2])
  const springSkew = useSpring(skew, { stiffness: 100, damping: 28, mass: 0.5 })
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"])
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])

  useEffect(() => {
    const headline = headlineRef.current
    const meta = metaRef.current
    const line = lineRef.current
    const cta = ctaRef.current
    if (!headline || !meta || !line || !cta) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()
    const split = new SplitText(headline, { type: "chars,words" })
    gsap.set(split.chars, { yPercent: 115, opacity: 0 })
    gsap.set([meta, cta], { y: 18, opacity: 0 })
    gsap.set(line, { scaleX: 0, transformOrigin: "left center" })

    const tl = gsap.timeline({ delay: 0.25 })
    tl.to(split.chars, {
      yPercent: 0,
      opacity: 1,
      duration: 0.95,
      stagger: 0.012,
      ease: "power4.out",
    })
      .to(meta, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }, "-=0.55")
      .to(line, { scaleX: 1, duration: 0.65, ease: "power3.inOut" }, "-=0.35")
      .to(cta, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.3")

    const scan = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate(self) {
        sectionRef.current?.style.setProperty("--hero-scan", self.progress.toFixed(3))
      },
    })

    return () => {
      tl.kill()
      scan.kill()
      split.revert()
    }
  }, [])

  return (
    <motion.section
      id="hero"
      ref={sectionRef}
      className="hero-ref"
      style={{ skewY: springSkew }}
    >
      <motion.div className="hero-ref__media-wrap" style={{ y: mediaY }}>
        <HeroVideo />
      </motion.div>
      <div className="hero-ref__grid" aria-hidden="true" />
      <div className="hero-ref__hud" aria-hidden="true">
        <span>X:</span>
        <span>Y:</span>
      </div>
      <div className="hero-ref__sound" aria-hidden="true">
        <span />
        <strong>OFF</strong>
        <em>SOUND</em>
      </div>
      <motion.div className="hero-ref__copy" style={{ y: copyY }}>
        <div ref={metaRef} className="hero-ref__meta">
          <span>Creative direction unit</span>
          <span>Alexandria to GCC</span>
          <span>2026</span>
        </div>
        <h1 ref={headlineRef}>
          Visual
          <br />
          authority
        </h1>
        <span ref={lineRef} className="hero-ref__divider" aria-hidden="true" />
        <p>
          Brand systems, motion films, and digital production built with the control-room discipline of a tactical unit.
        </p>
        <div ref={ctaRef} className="hero-ref__actions">
          <MagneticButton className="ref-button ref-button--red">
            Start brief
          </MagneticButton>
          <a href="#work" className="ref-button ref-button--ghost" data-cursor="magnetic">
            Scroll for work
          </a>
        </div>
      </motion.div>
      <div className="hero-ref__scroll">
        <span>++</span>
        <strong>Scroll</strong>
      </div>
    </motion.section>
  )
}
