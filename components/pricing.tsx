"use client"

import React from "react"
import { PricingExamplesStrip } from "./PricingExamplesStrip"

export function Pricing() {
  return (
    <section id="pricing" className="text-white relative z-10 overflow-hidden bg-black">
      <div className="container mx-auto px-4 py-20 lg:py-40">
        <PricingExamplesStrip />
      </div>
    </section>
  )
}
