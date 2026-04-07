"use client"

import { useGsapEnter } from "@/hooks/use-gsap-enter"
import { HoverLift } from "@/components/hover-lift"
import { TextReveal } from "@/components/text-reveal"

const SERVICES = [
  {
    number: "01",
    name: "Cinematic Ads",
    promise: "Strategic film for luxury launches.",
    description: "Campaign-ready hero films that position products with authority. Macro precision. Velocity control. Every frame earned.",
    outcomes: "30s–90s spot + mobile edits + social shorts",
  },
  {
    number: "02",
    name: "Brand Systems",
    promise: "Design language that scales.",
    description: "Visual direction locked across touchpoints. Color, typography, motion language. Consistent. Distinctive. Market-ready.",
    outcomes: "Design guidelines + asset library + templates",
  },
  {
    number: "03",
    name: "Launch Websites",
    promise: "Performance pages that convert.",
    description: "High-velocity product & experience sites. Fast-loading. Mobile-first. SEO-optimized. Built for conversions.",
    outcomes: "Responsive site + analytics dashboard + CMS setup",
  },
  {
    number: "04",
    name: "Content Rollouts",
    promise: "Unified production library.",
    description: "Monthly asset sprints. On-brand. Platform-native. Ready to ship. Systems that scale with your growth.",
    outcomes: "4–8 pieces/month + content calendar + upload-ready files",
  },
]

export function Features() {
  const headingRef = useGsapEnter<HTMLDivElement>({ preset: "blur-rise", start: "top 88%" })
  const gridRef = useGsapEnter<HTMLDivElement>({ preset: "scale-in", start: "top 84%" })

  return (
    <section id="features" aria-label="Our services" className="section-shell relative overflow-hidden py-[var(--section-block)]">
      <div className="content-shell">
        <div className="mx-auto max-w-[1160px]">
          {/* Heading Section */}
          <div ref={headingRef} className="mb-12 text-center sm:mb-16">
            <p className="section-label">What We Build</p>
            <TextReveal
              as="h2"
              type="words"
              preset="clip-up"
              stagger={0.08}
              className="section-heading mt-4 text-white"
            >
              Four Pillars. One Studio.
            </TextReveal>
            <p className="body-copy mx-auto mt-6 max-w-[54ch] text-[1rem] leading-7">
              Strategic direction. Creative supervision. Market-ready delivery. Every project follows the same operator-grade standard.
            </p>
          </div>

          {/* 4-Pillar Grid */}
          <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {SERVICES.map((service, index) => (
              <HoverLift key={service.name}>
                <div className="group relative flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-[linear-gradient(165deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/16 hover:bg-[linear-gradient(165deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]">
                  {/* Number badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/56">{service.name}</span>
                    <span className="text-[0.85rem] font-bold text-white/28">{service.number}</span>
                  </div>

                  {/* Accent dot */}
                  <div className="mb-4 h-1.5 w-1.5 rounded-full bg-[var(--color-electric-blue)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Promise (strong subheading) */}
                  <h3 className="mb-3 text-[1.1rem] font-semibold leading-[1.3] text-white">
                    {service.promise}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 flex-1 text-sm leading-6 text-white/68">
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  <div className="border-t border-white/8 pt-4">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/48">Delivers</p>
                    <p className="mt-2 text-[0.9rem] leading-[1.5] text-white/74">
                      {service.outcomes}
                    </p>
                  </div>
                </div>
              </HoverLift>
            ))}
          </div>

          {/* Value Statement */}
          <div className="mx-auto mt-12 max-w-[56ch] rounded-[1.75rem] border border-white/8 bg-[linear-gradient(165deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-8 text-center">
            <p className="text-sm leading-7 text-white/74">
              <span className="font-semibold text-white">One operating model across all services.</span> Strategy locked before production. Director approval on every deliverable. No templates. No shortcuts. Just final-quality work.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


