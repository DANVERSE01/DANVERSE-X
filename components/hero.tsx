"use client"

import { Button } from "@/components/ui/button"
import { HeroMediaCard, type HeroMediaItem } from "@/components/hero-media-card"
import { HoverLift } from "@/components/hover-lift"
import { createWhatsAppUrl } from "@/lib/public-env"

const HERO_MEDIA: HeroMediaItem[] = [
  {
    title: "Desire on Screen",
    eyebrow: "Luxury / Macro",
    sub: "Luxury product worlds staged with the weight and restraint of a real campaign.",
    videoSrc: "/videos/premium.mp4",
    posterSrc: "/images/hero/1178894778.jpg",
  },
  {
    title: "Speed That Looks Expensive",
    eyebrow: "Beauty / Velocity",
    sub: "High-speed direction that still feels controlled, tactile, and impossible to fake.",
    videoSrc: "/videos/speed.mp4",
    posterSrc: "/images/hero/1178894721.jpg",
  },
  {
    title: "Scroll Stopped. Attention Held.",
    eyebrow: "Social / Vertical",
    sub: "Vertical-first assets built to win the thumb without losing the premium feel.",
    videoSrc: "/videos/social-ready.mp4",
    posterSrc: "/images/hero/1178894835.jpg",
  },
]

