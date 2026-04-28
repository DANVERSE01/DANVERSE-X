"use client"

import { useCallback, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const ITEMS = [
  "Brand Identity",
  "Motion Design",
  "Visual Systems",
  "Campaign Direction",
  "Social Content",
  "3D & CGI",
  "Creative Strategy",
  "Digital Products",
]

function Row({ rtl = false, baseVelocity = 60, rowOpacity = 1 }: { rtl?: boolean; baseVelocity?: number; rowOpacity?: number }) {
  const items = [...ITEMS, ...ITEMS]

  return (
    <div className="marquee-row" style={{ opacity: rowOpacity }}>
      <motion.div
        className="marquee-row__track"
        animate={{ x: rtl ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: baseVelocity, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`marquee-item${i % 3 === 1 ? " marquee-item--accent" : ""}`}
          >
            {item}
            <span className="marquee-item__dot">■</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function VideoReel() {
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
    <div ref={wrapRef} className="marquee-video">
      <video
        ref={videoRef}
        src="/videos/brand-film.mp4"
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="marquee-video__overlay" />
      <span className="marquee-video__caption">Showreel — 2026</span>
      <span className="marquee-video__index">[ 00 ]</span>
    </div>
  )
}

export function MarqueeReel() {
  return (
    <section aria-hidden="true" className="marquee-reel">
      <Row baseVelocity={40} rowOpacity={0.4} />
      <Row rtl baseVelocity={60} rowOpacity={1} />
      <Row baseVelocity={50} rowOpacity={0.7} />
      <VideoReel />
    </section>
  )
}
