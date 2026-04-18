"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export function CaseStudyVideo({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const name = src.split("/").pop()?.replace(".mp4", "")
  const posterPath = src.includes("/optimized/")
    ? `/videos/optimized/posters/${name}.jpg`
    : `/videos/posters/${name}-poster.jpg`

  const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const video = videoRef.current
    if (!video) return
    if (entries[0]?.isIntersecting) {
      video.play().catch(() => undefined)
    } else {
      video.pause()
    }
  }, [])

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    if (isCoarse) return

    const el = wrapRef.current
    if (!el) return

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.25 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onIntersect])

  return (
    <section className="case-study__video-section">
      <h2 className="case-study__gallery-title">Motion record</h2>
      <div
        ref={wrapRef}
        className="case-study__video-wrap"
      >
        <video
          ref={videoRef}
          src={src}
          poster={posterPath}
          muted
          loop
          playsInline
          preload="none"
          controls
          aria-label={`${title} video showcase`}
          onLoadedData={() => setIsLoaded(true)}
          className={`case-study__video-el ${isLoaded ? "is-loaded" : ""}`}
        />
        {!isLoaded && <div className="case-study__video-skeleton" />}
      </div>
    </section>
  )
}
