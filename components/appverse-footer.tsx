"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Instagram, Mail, MessageCircle } from "lucide-react"
import LazyVideo from "./lazy-video"
import { DanverseHeaderLogo } from "@/components/danverse-logo"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const TAGLINE =
  "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems."
const COPYRIGHT = "© 2026 - DANVERSE"

export function AppverseFooter() {
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/#features", label: "Features" },
    { href: "/#process", label: "Process" },
    { href: "/About", label: "About" },
  ]

  return (
    <section className="text-white">
      <div className="container mx-auto px-4 pt-16">
        <div className="flex justify-center">
          <Button
            onClick={() => fireCTAAndOpenWhatsApp("footer-cta")}
            className="cta-coral rounded-full px-8 py-3 font-medium text-white"
          >
            Book a Call
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Card className="brand-card relative overflow-hidden rounded-2xl !p-8 md:!p-10">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="section-label mb-2 text-[11px]">AI Content Systems</p>
              <h3 className="section-heading text-2xl text-white sm:text-3xl">Your Brand. On Autopilot.</h3>
              <p className="body-copy mt-3 max-w-md text-sm">
                We build AI systems that write your content, plan your campaigns, and ship assets - while you focus on
                the work that matters.
              </p>
            </div>

            <div className="mx-auto w-full max-w-[280px]">
              <div className="brand-card relative rounded-[24px] p-1.5 shadow-2xl">
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
                    <p className="body-copy mt-1 text-xs">AI-Powered Production Engine</p>
                    <div className="mt-2 inline-flex items-center rounded-full border border-[rgba(245,245,0,0.16)] bg-[rgba(245,245,0,0.08)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--color-lime)]">
                      POWERED by DANVERSE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <footer className="border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
            <div className="space-y-4">
              <DanverseHeaderLogo />
              <p className="body-copy max-w-sm text-sm">{TAGLINE}</p>
            </div>

            <div>
              <h5 className="section-label mb-3 text-xs">Navigation</h5>
              <ul className="space-y-2 text-sm text-[var(--color-ash)]">
                {navigationLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition-colors hover:text-[var(--color-lime)]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="section-label mb-3 text-xs">Connect</h5>
              <ul className="space-y-2 text-sm text-[var(--color-ash)]">
                <li>
                  <a
                    href="https://www.instagram.com/muhammedd_adel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-[var(--color-lime)]"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:danverseai@gmail.com"
                    className="flex items-center gap-2 transition-colors hover:text-[var(--color-lime)]"
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
                    className="flex items-center gap-2 transition-colors hover:text-[var(--color-lime)]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[var(--color-ash)] sm:flex-row">
            <p>{COPYRIGHT}</p>
            <div className="flex items-center gap-6">
              <Link href="/revisions" className="transition-colors hover:text-[var(--color-lime)]">
                Revision Policy
              </Link>
              <Link href="/t&c" className="transition-colors hover:text-[var(--color-lime)]">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
