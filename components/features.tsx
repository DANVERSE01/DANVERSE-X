"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverLift } from "@/components/hover-lift"
import { TextReveal } from "@/components/text-reveal"
import { useGsapEnter } from "@/hooks/use-gsap-enter"
import { useParallax } from "@/hooks/use-parallax"

const TITLE = "Quality Before Speed."

export function Features() {
  const card1Ref = useGsapEnter<HTMLDivElement>({ preset: "scale-in", start: "top 84%" })
  const card2Ref = useGsapEnter<HTMLDivElement>({ preset: "scale-in", delay: 0.1, start: "top 84%" })
  const bannerRef = useGsapEnter<HTMLDivElement>({ preset: "clip-left", start: "top 88%" })
  const stickyRef = useGsapEnter<HTMLDivElement>({ preset: "blur-rise", stagger: 0.12, childSelector: "[data-sticky-item]", start: "top 88%" })
  const blob1Ref = useParallax<HTMLDivElement>({ speed: 0.08 })
  const blob2Ref = useParallax<HTMLDivElement>({ speed: -0.06 })

  return (
    <section id="features" aria-label="Studio principles" className="section-shell relative overflow-hidden py-[var(--section-block)]">
      <div className="pointer-events-none absolute inset-0">
        <div ref={blob1Ref} className="absolute left-[-8rem] top-[8%] h-[18rem] w-[18rem] rounded-full bg-[rgba(106,129,255,0.08)] blur-[120px]" />
        <div ref={blob2Ref} className="absolute right-[-8rem] top-[30%] h-[20rem] w-[20rem] rounded-full bg-[rgba(39,24,36,0.26)] blur-[120px]" />
      </div>

      <div className="content-shell">
        <div className="mx-auto max-w-[1160px]">

          {/* Two-column: sticky heading left, scrolling cards right */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14 lg:items-start">

            {/* Sticky heading column */}
            <div ref={stickyRef} className="lg:sticky lg:top-24">
              <p data-sticky-item className="section-label">Standards</p>
              <TextReveal
                as="h2"
                type="chars"
                preset="clip-up"
                stagger={0.02}
                className="section-heading mt-4 max-w-[10ch] text-white"
              >
                {TITLE}
              </TextReveal>
              <p data-sticky-item className="body-copy mt-4 max-w-[34ch] text-[0.96rem] leading-7">
                Set expectations before production starts. The work lands faster when direction is locked, constraints are clear, and the standard is non-negotiable.
              </p>
              <div data-sticky-item className="mt-5 accent-chip inline-flex px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/78">
                Director-Led QA
              </div>
            </div>

            {/* Cards column */}
            <div className="space-y-5">
              <div ref={card1Ref}>
                <HoverLift>
                  <Card className="brand-card flex h-full overflow-hidden rounded-[1.8rem] border-white/10 bg-[linear-gradient(165deg,rgba(10,16,27,0.9),rgba(14,20,31,0.76),rgba(17,12,19,0.76))]">
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
              </div>

              <div ref={card2Ref}>
                <HoverLift>
                  <Card className="brand-card flex h-full overflow-hidden rounded-[1.8rem] border-white/10 bg-[linear-gradient(165deg,rgba(11,13,25,0.92),rgba(15,18,29,0.78),rgba(31,18,28,0.72))]">
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
            </div>
          </div>

          {/* Full-width banner below grid */}
          <div
            ref={bannerRef}
            className="statement-panel mx-auto mt-10 max-w-[1120px] rounded-[1.75rem] px-5 py-6 text-left sm:mt-14 sm:rounded-[2rem] sm:px-8 sm:py-8 md:px-10 md:py-10"
          >
            <div className="relative z-10">
              <p className="statement-kicker">Launch Architecture</p>
              <p className="mt-4 max-w-[56ch] text-[1rem] leading-relaxed text-[var(--color-text-secondary)] sm:mt-5 md:text-[1.22rem]">
                One brief becomes a complete launch system: hooks, scripts, formats, proofs, and rollout-ready assets
                built around a single standard.
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
