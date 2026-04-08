"use client"

import { useEffect, useRef } from "react"

/**
 * Animated film grain overlay using a canvas that refreshes at ~12fps.
 * Uses a Xorshift32 PRNG for near-zero CPU cost.
 * Grain is rendered as semi-transparent white dots at low opacity — gives
 * the site a high-end cinematic texture without impacting readability.
 */
export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rafId = 0
    let lastFrame = 0
    const TARGET_FPS = 16 // ~16fps for grain — imperceptible flicker, very cheap

    // Xorshift32 — fast deterministic PRNG
    let seed = (Math.random() * 0xffffffff) | 0
    function rand() {
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

      const delta = now - lastFrame
      if (delta < 1000 / TARGET_FPS) return
      lastFrame = now

      const w = canvas.width
      const h = canvas.height
      if (!w || !h) return

      const imageData = ctx.createImageData(w, h)
      const data = imageData.data

      // Sparse grain — only ~4% of pixels get noise
      const total = w * h
      const grainCount = (total * 0.038) | 0

      for (let i = 0; i < grainCount; i++) {
        const px = (rand() * total) | 0
        const base = px * 4
        const brightness = (rand() * 180 + 60) | 0
        data[base] = brightness
        data[base + 1] = brightness
        data[base + 2] = brightness
        data[base + 3] = (rand() * 22 + 6) | 0 // very low alpha
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
      className="pointer-events-none fixed inset-0 z-[9990] h-full w-full mix-blend-overlay opacity-[0.38]"
      style={{ imageRendering: "pixelated" }}
    />
  )
}
