"use client"

import { useEffect, useRef } from "react"

export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rafId = 0
    let lastFrame = 0
    const targetFps = 12

    let seed = (Math.random() * 0xffffffff) | 0
    const rand = () => {
      seed ^= seed << 13
      seed ^= seed >> 17
      seed ^= seed << 5
      return (seed >>> 0) / 0xffffffff
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw)
      if (now - lastFrame < 1000 / targetFps) return
      lastFrame = now

      const width = canvas.width
      const height = canvas.height
      if (!width || !height) return

      const imageData = ctx.createImageData(width, height)
      const data = imageData.data
      const total = width * height
      const grainCount = (total * 0.028) | 0

      for (let index = 0; index < grainCount; index += 1) {
        const pixel = (rand() * total) | 0
        const base = pixel * 4
        const brightness = (rand() * 180 + 60) | 0
        data[base] = brightness
        data[base + 1] = brightness
        data[base + 2] = brightness
        data[base + 3] = (rand() * 12 + 3) | 0
      }

      ctx.putImageData(imageData, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize, { passive: true })
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9990] h-full w-full mix-blend-soft-light opacity-[0.03]"
      style={{ imageRendering: "pixelated" }}
    />
  )
}
