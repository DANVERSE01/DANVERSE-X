"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DanverseWordmark } from "@/components/danverse-logo"
import { HeroMediaCard, type HeroMediaItem } from "@/components/hero-media-card"
import { HoverLift } from "@/components/hover-lift"
import { createWhatsAppUrl } from "@/lib/env"

const HERO_MEDIA: Array<HeroMediaItem & { visibility?: string }> = [
  {
    title: "Conversions",
    sub: "Turn clicks into paying customers.",
    videoSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A%20new%20chapter%20in%20the%20story%20of%20success.__Introducing%20the%20new%20TAG%20Heuer%20Carrera%20Day-Date%20collection%2C%20reimagined%20with%20bold%20colors%2C%20refined%20finishes%2C%20and%20upgraded%20functionality%20to%20keep%20you%20focused%20on%20your%20goals.%20__Six%20-nDNoRQyFaZ8oaaoty4XaQz8W8E5bqA.mp4",
    posterSrc: "/images/hero-posters/conversions-card.webp",
  },
  {
    title: "Speed",
    sub: "Launch in days, not weeks.",
    videoSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b0f3222371106db366a14ca1c29cef55-1b1EWVSa4w3FL2zslcaCGYTy9vcxjF.mp4",
    posterSrc: "/images/hero-posters/default-card.webp",
  },
  {
    title: "Social-Ready",
    sub: "Made for IG, TikTok, and Meta.",
    videoSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Timeline%201-Ku3Y2Hgaw8hCiFEFg1ELtYp631rSzR.webm",
    posterSrc: "/images/hero-posters/social-ready-card.webp",
  },
  {
    title: "Standout",
    sub: "Be the product no one scrolls past.",
    videoSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b0f3222371106db366a14ca1c29cef55-1b1EWVSa4w3FL2zslcaCGYTy9vcxjF.mp4",
    posterSrc: "/images/hero-posters/default-card.webp",
    visibility: "hidden lg:block",
  },
  {
    title: "Premium",
    sub: "Look like the market leader.",
    videoSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b0f3222371106db366a14ca1c29cef55-1b1EWVSa4w3FL2zslcaCGYTy9vcxjF.mp4",
    posterSrc: "/images/hero-posters/default-card.webp",
    visibility: "hidden xl:block",
  },
]

export function Hero() {
  return (
    <section aria-label="Hero introduction" className="section-shell overflow-hidden pt-6 sm:pt-8">
      <div className="content-shell">
        <div className="mx-auto flex max-w-[1080px] flex-col items-center py-12 text-center sm:py-16">
          <div className="relative mb-8 flex flex-col items-center gap-4">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[-22%] top-[-18%] h-[130%] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 80% 54% at 50% 0%, rgba(245,245,0,0.1) 0%, rgba(201,168,245,0.08) 38%, transparent 72%)",
              }}
            />
            <div className="relative inline-flex items-center gap-4 rounded-full border border-[rgba(245,245,0,0.12)] bg-[rgba(17,19,24,0.72)] px-4 py-3 shadow-[var(--shadow-panel)] backdrop-blur-xl">
              <div className="relative h-16 w-16 overflow-hidden rounded-[1.35rem] border border-[rgba(245,245,0,0.18)] bg-black/40 shadow-[var(--glow-primary)]">
                <Image
                  src="/images/danverse-logo.webp"
                  alt="DANVERSE emblem"
                  fill
                  sizes="64px"
                  className="object-cover scale-[2.6]"
                  style={{ objectPosition: "center 8%" }}
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[rgba(8,10,14,0.96)] via-[rgba(8,10,14,0.74)] to-transparent" />
              </div>
              <div className="text-left">
                <p className="section-label mb-1">DANVERSE Studio</p>
                <DanverseWordmark size="lg" className="tracking-[0.22em]" />
              </div>
            </div>
          </div>

          <h1 className="mx-auto max-w-[9ch] text-center text-white">Films. Identity. Systems.</h1>
          <p className="body-copy mx-auto mt-6 max-w-2xl text-sm leading-7 sm:text-base">
            Director-led creative for brands that need visual authority, clear systems, and launch-ready assets that
            feel expensive on every screen.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <HoverLift>
                <Button asChild size="lg" className="cta-coral rounded-full px-8 py-3 font-medium text-white">
                  <a href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    Chat With Us
                  </a>
                </Button>
              </HoverLift>
              <HoverLift>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white/10 bg-white/[0.03] px-8 py-3 text-white hover:bg-white/[0.05] hover:text-[var(--color-accent-gold)]"
                >
                  <a href="#showcase">View Work</a>
                </Button>
              </HoverLift>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {["Cinematic Ads", "Brand Identity", "AI Production"].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/72"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 w-full">
            <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {HERO_MEDIA.map(({ visibility, ...item }) => (
                <div key={item.title} className={visibility}>
                  <HeroMediaCard {...item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
