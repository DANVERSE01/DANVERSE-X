import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ — DANVERSE",
  description: "Frequently asked questions about DANVERSE creative services.",
}

const faqs = [
  {
    q: "What types of products can you animate or render?",
    a: "We can create photorealistic 3D animations and renders for almost any product — from beauty and skincare to electronics, furniture, and luxury goods.",
  },
  {
    q: "How long does a typical 3D animation take?",
    a: "Timelines vary depending on complexity, but a standard 15–20 second animation usually takes 7–14 working days after final concept approval.",
  },
  {
    q: "Do you work with existing CAD files or need product samples?",
    a: "We can work with both. If you have CAD or 3D models, we can import and refine them. If not, we can create models from physical product samples or detailed reference images.",
  },
  {
    q: "How do you price your services?",
    a: "Pricing is based on animation length, complexity, number of renders, and modeling requirements.",
  },
  {
    q: "Can we request changes after delivery?",
    a: "Yes. All revisions are covered under our revision policy, which ensures smooth updates without unexpected scope creep.",
  },
  {
    q: "Will the renders match our brand's visual style?",
    a: "Absolutely. We customize lighting, materials, camera angles, and animation pacing to fit your brand's identity and marketing needs.",
  },
  {
    q: "What formats do you deliver in?",
    a: "We typically deliver in MP4 (H.264) for videos and high-resolution PNG/JPG for stills. Other formats like MOV, ProRes, or transparent-background renders are available on request.",
  },
  {
    q: "Can you handle large-scale projects or bulk renders?",
    a: "Yes, we regularly work on bulk orders for 10+ animations or 50+ renders. We optimize workflows to maintain quality and meet tight deadlines.",
  },
]

export default function FAQPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="liquid-glass rounded-2xl p-8 md:p-10 border border-white/10">
              <div className="space-y-8">
                <header className="space-y-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-red-400">Frequently Asked Questions</h1>
                  <p className="text-white/50">
                    Answers to common questions about our 3D animation and creative services.
                  </p>
                </header>

                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <section key={index} className="space-y-2">
                      <h2 className="text-lg font-semibold text-white">
                        {index + 1}. {faq.q}
                      </h2>
                      <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
                    </section>
                  ))}
                </div>

                <section className="pt-4 border-t border-white/10">
                  <p className="text-white/50 text-sm">
                    Have more questions?{" "}
                    <Link href="https://wa.link/rc25na" className="text-red-400 hover:underline">
                      Contact us
                    </Link>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AppverseFooter />
    </>
  )
}
