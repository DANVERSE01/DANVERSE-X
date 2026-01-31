import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About — DANVERSE",
  description:
    "DANVERSE is built for teams that need premium creative on repeat. We lock direction first, then ship ads, brand systems, and content workflows with consistency across every campaign.",
}

export default function AboutPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DANVERSE",
    url: "https://danverse.com",
    logo: "https://danverse.com/logo.png",
    description:
      "DANVERSE is built for teams that need premium creative on repeat. We lock direction first, then ship ads, brand systems, and content workflows with consistency across every campaign.",
    sameAs: ["https://www.instagram.com/danverse.creative"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "danverseai@outlook.com",
      },
    ],
  }

  const features = [
    {
      title: "Cinematic Ads & UGC",
      desc: "Cinematic performance ads with platform-native pacing.",
    },
    {
      title: "Branding & Visual Identity",
      desc: "Brand systems that keep every asset on-model.",
    },
    {
      title: "Websites & Landing Pages",
      desc: "Conversion structure + premium feel, built to close.",
    },
    {
      title: "AI Content Systems",
      desc: "Your brand voice, automated into repeatable output.",
    },
    {
      title: "Strategic Guidance",
      desc: "Direction and campaign planning that removes guesswork.",
    },
    {
      title: "Global Reach",
      desc: "Remote-first delivery built for speed and clarity.",
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <SiteHeader />

      <main className="min-h-screen text-white">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                DANVERSE
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              DANVERSE is built for teams that need premium creative on repeat. We lock direction first, then ship ads, brand systems, and content workflows with consistency across every campaign.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="liquid-glass rounded-2xl p-6 border border-white/10 hover:border-red-500/30 transition-all"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/50">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 text-center">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create Something Bold?</h2>
            <p className="text-white/50 mb-8">Let DANVERSE bring your vision to life with cinematic creativity.</p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-8 text-white font-medium hover:from-red-400 hover:to-orange-400"
            >
              <Link href="https://wa.me/201207346648" target="_blank">
                Book a Call
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <AppverseFooter />
    </>
  )
}
