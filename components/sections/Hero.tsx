"use client"

import { useEffect, useRef } from "react"
import { SceneManager } from "@/components/canvas/SceneManager"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { TextReveal } from "@/components/ui/TextReveal"
import { gsap, initScrollSmoother, registerGSAP } from "@/lib/gsap"
import { emitter } from "@/lib/events"
import { useDanverseStore } from "@/lib/store"

export function Hero() {
  const labelRef = useRef<HTMLDivElement | null>(null)
  const sublineRef = useRef<HTMLParagraphElement | null>(null)
  const ctaRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const playedRef = useRef(false)
  const setActiveSection = useDanverseStore((state) => state.setActiveSection)
  const preloaderDone = useDanverseStore((state) => state.preloaderDone)

  useEffect(() => {
    registerGSAP()
    initScrollSmoother()

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const targets = [labelRef.current, sublineRef.current, ctaRef.current, scrollRef.current].filter(Boolean)

    if (!reduced && !playedRef.current) {
      gsap.set(targets, { autoAlpha: 0, y: 24 })
    }

    const playOpening = () => {
      if (playedRef.current || reduced) return
      playedRef.current = true

      const tl = gsap.timeline({ defaults: { ease: "appear" } })
      tl.to(labelRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.1)
        .to(sublineRef.current, { autoAlpha: 1, y: 0, duration: 0.85 }, 0.4)
        .to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.65)
        .to(scrollRef.current, { autoAlpha: 1, y: 0, duration: 0.65 }, 2.0)

      // Fade scroll indicator on first scroll
      const onScroll = () => {
        if (scrollRef.current) {
          gsap.to(scrollRef.current, { autoAlpha: 0, duration: 0.4, ease: "appear" })
        }
        window.removeEventListener("scroll", onScroll)
      }
      window.addEventListener("scroll", onScroll, { once: true })
    }

    const unsubscribe = useDanverseStore.subscribe((state) => {
      if (state.preloaderDone) playOpening()
    })

    if (preloaderDone || useDanverseStore.getState().preloaderDone) {
      requestAnimationFrame(playOpening)
    } else {
      emitter.on("preloader-done", playOpening)
    }

    const guard = window.setInterval(() => {
      if (!document.querySelector(".preloader")) {
        playOpening()
        window.clearInterval(guard)
      }
    }, 100)

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.find((e) => e.isIntersecting)) {
          setActiveSection("tx-01")
          emitter.emit("section-change", { id: "tx-01" })
        }
      },
      { threshold: 0.55 }
    )

    const section = document.getElementById("tx-01")
    if (section) observer.observe(section)

    return () => {
      emitter.off("preloader-done", playOpening)
      window.clearInterval(guard)
      unsubscribe()
      observer.disconnect()
    }
  }, [preloaderDone, setActiveSection])

  return (
    <section id="tx-01" className="hero-section tx-section" data-section="hero">
      <div className="hero-scene">
        <SceneManager />
      </div>
      <div className="hero-copy">
        <div className="hero-label" ref={labelRef} style={{ marginBottom: "1rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-label)",
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
              color: "var(--color-lime)",
            }}
          >
            Creative Director
          </span>
        </div>
        <TextReveal as="h1" className="hero-title" waitForPreloader>
          DANVERSE
        </TextReveal>
        <p
          className="hero-subtitle"
          ref={sublineRef}
          style={{ color: "var(--color-white-60)", marginTop: "0.75rem" }}
        >
          Brand Identity · Motion · Visual Systems
        </p>
        <div className="hero-cta" ref={ctaRef}>
          <MagneticButton
            className="magnetic-btn magnetic-btn--filled"
            onClick={() => {
              document.getElementById("tx-02")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            View Work
          </MagneticButton>
          <MagneticButton
            className="magnetic-btn magnetic-btn--ghost"
            onClick={() => {
              document.getElementById("tx-05")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Get In Touch
          </MagneticButton>
        </div>
      </div>
      <div className="hero-scroll" ref={scrollRef} aria-label="Scroll to explore">
        <span>Scroll to explore</span>
        <span />
      </div>
    </section>
  )
}
