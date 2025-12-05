"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { ExamplesDialog } from "./examples-dialog"

const WHATSAPP_LINK = "https://wa.me/201207346648?text=Hello%20I%20came%20across%20your%20website%20and%20I%20need"

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

const startupVideos = ["H1h5dHpp1Nw", "HXARcSSdfMU", "fd8zraQ1JdE", "ARQyF2FA3Ec", "dEZfHADlFtw", "wuyfdfKO6Rc"]
const proVideos = ["ASV2myPRfKA", "eTfS2lqwf6A", "KALbYHmGV4I", "Go0AA9hZ4as", "sB7RZ9QCOAg", "TK2WboJOJaw"]
const premiumVideos = ["v2AC41dglnM", "pRpeEdMmmQ0", "3AtDnEC4zak", "JRfuAukYTKg", "LsoLEjrDogU", "RB-RcX5DS5A"]

export function Pricing() {
  const [openPlan, setOpenPlan] = useState<null | "Startup" | "Pro" | "Premium">(null)
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
              <Link href={WHATSAPP_LINK} target="_blank">
                Contact Now
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
          {/* Startup */}
          <Card className="relative overflow-hidden rounded-2xl liquid-glass border-white/10">
            <div className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-medium bg-white/10 text-white/70">
              {PRICES[currency].save}
            </div>
            <CardHeader className="space-y-2 pb-4">
              <div className="text-sm font-semibold text-white">Startup</div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{PRICES[currency].startup}</span>
                <span className="text-xs text-white/50">per video</span>
              </div>
              <Button
                onClick={() => setOpenPlan("Startup")}
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

          {/* Pro - Featured */}
          <Card className="relative overflow-hidden rounded-2xl liquid-glass-enhanced border-red-500/30 ring-1 ring-red-500/20">
            <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500" />
            <CardHeader className="space-y-2 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Pro</span>
                <span className="text-[10px] font-medium bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                  Popular
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{PRICES[currency].pro}</span>
                <span className="text-xs text-white/50">per video</span>
              </div>
              <Button
                onClick={() => setOpenPlan("Pro")}
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

          {/* Premium */}
          <Card className="relative overflow-hidden rounded-2xl liquid-glass border-white/10">
            <CardHeader className="space-y-2 pb-4">
              <div className="text-sm font-semibold text-white">Premium</div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{PRICES[currency].premium}</span>
                <span className="text-xs text-white/50">per video</span>
              </div>
              <Button
                onClick={() => setOpenPlan("Premium")}
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
        open={openPlan === "Startup"}
        onOpenChange={(v) => setOpenPlan(v ? "Startup" : null)}
        planName="Startup Plan"
        price={PRICES[currency].startup}
        videoIds={startupVideos}
      />
      <ExamplesDialog
        open={openPlan === "Pro"}
        onOpenChange={(v) => setOpenPlan(v ? "Pro" : null)}
        planName="Pro Plan"
        price={PRICES[currency].pro}
        videoIds={proVideos}
      />
      <ExamplesDialog
        open={openPlan === "Premium"}
        onOpenChange={(v) => setOpenPlan(v ? "Premium" : null)}
        planName="Premium Plan"
        price={PRICES[currency].premium}
        videoIds={premiumVideos}
      />
    </section>
  )
}
