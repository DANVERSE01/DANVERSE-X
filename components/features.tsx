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
        <div className="content-shell-narrow">
          <h2 data-reveal-item className="section-heading mb-10 text-center text-white">
            {TITLE}
          </h2>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <HoverLift data-reveal-item>
              <Card className="brand-card overflow-hidden">
                <CardHeader className="pb-4">
                  <p className="section-label text-[11px]">Craft + Control</p>
                  <CardTitle className="mt-1 text-white">Every frame starts with a decision.</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-copy mb-4 text-sm">
                    We lock positioning, pacing, visual language, and output format before production begins.
                  </p>
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    <FeatureImage
                      src="/images/intuitive-1.webp"
                      alt="Close-up smartphone camera module with polished metal finish"
                      wrapperClassName="aspect-[3/4]"
                    />
                    <FeatureImage
                      src="/images/intuitive-2.webp"
                      alt="Hand gripping a textured phone back under dramatic studio lighting"
                      wrapperClassName="aspect-[3/4]"
                    />
                  </div>
                </CardContent>
              </Card>
            </HoverLift>

            <HoverLift data-reveal-item>
              <Card className="brand-card overflow-hidden">
                <CardHeader className="pb-4">
                  <p className="section-label text-[11px]">Client Feedback</p>
                  <CardTitle className="mt-1 text-white">What you review is already release-ready.</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-copy mb-3 text-sm sm:mb-4">
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
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
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
            className="statement-panel mt-10 rounded-[1.75rem] px-5 py-6 text-left sm:mt-12 sm:rounded-[2rem] sm:px-8 sm:py-8 md:px-10 md:py-10"
          >
            <div className="relative z-10">
              <p className="statement-kicker">Launch Architecture</p>
              <p className="mt-4 max-w-4xl text-[1rem] leading-relaxed text-[var(--color-text-secondary)] sm:mt-5 md:text-[1.22rem]">
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
    <div className={`relative overflow-hidden rounded-xl border border-white/10 ${wrapperClassName}`}>
      <Image src={src} alt={alt} fill sizes="(min-width: 768px) 240px, 42vw" className="h-full w-full object-cover" />
    </div>
  )
}
