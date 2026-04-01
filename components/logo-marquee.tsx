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
        <div data-reveal-item className="mb-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="max-w-3xl text-center sm:text-left">
            <h2 className="section-heading text-white">
              Built for brands with <span className="text-[var(--color-hot-pink-strong)]">global standards</span>
            </h2>
            <p className="body-copy mt-3 max-w-xl text-sm">
              Founders, agencies, hospitality, retail, and luxury teams come to DANVERSE when the work has to feel
              expensive, intentional, and impossible to ignore.
            </p>
          </div>
          <HoverLift>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/12 bg-transparent px-6 text-white hover:bg-white/5 hover:text-[var(--color-hot-pink-strong)]"
            >
              <Link href="#showcase">See Selected Work</Link>
            </Button>
          </HoverLift>
        </div>

        <div className="space-y-4">
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
      className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <div
        className={reverse ? "flex animate-scroll-left" : "flex animate-scroll-right"}
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
