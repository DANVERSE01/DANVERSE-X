"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Building2,
  ChevronDown,
  Clapperboard,
  Globe,
  HelpCircle,
  Info,
  Menu,
  Palette,
  Workflow,
} from "lucide-react"
import { createWhatsAppUrl } from "@/lib/env"
import { DanverseHeaderLogo } from "@/components/danverse-logo"

const services = [
  {
    href: "/cinematic-ads",
    label: "Cinematic Ads & UGC",
    icon: Building2,
    description: "Thumb-stopping vertical campaigns, launch edits, and premium paid-social systems.",
  },
  {
    href: "/branding",
    label: "Branding & Visual Identity",
    icon: Palette,
    description: "Logos, visual systems, and motion-first identity design for ambitious brands.",
  },
  {
    href: "/websites",
    label: "Websites & Landing Pages",
    icon: Globe,
    description: "High-conversion web experiences with cinematic motion and clean performance budgets.",
  },
] as const

const links = [
  { href: "#work", label: "Work", icon: Clapperboard },
  { href: "#process", label: "Process", icon: Workflow },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/About", label: "About", icon: Info },
] as const

export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("#work")

  useEffect(() => {
    const ids = ["work", "process", "contact"]
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0]

        if (!activeEntry?.target.id) {
          return
        }

        setActiveSection(`#${activeEntry.target.id}`)
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-4 sm:px-6">
        <div className="liquid-glass-header flex h-16 items-center justify-between rounded-full px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3" data-hover>
            <DanverseHeaderLogo className="h-8 w-auto opacity-95 sm:h-9" />
          </Link>

          <nav className="hidden items-center gap-3 text-sm text-[var(--platinum-muted)] md:flex">
            <div className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-[var(--platinum)]"
                data-hover
              >
                Services
                <ChevronDown className="h-4 w-4 text-[var(--gold-primary)] transition-transform group-hover:rotate-180" />
              </button>

              <div className="pointer-events-none absolute left-1/2 top-full z-30 mt-4 w-[340px] -translate-x-1/2 rounded-[24px] border border-white/10 bg-[rgba(12,12,16,0.96)] p-3 opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                <div className="space-y-2">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="flex items-start gap-3 rounded-[18px] border border-transparent px-4 py-3 transition-all hover:border-[rgba(201,168,76,0.18)] hover:bg-[rgba(201,168,76,0.06)]"
                      data-hover
                    >
                      <service.icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold-primary)]" />
                      <div>
                        <div className="text-sm font-semibold text-[var(--platinum)]">{service.label}</div>
                        <p className="mt-1 text-xs leading-5 text-[var(--platinum-muted)]">{service.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {links.map((link) => {
              const isActive = link.href.startsWith("#") && activeSection === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[var(--gold-primary)]"
                      : "text-[var(--platinum-muted)] hover:text-[var(--platinum)]"
                  }`}
                  data-hover
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:block">
            <Button asChild className="btn-primary h-auto px-6 py-3 text-[0.74rem]">
              <Link href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                Start Your Project
              </Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-white/10 bg-white/5 text-[var(--platinum)] hover:bg-[var(--gold-glow)] hover:text-[var(--gold-primary)]"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="border-l border-[rgba(201,168,76,0.14)] bg-[rgba(5,5,7,0.96)] p-0 text-[var(--platinum)] backdrop-blur-2xl"
              >
                <div className="border-b border-white/10 px-6 py-5">
                  <DanverseHeaderLogo className="h-8 w-auto opacity-95" />
                </div>

                <nav className="flex flex-col gap-1 px-4 py-5">
                  <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-[18px] px-4 py-3 text-left text-sm font-semibold text-[var(--platinum)] transition-colors hover:bg-white/5 hover:text-[var(--gold-primary)]">
                      <span className="inline-flex items-center gap-3">
                        <Building2 className="h-4 w-4 text-[var(--gold-primary)]" />
                        Services
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-[var(--gold-primary)] transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-4 border-l border-[rgba(201,168,76,0.18)] pl-3">
                      {services.map((service) => (
                        <SheetClose asChild key={service.href}>
                          <Link
                            href={service.href}
                            className="flex items-center gap-3 rounded-[14px] px-4 py-3 text-sm text-[var(--platinum-muted)] transition-colors hover:bg-white/5 hover:text-[var(--platinum)]"
                          >
                            <service.icon className="h-4 w-4 text-[var(--gold-primary)]" />
                            {service.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  {links.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-3 rounded-[18px] px-4 py-3 text-sm font-medium text-[var(--platinum)] transition-colors hover:bg-white/5 hover:text-[var(--gold-primary)]"
                      >
                        <link.icon className="h-4 w-4 text-[var(--gold-primary)]" />
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto border-t border-white/10 p-4">
                  <SheetClose asChild>
                    <Button asChild className="btn-primary h-auto w-full py-3 text-[0.74rem]">
                      <Link href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                        Chat With Us
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
