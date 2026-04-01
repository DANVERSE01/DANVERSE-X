"use client"

import Link from "next/link"
import { useState } from "react"
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

export function LogoMarquee() {
  const [pausedRow, setPausedRow] = useState<string | null>(null)
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

        <div className="mx-auto w-full max-w-[1120px] space-y-4">
          <MarqueeRow id="first" items={FIRST_ROW} pausedRow={pausedRow} setPausedRow={setPausedRow} />
          <MarqueeRow id="second" items={SECOND_ROW} pausedRow={pausedRow} setPausedRow={setPausedRow} reverse />
        </div>
      </div>
    </section>
  )
}

function MarqueeRow({
  id,
  items,
  pausedRow,
  reverse = false,
  setPausedRow,
}: {
  id: string
  items: ContentCardItem[]
  pausedRow: string | null
  reverse?: boolean
  setPausedRow: (rowId: string | null) => void
}) {
  return (
    <div
      data-reveal-item
      className="relative min-h-[6.5rem] overflow-x-clip [contain:layout_paint] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] sm:min-h-[7.5rem]"
    >
      <div
        className={reverse ? "absolute inset-y-0 left-0 flex items-center animate-scroll-left" : "absolute inset-y-0 left-0 flex items-center animate-scroll-right"}
        style={{ animationPlayState: pausedRow === id ? "paused" : "running", width: "max-content" }}
      >
        {[...items, ...items, ...items].map((item, index) => (
          <HoverLift
            key={`${id}-${index}`}
            className="mx-2 flex-shrink-0"
            onHoverStart={() => setPausedRow(id)}
            onHoverEnd={() => setPausedRow(null)}
          >
            <div className="brand-card flex h-24 w-36 flex-col items-center justify-center rounded-xl p-3 backdrop-blur-xl sm:h-28 sm:w-44">
              <div className="mb-2 flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12">
                <MarqueeCardIcon type={item.icon} size={40} />
              </div>
              <p className="text-center text-xs font-medium leading-tight text-white sm:text-sm">{item.label}</p>
            </div>
          </HoverLift>
        ))}
      </div>
    </div>
  )
}
