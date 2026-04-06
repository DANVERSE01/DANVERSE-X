import { useEffect, useRef } from "react"

interface MagneticOptions {
  /** Maximum pixel displacement. Default: 18px */
  strength?: number
  /** How far outside the element the magnet activates (px). Default: 60 */
  radius?: number
  /** Ease factor (lower = more rubber). Default: 0.2 */
  ease?: number
}

/**
 * Attach a magnetic pull effect to a DOM element.
 * Returns a ref to attach to the element.
 *
 * On desktop: element follows cursor with lerp inside the activation radius.
 * On touch/mobile: no-op.
 */
export function useMagnetic<T extends HTMLElement>(
  { strength = 18, radius = 60, ease = 0.2 }: MagneticOptions = {}
) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === "undefined") return

    const coarse = window.matchMedia("(pointer: coarse)").matches
    if (coarse) return

    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let rafId = 0
    let active = false

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      currentX = lerp(currentX, targetX, ease)
      currentY = lerp(currentY, targetY, ease)

      const dx = Math.abs(currentX)
      const dy = Math.abs(currentY)

      if (dx > 0.01 || dy > 0.01 || active) {
        el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }

      rafId = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist < rect.width / 2 + radius) {
        active = true
        // Strength falls off with distance
        const falloff = 1 - dist / (rect.width / 2 + radius)
        targetX = (dx / (rect.width / 2 + radius)) * strength * falloff * 2
        targetY = (dy / (rect.height / 2 + radius)) * strength * falloff * 2
      } else {
        active = false
        targetX = 0
        targetY = 0
      }
    }

    const onLeave = () => {
      active = false
      targetX = 0
      targetY = 0
    }

    document.addEventListener("mousemove", onMove, { passive: true })
    el.addEventListener("mouseleave", onLeave, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
      el.style.transform = ""
    }
  }, [strength, radius, ease])

  return ref
}
