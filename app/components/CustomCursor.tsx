"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface TrailPoint {
  x: number
  y: number
  age: number
}

export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [cursorType, setCursorType] = useState<"default" | "magnetic" | "text">("default")
  const [visible, setVisible] = useState(false)

  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useSpring(dotX, { stiffness: 150, damping: 15, mass: 0.1 })
  const ringY = useSpring(dotY, { stiffness: 150, damping: 15, mass: 0.1 })

  const trailCanvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef<TrailPoint[]>([])
  const animRef = useRef(0)
  const mouseRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const coarse = window.matchMedia("(pointer: coarse)").matches
    if (reduced || coarse) return

    setMounted(true)

    const onMove = (e: PointerEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      mouseRef.current = { x: e.clientX, y: e.clientY }
      setVisible(true)

      const target = e.target as HTMLElement
      if (target.closest("[data-cursor='magnetic']")) {
        setCursorType("magnetic")
      } else if (target.closest("[data-cursor='text']")) {
        setCursorType("text")
      } else {
        setCursorType("default")
      }
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener("pointermove", onMove)
    document.documentElement.addEventListener("pointerleave", onLeave)
    document.documentElement.addEventListener("pointerenter", onEnter)

    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      document.documentElement.removeEventListener("pointerenter", onEnter)
    }
  }, [dotX, dotY])

  useEffect(() => {
    const canvas = trailCanvasRef.current
    if (!canvas || !mounted) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize, { passive: true })

    const MAX_TRAIL = 8

    function loop() {
      animRef.current = requestAnimationFrame(loop)
      const cv = trailCanvasRef.current
      const c = cv?.getContext("2d")
      if (!cv || !c) return

      c.clearRect(0, 0, cv.width, cv.height)

      const { x, y } = mouseRef.current
      trailRef.current.unshift({ x, y, age: 0 })
      if (trailRef.current.length > MAX_TRAIL) trailRef.current.pop()

      trailRef.current.forEach((pt, i) => {
        pt.age += 0.05
        const alpha = Math.max(0, 1 - i / MAX_TRAIL) * 0.35
        const radius = Math.max(1, 4 - i * 0.4)
        c.beginPath()
        c.arc(pt.x, pt.y, radius, 0, Math.PI * 2)
        c.fillStyle = `rgba(200,255,0,${alpha})`
        c.fill()
      })
    }

    loop()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [mounted])

  if (!mounted) return null

  const ringSize = cursorType === "text" ? 80 : cursorType === "magnetic" ? 56 : 40

  return (
    <>
      <canvas
        ref={trailCanvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9996,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />

      {/* Dot */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9998,
          pointerEvents: "none",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#c8ff00",
          opacity: visible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />

      {/* Ring */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9997,
          pointerEvents: "none",
          borderRadius: "50%",
          border: "1px solid rgba(240,240,240,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: "spring", stiffness: 200, damping: 20, opacity: { duration: 0.2 } }}
      >
        {cursorType === "text" && (
          <span
            style={{
              fontSize: "0.5rem",
              letterSpacing: "0.15em",
              color: "#f0f0f0",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
            }}
          >
            VIEW
          </span>
        )}
      </motion.div>
    </>
  )
}
