"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { MarqueeCardIcon } from "./marquee-card-icon"

type ContentCardItem = {
  label: string
  icon: React.ComponentProps<typeof MarqueeCardIcon>["type"]
}

export function LogoMarquee() {
  const [pausedRow, setPausedRow] = useState<string | null>(null)

  const firstRowContent: ContentCardItem[] = [
    { label: "AI Startups", icon: "ai-startups" as const },
    { label: "Personal Brands", icon: "personal-brands" as const },
    { label: "SaaS & Tech", icon: "saas-tech" as const },
    { label: "Education", icon: "education" as const },
    { label: "Agencies", icon: "agencies" as const },
    { label: "Events", icon: "events" as const },
    { label: "Luxury Brands", icon: "luxury" as const },
    { label: "E-commerce", icon: "ecommerce" as const },
  ]

  const secondRowContent: ContentCardItem[] = [
    { label: "Community Funnels", icon: "community-funnels" as const },
    { label: "Cinematic Ads", icon: "cinematic-ads" as const },
    { label: "UGC Video Labs", icon: "ugc-labs" as const },
    { label: "Brand Identity", icon: "brand-identity" as const },
    { label: "Landing Pages", icon: "landing" as const },
    { label: "AI Pipelines", icon: "pipeline" as const },
    { label: "Growth Kits", icon: "growth" as const },
    { label: "Sales Scripts", icon: "scripts" as const },
  ]

  const ContentCard = ({ item, rowId }: { item: ContentCardItem; rowId: string }) => (
    <div
      className="flex-shrink-0 mx-2"
      onMouseEnter={() => setPausedRow(rowId)}
      onMouseLeave={() => setPausedRow(null)}
    >
      <div className="brand-card flex h-24 w-36 flex-col items-center justify-center rounded-xl p-3 backdrop-blur-xl sm:h-28 sm:w-44">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2">
          <MarqueeCardIcon type={item.icon} size={40} />
        </div>
        <p className="text-xs sm:text-sm font-medium text-white text-center leading-tight">{item.label}</p>
      </div>
    </div>
  )

  return (
    <section className="text-white py-16 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div className="text-center sm:text-left">
            <h2 className="section-heading text-3xl text-white sm:text-4xl md:text-5xl">
              Built for <span className="text-[var(--color-lime)]">future-focused</span> brands
            </h2>
            <p className="body-copy mt-3 max-w-xl text-sm">
              DANVERSE partners with brands, creators and teams that want cinematic ads, bold branding and smart content
              systems.
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-full border-white/20 bg-transparent px-6 text-white hover:bg-white/5 hover:text-[var(--color-lime)]"
          >
            Learn More
          </Button>
        </div>

        {/* Marquee Rows */}
        <div className="space-y-4">
          {/* First Row */}
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
              className="flex animate-scroll-right"
              style={{
                animationPlayState: pausedRow === "first" ? "paused" : "running",
                width: "max-content",
              }}
            >
              {[...firstRowContent, ...firstRowContent, ...firstRowContent].map((item, index) => (
                <ContentCard key={`first-${index}`} item={item} rowId="first" />
              ))}
            </div>
          </div>

          {/* Second Row */}
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
              className="flex animate-scroll-left"
              style={{
                animationPlayState: pausedRow === "second" ? "paused" : "running",
                width: "max-content",
              }}
            >
              {[...secondRowContent, ...secondRowContent, ...secondRowContent].map((item, index) => (
                <ContentCard key={`second-${index}`} item={item} rowId="second" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
