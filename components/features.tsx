"use client"

import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverLift } from "@/components/hover-lift"
import { LazyPicture } from "@/components/lazy-picture"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const TITLE = "Precision Before Production."

export function Features() {
  const revealRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="features" aria-label="Studio principles" className="section-shell py-[var(--section-block)]">
      <div ref={revealRef} className="content-shell">
        <div className="content-shell-narrow">
          <h2 className="section-heading mb-10 text-center text-white">{TITLE}</h2>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <HoverLift>
              <Card className="brand-card overflow-hidden">
                <CardHeader className="pb-4">
                  <p className="section-label text-[11px]">Craft + Control</p>
                  <CardTitle className="mt-1 text-white">Every frame starts with a decision.</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-copy mb-4 text-sm">
                    We lock positioning, pacing, visual language, and output format before production begins.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <LazyPicture
                      webpSrc="/images/intuitive-1.webp"
                      alt="Close-up smartphone camera module with polished metal finish"
                      pictureClassName="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10"
                      className="h-full w-full object-cover"
                    />
                    <LazyPicture
                      webpSrc="/images/intuitive-2.webp"
                      alt="Hand gripping a textured phone back under dramatic studio lighting"
                      pictureClassName="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </HoverLift>

            <HoverLift>
              <Card className="brand-card overflow-hidden">
                <CardHeader className="pb-4">
                  <p className="section-label text-[11px]">Client Feedback</p>
                  <CardTitle className="mt-1 text-white">What you review is already release-ready.</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-copy mb-4 text-sm">
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
                  <div className="grid grid-cols-2 gap-3">
                    <LazyPicture
                      webpSrc="/images/top-rated-1.webp"
                      alt="Product sketch concepts arranged on a warm tabletop"
                      pictureClassName="overflow-hidden rounded-xl border border-white/10"
                      className="h-full w-full object-cover"
                    />
                    <LazyPicture
                      webpSrc="/images/top-rated-2.webp"
                      alt="Backpacks staged for a polished commercial photography setup"
                      pictureClassName="overflow-hidden rounded-xl border border-white/10"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </HoverLift>
          </div>

          <div className="brand-card mt-12 rounded-2xl p-8 text-center">
            <p className="body-copy text-lg leading-relaxed">
              One brief becomes a complete launch system: hooks, scripts, formats, and rollout-ready assets built around
              your brand.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
