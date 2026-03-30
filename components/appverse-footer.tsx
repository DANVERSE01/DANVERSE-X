"use client"

import Link from "next/link"
import { ArrowUpRight, Instagram, Mail, MessageCircle } from "lucide-react"
import { contactEmailHref, createWhatsAppUrl } from "@/lib/env"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"
import { DanverseHeaderLogo, DanverseWordmark } from "@/components/danverse-logo"
import LazyVideo from "./lazy-video"

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/About" },
] as const

export function AppverseFooter() {
  return (
    <section id="contact" className="section-shell pb-10" data-analytics-section="Contact">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-4 sm:px-6">
        <article className="panel-surface reveal-on-scroll grid gap-8 rounded-[32px] p-6 sm:p-8 lg:grid-cols-[1.2fr_360px]" data-reveal>
          <div className="max-w-3xl">
            <span className="section-tag">Contact</span>
            <h2 className="mt-7 text-balance text-[clamp(2.4rem,5vw,4.4rem)] font-black leading-[0.96]">
              Ready to build the launch asset your brand deserves?
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-sm leading-8 text-[var(--platinum-muted)] sm:text-base">
              Bring the brief, the product, or the idea. We will shape the direction, lock the process, and deliver a
              cinematic system that is ready to ship across the formats that matter.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button type="button" onClick={() => fireCTAAndOpenWhatsApp("footer-cta")} className="btn-primary" data-hover>
                Book a Call
              </button>
              <a href={contactEmailHref} className="btn-secondary" data-hover>
                Email DANVERSE
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Campaign films", "Brand systems", "Launch pages", "AI content systems"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--platinum-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[320px]">
            <div className="rounded-[28px] border border-[rgba(201,168,76,0.16)] bg-[rgba(5,5,7,0.78)] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] bg-[var(--bg-void)]">
                <LazyVideo
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Timeline%202-YFaCK7cEiHWSMRv8XEHaLCoYj2SUAi.mp4"
                  poster="/images/hero-posters/default-card.webp"
                  autoplay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                  aria-label="DANVERSE automation preview"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,7,0.92)_0%,transparent_62%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[var(--gold-primary)]">
                    AI Content Systems
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-[var(--platinum)]">Automation</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--platinum-muted)]">
                    From scripts to campaign outputs, all routed through one premium operating system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <footer className="reveal-on-scroll border-t border-[var(--bg-border)] pt-8" data-reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-md">
              <DanverseHeaderLogo className="h-9 w-auto opacity-95" />
              <div className="mt-5">
                <DanverseWordmark size="md" className="text-xl" />
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--platinum-muted)]">
                DANVERSE is an AI-powered creative studio building cinematic ads, premium brand worlds, and launch-ready
                content systems for ambitious teams.
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-3">
              <div>
                <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[var(--gold-primary)]">
                  Navigation
                </h4>
                <ul className="mt-4 space-y-3 text-sm text-[var(--platinum-muted)]">
                  {footerLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="transition-colors hover:text-[var(--platinum)]" data-hover>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[var(--gold-primary)]">Connect</h4>
                <ul className="mt-4 space-y-3 text-sm text-[var(--platinum-muted)]">
                  <li>
                    <a
                      href="https://www.instagram.com/muhammedd_adel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 transition-colors hover:text-[var(--platinum)]"
                      data-hover
                    >
                      <Instagram className="h-4 w-4 text-[var(--gold-primary)]" />
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href={contactEmailHref} className="inline-flex items-center gap-2 transition-colors hover:text-[var(--platinum)]" data-hover>
                      <Mail className="h-4 w-4 text-[var(--gold-primary)]" />
                      Email
                    </a>
                  </li>
                  <li>
                    <a
                      href={createWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 transition-colors hover:text-[var(--platinum)]"
                      data-hover
                    >
                      <MessageCircle className="h-4 w-4 text-[var(--gold-primary)]" />
                      WhatsApp
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[var(--gold-primary)]">
                  Start Here
                </h4>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => fireCTAAndOpenWhatsApp("footer-slide-cta")}
                    className="group relative inline-flex overflow-hidden rounded-full border border-[var(--gold-primary)] px-6 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[var(--gold-primary)] transition-colors duration-300 hover:text-[var(--bg-void)]"
                    data-hover
                  >
                    <span className="absolute inset-0 -translate-x-[101%] bg-[var(--gold-primary)] transition-transform duration-500 [transition-timing-function:var(--ease-cinematic)] group-hover:translate-x-0" />
                    <span className="relative inline-flex items-center gap-2">
                      Start Your Project
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-[var(--bg-border)] pt-6 text-xs uppercase tracking-[0.18em] text-[var(--platinum-faint)] sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright 2026 DANVERSE</p>
            <div className="flex flex-wrap gap-5">
              <Link href="/revisions" className="transition-colors hover:text-[var(--platinum-muted)]" data-hover>
                Revision Policy
              </Link>
              <Link href="/t&c" className="transition-colors hover:text-[var(--platinum-muted)]" data-hover>
                Terms & Conditions
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
