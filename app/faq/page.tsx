import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { createWhatsAppUrl } from "@/lib/env"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ - DANVERSE",
  description: "Frequently asked questions about DANVERSE creative services and delivery process.",
}

const FAQS = [
  {
    q: "What exactly does DANVERSE produce?",
    a: "AI-powered cinematic ads, brand films, social content, and full visual identity systems. Every deliverable is production-ready - not rough cuts.",
  },
  {
    q: "How long does a project take?",
    a: "Most projects ship in 5-10 business days. Complex brand films or full campaigns take 2-3 weeks depending on scope.",
  },
  {
    q: "Do you work with brands outside Egypt?",
    a: "Yes. We work with brands across Egypt, the Gulf, Canada, and beyond. All communication is handled remotely with zero quality compromise.",
  },
  {
    q: "What do you need from us to start?",
    a: "A brief, your brand assets (logo, colors, references), and a clear goal. We handle everything else from concept to final file.",
  },
  {
    q: "Can we request revisions?",
    a: "Yes. Every project includes revision rounds covered in your package. We don't ship until you're satisfied.",
  },
  {
    q: "What platforms do you deliver for?",
    a: "Instagram Reels, TikTok, YouTube, Facebook, and any custom ratio. All assets are exported platform-ready.",
  },
  {
    q: "Do you work with AI tools only?",
    a: "We use AI as a production accelerator - Kling, Runway, Seedance, ComfyUI - combined with human creative direction. The result is cinematic, not generated-looking.",
  },
  {
    q: "How do we start?",
    a: "Hit \"Chat With Us\" and tell us what you're building. We'll respond within 24 hours with a clear plan.",
  },
] as const

export default function FAQPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen px-4 py-16 text-white">
        <div className="container mx-auto">
          <div className="brand-card mx-auto max-w-4xl rounded-[2rem] p-8 md:p-10">
            <header className="space-y-3">
              <p className="section-label">FAQ</p>
              <h1 className="section-heading text-3xl text-white md:text-4xl">Before We Start</h1>
              <p className="body-copy text-base md:text-lg">The questions brands ask before they commit</p>
            </header>

            <div className="mt-10 space-y-6">
              {FAQS.map((faq, index) => (
                <section key={faq.q} className="brand-card rounded-2xl px-6 py-5">
                  <p className="section-label text-[11px]">Q{index + 1}</p>
                  <h2 className="mt-2 text-xl font-bold text-white">{faq.q}</h2>
                  <p className="body-copy mt-3 text-sm leading-7">{faq.a}</p>
                </section>
              ))}
            </div>

            <section className="mt-8 border-t border-white/10 pt-6">
              <p className="body-copy text-sm">
                Need a custom answer?{" "}
                <Link
                  href={createWhatsAppUrl()}
                  className="text-[var(--color-lime)] transition-colors hover:text-white"
                >
                  Chat With Us
                </Link>
              </p>
            </section>
          </div>
        </div>
      </main>
      <AppverseFooter />
    </>
  )
}
