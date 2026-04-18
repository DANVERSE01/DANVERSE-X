"use client"

import { useEffect, useRef } from "react"

export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId = 0
    let frame = 0

    let seed = 0x12345678
    function xorshift32() {
      seed ^= seed << 13
      seed ^= seed >> 17
      seed ^= seed << 5
      return (seed >>> 0) / 0xffffffff
    }

    function resize() {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
    }

    resize()
    window.addEventListener("resize", resize, { passive: true })

    function draw() {
      animId = requestAnimationFrame(draw)
      frame++
      if (frame % 3 !== 0) return
      if (!canvas || !ctx) return

      const w = canvas.width
      const h = canvas.height
      const imageData = ctx.createImageData(w, h)
      const buf = imageData.data

      for (let i = 0; i < buf.length; i += 4) {
        const v = (xorshift32() * 255) | 0
        buf[i] = v
        buf[i + 1] = v
        buf[i + 2] = v
        buf[i + 3] = (xorshift32() * 28) | 0
      }

      ctx.putImageData(imageData, 0, 0)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 9994,
        pointerEvents: "none",
        mixBlendMode: "multiply",
        opacity: 0.05,
      }}
    />
  )
}
