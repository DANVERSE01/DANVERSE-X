"use client"

import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

const ScrollTracker = dynamic(() => import("@/components/scroll-tracker").then((module) => module.ScrollTracker), {
  ssr: false,
})
const ServiceWorkerRegister = dynamic(
  () => import("@/components/service-worker-register").then((module) => module.ServiceWorkerRegister),
  { ssr: false }
)
const SmoothScrollController = dynamic(
  () => import("@/components/smooth-scroll-controller").then((module) => module.SmoothScrollController),
  { ssr: false }
)
const CinematicStage = dynamic(() => import("@/components/cinematic-stage").then((module) => module.CinematicStage), {
  ssr: false,
})
const WebVitalsReporter = dynamic(
  () => import("@/components/web-vitals-reporter").then((module) => module.WebVitalsReporter),
  { ssr: false }
)

export function ProgressiveEnhancements() {
  const pathname = usePathname()
  const [enableIdleEnhancements, setEnableIdleEnhancements] = useState(false)
  const [enableInteractiveEnhancements, setEnableInteractiveEnhancements] = useState(false)
  const enableSmoothScroll = useMemo(() => pathname === "/" || pathname === "/work", [pathname])
  const enableCinematicStage = pathname === "/"

  useEffect(() => {
    const schedule =
      "requestIdleCallback" in window
        ? window.requestIdleCallback.bind(window)
        : (callback: () => void) => window.setTimeout(callback, 700)
    const cancel =
      "cancelIdleCallback" in window
        ? window.cancelIdleCallback.bind(window)
        : (handle: number) => window.clearTimeout(handle)

    const handle = schedule(() => setEnableIdleEnhancements(true))
    return () => cancel(handle)
  }, [])

  useEffect(() => {
    const activateEnhancements = () => {
      setEnableInteractiveEnhancements(true)
      cleanup()
    }

    const interactionEvents = ["pointerdown", "wheel", "touchstart", "keydown"] as const
    const timerId = window.setTimeout(activateEnhancements, 2200)

    const cleanup = () => {
      window.clearTimeout(timerId)
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, activateEnhancements)
      })
    }

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, activateEnhancements, { passive: true, once: true })
    })

    return cleanup
  }, [])

  return (
    <>
      <ServiceWorkerRegister />
      {enableIdleEnhancements ? <WebVitalsReporter /> : null}
      {enableInteractiveEnhancements ? <ScrollTracker /> : null}
      {enableInteractiveEnhancements && enableSmoothScroll ? <SmoothScrollController /> : null}
      {enableInteractiveEnhancements && enableCinematicStage ? <CinematicStage /> : null}
    </>
  )
}
