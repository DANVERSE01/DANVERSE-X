"use client"

import React from "react"
import { PricingExamplesStrip } from "./PricingExamplesStrip"
import { PricingCards } from "./pricing-cards"

export function Pricing() {
  return (
    <section id="pricing" className="text-white relative z-10 overflow-hidden bg-black">
      <PricingCards />
      <div className="w-full">
        <PricingExamplesStrip />
      </div>
    </section>
  )
}
"use client"

import React from "react"
import { PricingExamplesStrip } from "./PricingExamplesStrip"
import { PricingCards } from "./pricing-cards"

export function Pricing() {
  return (
    <section id="pricing" className="text-white relative z-10 overflow-hidden bg-black">
      <PricingCards />
      <div className="container mx-auto px-0 py-0 lg:py-0">
        <PricingExamplesStrip />
      </div>
    </section>
  )
}
