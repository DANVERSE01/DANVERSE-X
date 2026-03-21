"use client"

import { Button } from "@/components/ui/button"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"
import LazyVideo from "./lazy-video"

export function Hero() {
  const rotations  = [-8, -3, 0, 3, 8]
  const translateYs = [20,  8, 0, 8, 20]
  const zIndexes   = [1,   2, 5, 2,  1]

  return (
    <section
      className="relative w-full"
      style={{ height: '100svh', overflow: 'visible' }}
    >
      {/* Video background — contained in its own overflow-hidden div */}
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
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/30 to-black/80 pointer-events-none" />
      </div>

      {/* Text content — centered in upper portion */}
      <div className="relative z-[2] flex flex-col items-center justify-center w-full pt-28 pb-0 px-4" style={{ height: '65%' }}>
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center w-full gap-0">

            {/* Eyebrow */}
            <div className="mb-3 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 uppercase tracking-widest">
              PRECISION · SCALE · CINEMA
            </div>

            {/* Headline */}
            <h1 className="font-display text-center font-extrabold tracking-tight" style={{ fontSize: 'clamp(1.8rem, 6vw, 4.5rem)', lineHeight: 1.05 }}>
              <span className="block text-white uppercase">Cinematic Ads</span>
              <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-red-400 bg-clip-text text-transparent uppercase">
                Built for Scale
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-4 text-center text-base text-white/70 max-w-2xl mx-auto">
              We engineer visual systems that convert. Every frame is intentional. Every deliverable is final.
            </p>

            {/* Micro Line */}
            <p className="mt-1 text-center text-sm text-white/50 italic">
              No revisions for the sake of it. No fluff. Just output that performs.
            </p>

            {/* CTA */}
            <div className="mt-5">
              <Button
                size="lg"
                onClick={() => fireCTAAndOpenWhatsApp("hero-cta")}
                className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-8 py-3 text-white font-medium hover:from-red-400 hover:to-orange-400 hover:scale-105 transition-all"
              >
                Book a Call
              </Button>
            </div>

          </div>
        </div>
      </div>

      {/* 3D Fan Cards — absolutely positioned at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[3]"
        style={{ height: '42%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '0' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            perspective: '1200px',
            paddingBottom: '0',
          }}
        >
          {phoneData.map((p, i) => {
            const isMobileHidden = i === 0 || i === 4
            const isTabletHidden = i === 4
            return (
              <div
                key={i}
                className={
                  isMobileHidden
                    ? 'hidden sm:block'
                    : isTabletHidden
                    ? 'hidden lg:block'
                    : 'block'
                }
                style={{
                  flexShrink: 0,
                  width: '110px',
                  transform: `rotate(${rotations[i]}deg) translateY(${translateYs[i]}px)`,
                  zIndex: zIndexes[i],
                  transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
                  cursor: 'pointer',
                  marginLeft: i === 0 ? 0 : '-10px',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'rotate(0deg) translateY(-24px) scale(1.07)'
                  el.style.zIndex = '10'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = `rotate(${rotations[i]}deg) translateY(${translateYs[i]}px)`
                  el.style.zIndex = String(zIndexes[i])
                }}
              >
                <PhoneCard title={p.title} sub={p.sub} tone={p.tone} videoSrc={p.videoSrc} />
              </div>
            )
          })}
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
    <div
      style={{
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(0,0,0,0.5)',
        padding: '4px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)',
      }}
    >
      <div
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          aspectRatio: '9/16',
          position: 'relative',
          background: '#0a0a0a',
        }}
      >
        <LazyVideo
          src={videoSrc ?? "/videos/default-fallback.mp4"}
          className="absolute inset-0 h-full w-full object-cover"
          autoplay={true}
          loop={true}
          muted={true}
          playsInline={true}
          aria-label={`${title} - ${sub}`}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 8px 8px' }}>
          <div style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", fontSize: '15px', color: '#fff', letterSpacing: '0.04em', marginBottom: '2px' }}>{title}</div>
          <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.6)', marginBottom: '5px', lineHeight: 1.3 }}>{sub}</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', borderRadius: '100px', background: 'rgba(230,60,47,0.15)', border: '1px solid rgba(230,60,47,0.3)', padding: '1px 6px', fontSize: '7px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#e63c2f' }}>
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
