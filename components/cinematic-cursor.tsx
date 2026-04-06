"use client"

import { useEffect, useRef } from "react"

/**
 * AWWWARDS-grade custom cursor.
 *
 * Architecture:
 *  - Two DOM nodes (dot + ring) repositioned via transform in a RAF loop
 *    — zero React re-renders during tracking.
 *  - Dot: instant, 6px, gradient fill.
 *  - Ring: lerped (0.12), 40px, border only — mix-blend-mode:difference for
 *    colour inversion on light elements.
 *  - Hover state classes injected into body; CSS handles all visual state changes.
 *  - Label element reveals on [data-cursor-label] targets.
 *  - Disabled on pointer:coarse (touch) devices.
 */
export function CinematicCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Bail on touch devices
    const coarse = window.matchMedia("(pointer: coarse)").matches
    if (coarse) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    // Hide system cursor
    document.documentElement.classList.add("custom-cursor")

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let rafId = 0
    let currentLabel = ""

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      // Lerp ring toward dot
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)

      dot.style.transform = `translate3d(${mouseX}px,${mouseY}px,0) translate(-50%,-50%)`
      ring.style.transform = `translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`

      if (currentLabel) {
        label.style.transform = `translate3d(${ringX + 28}px,${ringY + 28}px,0)`
      }

      rafId = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const el = target.closest(
        "a,button,[role='button'],[data-cursor-label],[data-cursor-hover]"
      ) as HTMLElement | null

      if (!el) {
        document.documentElement.classList.remove(
          "cursor-hover",
          "cursor-active",
          "cursor-blend"
        )
        currentLabel = ""
        label.style.opacity = "0"
        label.textContent = ""
        return
      }

      const labelText = el.dataset.cursorLabel ?? ""
      const isBlend = el.tagName === "A" || el.tagName === "BUTTON" || el.hasAttribute("data-cursor-blend")

      document.documentElement.classList.add("cursor-hover")
      if (isBlend) document.documentElement.classList.add("cursor-blend")

      if (labelText && labelText !== currentLabel) {
        currentLabel = labelText
        label.textContent = labelText
        label.style.opacity = "1"
      } else if (!labelText) {
        currentLabel = ""
        label.style.opacity = "0"
        label.textContent = ""
      }
    }

    const onDown = () => document.documentElement.classList.add("cursor-active")
    const onUp = () => document.documentElement.classList.remove("cursor-active")

    const onLeave = () => {
      dot.style.opacity = "0"
      ring.style.opacity = "0"
    }
    const onEnter = () => {
      dot.style.opacity = "1"
      ring.style.opacity = "1"
    }

    document.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseover", onOver, { passive: true })
    document.addEventListener("mousedown", onDown, { passive: true })
    document.addEventListener("mouseup", onUp, { passive: true })
    document.documentElement.addEventListener("mouseleave", onLeave)
    document.documentElement.addEventListener("mouseenter", onEnter)

    // Start loop
    dot.style.opacity = "0"
    ring.style.opacity = "0"
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("mouseup", onUp)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      document.documentElement.removeEventListener("mouseenter", onEnter)
      document.documentElement.classList.remove(
        "custom-cursor",
        "cursor-hover",
        "cursor-active",
        "cursor-blend"
      )
    }
  }, [])

  return (
    <>
      {/* Dot — instant tracking */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] opacity-0"
      />

      {/* Ring — lerped tracking */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] opacity-0"
      />

      {/* Label — appears on data-cursor-label hover */}
      <div
        ref={labelRef}
        aria-hidden="true"
        className="cursor-label pointer-events-none fixed left-0 top-0 z-[9997] opacity-0"
      />
    </>
  )
}
