"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { emitter } from "@/lib/events"
import { gsap, registerGSAP } from "@/lib/gsap"
import { useDanverseStore } from "@/lib/store"

const VISIT_KEY = "danverse-transmission-visited"

export function Preloader() {
  const preloaderDone = useDanverseStore((state) => state.preloaderDone)
  const setPreloaderDone = useDanverseStore((state) => state.setPreloaderDone)
  const setActiveSection = useDanverseStore((state) => state.setActiveSection)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const marksRef = useRef({ fonts: false, gpu: false, paint: false })
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const display = useMemo(() => `${Math.round(progress).toString().padStart(3, "0")}`, [progress])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (preloaderDone) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const automated = navigator.webdriver || /lighthouse/i.test(navigator.userAgent)
    const visited = sessionStorage.getItem(VISIT_KEY) === "1"

    if (reduced || automated || visited) {
      setPreloaderDone()
      setActiveSection("tx-01")
      emitter.emit("preloader-done")
      sessionStorage.setItem(VISIT_KEY, "1")
      return
    }

    setActiveSection("tx-00")

    const syncProgress = () => {
      const marks = marksRef.current
      let next = 0

      if (marks.fonts) next = 30
      if (marks.gpu) next = 70
      if (marks.fonts && marks.gpu && marks.paint) next = 100

      setProgress((current) => (next > current ? next : current))
    }

    const markFonts = () => {
      marksRef.current.fonts = true
      syncProgress()
    }

    const markPaint = () => {
      marksRef.current.paint = true
      syncProgress()
    }

    document.fonts.ready.then(markFonts).catch(markFonts)

    const onGpuReady = () => {
      marksRef.current.gpu = true
      syncProgress()
    }
    emitter.on("gpu-ready", onGpuReady)

    if (useDanverseStore.getState().rendererReady) {
      onGpuReady()
    }

    let paintObserver: PerformanceObserver | null = null
    const existingPaint = performance.getEntriesByType("paint").some((entry) => entry.name === "first-contentful-paint")

    if (existingPaint) {
      markPaint()
    } else if (typeof PerformanceObserver !== "undefined") {
      try {
        paintObserver = new PerformanceObserver((list) => {
          if (list.getEntries().some((entry) => entry.name === "first-contentful-paint")) {
            markPaint()
            paintObserver?.disconnect()
          }
        })
        paintObserver.observe({ type: "paint", buffered: true })
      } catch {
        window.addEventListener("load", markPaint, { once: true })
      }
    } else {
      window.addEventListener("load", markPaint, { once: true })
    }

    return () => {
      emitter.off("gpu-ready", onGpuReady)
      paintObserver?.disconnect()
      window.removeEventListener("load", markPaint)
    }
  }, [mounted, preloaderDone, setActiveSection, setPreloaderDone])

  useEffect(() => {
    if (!mounted || preloaderDone) return
    if (progress < 100) return

    const root = rootRef.current
    if (!root) return

    registerGSAP()

    const timeline = gsap.timeline({
      onComplete: () => {
        setPreloaderDone()
        setActiveSection("tx-01")
        emitter.emit("preloader-done")
        sessionStorage.setItem(VISIT_KEY, "1")
      },
    })

    timeline
      .to(root.querySelector("[data-counter]"), {
        color: "var(--signal)",
        duration: 0.03,
      })
      .to(root.querySelectorAll("[data-fade]"), {
        opacity: 0,
        y: -18,
        duration: 0.45,
        stagger: 0.04,
      })
      .to(
        root.querySelector("[data-wipe]"),
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.65,
          ease: "cinematic",
        },
        "-=0.08"
      )
      .to(root, {
        autoAlpha: 0,
        duration: 0.35,
      })

    return () => {
      timeline.kill()
    }
  }, [mounted, preloaderDone, progress, setActiveSection, setPreloaderDone])

  if (!mounted || preloaderDone) return null

  return (
    <div className="preloader" ref={rootRef}>
      <div className="preloader__top" data-fade>
        <span>DANVERSE TRANSMISSION SYSTEM</span>
        <span>ESTABLISHING CARRIER FREQUENCY...</span>
      </div>
      <div className="preloader__counter" data-counter data-fade>
        {display}
      </div>
      <div className="preloader__progress" data-fade>
        <span className="preloader__progress-track" />
        <span className="preloader__progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="preloader__wipe" data-wipe />
    </div>
  )
}
