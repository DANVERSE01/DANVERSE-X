"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"
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
  accentColor: string
}

const PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: "$199",
    subtitle: "One ad. Done right.",
    highlighted: false,
    cta: "Get Started",
    accentColor: "var(--color-hot-pink)",
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
    accentColor: "var(--color-electric-blue)",
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
    accentColor: "var(--color-acid-lime)",
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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.94, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
}

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
}

export function PricingCards() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      >
        <p className="section-label mb-3">Pricing</p>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white uppercase md:text-4xl">
          Pick Your Plan
        </h2>
        <p className="body-copy mx-auto mt-4 max-w-md text-sm">
          No retainers. No surprises. Cinematic output, delivered on time, every time.
        </p>
      </motion.div>

      <motion.div
        className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {PLANS.map((plan) => (
          <motion.div
            key={plan.name}
            variants={cardVariants}
            whileHover={{
              y: plan.highlighted ? -8 : -5,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
            }}
            className={`brand-card group relative flex flex-col gap-6 rounded-2xl p-8 ${
              plan.highlighted
                ? "border-[rgba(224,231,91,0.28)] shadow-[0_32px_72px_rgba(0,0,0,0.48),0_0_48px_rgba(224,231,91,0.1),0_0_80px_rgba(0,166,166,0.08)]"
                : ""
            }`}
          >
            {/* Hover glow overlay */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at 50% 0%, color-mix(in srgb, ${plan.accentColor} 14%, transparent) 0%, transparent 65%)`,
                boxShadow: `inset 0 1px 0 color-mix(in srgb, ${plan.accentColor} 20%, transparent)`,
              }}
            />

            {/* Accent top line */}
            <div
              className="absolute left-6 right-6 top-0 h-px rounded-full transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, transparent, ${plan.accentColor}, transparent)`,
                opacity: plan.highlighted ? 0.7 : 0.3,
              }}
            />

            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <motion.span
                  className="accent-chip px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                  initial={{ opacity: 0, y: -8, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                >
                  {plan.badge}
                </motion.span>
              </div>
            )}

            <div>
              <p
                className="section-label mb-2"
                style={{ color: plan.accentColor }}
              >
                {plan.name}
              </p>
              <p className="text-5xl font-black text-white">{plan.price}</p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">{plan.subtitle}</p>
            </div>

            <ul className="flex flex-1 flex-col gap-y-2">
              {plan.features.map((feature, i) => (
                <motion.li
                  key={feature}
                  custom={i}
                  variants={featureVariants}
                  className="flex items-start gap-2 text-sm text-white/70"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 transition-colors duration-200 group-hover:text-[var(--color-electric-blue)]"
                    style={{ color: plan.accentColor }}
                  />
                  {feature}
                </motion.li>
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
