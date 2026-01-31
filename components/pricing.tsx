"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { ExamplesDialog } from "./examples-dialog"

type Feature = { text: string; muted?: boolean }

const ACCENT = "#EF4444"

function FeatureItem({ text, muted = false }: Feature) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-4 w-4 text-red-400 flex-shrink-0" />
      <span className={`text-sm ${muted ? "text-white/50" : "text-white/80"}`}>{text}</span>
    </li>
  )
}

type Currency = "INR" | "USD"

const PRICES: Record<Currency, { startup: string; pro: string; premium: string; save: string }> = {
  INR: {
    startup: "₹25,000",
    pro: "₹55,000",
    premium: "₹1,70,500",
    save: "Save ₹1,500",
  },
  USD: {
    startup: "$299",
    pro: "$699",
    premium: "$2,049",
    save: "Save $20",
  },
}

function guessLocalCurrency(): Currency {
  const lang = typeof navigator !== "undefined" ? navigator.language : ""
  const tz = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : ""
  if (/-(IN|PK|BD)\b/i.test(lang) || /(Kolkata|Karachi|Dhaka)/i.test(tz || "")) return "INR"
  return "USD"
}

const EXAMPLE_TILES = Array.from({ length: 6 }, (_, index) => `Example ${index + 1}`)

export function Pricing() {
  const [openPlan, setOpenPlan] = useState<null | "Starter" | "Campaign" | "System">(null)
  const [currency, setCurrency] = useState<Currency>("USD")

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch("/api/geo", { cache: "no-store" })
        if (!res.ok) throw new Error("geo failed")
        const data = await res.json()
        if (!cancelled) setCurrency(data?.currency === "INR" ? "INR" : "USD")
      } catch {
        if (!cancelled) setCurrency(guessLocalCurrency())
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="pricing" className="text-white">
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="mx-auto mb-4 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20">
            Pricing & Packages
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-3 text-sm text-white/50 max-w-lg mx-auto">
            No hidden fees. Just world-class creative work that fits your budget.
          </p>
          <div className="mt-6">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-6 text-white font-medium hover:from-red-400 hover:to-orange-400"
            >
              <Link href="https://wa.me/201207346648" target="_blank">
                Book a Call
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
          {/* Starter */}
          <Card className="relative overflow-hidden rounded-2xl liquid-glass border-white/10">
            <div className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-medium bg-white/10 text-white/70">
              {PRICES[currency].save}
            </div>
            <CardHeader className="space-y-2 pb-4">
              <div className="text-sm font-semibold text-white">Starter</div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{PRICES[currency].startup}</span>
                <span className="text-xs text-white/50">per video</span>
              </div>
              <Button
                onClick={() => setOpenPlan("Starter")}
                className="w-full rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 mt-2"
              >
                View Examples
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2.5">
                {[
                  "10–15s Reel/Teaser (1 SKU)",
                  "Simple background + lighting",
                  "1 revision",
                  "Delivered in 10 days",
                  "Social-ready visuals",
                  "3D Modelling included",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Campaign - Featured */}
          <Card className="relative overflow-hidden rounded-2xl liquid-glass-enhanced border-red-500/30 ring-1 ring-red-500/20">
            <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500" />
            <CardHeader className="space-y-2 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Campaign</span>
                <span className="text-[10px] font-medium bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                  Popular
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{PRICES[currency].pro}</span>
                <span className="text-xs text-white/50">per video</span>
              </div>
              <Button
                onClick={() => setOpenPlan("Campaign")}
                className="w-full rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-400 hover:to-orange-400 mt-2"
              >
                View Examples
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2.5">
                {[
                  "20–25s Animation (1 SKU)",
                  "Fixed shot-list (no surprises)",
                  "Creative background + pro graphics",
                  "2 structured revisions",
                  "Delivered in 3 weeks",
                  "3D Modelling included",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* System */}
          <Card className="relative overflow-hidden rounded-2xl liquid-glass border-white/10">
            <CardHeader className="space-y-2 pb-4">
              <div className="text-sm font-semibold text-white">System</div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{PRICES[currency].premium}</span>
                <span className="text-xs text-white/50">per video</span>
              </div>
              <Button
                onClick={() => setOpenPlan("System")}
                className="w-full rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 mt-2"
              >
                View Examples
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2.5">
                {[
                  "30–40s Animation (up to 5 SKUs)",
                  "Advanced storyboard + shot design",
                  "Delivered in 4 weeks",
                  "Lighting, camera animation, depth",
                  "Up to 3 structured revisions",
                  "3D Modelling included",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <ExamplesDialog
        open={openPlan === "Starter"}
        onOpenChange={(v) => setOpenPlan(v ? "Starter" : null)}
        planName="Starter Plan"
        price={PRICES[currency].startup}
        videoIds={EXAMPLE_TILES}
      />
      <ExamplesDialog
        open={openPlan === "Campaign"}
        onOpenChange={(v) => setOpenPlan(v ? "Campaign" : null)}
        planName="Campaign Plan"
        price={PRICES[currency].pro}
        videoIds={EXAMPLE_TILES}
      />
      <ExamplesDialog
        open={openPlan === "System"}
        onOpenChange={(v) => setOpenPlan(v ? "System" : null)}
        planName="System Plan"
        price={PRICES[currency].premium}
        videoIds={EXAMPLE_TILES}
      />
    </section>
  )
}
