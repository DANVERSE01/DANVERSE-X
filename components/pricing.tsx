import { PricingExamplesStrip } from "./PricingExamplesStrip"
import { PricingCards } from "./pricing-cards"

export function Pricing() {
  return (
    <section id="pricing" className="text-white relative z-10 overflow-hidden bg-black/0">
      <PricingCards />
      <div className="w-full">
        <PricingExamplesStrip />
      </div>
    </section>
  )
}
