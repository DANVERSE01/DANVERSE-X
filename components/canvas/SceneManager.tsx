"use client"

import { useEffect, useState } from "react"
import { emitter } from "@/lib/events"
import { useDanverseStore } from "@/lib/store"
import { detectTier } from "@/lib/webgpu"
import { HeroTransmission } from "@/components/canvas/HeroTransmission"

export function SceneManager() {
  const deviceTier = useDanverseStore((state) => state.deviceTier)
  const setDeviceTier = useDanverseStore((state) => state.setDeviceTier)
  const setRendererReady = useDanverseStore((state) => state.setRendererReady)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true

    const resolveTier = async () => {
      const tier = await detectTier()
      if (!active) return

      setDeviceTier(tier)
      setReady(true)

      if (tier === "tier1" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setRendererReady()
        emitter.emit("gpu-ready")
      }
    }

    void resolveTier()

    return () => {
      active = false
    }
  }, [setDeviceTier, setRendererReady])

  if (!ready || deviceTier === "tier1") {
    return <div className="hero-fallback" aria-hidden="true" />
  }

  return <HeroTransmission tier={deviceTier} />
}
