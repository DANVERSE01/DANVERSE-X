"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { featuredWorks, type WorkItem } from "@/lib/work"
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap"

function SelectedWorkCard({ work, index }: { work: WorkItem; index: number }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const cardRef = useRef<HTMLAnchorElement | null>(null)

  const play = () => {
    videoRef.current?.play().catch(() => undefined)
  }

  const pause = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  useEffect(() => {
    const card = cardRef.current
    if (!card || !work.video) return

    const pauseVideo = () => {
      if (!videoRef.current) return
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) pauseVideo()
      },
      { threshold: 0.05 }
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [work.video])

  return (
    <Link
      ref={cardRef}
      href={`/work/${work.slug}`}
      className="selected-work"
      data-cursor="text"
      data-size={index % 2 === 0 ? "wide" : "narrow"}
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
    >
      <span className="selected-work__index">{String(index + 1).padStart(2, "0")}</span>
      <div className="selected-work__media" data-vt={`project-${work.slug}`}>
        {work.cover ? (
          <Image
            src={work.cover}
            alt={work.title}
            fill
            sizes={index % 2 === 0 ? "100vw" : "(max-width: 900px) 100vw, 62vw"}
            priority={index === 0}
            quality={92}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ) : null}
        {work.video ? (
          <div className="selected-work__video" aria-hidden="true">
            <video
              ref={videoRef}
              src={work.video}
              poster={`/videos/posters/${work.video.split("/").pop()?.replace(".mp4", "")}-poster.jpg`}
              muted
              loop
              playsInline
              preload="none"
            />
          </div>
        ) : null}
      </div>
      <div className="selected-work__caption">
        <h3>{work.title}</h3>
        <dl>
          <div>
            <dt>Client</dt>
            <dd>{work.tags[0] ?? "DANVERSE"}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{work.category ?? "Campaign"}</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>{work.year ?? "2026"}</dd>
          </div>
        </dl>
      </div>
      <div className="selected-work__hover">
        <span>{work.category ?? "Case study"}</span>
        <p>{work.hook ?? "Direction-led creative for brands that need authority."}</p>
      </div>
    </Link>
  )
}

export function WorkShowcase() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()
    const cards = gsap.utils.toArray<HTMLElement>(".selected-work")
    const triggers = cards.map((card) =>
      ScrollTrigger.create({
        trigger: card,
        start: "top 82%",
        onEnter() {
          gsap.to(card, { y: 0, opacity: 1, duration: 0.85, ease: "power4.out" })
        },
      })
    )

    gsap.set(cards, { y: 80, opacity: 0 })

    return () => triggers.forEach((trigger) => trigger.kill())
  }, [])

  return (
    <section id="work" ref={sectionRef} className="selected-works-section">
      <div className="ref-section-header">
        <span>[ 01 ]</span>
        <h2>Selected works</h2>
        <p>/ {String(featuredWorks.length).padStart(2, "0")}</p>
      </div>
      <div className="selected-works-list">
        {featuredWorks.map((work, index) => (
          <SelectedWorkCard key={work.slug} work={work} index={index} />
        ))}
      </div>
      <Link href="/work" className="archive-link" data-cursor="magnetic">
        See all works
      </Link>
    </section>
  )
}
