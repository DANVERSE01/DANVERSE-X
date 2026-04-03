"use client"

import Link from "next/link"
import { Instagram, Mail, MessageCircle, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DanverseHeaderLogo } from "@/components/danverse-logo"
import { HoverLift } from "@/components/hover-lift"
import { contactEmailHref, env } from "@/lib/env"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const TAGLINE =
  "Director-led creative studio producing cinematic campaigns, identity systems, and AI-native launch content."

const CLOSE_PROOFS = ["Reply within 24h", "Director-led direction", "Launch-ready handoff"] as const

export function AppverseFooter() {
  const revealRef = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="contact"
      aria-label="Footer and contact"
      className="section-shell relative overflow-hidden py-[var(--section-block)] text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-[12%] h-[22rem] w-[22rem] rounded-full bg-[rgba(106,129,255,0.08)] blur-[120px]" />
        <div className="absolute right-[-8rem] bottom-[12%] h-[20rem] w-[20rem] rounded-full bg-[rgba(39,24,36,0.24)] blur-[120px]" />
      </div>

      <div ref={revealRef} className="content-shell">
        <div
          data-reveal-item
          className="statement-panel mx-auto max-w-[1120px] rounded-[2rem] px-5 py-8 text-center sm:px-8 sm:py-10 lg:px-12 lg:py-12"
        >
          <div className="relative z-10 mx-auto max-w-[46rem]">
            <p className="section-label">Final Contact</p>
            <h2 className="section-heading mt-4 max-w-[10ch] text-white sm:mx-auto">
              Make the first reply feel inevitable.
            </h2>
            <p className="body-copy mx-auto mt-4 max-w-[34ch] text-[1rem] leading-7 text-white/72 sm:text-[1.05rem]">
              When the direction is obvious, the project sells itself earlier. We build that feeling before the first
              delivery lands.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <HoverLift>
                <Button
                  onClick={() => fireCTAAndOpenWhatsApp("footer-cta")}
                  aria-label="Book a discovery call on WhatsApp"
                  className="cta-primary rounded-full px-8 py-3 font-semibold tracking-[-0.02em] text-white"
                >
                  Book a Call
                </Button>
              </HoverLift>
              <div className="cta-secondary inline-flex rounded-full px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white/78">
                Response within 24h
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
              {CLOSE_PROOFS.map((proof) => (
                <div
                  key={proof}
                  className="accent-chip px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/78"
                >
                  {proof}
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer data-reveal-item className="mx-auto mt-12 max-w-[1120px] border-t border-white/10 pt-10 sm:mt-14 sm:pt-12">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div className="space-y-5">
              <div className="inline-flex">
                <DanverseHeaderLogo className="scale-[0.95] origin-left" />
              </div>
              <p className="body-copy max-w-sm text-sm leading-7">{TAGLINE}</p>
            </div>

            <FooterGroup
              title="Navigation"
              items={[
                { href: "/", label: "Home" },
                { href: "/work", label: "Work" },
                { href: "/#features", label: "Features" },
                { href: "/#showcase", label: "Showcase" },
                { href: "/#process", label: "Process" },
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
                <FooterLink href={contactEmailHref} icon={Mail} label={env.NEXT_PUBLIC_CONTACT_EMAIL} />
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
