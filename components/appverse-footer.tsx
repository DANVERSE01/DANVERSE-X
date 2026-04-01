"use client"

import Link from "next/link"
import { Instagram, Mail, MessageCircle, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DanverseHeaderLogo } from "@/components/danverse-logo"
import { HoverLift } from "@/components/hover-lift"
import LazyVideo from "@/components/lazy-video"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const TAGLINE =
  "Director-led creative studio producing cinematic campaigns, identity films, and AI-native production systems."

export function AppverseFooter() {
  const revealRef = useScrollReveal<HTMLDivElement>()

  return (
    <section aria-label="Footer and contact" className="section-shell py-[var(--section-block)] text-white">
      <div ref={revealRef} className="content-shell">
        <div data-reveal-item className="flex justify-center">
          <HoverLift>
            <Button
              onClick={() => fireCTAAndOpenWhatsApp("footer-cta")}
              className="cta-primary rounded-full px-8 py-3 font-medium text-white"
            >
              Book a Call
            </Button>
          </HoverLift>
        </div>

        <div data-reveal-item className="my-16">
          <HoverLift>
            <Card className="brand-card relative overflow-hidden rounded-2xl !p-8 md:!p-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-8 top-8 h-32 w-32 rounded-full bg-[rgba(49,93,255,0.16)] blur-3xl" />
                <div className="absolute bottom-8 right-10 h-28 w-28 rounded-full bg-[rgba(255,47,146,0.14)] blur-3xl" />
              </div>
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div className="relative z-10">
                  <p className="section-label mb-2 text-[11px]">AI Content Systems</p>
                  <h3 className="section-heading text-white">Your Brand. On Autopilot.</h3>
                  <p className="body-copy mt-3 max-w-md text-sm">
                    We build AI systems that write your content, plan your campaigns, and ship assets while your team
                    focuses on strategy and growth.
                  </p>
                </div>

                <div className="relative z-10 mx-auto w-full max-w-[280px]">
                  <div className="relative rounded-[28px] border border-[rgba(63,101,255,0.2)] bg-[linear-gradient(150deg,rgba(9,11,18,0.96),rgba(18,24,36,0.9))] p-2 shadow-[0_28px_80px_rgba(0,0,0,0.46),0_0_46px_rgba(49,93,255,0.12)]">
                    <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(49,93,255,0.16),transparent_34%),radial-gradient(circle_at_bottom,rgba(255,47,146,0.12),transparent_32%)]" />
                    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[20px] bg-black">
                      <LazyVideo
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Timeline%202-YFaCK7cEiHWSMRv8XEHaLCoYj2SUAi.mp4"
                        className="absolute inset-0 h-full w-full object-cover"
                        autoplay
                        loop
                        muted
                        playsInline
                        aria-label="DANVERSE automation preview"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,32,86,0.08),transparent_28%,rgba(8,10,16,0.14)_62%,rgba(5,7,11,0.78)_100%)]" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-2xl font-semibold text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.38)]">
                          Automation
                        </div>
                        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">AI-powered production engine</p>
                        <div className="device-badge mt-3 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em]">
                          Powered by DANVERSE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </HoverLift>
        </div>

        <footer data-reveal-item className="border-t border-white/10 pt-12">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
            <div className="space-y-4">
              <DanverseHeaderLogo />
              <p className="body-copy max-w-sm text-sm">{TAGLINE}</p>
            </div>

            <FooterGroup
              title="Navigation"
              items={[
                { href: "/", label: "Home" },
                { href: "/#features", label: "Features" },
                { href: "/#process", label: "Process" },
                { href: "/About", label: "About" },
              ]}
            />

            <div>
              <h4 className="section-label mb-3 text-xs">Connect</h4>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <FooterLink
                  href="https://www.instagram.com/muhammedd_adel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  icon={Instagram}
                  label="Instagram"
                  external
                />
                <FooterLink href="mailto:danverseai@gmail.com" icon={Mail} label="Email" />
                <FooterLink href="https://wa.me/201207346648" icon={MessageCircle} label="WhatsApp" external />
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[var(--color-text-muted)] sm:flex-row">
            <p>Copyright 2026 DANVERSE</p>
            <div className="flex items-center gap-6">
              <Link href="/revisions" className="accent-link">
                Revision Policy
              </Link>
              <Link href="/t&c" className="accent-link">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}

function FooterGroup({ items, title }: { items: Array<{ href: string; label: string }>; title: string }) {
  return (
    <div>
      <h4 className="section-label mb-3 text-xs">{title}</h4>
      <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="accent-link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterLink({
  external = false,
  href,
  icon: Icon,
  label,
}: {
  external?: boolean
  href: string
  icon: LucideIcon
  label: string
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="accent-link flex items-center gap-2"
      >
        <Icon className="h-4 w-4" />
        {label}
      </a>
    </li>
  )
}
