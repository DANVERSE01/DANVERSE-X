"use client"

import { useEffect, useRef, useState } from "react"

interface UseLazyLoadOptions extends IntersectionObserverInit {
  once?: boolean
}

export function useLazyLoad<T extends Element>({
  root = null,
  rootMargin = "160px 0px",
  threshold = 0.1,
  once = true,
}: UseLazyLoadOptions = {}) {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return
        }

        if (entry.isIntersecting) {
          setIsVisible(true)

          if (once) {
            observer.disconnect()
          }
          return
        }

        if (!once) {
          setIsVisible(false)
        }
      },
      { root, rootMargin, threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [once, root, rootMargin, threshold])

  return { ref, isVisible }
}
