"use client"

import { useEffect } from "react"
import { trackPwaEvent } from "@/lib/analytics"

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) {
      return
    }

    let mounted = true

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" })

        if (!mounted) {
          return
        }

        trackPwaEvent("pwa_service_worker_registered", {
          scope: registration.scope,
        })

        void registration.update().catch(() => null)
      } catch {
        // Ignore service worker registration failures so the site stays usable.
      }
    }

    if (document.readyState === "complete") {
      void registerServiceWorker()
      return () => {
        mounted = false
      }
    }

    const handleLoad = () => {
      void registerServiceWorker()
    }

    window.addEventListener("load", handleLoad, { once: true })

    return () => {
      mounted = false
      window.removeEventListener("load", handleLoad)
    }
  }, [])

  return null
}
