"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { TextReveal } from "@/components/text-reveal"
import { registerGSAP, gsap } from "@/lib/gsap"

const HERO_REEL = {
  posterSrc: "/images/hero/1178894778.jpg",
  videoSrc: "/videos/premium.mp4",
} as const

export function Hero() {
  const ambientRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setPrefersReducedMotion(mediaQuery.matches)
    update()
    mediaQuery.addEventListener?.("change", update)

    return () => mediaQuery.removeEventListener?.("change", update)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    registerGSAP()

    const ambient = ambientRef.current
    const body = bodyRef.current
    const media = mediaRef.current
    if (!body || !media) return

    gsap.set(ambient, { opacity: 0 })
    gsap.set(body.children, { opacity: 0, y: 20 })
    gsap.set(media, { opacity: 0, y: 40, scale: 0.985 })

    const timeline = gsap.timeline({ delay: 0.08 })
    timeline.to(ambient, { opacity: 1, duration: 1.1, ease: "power1.out" }, 0)
    timeline.to(body.children, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }, 0.12)
    timeline.to(media, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power4.out" }, 0.24)

    return () => {
      timeline.kill()
    }
  }, [])

  return (
    <section id="hero" aria-label="Hero introduction" className="section-shell relative overflow-hidden pt-2 sm:pt-4">
      <div ref={ambientRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_14%,rgba(201,255,57,0.09),transparent_52%),radial-gradient(ellipse_40%_34%_at_18%_72%,rgba(240,113,69,0.08),transparent_56%),radial-gradient(ellipse_38%_30%_at_82%_74%,rgba(141,121,255,0.08),transparent_52%)]" />
        <div className="absolute inset-x-[8%] top-8 h-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_72%)] blur-3xl sm:top-16 sm:h-52" />
      </div>

      <div className="relative z-[2] mx-auto flex max-w-[1400px] flex-col gap-8 pb-[clamp(4.5rem,7vw,6rem)] pt-[clamp(3.5rem,8vw,7rem)]">
        <div ref={bodyRef} className="mx-auto flex max-w-[62rem] flex-col items-center text-center">
          <p className="section-label">Director-led campaign systems</p>
          <TextReveal
            as="h1"
            type="words"
            preset="clip-up"
            stagger={0.08}
            trigger="immediate"
            className="mt-5 max-w-[11ch] text-[clamp(4rem,12vw,10rem)] font-normal leading-[0.88] tracking-[0.02em] text-white"
          >
            Direction That Lands.
          </TextReveal>
          <p className="mx-auto mt-5 max-w-[44ch] text-[clamp(1rem,2vw,1.12rem)] leading-[1.8] text-white/62 sm:mt-6">
            Director-led strategy and production for brands where the first frame decides whether the message gets
            heard.
          </p>
          <div className="mt-7 sm:mt-8">
            <Button asChild variant="outline" size="lg" className="px-7 sm:px-8">
              <a href="#showcase" aria-label="Jump to selected work">
                View selected work
              </a>
            </Button>
          </div>
        </div>

        <div ref={mediaRef} className="mx-auto w-full max-w-[1400px]">
          <figure
            aria-label="Featured DANVERSE campaign reel"
            className="group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#070709] shadow-[0_40px_120px_rgba(0,0,0,0.48)] sm:rounded-[1.7rem]"
          >
            <div className="relative aspect-[16/10] min-h-[58vh] overflow-hidden md:min-h-[66vh] lg:min-h-[72vh]">
              <Image
                src={HERO_REEL.posterSrc}
                alt=""
                aria-hidden="true"
                fill
                priority
                sizes="(max-width: 1440px) 96vw, 1400px"
                className={`object-cover transition-all duration-700 ease-out ${
                  prefersReducedMotion
                    ? "scale-[1.01] opacity-100"
                    : videoReady
                      ? "scale-[1.04] opacity-0"
                      : "scale-[1.01] opacity-100"
                }`}
              />

              {!prefersReducedMotion ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={HERO_REEL.posterSrc}
                  preload="metadata"
                  onCanPlay={() => setVideoReady(true)}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] ${
                    videoReady ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <source src={HERO_REEL.videoSrc} type="video/mp4" />
                </video>
              ) : null}

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,9,0.12)_0%,rgba(7,7,9,0.02)_30%,rgba(7,7,9,0.26)_62%,rgba(7,7,9,0.82)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(201,255,57,0.14),transparent_20%),radial-gradient(circle_at_82%_18%,rgba(141,121,255,0.12),transparent_24%)]" />
              <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#070709] via-[#070709]/18 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8">
                <div className="max-w-[28rem]">
                  <p className="section-label text-white/44">Featured reel</p>
                  <p className="mt-3 text-[clamp(1rem,1.8vw,1.14rem)] leading-[1.8] text-white/72">
                    One cinematic reference frame, scaled into a launch system that keeps authority intact across every
                    cut, crop, and rollout handoff.
                  </p>
                </div>
              </div>
            </div>
            <figcaption className="sr-only">Featured cinematic direction reel from DANVERSE.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
