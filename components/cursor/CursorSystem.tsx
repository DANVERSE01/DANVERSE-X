"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useDanverseStore } from "@/lib/store"

export function CursorSystem() {
  const cursorState = useDanverseStore((state) => state.cursorState)
  const setCursorState = useDanverseStore((state) => state.setCursorState)
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 })

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const coarse = window.matchMedia("(pointer: coarse)").matches
    if (reduced || coarse) return

    setEnabled(true)

    const move = (e: PointerEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }

    const leave = () => {
      setVisible(false)
      setCursorState("hidden")
    }

    const enter = () => {
      setVisible(true)
      setCursorState("default")
    }

    const delegateState = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      const card = target.closest("[data-cursor]")
      if (card) {
        setCursorState(card.getAttribute("data-cursor") as "hover-work" | "hover-cta" || "default")
      } else if (target.closest("a, button")) {
        setCursorState("hover-cta")
      } else {
        setCursorState("default")
      }
    }

    window.addEventListener("pointermove", move)
    window.addEventListener("pointermove", delegateState)
    window.addEventListener("pointerleave", leave)
    window.addEventListener("pointerenter", enter)

    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointermove", delegateState)
      window.removeEventListener("pointerleave", leave)
      window.removeEventListener("pointerenter", enter)
    }
  }, [mouseX, mouseY, setCursorState])

  if (!enabled) return null

  const isHoverCta = cursorState === "hover-cta"
  const isHoverWork = cursorState === "hover-work"

  const ringSize = isHoverWork ? 64 : isHoverCta ? 56 : 40
  const ringOpacity = cursorState === "hidden" ? 0 : visible ? 1 : 0
  const dotOpacity = cursorState === "hidden" ? 0 : visible ? 1 : 0

  const label = isHoverWork ? "VIEW" : isHoverCta ? "CLICK" : null

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9999,
          pointerEvents: "none",
          width: 8,
          height: 8,
          borderRadius: "999px",
          background: "var(--color-lime)",
          opacity: dotOpacity,
          mixBlendMode: "difference",
        }}
        aria-hidden="true"
      />
      {/* Ring */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9998,
          pointerEvents: "none",
          width: ringSize,
          height: ringSize,
          borderRadius: "999px",
          border: "1px solid var(--color-lime)",
          background: isHoverWork ? "var(--color-lime-glow)" : "transparent",
          opacity: ringOpacity,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mixBlendMode: "difference",
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        aria-hidden="true"
      >
        {label && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              letterSpacing: "0.1em",
              color: "var(--color-lime)",
              userSelect: "none",
            }}
          >
            {label}
          </span>
        )}
      </motion.div>
    </>
  )
}
