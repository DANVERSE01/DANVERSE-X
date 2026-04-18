"use client"

import { useEffect, useRef, useState } from "react"
import { motionAssets, type MotionAsset } from "@/content/media"
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap"

function MotionTile({
  asset,
  index,
  active,
  onActivate,
}: {
  asset: MotionAsset
  index: number
  active: boolean
  onActivate: () => void
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const play = () => {
    onActivate()
    videoRef.current?.play().catch(() => undefined)
  }

  const pause = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  return (
    <button
      type="button"
      className="motion-tile"
      data-active={active}
      data-cursor="text"
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
      onClick={onActivate}
    >
      <span className="motion-tile__index">{String(index + 1).padStart(2, "0")}</span>
      <span className="motion-tile__media">
        <video ref={videoRef} src={asset.src} poster={asset.poster} muted loop playsInline preload="metadata" />
      </span>
      <span className="motion-tile__copy">
        <strong>{asset.title}</strong>
        <span>{asset.role}</span>
      </span>
      <span className="motion-tile__source">{asset.sourceLabel}</span>
    </button>
  )
}

export function MotionVault() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLVideoElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const active = motionAssets[activeIndex] ?? motionAssets[0]

  useEffect(() => {
    const video = stageRef.current
    if (!video) return

    video.load()
    video.play().catch(() => undefined)
  }, [activeIndex])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()
    const tiles = gsap.utils.toArray<HTMLElement>(".motion-tile", section)
    gsap.set(tiles, { y: 70, opacity: 0 })

    const reveal = ScrollTrigger.batch(tiles, {
      start: "top 88%",
      once: true,
      onEnter(batch) {
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.055,
          ease: "power4.out",
        })
      },
    })

    const activeTriggers = tiles.map((tile, index) =>
      ScrollTrigger.create({
        trigger: tile,
        start: "top center",
        end: "bottom center",
        onToggle(self) {
          if (self.isActive) setActiveIndex(index)
        },
      })
    )

    const sweep = gsap.fromTo(
      section.querySelector(".motion-vault__sweep"),
      { xPercent: -45, opacity: 0.16 },
      {
        xPercent: 45,
        opacity: 0.32,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    )

    return () => {
      reveal.forEach((trigger) => trigger.kill())
      activeTriggers.forEach((trigger) => trigger.kill())
      sweep.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="motion-vault" id="motion-vault">
      <div className="motion-vault__sweep" aria-hidden="true" />
      <div className="motion-vault__header">
        <div>
          <div className="section-kicker">
            <span>[ 04 ]</span>
            <span>Motion vault</span>
          </div>
          <h2>
            Every film
            <br />
            earns its
            <br />
            frame
          </h2>
        </div>
        <p>
          The video archive is now staged as working material: compressed proxies, generated posters, careful preload, and active playback only when the viewer asks for it.
        </p>
      </div>

      <div className="motion-vault__body">
        <div className="motion-vault__stage" data-cursor="magnetic">
          <video
            ref={stageRef}
            key={active.id}
            src={active.src}
            poster={active.poster}
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="motion-vault__stage-copy">
            <span>{active.role}</span>
            <strong>{active.title}</strong>
          </div>
        </div>

        <div className="motion-vault__rail">
          {motionAssets.map((asset, index) => (
            <MotionTile
              key={asset.id}
              asset={asset}
              index={index}
              active={index === activeIndex}
              onActivate={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
