"use client"

import React from "react"
import { PricingExamplesStrip } from "./PricingExamplesStrip"

export function Pricing() {
  return (
    <section id="pricing" className="text-white relative z-10">
      <div className="container mx-auto px-4 py-16 sm:py-20 lg:py-40">
        <PricingExamplesStrip />
      </div>
    </section>
  )
}
