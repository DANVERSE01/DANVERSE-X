"use client"

import Link from "next/link"
import type { ComponentProps } from "react"
import { Button } from "@/components/ui/button"
import { HoverLift } from "@/components/hover-lift"
import { MarqueeCardIcon } from "@/components/marquee-card-icon"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

type ContentCardItem = {
  label: string
  icon: ComponentProps<typeof MarqueeCardIcon>["type"]
}

const FIRST_ROW: ContentCardItem[] = [
  { label: "AI Startups", icon: "ai-startups" },
  { label: "Personal Brands", icon: "personal-brands" },
  { label: "SaaS & Tech", icon: "saas-tech" },
  { label: "Education", icon: "education" },
  { label: "Agencies", icon: "agencies" },
  { label: "Events", icon: "events" },
  { label: "Luxury Brands", icon: "luxury" },
  { label: "E-commerce", icon: "ecommerce" },
]

const SECOND_ROW: ContentCardItem[] = [
  { label: "Community Funnels", icon: "community-funnels" },
  { label: "Cinematic Ads", icon: "cinematic-ads" },
  { label: "UGC Video Labs", icon: "ugc-labs" },
  { label: "Brand Identity", icon: "brand-identity" },
  { label: "Landing Pages", icon: "landing" },
  { label: "AI Pipelines", icon: "pipeline" },
  { label: "Growth Kits", icon: "growth" },
  { label: "Sales Scripts", icon: "scripts" },
]

const OFFER_CARDS: ContentCardItem[] = [...FIRST_ROW, ...SECOND_ROW]

export function LogoMarquee() {
  const revealRef = useScrollReveal<HTMLDivElement>()

  return (
    <section aria-label="Industries and offers" className="section-shell overflow-hidden py-[var(--section-block)]">
      <div ref={revealRef} className="content-shell">
        <div
          data-reveal-item
          className="mx-auto mb-10 grid w-full max-w-[1120px] gap-6 text-center lg:grid-cols-[minmax(0,42rem)_auto] lg:justify-center lg:items-end lg:text-left"
        >
          <div className="max-w-3xl">
            <h2 className="section-heading text-white">
              Built for brands with <span className="text-[var(--color-hot-pink-strong)]">global standards</span>
            </h2>
            <p className="body-copy mt-3 max-w-xl text-sm">
              Founders, agencies, hospitality, retail, and luxury teams come to DANVERSE when the work has to feel
              expensive, intentional, and impossible to ignore.
            </p>
          </div>
          <HoverLift className="justify-self-center lg:justify-self-start">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/12 bg-transparent px-6 text-white hover:bg-white/5 hover:text-[var(--color-hot-pink-strong)]"
            >
              <Link href="#showcase">See Selected Work</Link>
            </Button>
          </HoverLift>
        </div>

        <div
          data-reveal-item
          className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
        >
          {OFFER_CARDS.map((item) => (
            <HoverLift key={item.label} className="h-full">
              <div className="brand-card flex h-full min-h-[7.2rem] items-center gap-4 rounded-[1.4rem] px-4 py-4 text-left backdrop-blur-xl sm:min-h-[7.75rem] sm:px-5">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] sm:h-12 sm:w-12">
                  <MarqueeCardIcon type={item.icon} size={38} />
                </div>
                <p className="max-w-[12ch] text-sm font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[1rem]">
                  {item.label}
                </p>
              </div>
            </HoverLift>
          ))}
        </div>
      </div>
    </section>
  )
}
