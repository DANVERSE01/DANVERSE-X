"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram, Mail, MessageCircle, type LucideIcon } from "lucide-react"
import { DanverseHeaderLogo } from "@/components/danverse-logo"
import { useGsapEnter } from "@/hooks/use-gsap-enter"
import { contactEmailHref, publicEnv } from "@/lib/public-env"
import { FOOTER_NAV_ROUTES, resolveRouteHref } from "@/lib/routes"

const TAGLINE =
  "Director-led studio for cinematic ads, identity systems, and launch pages that need a clear decision and a clean handoff."

export function AppverseFooter() {
  const pathname = usePathname()
  const footerRef = useGsapEnter<HTMLElement>({
    preset: "fade-up",
    stagger: 0.1,
    childSelector: "[data-gsap-item]",
    start: "top 92%",
  })

  return (
    <section
      id="contact"
      aria-label="Footer and contact"
      className="section-shell relative overflow-hidden bg-[var(--color-surface)] py-[var(--section-block)] text-white"
    >
      <div className="content-shell">
        <footer ref={footerRef} className="mx-auto max-w-[1240px] border-t border-white/10 pt-10 sm:pt-12">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
            <div data-gsap-item className="space-y-5">
              <div className="inline-flex">
                <DanverseHeaderLogo className="origin-left scale-[0.92]" />
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
              <h4 className="section-label mb-3 text-xs text-white/34">Connect</h4>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <FooterLink
                  href="https://www.instagram.com/muhammedd_adel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  icon={Instagram}
                  label="Instagram"
                  external
                />
                <FooterLink href={contactEmailHref} icon={Mail} label={publicEnv.NEXT_PUBLIC_CONTACT_EMAIL} />
                <FooterLink
                  href={`https://wa.me/${publicEnv.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                  icon={MessageCircle}
                  label="WhatsApp"
                  external
                />
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[var(--color-text-muted)] sm:flex-row">
            <p>(c) 2026 DANVERSE. All rights reserved.</p>
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

function FooterGroup({
  items,
  title,
  ...rest
}: {
  items: Array<{ href: string; label: string }>
  title: string
  [key: string]: unknown
}) {
  return (
    <div {...rest}>
      <h4 className="section-label mb-3 text-xs text-white/34">{title}</h4>
      <ul className="space-y-2.5 text-sm text-[var(--color-text-muted)]">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="accent-link inline-flex items-center gap-2 text-white/72 transition-colors hover:text-white"
            >
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
