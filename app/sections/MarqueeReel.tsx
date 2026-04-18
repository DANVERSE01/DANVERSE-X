"use client"

import { useCallback, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

function ChapterVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

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
    const coarse = window.matchMedia("(pointer: coarse)").matches
    if (coarse) return

    const el = wrapRef.current
    if (!el) return

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.22 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onIntersect])

  return (
    <div ref={wrapRef} className="artifact-chapter__media" aria-hidden="true">
      <video
        ref={videoRef}
        src="/videos/optimized/showreel-hero.mp4"
        poster="/videos/optimized/posters/showreel-hero.jpg"
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  )
}

export function MarqueeReel() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"])

  return (
    <section ref={sectionRef} className="artifact-chapter" id="threshold">
      <ChapterVideo />
      <motion.div className="artifact-chapter__content" style={{ y }}>
        <div>
          <div className="section-kicker">
            <span>[ 01 ]</span>
            <span>The threshold</span>
          </div>
          <h2>
            Not every
            <br />
            frame asks
            <br />
            to be seen
          </h2>
        </div>
        <p>
          The work is held until the object, the motion, and the environment can carry one thought without explanation.
        </p>
      </motion.div>
    </section>
  )
}
