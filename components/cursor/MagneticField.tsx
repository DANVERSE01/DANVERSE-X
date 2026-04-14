"use client"

import type { ReactNode } from "react"
import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

export function MagneticField({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    const handleMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect()
      const offsetX = event.clientX - (bounds.left + bounds.width / 2)
      const offsetY = event.clientY - (bounds.top + bounds.height / 2)

      gsap.to(element, {
        x: offsetX * 0.08,
        y: offsetY * 0.08,
        duration: 0.35,
        ease: "power3.out",
      })
    }

    const handleLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
      })
    }

    element.addEventListener("pointermove", handleMove)
    element.addEventListener("pointerleave", handleLeave)

    return () => {
      element.removeEventListener("pointermove", handleMove)
      element.removeEventListener("pointerleave", handleLeave)
    }
  }, [])

  return (
    <div ref={ref} className={`magnetic-field ${className}`.trim()}>
      {children}
    </div>
  )
}
