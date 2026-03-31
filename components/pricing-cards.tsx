"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

interface PricingPlan {
  name: string
  price: string
  subtitle: string
  badge?: string
  highlighted: boolean
  features: string[]
  cta: string
}

const PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: "$199",
    subtitle: "One ad. Done right.",
    highlighted: false,
    cta: "Get Started",
    features: [
      "1 Cinematic Ad (up to 60s)",
      "1 format: 9:16 or 16:9 or 21:9",
      "Basic color grade",
      "1 revision round",
      "5-day delivery",
      "MP4 final delivery",
    ],
  },
  {
    name: "Professional",
    price: "$499",
    subtitle: "Built for brands that scale.",
    badge: "Most Popular",
    highlighted: true,
    cta: "Start Project",
    features: [
      "3 Cinematic Ads (up to 90s each)",
      "1 format per ad: 9:16 or 16:9 or 21:9",
      "Cinematic color grade + LUT",
      "Brand system integration",
      "3 hook variants per ad",
      "2 revision rounds",
      "7-day delivery",
    ],
  },
  {
    name: "Premium",
    price: "$1,499",
    subtitle: "Your entire creative operation.",
    badge: "Elite",
    highlighted: false,
    cta: "Book a Call",
    features: [
      "5 Cinematic Ads + UGC content",
      "1 format per ad: 9:16 or 16:9 or 21:9",
      "Cinematic color grade + LUT",
      "Full branding package",
      "AI content system setup",
      "Landing page design",
      "3 revision rounds",
      "15-day delivery",
      "Dedicated creative director",
    ],
  },
]

export function PricingCards() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <p className="section-label mb-3 text-[11px]">Pricing</p>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white uppercase md:text-4xl">
          Pick Your Plan
        </h2>
        <p className="body-copy mx-auto mt-4 max-w-md text-sm">
          No retainers. No surprises. Cinematic output, delivered on time, every time.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`brand-card relative flex flex-col gap-6 rounded-2xl p-8 transition-all ${
              plan.highlighted
                ? "border-[rgba(255,47,146,0.34)] shadow-[0_32px_72px_rgba(0,0,0,0.42),0_0_48px_rgba(49,93,255,0.12),0_0_34px_rgba(255,47,146,0.12)]"
                : ""
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="accent-chip px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  {plan.badge}
                </span>
              </div>
            )}

            <div>
              <p className="mb-2 text-[11px] uppercase tracking-widest text-white/40">{plan.name}</p>
              <p className="text-5xl font-black text-white">{plan.price}</p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">{plan.subtitle}</p>
            </div>

            <ul className="flex flex-1 flex-col gap-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-acid-lime)]" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className={`w-full rounded-full font-medium transition-all ${
                plan.highlighted
                  ? "cta-primary text-white hover:scale-[1.02]"
                  : "cta-secondary text-white hover:scale-[1.02]"
              }`}
              onClick={() =>
                fireCTAAndOpenWhatsApp(
                  plan.name === "Starter"
                    ? "pricing-starter"
                    : plan.name === "Professional"
                      ? "pricing-professional"
                      : "pricing-premium"
                )
              }
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
