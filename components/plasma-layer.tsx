"use client"

import dynamic from "next/dynamic"
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
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!allowAmbientEffects()) {
      return
    }

    const schedule =
      "requestIdleCallback" in window
        ? window.requestIdleCallback.bind(window)
        : (callback: () => void) => window.setTimeout(callback, 600)
    const cancel =
      "cancelIdleCallback" in window
        ? window.cancelIdleCallback.bind(window)
        : (handle: number) => window.clearTimeout(handle)

    const handle = schedule(() => setEnabled(true))
    return () => cancel(handle)
  }, [])

  if (!enabled) {
    return null
  }

  return <Plasma colorStops={["#1f3268", "#271824", "#bfd65c"]} speed={0.66} amplitude={0.84} blend={0.48} />
}
