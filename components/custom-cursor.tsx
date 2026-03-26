"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"
import { useCursorState } from "@/components/motion/cursor-state"

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, summary, [role='button'], [data-cursor='interactive']"

function bindMediaQuery(mediaQuery: MediaQueryList, listener: () => void) {
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", listener)
    return () => mediaQuery.removeEventListener("change", listener)
  }

  mediaQuery.addListener(listener)
  return () => mediaQuery.removeListener(listener)
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { label } = useCursorState()

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const labelNode = labelRef.current

    if (!dot || !ring || !labelNode) {
      return
    }

    const desktopQuery = window.matchMedia("(pointer: fine) and (hover: hover) and (min-width: 768px)")
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)")
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let ringX = pointerX
    let ringY = pointerY
    let frameId = 0
    let enabled = false
    let visible = false
    let interactive = false

    const setVisibility = (isVisible: boolean) => {
      const opacity = isVisible && enabled ? "1" : "0"
      dot.style.opacity = opacity
      ring.style.opacity = opacity
      labelNode.style.opacity =
        labelNode.textContent && isVisible && enabled ? "1" : "0"
    }

    const updateCursorScale = (isPressed = false) => {
      if (!enabled) {
        return
      }

      const dotSize = isPressed ? 10 : interactive ? 14 : 8
      const ringSize = isPressed ? 34 : interactive ? 58 : 42

      dot.style.width = `${dotSize}px`
      dot.style.height = `${dotSize}px`
      ring.style.width = `${ringSize}px`
      ring.style.height = `${ringSize}px`
      ring.style.borderColor = interactive ? "var(--color-crimson)" : "rgb(126 160 200 / 35%)"
      ring.style.backgroundColor = interactive ? "rgb(47 99 186 / 8%)" : "transparent"
    }

    const syncEnabledState = () => {
      enabled =
        desktopQuery.matches &&
        !coarsePointerQuery.matches &&
        !reducedMotionQuery.matches &&
        !reduceMotion &&
        window.innerWidth >= 768
      document.documentElement.classList.toggle("has-custom-cursor", enabled)

      if (!enabled) {
        visible = false
        setVisibility(false)
        return
      }

      updateCursorScale()
    }

    const animate = () => {
      if (enabled) {
        dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`
        ringX += (pointerX - ringX) * 0.16
        ringY += (pointerY - ringY) * 0.16
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
        labelNode.style.transform = `translate3d(${pointerX + 18}px, ${pointerY + 18}px, 0)`
      }

      frameId = window.requestAnimationFrame(animate)
    }

    const updateInteractiveState = (target: EventTarget | null) => {
      if (!enabled) {
        return
      }

      const nextInteractive =
        target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR))

      if (nextInteractive === interactive) {
        return
      }

      interactive = nextInteractive
      updateCursorScale()
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!enabled) {
        return
      }

      pointerX = event.clientX
      pointerY = event.clientY

      if (!visible) {
        visible = true
        setVisibility(true)
      }
    }

    const handlePointerDown = () => updateCursorScale(true)
    const handlePointerUp = () => updateCursorScale()
    const handlePointerOver = (event: PointerEvent) => updateInteractiveState(event.target)
    const handlePointerLeave = () => {
      visible = false
      setVisibility(false)
    }
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handlePointerLeave()
      }
    }

    syncEnabledState()
    frameId = window.requestAnimationFrame(animate)

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerdown", handlePointerDown)
    window.addEventListener("pointerup", handlePointerUp)
    window.addEventListener("blur", handlePointerLeave)
    window.addEventListener("resize", syncEnabledState)
    document.addEventListener("pointerover", handlePointerOver)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    const unbindDesktop = bindMediaQuery(desktopQuery, syncEnabledState)
    const unbindCoarse = bindMediaQuery(coarsePointerQuery, syncEnabledState)
    const unbindReducedMotion = bindMediaQuery(reducedMotionQuery, syncEnabledState)

    return () => {
      unbindDesktop()
      unbindCoarse()
      unbindReducedMotion()
      window.cancelAnimationFrame(frameId)
      document.documentElement.classList.remove("has-custom-cursor")
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerdown", handlePointerDown)
      window.removeEventListener("pointerup", handlePointerUp)
      window.removeEventListener("blur", handlePointerLeave)
      window.removeEventListener("resize", syncEnabledState)
      document.removeEventListener("pointerover", handlePointerOver)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      setVisibility(false)
    }
  }, [reduceMotion])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "42px",
          height: "42px",
          borderRadius: "999px",
          border: "1px solid rgb(126 160 200 / 35%)",
          opacity: 0,
          pointerEvents: "none",
          transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
          transition:
            "width 160ms ease, height 160ms ease, opacity 180ms ease, border-color 180ms ease, background-color 180ms ease",
          zIndex: 10000,
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "999px",
          background: "var(--color-crimson)",
          boxShadow: "0 0 18px rgb(199 38 76 / 35%)",
          mixBlendMode: "difference",
          opacity: 0,
          pointerEvents: "none",
          transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
          transition: "width 160ms ease, height 160ms ease, opacity 180ms ease",
          zIndex: 10001,
        }}
      />
      <div
        ref={labelRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: "none",
          padding: "0.35rem 0.6rem",
          borderRadius: "999px",
          border: "1px solid rgb(126 160 200 / 22%)",
          background: "rgb(4 7 12 / 72%)",
          color: "var(--color-ice)",
          fontSize: "10px",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          backdropFilter: "blur(18px)",
          transition: "opacity 180ms ease",
          zIndex: 10002,
        }}
      >
        {label}
      </div>
    </>
  )
}
