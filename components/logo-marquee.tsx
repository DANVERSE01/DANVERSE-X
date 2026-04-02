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
] as const

const SECOND_ROW: ContentCardItem[] = [
  { label: "Community Funnels", icon: "community-funnels" },
  { label: "Cinematic Ads", icon: "cinematic-ads" },
  { label: "UGC Video Labs", icon: "ugc-labs" },
  { label: "Brand Identity", icon: "brand-identity" },
  { label: "Landing Pages", icon: "landing" },
  { label: "AI Pipelines", icon: "pipeline" },
  { label: "Growth Kits", icon: "growth" },
  { label: "Sales Scripts", icon: "scripts" },
] as const

export function LogoMarquee() {
  const [pausedRow, setPausedRow] = useState<string | null>(null)
  const revealRef = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="industries"
      aria-label="Industries and offers"
      className="section-shell relative overflow-hidden py-[var(--section-block)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[16%] h-[18rem] w-[18rem] rounded-full bg-[rgba(39,24,36,0.3)] blur-[120px]" />
        <div className="absolute right-[-9rem] bottom-[12%] h-[20rem] w-[20rem] rounded-full bg-[rgba(106,129,255,0.08)] blur-[120px]" />
      </div>
      <div ref={revealRef} className="content-shell">
        <div
          data-reveal-item
          className="mx-auto mb-8 grid w-full max-w-[1120px] gap-6 text-center lg:grid-cols-[minmax(0,31rem)_minmax(0,21rem)_auto] lg:items-end lg:text-left"
        >
          <div className="max-w-3xl">
            <p className="section-label">Capability Reel</p>
            <h2 className="section-heading mt-4 text-white">
              Built for brands with <span className="text-[var(--color-acid-lime)]">global standards</span>
            </h2>
            <p className="body-copy mt-3 max-w-xl text-sm">
              The message is breadth, but the visual rhythm should still feel controlled, balanced, and expensive.
            </p>
          </div>
          <p className="body-copy max-w-[24rem] justify-self-center text-sm leading-7 lg:justify-self-start">
            Two opposing rails. Smaller capsules. Cleaner spacing. Less noise around the idea itself.
          </p>
          <HoverLift className="justify-self-center lg:justify-self-start">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/12 bg-transparent px-6 text-white hover:bg-white/5 hover:text-[var(--color-acid-lime)]"
            >
              <Link href="#showcase">See Selected Work</Link>
            </Button>
          </HoverLift>
        </div>

        <div className="mx-auto w-full max-w-[1120px] space-y-3.5">
          <MarqueeRow
            id="first"
            items={FIRST_ROW}
            pausedRow={pausedRow}
            setPausedRow={setPausedRow}
            durationSeconds={72}
          />
          <MarqueeRow
            id="second"
            items={SECOND_ROW}
            pausedRow={pausedRow}
            setPausedRow={setPausedRow}
            reverse
            durationSeconds={68}
          />
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
  durationSeconds,
}: {
  id: string
  items: readonly ContentCardItem[]
  pausedRow: string | null
  reverse?: boolean
  setPausedRow: (rowId: string | null) => void
  durationSeconds: number
}) {
  return (
    <div
      data-reveal-item
      className="relative min-h-[5.5rem] overflow-x-clip [contain:layout_paint] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] sm:min-h-[6rem]"
    >
      <div
        className={
          reverse
            ? "absolute inset-y-0 left-0 flex items-center animate-scroll-left"
            : "absolute inset-y-0 left-0 flex items-center animate-scroll-right"
        }
        style={{
          animationDuration: `${durationSeconds}s`,
          animationPlayState: pausedRow === id ? "paused" : "running",
          width: "max-content",
        }}
      >
        {[...items, ...items, ...items].map((item, index) => (
          <div
            key={`${id}-${index}`}
            className="group mx-1.5 flex-shrink-0"
            onMouseEnter={() => setPausedRow(id)}
            onMouseLeave={() => setPausedRow(null)}
            onFocus={() => setPausedRow(id)}
            onBlur={() => setPausedRow(null)}
          >
            <div className="brand-card flex h-[4.55rem] w-[11.5rem] items-center gap-3 rounded-[1.18rem] px-3.5 text-left backdrop-blur-xl transition-[border-color,box-shadow] duration-300 sm:h-[4.9rem] sm:w-[12.75rem] sm:px-4">
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-[0.95rem] border border-white/8 bg-white/[0.03] transition-transform duration-300 group-hover:scale-[1.04] group-hover:-rotate-3 sm:h-10 sm:w-10">
                <MarqueeCardIcon type={item.icon} size={24} />
              </div>
              <div className="min-w-0">
                <p className="text-[0.52rem] font-semibold uppercase tracking-[0.24em] text-white/28">
                  {String((index % items.length) + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 max-w-[10ch] text-[0.84rem] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-[0.92rem]">
                  {item.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
