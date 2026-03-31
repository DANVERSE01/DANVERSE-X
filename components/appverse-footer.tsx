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
        <div className="flex justify-center">
          <HoverLift>
            <Button
              onClick={() => fireCTAAndOpenWhatsApp("footer-cta")}
              className="cta-coral rounded-full px-8 py-3 font-medium text-white"
            >
              Book a Call
            </Button>
          </HoverLift>
        </div>

        <div className="my-16">
          <HoverLift>
            <Card className="brand-card relative overflow-hidden rounded-2xl !p-8 md:!p-10">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <p className="section-label mb-2 text-[11px]">AI Content Systems</p>
                  <h3 className="section-heading text-white">Your Brand. On Autopilot.</h3>
                  <p className="body-copy mt-3 max-w-md text-sm">
                    We build AI systems that write your content, plan your campaigns, and ship assets while your team
                    focuses on strategy and growth.
                  </p>
                </div>

                <div className="mx-auto w-full max-w-[280px]">
                  <div className="brand-card relative rounded-[24px] p-1.5 shadow-2xl">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-2xl font-semibold text-white">Automation</div>
                        <p className="body-copy mt-1 text-xs">AI-powered production engine</p>
                        <div className="mt-2 inline-flex items-center rounded-full border border-[rgba(245,245,0,0.16)] bg-[rgba(245,245,0,0.08)] px-2 py-0.5 text-[10px] uppercase tracking-[0.24em] text-[var(--color-lime)]">
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

        <footer className="border-t border-white/10 pt-12">
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
              <Link href="/revisions" className="transition-colors hover:text-[var(--color-accent-gold)]">
                Revision Policy
              </Link>
              <Link href="/t&c" className="transition-colors hover:text-[var(--color-accent-gold)]">
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
            <Link href={item.href} className="transition-colors hover:text-[var(--color-accent-gold)]">
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
        className="flex items-center gap-2 transition-colors hover:text-[var(--color-accent-gold)]"
      >
        <Icon className="h-4 w-4" />
        {label}
      </a>
    </li>
  )
}
