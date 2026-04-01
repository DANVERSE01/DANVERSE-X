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
    <section aria-label="Footer and contact" className="section-shell relative overflow-hidden py-[var(--section-block)] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-[10%] h-[22rem] w-[22rem] rounded-full bg-[rgba(73,107,255,0.08)] blur-[120px]" />
        <div className="absolute right-[-8rem] bottom-[12%] h-[20rem] w-[20rem] rounded-full bg-[rgba(255,47,146,0.08)] blur-[120px]" />
      </div>
      <div ref={revealRef} className="content-shell">
        <div data-reveal-item className="mx-auto flex max-w-[48rem] flex-col items-center text-center">
          <p className="section-label">Final Contact</p>
          <h2 className="section-heading mt-4 max-w-[11ch] text-white">Built to look expensive before the first call.</h2>
          <p className="body-copy mt-4 max-w-[38ch] text-[1rem] leading-7 text-white/72 sm:text-[1.05rem]">
            If the direction is clear, the launch gets faster. If the quality is obvious, the brand gets stronger.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <HoverLift>
              <Button
                onClick={() => fireCTAAndOpenWhatsApp("footer-cta")}
                className="cta-primary rounded-full px-8 py-3 font-semibold tracking-[-0.02em] text-white"
              >
                Book a Call
              </Button>
            </HoverLift>
            <div className="accent-chip px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/78">
              Response within 24h
            </div>
          </div>
        </div>

        <div data-reveal-item className="my-12 sm:my-16">
          <HoverLift>
            <Card className="brand-card relative overflow-hidden rounded-[2rem] !p-5 sm:!p-8 md:!p-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-4 top-4 h-24 w-24 rounded-full bg-[rgba(49,93,255,0.16)] blur-3xl sm:left-8 sm:top-8 sm:h-32 sm:w-32" />
                <div className="absolute bottom-4 right-4 h-20 w-20 rounded-full bg-[rgba(255,47,146,0.14)] blur-3xl sm:bottom-8 sm:right-10 sm:h-28 sm:w-28" />
              </div>
              <div className="grid items-center gap-8 sm:gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)]">
                <div className="relative z-10">
                  <p className="section-label mb-2 text-[11px]">AI Content Systems</p>
                  <h3 className="section-heading max-w-[11ch] text-white">Your Brand. On Autopilot.</h3>
                  <p className="body-copy mt-4 max-w-[34ch] text-[0.98rem] leading-7 sm:text-[1.03rem]">
                    We build AI systems that write your content, plan your campaigns, and ship assets while your team
                    focuses on strategy and growth.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <div className="accent-chip px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/78">
                      Strategy-aware
                    </div>
                    <div className="accent-chip px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/78">
                      Production-native
                    </div>
                    <div className="accent-chip px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/78">
                      Launch-ready
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mx-auto w-full max-w-[250px] sm:max-w-[280px]">
                  <div className="relative rounded-[28px] border border-[rgba(63,101,255,0.2)] bg-[linear-gradient(150deg,rgba(9,11,18,0.96),rgba(18,24,36,0.9))] p-1.5 shadow-[0_28px_80px_rgba(0,0,0,0.46),0_0_46px_rgba(49,93,255,0.12)] sm:p-2">
                    <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(49,93,255,0.16),transparent_34%),radial-gradient(circle_at_bottom,rgba(255,47,146,0.12),transparent_32%)]" />
                    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[20px] bg-black">
                      <LazyVideo
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Timeline%202-YFaCK7cEiHWSMRv8XEHaLCoYj2SUAi.mp4"
                        className="absolute inset-0 h-full w-full object-cover"
                        autoplay
                        loop
                        muted
                        playsInline
                        rootMargin="260px"
                        aria-label="DANVERSE automation preview"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,32,86,0.08),transparent_28%,rgba(8,10,16,0.14)_62%,rgba(5,7,11,0.78)_100%)]" />
                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                        <div className="text-xl font-semibold text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.38)] sm:text-2xl">
                          Automation
                        </div>
                        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">AI-powered production engine</p>
                        <div className="device-badge mt-2.5 px-2 py-1 text-[9px] uppercase tracking-[0.18em] sm:mt-3 sm:px-2.5 sm:text-[10px] sm:tracking-[0.24em]">
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
            <div className="space-y-5">
              <div className="inline-flex rounded-full border border-white/8 bg-white/[0.02] px-4 py-3">
                <DanverseHeaderLogo />
              </div>
              <p className="body-copy max-w-sm text-sm leading-7">{TAGLINE}</p>
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
      <ul className="space-y-2.5 text-sm text-[var(--color-text-muted)]">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="accent-link inline-flex items-center gap-2 text-white/72 transition-colors hover:text-white">
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
        className="accent-link flex items-center gap-2 text-white/72 transition-colors hover:text-white"
      >
        <Icon className="h-4 w-4" />
        {label}
      </a>
    </li>
  )
}