const HERO_HEADLINE_LINES: ReadonlyArray<{ text: string; accent?: string }> = [
  { text: "We Build" },
  { text: "Visual" },
  { text: "Advantage" },
]
const HERO_SIGNAL_CHIPS = ["Cinematic Ads", "Brand Systems", "Launch Pages", "AI Content Engines"] as const
const HERO_LINE_DELAYS = [0.08, 0.18, 0.28] as const

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero introduction"
      className="section-shell relative overflow-x-hidden pt-3 sm:pt-6"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="content-shell relative h-[560px] sm:h-[760px] lg:h-[840px]">
          <div
            className="hero-light-architecture intro-fade-up absolute inset-0"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="hero-light-grid" />
            <div className="hero-light-frame" />
            <div className="hero-light-beam" />
            <div className="hero-light-beam hero-light-beam--secondary" />
            <div className="hero-light-scan" />
            <div className="absolute inset-x-[18%] top-[34%] h-px bg-gradient-to-r from-transparent via-white/22 to-transparent" />
            <div className="absolute inset-x-[24%] bottom-[22%] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            <div className="absolute left-[18%] top-[24%] h-[30%] w-px bg-gradient-to-b from-transparent via-[rgba(106,129,255,0.34)] to-transparent" />
            <div className="absolute right-[18%] top-[30%] h-[28%] w-px bg-gradient-to-b from-transparent via-[rgba(198,235,104,0.24)] to-transparent" />
          </div>

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 42%, rgba(6, 8, 14, 0.02) 0%, rgba(6, 8, 14, 0.12) 34%, rgba(6, 8, 14, 0.28) 66%, transparent 84%)",
            }}
          />
        </div>
      </div>

      <div className="content-shell relative z-[2]">
        <div className="mx-auto flex max-w-[1160px] flex-col items-center py-8 text-center sm:py-14 lg:py-16">
          <div className="grid w-full max-w-[1140px] items-end gap-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,15rem)]">
            <div
              className="intro-fade-up hidden rounded-[1.5rem] border border-white/8 bg-[linear-gradient(165deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-4 text-left backdrop-blur-xl lg:block"
              style={{ animationDelay: "0.1s" }}
            >
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-acid-lime)]">
                Positioning
              </p>
              <p className="mt-3 text-sm leading-6 text-white/68">
                Director-led systems for luxury, beauty, and launch-driven brands that need cinema and clarity in one
                move.
              </p>
            </div>

            <div className="relative mx-auto flex w-full max-w-full justify-center px-1">
              <h1 className="relative z-10 mx-auto w-full max-w-[11ch] break-normal text-center text-[clamp(2.5rem,10vw,4.8rem)] font-bold leading-[0.88] tracking-[-0.06em] text-white sm:max-w-[10ch] sm:text-[clamp(3.4rem,7.8vw,5.8rem)] lg:max-w-[10.8ch] lg:text-[clamp(4.9rem,6.6vw,7rem)]">
                {HERO_HEADLINE_LINES.map((line, index) => (
                  <span
                    key={line.text}
                    className="intro-line-reveal block"
                    style={{ animationDelay: `${HERO_LINE_DELAYS[index] ?? HERO_LINE_DELAYS[HERO_LINE_DELAYS.length - 1]}s` }}
                  >
                    {line.text}{" "}
                    {line.accent ? (
                      <span className="bg-gradient-to-r from-[var(--color-electric-blue-strong)] to-[var(--color-acid-lime)] bg-clip-text text-transparent">
                        {line.accent}
                      </span>
                    ) : null}
                  </span>
                ))}
              </h1>
            </div>

            <div
              className="intro-fade-up hidden rounded-[1.5rem] border border-white/8 bg-[linear-gradient(165deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-4 text-left backdrop-blur-xl lg:block"
              style={{ animationDelay: "0.16s" }}
            >
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-electric-blue-strong)]">
                Delivery
              </p>
              <p className="mt-3 text-sm leading-6 text-white/68">
                Campaign films, launch pages, and AI-native production flows shaped as one coherent narrative.
              </p>
            </div>
          </div>

          <p
            className="intro-fade-up mx-auto mt-5 max-w-[42ch] text-[clamp(1rem,4vw,1.16rem)] leading-[1.7] text-white/74 sm:mt-7 sm:max-w-[48ch]"
            style={{ animationDelay: "0.32s" }}
          >
            Director-led creative systems for brands that need cinema, identity, and launch-readiness to arrive as one
            deliberate experience.
          </p>

          <div
            className="intro-fade-up mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-6 sm:gap-2.5"
            style={{ animationDelay: "0.38s" }}
          >
            {HERO_SIGNAL_CHIPS.map((chip) => (
              <div
                key={chip}
                className="accent-chip px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/78"
              >
                {chip}
              </div>
            ))}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/66 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-[var(--color-acid-lime)] shadow-[0_0_14px_rgba(198,235,104,0.45)]" />
              Open for select launches
            </div>
          </div>

          <div className="mt-8 flex w-full max-w-[19rem] flex-col items-center gap-4 sm:mt-9 sm:max-w-none">
            <div className="flex w-full flex-col items-center justify-center gap-3.5 sm:flex-row sm:justify-center">
              <div className="intro-fade-up w-full sm:w-auto" style={{ animationDelay: "0.52s" }}>
                <HoverLift>
                  <Button
                    asChild
                    size="lg"
                    className="cta-primary w-full rounded-full px-8 py-3 font-semibold tracking-[-0.02em] text-white sm:w-auto"
                  >
                    <a href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label="Start the brief on WhatsApp">
                      Start the Brief
                    </a>
                  </Button>
                </HoverLift>
              </div>

              <div className="intro-fade-up w-full sm:w-auto" style={{ animationDelay: "0.6s" }}>
                <HoverLift>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="cta-secondary w-full rounded-full px-8 py-3 font-semibold tracking-[-0.02em] text-white sm:w-auto"
                  >
                    <a href="#showcase">See the Work</a>
                  </Button>
                </HoverLift>
              </div>
            </div>
          </div>

          <div className="mt-10 w-full sm:mt-14">
            <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-[0.9fr_1.1fr_0.9fr] lg:items-end lg:gap-6">
              {HERO_MEDIA.map((item, index) => (
                <div
                  key={item.title}
                  className={`intro-fade-up h-full ${index === 1 ? "lg:-translate-y-6" : index === 0 ? "lg:translate-y-4" : "lg:translate-y-8"}`}
                  style={{ animationDelay: `${0.48 + index * 0.1}s` }}
                >
                  <HeroMediaCard index={index} featured={index === 1} {...item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
