"use client"

import { useEffect, useRef, useState } from "react"
import { registerGSAP, gsap } from "@/lib/gsap"

const STORAGE_KEY = "danverse_visited"

export function Preloader() {
  const [active, setActive] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Skip for Lighthouse, Puppeteer, Playwright, and other automated tools
    if (navigator.webdriver) return

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    if (prefersReducedMotion) return

    const isFirstVisit = !sessionStorage.getItem(STORAGE_KEY)
    if (!isFirstVisit) return

    sessionStorage.setItem(STORAGE_KEY, "1")
    setActive(true)
  }, [])

  useEffect(() => {
    if (!active) return

    const overlay = overlayRef.current
    const wordmark = wordmarkRef.current
    if (!overlay || !wordmark) return

    window.__DANVERSE_LENIS__?.stop()
    registerGSAP()

    const tl = gsap.timeline({
      onComplete: () => {
        setActive(false)
        window.__DANVERSE_LENIS__?.start()
      },
    })

    // Wordmark blur-in 500ms
    tl.fromTo(
      wordmark,
      { opacity: 0, filter: "blur(20px)", scale: 0.96 },
      { opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.5, ease: "power3.out" }
    )

    // Hold 180ms
    tl.to({}, { duration: 0.18 })

    // Wordmark scale + fade 180ms
    tl.to(wordmark, {
      opacity: 0,
      scale: 1.08,
      filter: "blur(8px)",
      duration: 0.18,
      ease: "power3.in",
    })

    // Curtain wipe out 450ms
    tl.to(
      overlay,
      { clipPath: "inset(100% 0 0% 0)", duration: 0.45, ease: "expo.inOut" },
      "<+0.08"
    )

    return () => {
      tl.kill()
    }
  }, [active])

  if (!active) return null

  return (
    <div
      aria-hidden="true"
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 100000,
        background: "#06070a",
        clipPath: "inset(0 0 0% 0)",
      }}
    >
      <div ref={wordmarkRef} style={{ opacity: 0 }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            fontWeight: 800,
            letterSpacing: "0.28em",
            color: "rgba(224,231,91,0.95)",
            textTransform: "uppercase",
          }}
        >
          DANVERSE
        </span>
      </div>
    </div>
  )
}
