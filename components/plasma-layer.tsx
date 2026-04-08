"use client"

import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const Plasma = dynamic(() => import("@/components/plasma"), { ssr: false })

function allowAmbientEffects() {
  if (typeof window === "undefined") {
    return false
  }

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  const connection = navigator as Navigator & {
    connection?: {
      saveData?: boolean
    }
  }
  const saveData = connection.connection?.saveData === true

  return !(prefersReducedMotion || saveData)
}

export function PlasmaLayer() {
  const pathname = usePathname()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const allowRoute = pathname === "/" || pathname === "/work"
    const largeViewport = window.matchMedia?.("(min-width: 768px)")?.matches ?? true

    if (!allowRoute || !largeViewport || !allowAmbientEffects()) {
      return
    }

    const activate = () => {
      setEnabled(true)
      cleanup()
    }

    const timerId = window.setTimeout(activate, 1600)
    const interactionEvents = ["pointerdown", "wheel", "touchstart", "keydown"] as const

    const cleanup = () => {
      window.clearTimeout(timerId)
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, activate)
      })
    }

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, activate, { passive: true, once: true })
    })

    return () => {
      cleanup()
      setEnabled(false)
    }
  }, [pathname])

  if (!enabled) {
    return null
  }

  return <Plasma colorStops={["#E0E75B", "#00A6A6", "#EF786A"]} speed={1.0} amplitude={1.1} blend={0.78} />
}
