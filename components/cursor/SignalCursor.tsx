"use client"

import { useEffect, useRef, useState } from "react"
import { useDanverseStore } from "@/lib/store"

type Point = { x: number; y: number }

export function SignalCursor() {
  const cursorState = useDanverseStore((state) => state.cursorState)
  const setCursorState = useDanverseStore((state) => state.setCursorState)
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const dotRef = useRef<HTMLDivElement | null>(null)
  const trailRefs = useRef<(HTMLSpanElement | null)[]>([])
  const pointer = useRef<Point>({ x: 0, y: 0 })
  const trail = useRef<Point[]>(Array.from({ length: 6 }, () => ({ x: 0, y: 0 })))

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const coarse = window.matchMedia("(pointer: coarse)").matches

    if (reduced || coarse) return

    setEnabled(true)

    const handleMove = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY }
      setVisible(true)
    }

    const handleLeave = () => {
      setVisible(false)
      setCursorState("hidden")
    }

    const handleEnter = () => {
      setVisible(true)
      setCursorState("default")
    }

    window.addEventListener("pointermove", handleMove)
    window.addEventListener("pointerleave", handleLeave)
    window.addEventListener("pointerenter", handleEnter)

    let frame = 0
    const tick = () => {
      trail.current[0] = {
        x: pointer.current.x,
        y: pointer.current.y,
      }

      for (let index = 1; index < trail.current.length; index += 1) {
        const previous = trail.current[index - 1]
        const current = trail.current[index]

        trail.current[index] = {
          x: current.x + (previous.x - current.x) * 0.24,
          y: current.y + (previous.y - current.y) * 0.24,
        }
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.current.x}px, ${pointer.current.y}px, 0)`
      }

      trailRefs.current.forEach((node, index) => {
        if (!node) return
        const point = trail.current[index]
        node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) scale(${1 - index * 0.08})`
      })

      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerleave", handleLeave)
      window.removeEventListener("pointerenter", handleEnter)
    }
  }, [setCursorState])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className={`signal-cursor signal-cursor--${cursorState} ${visible ? "is-visible" : ""}`}
        aria-hidden="true"
      />
      <div className={`signal-trail ${visible ? "is-visible" : ""}`} aria-hidden="true">
        {trail.current.map((_, index) => (
          <span
            key={index}
            ref={(node) => {
              trailRefs.current[index] = node
            }}
          />
        ))}
      </div>
    </>
  )
}
