"use client"

import { useCallback, useEffect, useRef } from "react"

export function CaseStudyVideo({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const video = videoRef.current
    if (!video) return
    if (entries[0].isIntersecting) {
      video.play().catch(() => {})
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
    <section className="case-study__video">
      <h2 className="case-study__gallery-title">Video Showcase</h2>
      <div
        ref={wrapRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          aspectRatio: "16 / 9",
          borderRadius: "4px",
          overflow: "hidden",
          background: "#0a0a0f",
        }}
      >
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          controls
          aria-label={`${title} video showcase`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </section>
  )
}
