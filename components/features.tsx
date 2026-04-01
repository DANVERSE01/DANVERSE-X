"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverLift } from "@/components/hover-lift"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const TITLE = "Precision Before Production."

export function Features() {
  const revealRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="features" aria-label="Studio principles" className="section-shell py-[var(--section-block)]">
      <div ref={revealRef} className="content-shell">
        <div className="mx-auto max-w-[1160px]">
          <h2 data-reveal-item className="section-heading mx-auto mb-10 max-w-[12ch] text-center text-white sm:mb-12">
            {TITLE}
          </h2>

          <div className="mx-auto grid max-w-[1120px] auto-rows-fr gap-5 lg:grid-cols-2 lg:gap-6">
            <HoverLift data-reveal-item>
              <Card className="brand-card flex h-full overflow-hidden rounded-[1.8rem] border-white/10 bg-[linear-gradient(165deg,rgba(8,13,22,0.86),rgba(10,14,22,0.66))]">
                <CardHeader className="pb-5 sm:pb-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="section-label text-[11px]">Craft + Control</p>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/28">01</span>
                  </div>
                  <CardTitle className="mt-3 max-w-[11ch] text-[clamp(1.5rem,4vw,2.35rem)] leading-[0.96] tracking-[-0.04em] text-white">
                    Every frame starts with a decision.
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="body-copy mb-5 max-w-[34ch] text-[0.96rem] leading-7 sm:mb-6 sm:text-[1rem]">
                    We lock positioning, pacing, visual language, and output format before production begins.
                  </p>
                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <FeatureImage
                      src="/images/intuitive-1.webp"
                      alt="Close-up smartphone camera module with polished metal finish"
                      wrapperClassName="aspect-[4/5]"
                    />
                    <FeatureImage
                      src="/images/intuitive-2.webp"
                      alt="Hand gripping a textured phone back under dramatic studio lighting"
                      wrapperClassName="aspect-[4/5]"
                    />
                  </div>
                </CardContent>
              </Card>
            </HoverLift>

            <HoverLift data-reveal-item>
              <Card className="brand-card flex h-full overflow-hidden rounded-[1.8rem] border-white/10 bg-[linear-gradient(165deg,rgba(10,12,24,0.88),rgba(12,10,26,0.68))]">
                <CardHeader className="pb-5 sm:pb-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="section-label text-[11px]">Client Feedback</p>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/28">02</span>
                  </div>
                  <CardTitle className="mt-3 max-w-[12ch] text-[clamp(1.5rem,4vw,2.35rem)] leading-[0.96] tracking-[-0.04em] text-white">
                    What you review is already release-ready.
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="body-copy mb-4 max-w-[34ch] text-[0.96rem] leading-7 sm:mb-5 sm:text-[1rem]">
                    Internal QA, finish, and brand consistency happen before anything reaches your inbox.
                  </p>
                  <div className="mb-5 flex flex-col items-start gap-1">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-[var(--color-lime)] text-[var(--color-lime)]" />
                      ))}
                    </div>
                    <div className="section-label text-[10px]">Post-project feedback</div>
                  </div>
                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <FeatureImage
                      src="/images/top-rated-1.webp"
                      alt="Product sketch concepts arranged on a warm tabletop"
                      wrapperClassName="aspect-[4/3]"
                    />
                    <FeatureImage
                      src="/images/top-rated-2.webp"
                      alt="Backpacks staged for a polished commercial photography setup"
                      wrapperClassName="aspect-[4/3]"
                    />
                  </div>
                </CardContent>
              </Card>
            </HoverLift>
          </div>

          <div
            data-reveal-item
            className="statement-panel mx-auto mt-10 max-w-[1120px] rounded-[1.75rem] px-5 py-6 text-left sm:mt-12 sm:rounded-[2rem] sm:px-8 sm:py-8 md:px-10 md:py-10"
          >
            <div className="relative z-10">
              <p className="statement-kicker">Launch Architecture</p>
              <p className="mt-4 max-w-[56ch] text-[1rem] leading-relaxed text-[var(--color-text-secondary)] sm:mt-5 md:text-[1.22rem]">
                One brief becomes a complete launch system: hooks, scripts, formats, and rollout-ready assets built
                around your brand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureImage({ src, alt, wrapperClassName }: { src: string; alt: string; wrapperClassName: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#070a11] ${wrapperClassName}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 260px, (min-width: 768px) 34vw, 42vw"
        className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
      />
    </div>
  )
}
