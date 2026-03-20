"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { ErrorBoundary } from "@/components/ErrorBoundary"

const RobotBackground = dynamic(() => import("@/components/RobotBackground").then((m) => ({ default: m.RobotBackground })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
})

type NetworkInfo = {
  saveData?: boolean
  effectiveType?: string
  addEventListener?: (type: "change", listener: () => void) => void
  removeEventListener?: (type: "change", listener: () => void) => void
}

function shouldRenderRobotBackground() {
  if (typeof window === "undefined") return false

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches
  const connection = (navigator as Navigator & { connection?: NetworkInfo }).connection
  const saveData = connection?.saveData === true
  const slowConnection =
    connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g"
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const lowMemory = typeof deviceMemory === "number" && deviceMemory <= 4

  return isDesktop && !prefersReducedMotion && !saveData && !slowConnection && !lowMemory
}

export function BackgroundLayer() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const desktopQuery = window.matchMedia("(min-width: 1024px)")
    const connection = (navigator as Navigator & { connection?: NetworkInfo }).connection

    const update = () => {
      setEnabled(shouldRenderRobotBackground())
    }

    update()

    reducedMotionQuery.addEventListener("change", update)
    desktopQuery.addEventListener("change", update)
    connection?.addEventListener?.("change", update)

    return () => {
      reducedMotionQuery.removeEventListener("change", update)
      desktopQuery.removeEventListener("change", update)
      connection?.removeEventListener?.("change", update)
    }
  }, [])

  if (!enabled) return null

  return (
    <ErrorBoundary componentName="RobotBackground">
      <RobotBackground />
    </ErrorBoundary>
  )
}
