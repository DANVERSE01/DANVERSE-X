"use client"

import { Button } from "@/components/ui/button"
import { DanverseLogo } from "@/components/danverse-logo"
import { HeroMediaCard, type HeroMediaItem } from "@/components/hero-media-card"
import { HoverLift } from "@/components/hover-lift"
import { createWhatsAppUrl } from "@/lib/env"

const HERO_MEDIA: HeroMediaItem[] = [
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
]

export function Hero() {
  return (
    <section aria-label="Hero introduction" className="section-shell overflow-hidden pt-6 sm:pt-8">
      <div className="content-shell">
        <div className="mx-auto flex max-w-[1080px] flex-col items-center py-12 text-center sm:py-16">
          <div className="relative mb-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[-18%] top-[-12%] h-[92%] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 84% 58% at 50% 0%, rgba(49,93,255,0.18) 0%, rgba(255,47,146,0.15) 36%, rgba(217,255,38,0.08) 58%, transparent 76%)",
              }}
            />
            <DanverseLogo size="hero" className="relative" />
          </div>

          <p className="section-label mb-5">DANVERSE Studio</p>
          <h1 className="mx-auto max-w-[11ch] text-center text-white">
            We Engineer Brand Authority.
            <br />
            Frame by Frame.
          </h1>
          <p className="body-copy mx-auto mt-6 max-w-2xl text-sm leading-7 sm:text-base">
            Built for brands that need control, consistency, and cinematic presence.
            <br className="hidden sm:block" />
            Every asset aligned. Every frame intentional.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <HoverLift>
                <Button asChild size="lg" className="cta-primary rounded-full px-8 py-3 font-medium text-white">
                  <a href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    Work With Us
                  </a>
                </Button>
              </HoverLift>
              <HoverLift>
                <Button asChild variant="outline" size="lg" className="cta-secondary rounded-full px-8 py-3 text-white">
                  <a href="#showcase">Explore Projects</a>
                </Button>
              </HoverLift>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {["Visual Systems", "Cinematic Execution", "Brand Control"].map((item) => (
                <span
                  key={item}
                  className="accent-chip px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 w-full">
            <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {HERO_MEDIA.map((item, index) => (
                <HeroMediaCard key={item.title} index={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
