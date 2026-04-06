"use client"

import { useEffect, useRef } from "react"

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar || typeof window === "undefined") return

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      bar.style.transform = `scaleX(${progress})`
    }

    window.addEventListener("scroll", update, { passive: true })
    update()

    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div
      aria-hidden="true"
      ref={barRef}
      className="pointer-events-none fixed left-0 right-0 top-0 z-[9997] h-0.5 origin-left"
      style={{
        background: "var(--color-electric-blue)",
        transform: "scaleX(0)",
      }}
    />
  )
}
