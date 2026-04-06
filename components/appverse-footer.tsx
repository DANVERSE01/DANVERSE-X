"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram, Mail, MessageCircle, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DanverseHeaderLogo } from "@/components/danverse-logo"
import { HoverLift } from "@/components/hover-lift"
import { TextReveal } from "@/components/text-reveal"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useGsapEnter } from "@/hooks/use-gsap-enter"
import { resolveCtaHref } from "@/lib/cta"
import { contactEmailHref, publicEnv } from "@/lib/public-env"
import { FOOTER_NAV_ROUTES, resolveRouteHref } from "@/lib/routes"
import { GENERAL_BRIEF_CTA, GENERAL_DISCOVERY_CTA } from "@/lib/site-ctas"

const TAGLINE =
  "Director-led studio for cinematic ads, identity systems, and launch pages that need a clear decision and a clean handoff."

const CLOSE_PROOFS = ["Response within 24-48h", "Director-led review", "Production-ready handoff"] as const

export function AppverseFooter() {
  const pathname = usePathname()
  const revealRef = useScrollReveal<HTMLDivElement>()
  const ctaPanelRef = useGsapEnter<HTMLDivElement>({ preset: "scale-in", start: "top 88%" })
  const footerRef = useGsapEnter<HTMLElement>({ preset: "blur-rise", stagger: 0.12, childSelector: "[data-gsap-item]", start: "top 90%" })

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
          ref={ctaPanelRef}
          className="statement-panel mx-auto max-w-[1120px] rounded-[2rem] px-5 py-8 text-center sm:px-8 sm:py-10 lg:px-12 lg:py-12"
        >
          <div className="relative z-10 mx-auto max-w-[52rem]">
            <p className="section-label">Next Step</p>
            <TextReveal
              as="h2"
              type="chars"
              preset="clip-up"
              stagger={0.02}
              className="section-heading mt-4 text-white sm:mx-auto"
            >
              Send the brief. Get the next move back.
            </TextReveal>
            <p className="body-copy mx-auto mt-4 max-w-[42ch] text-[1rem] leading-7 text-white/72 sm:text-[1.05rem]">
              WhatsApp opens with four prompts: offer, audience, bottleneck, and deadline. It takes under three
              minutes, and the first reply comes back with the strongest recommendation and the right scope.
            </p>

            <div className="mt-7 flex flex-col items-center gap-4">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <HoverLift>
                  <Button asChild className="cta-primary rounded-full px-8 py-3 font-semibold tracking-[-0.02em] text-white">
                    <a href={resolveCtaHref(GENERAL_BRIEF_CTA)} target="_blank" rel="noopener noreferrer">
                      {GENERAL_BRIEF_CTA.label}
                    </a>
                  </Button>
                </HoverLift>
                <HoverLift>
                  <Button asChild variant="outline" className="cta-secondary rounded-full px-8 py-3 font-semibold text-white">
                    <a href={resolveCtaHref(GENERAL_DISCOVERY_CTA)} target="_blank" rel="noopener noreferrer">
                      {GENERAL_DISCOVERY_CTA.label}
                    </a>
                  </Button>
                </HoverLift>
              </div>

              <div className="grid gap-3 text-left sm:grid-cols-2">
                <CtaMeta duration={GENERAL_BRIEF_CTA.durationLabel} text={GENERAL_BRIEF_CTA.whatHappensText} />
                <CtaMeta duration={GENERAL_DISCOVERY_CTA.durationLabel} text={GENERAL_DISCOVERY_CTA.whatHappensText} />
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

        <footer ref={footerRef} className="mx-auto mt-12 max-w-[1120px] border-t border-white/10 pt-10 sm:mt-14 sm:pt-12">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div data-gsap-item className="space-y-5">
              <div className="inline-flex">
                <DanverseHeaderLogo className="origin-left scale-[0.95]" />
              </div>
              <p className="body-copy max-w-sm text-sm leading-7">{TAGLINE}</p>
            </div>

            <FooterGroup
              data-gsap-item
              title="Navigation"
              items={FOOTER_NAV_ROUTES.map((route) => ({
                href: resolveRouteHref(route, pathname),
                label: route.label,
              }))}
            />

            <div data-gsap-item>
              <h4 className="section-label mb-3 text-xs">Connect</h4>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <FooterLink
                  href="https://www.instagram.com/muhammedd_adel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  icon={Instagram}
                  label="Instagram"
                  external
                />
                <FooterLink href={contactEmailHref} icon={Mail} label={publicEnv.NEXT_PUBLIC_CONTACT_EMAIL} />
                <FooterLink href={`https://wa.me/${publicEnv.NEXT_PUBLIC_WHATSAPP_NUMBER}`} icon={MessageCircle} label="WhatsApp" external />
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[var(--color-text-muted)] sm:flex-row">
            <p>© 2026 DANVERSE. All rights reserved.</p>
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

function CtaMeta({ duration, text }: { duration: string; text: string }) {
  return (
    <div className="max-w-[26rem] rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4">
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-acid-lime)]">{duration}</p>
      <p className="mt-2 text-sm leading-6 text-white/68">{text}</p>
    </div>
  )
}

function FooterGroup({ items, title, ...rest }: { items: Array<{ href: string; label: string }>; title: string; [key: string]: unknown }) {
  return (
    <div {...rest}>
      <h4 className="section-label mb-3 text-xs">{title}</h4>
      <ul className="space-y-2.5 text-sm text-[var(--color-text-muted)]">
        {items.map((item) => (
          <li key={item.href}>
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
