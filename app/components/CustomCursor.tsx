"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface TrailPoint {
  x: number
  y: number
}

type CursorMode = "default" | "magnetic" | "text"

export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [cursorMode, setCursorMode] = useState<CursorMode>("default")
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const frameX = useSpring(x, { stiffness: 110, damping: 18, mass: 0.16 })
  const frameY = useSpring(y, { stiffness: 110, damping: 18, mass: 0.16 })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<TrailPoint[]>([])
  const mouseRef = useRef<TrailPoint>({ x: -100, y: -100 })
  const frameRef = useRef(0)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const coarse = window.matchMedia("(pointer: coarse)").matches
    if (reduced || coarse) return

    setMounted(true)
    document.documentElement.classList.add("has-custom-cursor")

    const onMove = (event: PointerEvent) => {
      const point = { x: event.clientX, y: event.clientY }
      x.set(point.x)
      y.set(point.y)
      mouseRef.current = point
      setVisible(true)

      const target = event.target as HTMLElement
      if (target.closest("[data-cursor='text']")) {
        setCursorMode("text")
      } else if (target.closest("[data-cursor='magnetic'], a, button")) {
        setCursorMode("magnetic")
      } else {
        setCursorMode("default")
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
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [x, y])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !mounted) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize, { passive: true })

    const render = () => {
      frameRef.current = requestAnimationFrame(render)
      const context = canvas.getContext("2d")
      if (!context) return

      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      pointsRef.current.unshift(mouseRef.current)
      pointsRef.current = pointsRef.current.slice(0, cursorMode === "text" ? 22 : 15)

      for (let index = 0; index < pointsRef.current.length - 1; index += 1) {
        const from = pointsRef.current[index]
        const to = pointsRef.current[index + 1]
        const alpha = Math.max(0, 1 - index / pointsRef.current.length)

        const gradient = context.createLinearGradient(from.x, from.y, to.x, to.y)
        gradient.addColorStop(0, `rgba(0, 232, 255, ${alpha * 0.85})`)
        gradient.addColorStop(0.52, `rgba(255, 46, 214, ${alpha * 0.62})`)
        gradient.addColorStop(1, `rgba(255, 207, 112, ${alpha * 0.25})`)

        context.strokeStyle = gradient
        context.lineWidth = Math.max(0.65, 3.2 - index * 0.18)
        context.lineCap = "square"
        context.beginPath()
        context.moveTo(from.x, from.y)
        context.lineTo(to.x, to.y)
        context.stroke()

        if (index % 4 === 0) {
          context.strokeStyle = `rgba(0, 232, 255, ${alpha * 0.22})`
          context.lineWidth = 1
          context.beginPath()
          context.moveTo(from.x - 9, from.y + 5)
          context.lineTo(from.x + 11, from.y - 7)
          context.stroke()
        }
      }
    }

    render()

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [cursorMode, mounted])

  if (!mounted) return null

  const frameSize = cursorMode === "text" ? 76 : cursorMode === "magnetic" ? 58 : 34

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="cursor-trails" />
      <motion.div
        aria-hidden="true"
        className="cursor-core"
        data-visible={visible}
        style={{ x, y }}
      />
      <motion.div
        aria-hidden="true"
        className="cursor-frame"
        data-mode={cursorMode}
        data-visible={visible}
        style={{ x: frameX, y: frameY }}
        animate={{ width: frameSize, height: frameSize }}
        transition={{ type: "spring", stiffness: 210, damping: 22 }}
      >
        <span />
        <span />
        <span />
        <span />
        {cursorMode === "text" ? <strong>OPEN</strong> : null}
      </motion.div>
    </>
  )
}
