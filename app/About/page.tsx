import type { Metadata } from "next"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"

const WHATSAPP_LINK = "https://wa.me/201207346648?text=Hello%20I%20came%20across%20your%20website%20and%20I%20need"

export const metadata: Metadata = {
  title: "About — DANVERSE",
  description:
    "DANVERSE is a next generation creative studio combining artificial intelligence, cinematic storytelling, and sharp strategy.",
}

export default function AboutPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DANVERSE",
    url: "https://danverse.com",
    logo: "https://danverse.com/logo.png",
    description:
      "DANVERSE is a next generation creative studio that combines artificial intelligence, cinematic storytelling, and sharp strategy.",
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
      desc: "High impact vertical and horizontal videos for TikTok, Reels, and campaigns with strong hooks and storytelling.",
    },
    {
      title: "Branding & Visual Identity",
      desc: "Logos, visual systems, hero graphics, and brand worlds that feel premium, futuristic, and consistent.",
    },
    {
      title: "Websites & Landing Pages",
      desc: "Modern websites and landing pages using clean UI, strong copy, and smooth motion.",
    },
    {
      title: "AI Content Systems",
      desc: "Custom AI workflows that generate scripts, posts, emails, and content on demand.",
    },
    {
      title: "Strategic Guidance",
      desc: "High level consulting on AI tools, prompt writing, and building creative systems that make money.",
    },
    {
      title: "Global Reach",
      desc: "We work with clients worldwide, delivering premium creative solutions across time zones.",
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <SiteHeader />
      <main className="min-h-screen bg-black text-white pt-24">
        {/* Hero Section */}
        <section className="relative py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-500 bg-clip-text text-transparent">
              About DANVERSE
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              DANVERSE is a next generation creative studio that combines artificial intelligence, cinematic
              storytelling, and sharp strategy to help brands dominate the digital space.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-orange-400 mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Work Together?</h2>
            <p className="text-lg text-gray-300 mb-8">Let&apos;s create something extraordinary for your brand.</p>
            <Button
              asChild
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-full px-8 py-6 text-lg"
            >
              <Link href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat With Us
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <AppverseFooter />
    </>
  )
}
