"use client"

import type { VideoHTMLAttributes } from "react"
import { useEffect, useRef } from "react"

interface LazyVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "autoPlay" | "src"> {
  src: string
  autoplay?: boolean
  rootMargin?: string
}

export default function LazyVideo({
  src,
  className = "",
  poster,
  autoplay = false,
  loop = false,
  muted = true,
  controls = false,
  playsInline = true,
  rootMargin = "220px",
  ...props
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const loadedRef = useRef(false)
  const inViewRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    loadedRef.current = false
    inViewRef.current = false

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true
    const shouldAutoplay = autoplay && !prefersReducedMotion && !saveData

    const syncPlayback = async () => {
      if (!shouldAutoplay || !loadedRef.current || !inViewRef.current || document.visibilityState === "hidden") {
        video.pause()
        return
      }

      try {
        await video.play()
      } catch {
        // Ignore autoplay failures so the poster can remain in place.
      }
    }

    const loadVideo = () => {
      if (loadedRef.current) {
        return
      }

      video.src = src
      video.load()
      loadedRef.current = true
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        inViewRef.current = entry?.isIntersecting ?? false

        if (inViewRef.current) {
          loadVideo()
          void syncPlayback()
          return
        }

        video.pause()
      },
      {
        rootMargin,
        threshold: 0.05,
      }
    )

    const handleVisibilityChange = () => {
      void syncPlayback()
    }

    observer.observe(video)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      observer.disconnect()
      video.pause()
    }
  }, [autoplay, rootMargin, src])

  return (
    <video
      ref={videoRef}
      className={className}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      poster={poster}
      preload="none"
      disableRemotePlayback
      {...props}
    >
      Your browser does not support the video tag.
    </video>
  )
}
