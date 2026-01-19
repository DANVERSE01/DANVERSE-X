"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Instagram, Mail, MessageCircle } from "lucide-react"
import LazyVideo from "./lazy-video"
import { DanverseHeaderLogo } from "@/components/danverse-logo"

interface FooterContent {
  tagline: string
  copyright: string
}

const defaultContent: FooterContent = {
  tagline:
    "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems.",
  copyright: "© 2025 — DANVERSE",
}

export function AppverseFooter() {
  const [content, setContent] = useState<FooterContent>(defaultContent)

  useEffect(() => {
    const savedContent = localStorage.getItem("skitbit-content")
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent)
        if (parsed.footer) setContent(parsed.footer)
      } catch (error) {
        console.error("Error parsing saved content:", error)
      }
    }
  }, [])

  return (
    <section className="text-white">
      {/* Contact CTA */}
      <div className="container mx-auto px-4 pt-16">
        <div className="flex justify-center">
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-8 py-3 text-white font-medium hover:from-red-400 hover:to-orange-400 shadow-lg shadow-red-500/20"
          >
            <a href="https://wa.me/201207346648" target="_blank" rel="noopener noreferrer">
              Contact Us
            </a>
          </Button>
        </div>
      </div>

      {/* AI Content Card */}
      <div className="container mx-auto px-4 py-16">
        <Card className="relative overflow-hidden rounded-2xl liquid-glass p-8 md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Left Content */}
            <div>
              <p className="mb-2 text-[11px] tracking-widest text-red-400 uppercase">AI Content Systems</p>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">Automate your creative workflow</h3>
              <p className="mt-3 text-sm text-white/60 max-w-md">
                Generate scripts, posts, emails, and content on demand. Our AI systems connect your tools and automate
                the creative process.
              </p>
            </div>

            {/* Right Mockup */}
            <div className="mx-auto w-full max-w-[280px]">
              <div className="relative rounded-[24px] liquid-glass p-1.5 shadow-2xl">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[20px] bg-black">
                  <LazyVideo
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Timeline%202-YFaCK7cEiHWSMRv8XEHaLCoYj2SUAi.mp4"
                    className="absolute inset-0 h-full w-full object-cover"
                    autoplay={true}
                    loop={true}
                    muted={true}
                    playsInline={true}
                    aria-label="DANVERSE automation preview"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-2xl font-bold text-white">Automation</div>
                    <p className="text-xs text-white/70 mt-1">From content to campaigns in minutes</p>
                    <div className="mt-2 inline-flex items-center rounded-full bg-red-500/20 border border-red-500/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-red-400">
                      POWERED by DANVERSE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
            {/* Brand */}
            <div className="space-y-4">
              <DanverseHeaderLogo />
              <p className="max-w-sm text-sm text-white/50">{content.tagline}</p>
            </div>

            {/* Navigation */}
            <div>
              <h5 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">Navigation</h5>
              <ul className="space-y-2 text-sm text-white/60">
                {["Home", "Features", "Pricing", "About"].map((item) => (
                  <li key={item}>
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="hover:text-red-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h5 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">Connect</h5>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a
                    href="https://www.instagram.com/muhammedd_adel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-red-400 transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:danverseai@outlook.com"
                    className="flex items-center gap-2 hover:text-red-400 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/201207346648"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-red-400 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
            <p>{content.copyright}</p>
            <div className="flex items-center gap-6">
              <Link href="/revisions" className="hover:text-red-400 transition-colors">
                Revision Policy
              </Link>
              <Link href="/t&c" className="hover:text-red-400 transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
