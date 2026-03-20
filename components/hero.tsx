"use client"

import { Button } from "@/components/ui/button"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"
import LazyVideo from "./lazy-video"
import { DanverseLogo } from "./danverse-logo"

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100svh' }}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/1174583531?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&playsinline=1&quality=540p"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw',
            minHeight: '100%',
            minWidth: '177.78vh',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            pointerEvents: 'none',
          }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          title="Hero background"
        ></iframe>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/30 to-black/80 pointer-events-none" />
      </div>

      <div className="relative z-[2] flex flex-col items-center justify-center w-full h-full pt-20 pb-4 px-4 overflow-y-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center w-full pt-4 pb-2 gap-0">

            {/* Eyebrow */}
            <div className="mb-3 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 uppercase tracking-widest">
              CREATIVE OPERATING SYSTEM
            </div>

            {/* Headline */}
            <h1 className="font-display text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="block text-white uppercase">Cinematic Ads</span>
              <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-red-400 bg-clip-text text-transparent uppercase">
                Built for Scale
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-4 text-center text-base text-white/70 max-w-2xl mx-auto">
              A premium creative studio that builds ads, brand systems, and AI workflows into one repeatable output engine.
            </p>

            {/* Micro Line */}
            <p className="mt-1 text-center text-sm text-white/50 italic">
              Direction locked. Output consistent. Delivery predictable.
            </p>

            {/* CTA Button */}
            <div className="mt-5">
              <Button
                size="lg"
                onClick={() => fireCTAAndOpenWhatsApp("hero-cta")}
                className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-8 py-3 text-white font-medium hover:from-red-400 hover:to-orange-400 hover:scale-105 transition-all"
              >
                Book a Call
              </Button>
            </div>

            {/* Phone Cards Grid */}
            <div className="mt-6 w-full">
              <div className="grid gap-3 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-5xl mx-auto w-full items-start">
                {phoneData.map((p, i) => {
                  const visibility =
                    i === 0 ? "block" :
                    i === 1 ? "block" :
                    i === 2 ? "hidden md:block" :
                    i === 3 ? "hidden xl:block" :
                    "hidden 2xl:block"
                  return (
                    <div key={i} className={visibility}>
                      <PhoneCard title={p.title} sub={p.sub} tone={p.tone} videoSrc={p.videoSrc} />
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneCard({
  title = "Feature",
  sub = "Description here",
  tone = "default",
  videoSrc,
}: {
  title?: string
  sub?: string
  tone?: string
  videoSrc?: string
}) {
  return (
    <div className="relative rounded-[24px] glass-border bg-black/40 p-1.5">
      <div className="relative w-full overflow-hidden rounded-[20px] bg-black" style={{ height: '210px' }}>
        <LazyVideo
          src={videoSrc ?? "/videos/default-fallback.mp4"}
          className="absolute inset-0 h-full w-full object-cover"
          autoplay={true}
          loop={true}
          muted={true}
          playsInline={true}
          aria-label={`${title} - ${sub}`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-xl font-bold text-white mb-1">{title}</div>
          <p className="text-xs text-white/70">{sub}</p>
          <div className="mt-2 inline-flex items-center rounded-full bg-red-500/20 border border-red-500/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-red-400">
            DANVERSE
          </div>
        </div>
      </div>
    </div>
  )
}


const phoneData = [
  {
    title: "Conversions",
    sub: "Creative engineered for response, not just attention.",
    tone: "results",
    videoSrc: "/videos/conversions.mp4",
  },
  {
    title: "Speed",
    sub: "Fast sprints. Tight reviews. Clean handoff.",
    tone: "speed",
    videoSrc: "/videos/speed.mp4",
  },
  {
    title: "Social-Ready",
    sub: "Native pacing and exports for Reels, TikTok, and paid social.",
    tone: "social",
    videoSrc: "/videos/social-ready.mp4",
  },
  {
    title: "Standout",
    sub: "Be the product no one scrolls past.",
    tone: "standout",
    videoSrc: "/videos/standout.mp4",
  },
  {
    title: "Premium",
    sub: "Look like the market leader.",
    tone: "premium",
    videoSrc: "/videos/premium.mp4",
  },
]
