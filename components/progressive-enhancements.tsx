"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

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
const WebVitalsReporter = dynamic(
  () => import("@/components/web-vitals-reporter").then((module) => module.WebVitalsReporter),
  { ssr: false }
)

export function ProgressiveEnhancements() {
  const [enableDeferredEnhancements, setEnableDeferredEnhancements] = useState(false)

  useEffect(() => {
    const schedule =
      "requestIdleCallback" in window
        ? window.requestIdleCallback.bind(window)
        : (callback: () => void) => window.setTimeout(callback, 700)
    const cancel =
      "cancelIdleCallback" in window
        ? window.cancelIdleCallback.bind(window)
        : (handle: number) => window.clearTimeout(handle)

    const handle = schedule(() => setEnableDeferredEnhancements(true))
    return () => cancel(handle)
  }, [])

  return (
    <>
      <ServiceWorkerRegister />
      <WebVitalsReporter />
      {enableDeferredEnhancements ? <ScrollTracker /> : null}
      {enableDeferredEnhancements ? <SmoothScrollController /> : null}
    </>
  )
}
