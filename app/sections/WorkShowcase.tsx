"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { featuredWorks, type WorkItem } from "@/lib/work"
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap"
import { BLUR_DARK } from "@/lib/blur"

function posterFor(video: string) {
  const name = video.split("/").pop()?.replace(".mp4", "")
  if (video.includes("/optimized/")) return `/videos/optimized/posters/${name}.jpg`
  return `/videos/posters/${name}-poster.jpg`
}

// Floating cursor-tracked preview (CreateStudio pattern)
function WorkPreview({
  activeWork,
}: {
  activeWork: WorkItem | null
}) {
  const previewRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const xSetter = useRef<((v: number) => void) | null>(null)
  const ySetter = useRef<((v: number) => void) | null>(null)

  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    registerGSAP()
    gsap.set(el, { opacity: 0, scale: 0.92 })
    xSetter.current = gsap.quickSetter(el, "x", "px") as (v: number) => void
    ySetter.current = gsap.quickSetter(el, "y", "px") as (v: number) => void

    const onMove = (e: MouseEvent) => {
      xSetter.current?.(e.clientX - el.offsetWidth / 2)
      ySetter.current?.(e.clientY - el.offsetHeight / 2)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    if (activeWork) {
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" })
      if (videoRef.current && activeWork.video) {
        videoRef.current.src = activeWork.video
        videoRef.current.play().catch(() => undefined)
      }
    } else {
      gsap.to(el, { opacity: 0, scale: 0.92, duration: 0.35, ease: "power3.in" })
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.src = ""
      }
    }
  }, [activeWork])

  return (
    <div
      ref={previewRef}
      className="work-preview"
      aria-hidden="true"
    >
      <div className="work-preview__inner">
        {activeWork?.cover && (
          <Image
            key={activeWork.slug}
            src={activeWork.cover}
            alt=""
            fill
            sizes="460px"
            quality={80}
            className="work-preview__img"
            placeholder="blur"
            blurDataURL={BLUR_DARK}
          />
        )}
        {activeWork?.video && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={activeWork.video ? posterFor(activeWork.video) : undefined}
            className="work-preview__video"
          />
        )}
        <div className="work-preview__tag">
          {activeWork?.category ?? "Work"}
        </div>
      </div>
    </div>
  )
}

function WorkRow({
  work,
  index,
  onEnter,
  onLeave,
}: {
  work: WorkItem
  index: number
  onEnter: (w: WorkItem) => void
  onLeave: () => void
}) {
  return (
    <Link
      href={`/work/${work.slug}`}
      className="work-row"
      data-cursor="view"
      onMouseEnter={() => onEnter(work)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(work)}
      onBlur={onLeave}
    >
      <span className="work-row__index">/{String(index + 1).padStart(2, "0")}</span>

      <div className="work-row__body">
        <h3 className="work-row__title">{work.title}</h3>
        <p className="work-row__hook">{work.hook}</p>
      </div>

      <div className="work-row__side">
        <span className="work-row__category">{work.category}</span>
        <span className="work-row__year">YR/ {work.year}</span>
        <span className="work-row__cta" aria-hidden="true">
          View ↗
        </span>
      </div>
    </Link>
  )
}

export function WorkShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeWork, setActiveWork] = useState<WorkItem | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()
    const rows = gsap.utils.toArray<HTMLElement>(".work-row")
    gsap.set(rows, { yPercent: 15, opacity: 0, clipPath: "inset(0 0 100% 0)" })

    const triggers = rows.map((row, i) =>
      ScrollTrigger.create({
        trigger: row,
        start: "top 84%",
        onEnter() {
          gsap.to(row, {
            yPercent: 0,
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.85,
            delay: i * 0.06,
            ease: "power4.out",
          })
        },
      })
    )

    // Kicker + heading entrance
    const header = section.querySelector(".work-list-header")
    if (header) {
      gsap.set(header, { y: 40, opacity: 0 })
      ScrollTrigger.create({
        trigger: header,
        start: "top 88%",
        onEnter() {
          gsap.to(header, { y: 0, opacity: 1, duration: 1.1, ease: "power4.out" })
        },
      })
    }

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <section id="work" ref={sectionRef} className="work-list-section">
      <div className="work-list-header">
        <div className="work-list-header__top">
          <span className="section-kicker-cs">{"// 00.03°"}</span>
          <span className="section-kicker-cs">Origin Objects</span>
        </div>
        <div className="work-list-header__body">
          <h2 className="work-list-heading">
            Selected<br />
            Works
          </h2>
          <p className="work-list-copy">
            Projects formed as objects — each carrying the visual discipline of its origin.
            Brand systems, motion campaigns, and digital surfaces released from Alexandria.
          </p>
        </div>
      </div>

      <div className="work-list">
        <div className="work-list__rule" />
        {featuredWorks.map((work, index) => (
          <WorkRow
            key={work.slug}
            work={work}
            index={index}
            onEnter={setActiveWork}
            onLeave={() => setActiveWork(null)}
          />
        ))}
      </div>

      <div className="work-list-footer">
        <Link href="/objects" className="work-archive-link" data-cursor="magnetic">
          <span>Full archive</span>
          <span className="work-archive-link__count">
            ({featuredWorks.length} objects)
          </span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 16L16 4M16 4H8M16 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      <WorkPreview activeWork={activeWork} />
    </section>
  )
}
