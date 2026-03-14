"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

interface PricingPlan {
  name: string
  price: string
  badge?: string
  highlighted: boolean
  features: string[]
  cta: string
}

const PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: "$299",
    highlighted: false,
    cta: "Get Started",
    features: [
      "1 Cinematic Ad (up to 60s)",
      "1 Platform format (9:16 or 16:9)",
      "Basic color grade",
      "2 revision rounds",
      "5-day turnaround",
      "MP4 final delivery",
    ],
  },
  {
    name: "Professional",
    price: "$699",
    badge: "Most Popular",
    highlighted: true,
    cta: "Start Project",
    features: [
      "3 Cinematic Ads (up to 90s each)",
      "All platform formats included",
      "Cinematic color grade + LUT",
      "Brand system integration",
      "3 revision rounds",
      "7-day turnaround",
      "All format delivery pack",
    ],
  },
  {
    name: "Premium",
    price: "$2,049",
    highlighted: false,
    cta: "Book a Call",
    features: [
      "Full campaign (10+ assets)",
      "Video + branding + landing page",
      "Custom AI content workflow",
      "Dedicated creative director",
      "Unlimited revisions",
      "14-day turnaround",
      "Ongoing retainer option",
    ],
  },
]

export function PricingCards() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-[11px] tracking-widest text-red-400 uppercase mb-3">Pricing</p>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase">
          Pick Your Plan
        </h2>
        <p className="mt-4 text-sm text-white/50 max-w-md mx-auto">
          No hidden fees. No retainers unless you want one. Just clear deliverables and fast execution.
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
              <p className="text-xs text-white/30 mt-1">per project</p>
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
              className={`w-full rounded-full font-medium transition-all ${
                plan.highlighted
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-400 hover:to-orange-400 hover:scale-105"
                  : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
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
