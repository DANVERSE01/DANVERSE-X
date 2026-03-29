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
    badge: "MOST POPULAR",
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
    badge: "ELITE",
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
      <div className="text-center mb-12">
        <p className="text-[11px] tracking-widest text-red-400 uppercase mb-3">Pricing</p>
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="text-[clamp(2.5rem,6vw,6rem)] leading-none uppercase text-white"
        >
          Pick Your Plan
        </h2>
        <p className="mt-4 text-sm text-white/50 max-w-md mx-auto">
          No retainers. No surprises. Cinematic output — delivered on time, every time.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-8 flex flex-col gap-6 transition-all ${
              plan.highlighted
                ? "ring-1 ring-red-500/30 border border-red-500/50 bg-gradient-to-b from-red-500/20 to-orange-500/10"
                : "bg-black/40 border border-white/10"
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-red-500 text-white text-[10px] uppercase tracking-widest rounded-full px-3 py-1 font-bold">
                  {plan.badge}
                </span>
              </div>
            )}

            <div>
              <p className="text-[11px] tracking-widest text-white/40 uppercase mb-2">{plan.name}</p>
              <p className="text-5xl font-black text-white">{plan.price}</p>
              <p className="text-xs text-white/30 mt-1">{plan.subtitle}</p>
            </div>

            <ul className="flex flex-col gap-y-2 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                  <Check className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              variant={plan.highlighted ? "default" : "outline"}
              className="w-full justify-center"
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
