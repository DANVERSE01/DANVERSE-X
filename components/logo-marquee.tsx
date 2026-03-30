"use client"

import type { ComponentProps } from "react"
import { MarqueeCardIcon } from "./marquee-card-icon"

type CategoryItem = {
  label: string
  icon: ComponentProps<typeof MarqueeCardIcon>["type"]
}

const categoryItems: CategoryItem[] = [
  { label: "AI Startups", icon: "ai-startups" },
  { label: "Personal Brands", icon: "personal-brands" },
  { label: "SaaS & Tech", icon: "saas-tech" },
  { label: "Education", icon: "education" },
  { label: "Agencies", icon: "agencies" },
  { label: "Events", icon: "events" },
  { label: "Luxury Brands", icon: "luxury" },
  { label: "E-commerce", icon: "ecommerce" },
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
  return (
    <section className="section-shell" data-analytics-section="Categories">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center reveal-on-scroll" data-reveal>
          <span className="section-tag">Future-Focused Brands</span>
          <h2 className="mt-7 text-balance text-[clamp(2.25rem,5vw,4rem)] font-black leading-[0.96]">
            Built for <span className="headline-accent">future focused</span> brands.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 text-[var(--platinum-muted)] sm:text-lg">
            Luxury launches, social campaigns, AI startups, SaaS products, events, and premium commerce teams all need
            a visual system that feels intentional from frame one.
          </p>
        </div>

        <div
          className="reveal-on-scroll mt-12 overflow-x-auto rounded-[28px] border border-[var(--bg-border)] bg-[rgba(12,12,16,0.82)] p-1 [scrollbar-width:none]"
          data-reveal
        >
          <div className="categories-grid grid min-w-[920px] grid-cols-8 gap-px rounded-[24px] bg-[var(--bg-border)] md:min-w-0 md:grid-cols-4 xl:grid-cols-8">
            {categoryItems.map((item) => (
              <article
                key={item.label}
                className="category-tile group flex min-h-[164px] flex-col items-center justify-center gap-4 bg-[var(--bg-elevated)] px-4 py-8 text-center transition-all duration-300 hover:bg-[var(--gold-glow)] hover:shadow-[inset_0_0_0_1px_rgba(201,168,76,0.24)]"
                data-hover
              >
                <div className="[&_svg]:h-12 [&_svg]:w-12 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:scale-105 [&_svg]:[filter:brightness(0)_saturate(100%)_invert(74%)_sepia(24%)_saturate(704%)_hue-rotate(8deg)_brightness(90%)_contrast(88%)] group-hover:[&_svg]:[filter:brightness(0)_saturate(100%)_invert(80%)_sepia(41%)_saturate(736%)_hue-rotate(7deg)_brightness(100%)_contrast(94%)]">
                  <MarqueeCardIcon type={item.icon} size={44} />
                </div>
                <span className="text-sm font-semibold leading-5 text-[var(--platinum-muted)] transition-colors duration-300 group-hover:text-[var(--platinum)]">
                  {item.label}
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
