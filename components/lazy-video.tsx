"use client"

import { useEffect, useRef } from "react"

interface LazyVideoProps {
  src: string
  className?: string
  poster?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  playsInline?: boolean
  "aria-label"?: string
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
  "aria-label": ariaLabel,
  ...props
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const loadedRef = useRef(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    loadedRef.current = false

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    const saveData = (navigator as any)?.connection?.saveData === true
    const shouldAutoplay = autoplay && !prefersReducedMotion && !saveData

    let observer: IntersectionObserver | null = null
    let playOnCanPlay: (() => void) | null = null

    const onIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && !loadedRef.current) {
          el.src = src
          el.load()

          if (shouldAutoplay) {
            playOnCanPlay = async () => {
              try {
                await el.play()
              } catch (error) {
                // Autoplay might be blocked
              }
            }
            if (el.readyState >= 3) {
              void playOnCanPlay()
            } else {
              el.addEventListener("canplay", playOnCanPlay, { once: true })
            }
          }

          loadedRef.current = true
        } else if (!entry.isIntersecting && loadedRef.current && shouldAutoplay) {
          try {
            el.pause()
          } catch {}
        } else if (entry.isIntersecting && loadedRef.current && shouldAutoplay) {
          try {
            await el.play()
          } catch {}
        }
      })
    }

    observer = new IntersectionObserver(onIntersect, {
      rootMargin: "200px",
      threshold: 0.05,
    })
    observer.observe(el)

    const onVisibility = () => {
      if (!el) return
      const hidden = document.visibilityState === "hidden"
      if (hidden) {
        try {
          el.pause()
        } catch {}
      } else if (shouldAutoplay && loadedRef.current) {
        // resume only if we were auto-playing
        el.play().catch(() => {})
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      document.removeEventListener("visibilitychange", onVisibility)
      observer?.disconnect()
      if (playOnCanPlay) {
        el.removeEventListener("canplay", playOnCanPlay)
      }
    }
  }, [src, autoplay])

  return (
    <video
      ref={videoRef}
      className={className}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      preload="metadata"
      poster={poster}
      aria-label={ariaLabel}
      disableRemotePlayback
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
      } as React.CSSProperties}
      {...props}
    >
      Your browser does not support the video tag.
    </video>
  )
}
