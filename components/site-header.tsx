"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { Building2, ChevronDown, Globe, HelpCircle, Info, Menu, Palette, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DanverseHeaderLogo } from "@/components/danverse-logo"
import { HoverLift } from "@/components/hover-lift"
import { createWhatsAppUrl } from "@/lib/env"

const SERVICES = [
  {
    href: "/cinematic-ads",
    label: "Performance Films",
    icon: Building2,
    description: "Paid-social and launch visuals built to stop scroll without losing premium weight.",
  },
  {
    href: "/branding",
    label: "Brand Systems",
    icon: Palette,
    description: "Identity direction, asset systems, and visual language that stay sharp across every touchpoint.",
  },
  {
    href: "/websites",
    label: "Launch Pages",
    icon: Globe,
    description: "Conversion-focused experiences with cleaner messaging, motion, and brand discipline.",
  },
] as const

const LINKS = [
  { href: "/work", label: "Work", icon: Globe },
  { href: "#process", label: "Process", icon: Workflow },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/About", label: "About", icon: Info },
] as const

export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()
  const desktopMenuRef = useRef<HTMLDivElement | null>(null)
  const isServiceRoute = SERVICES.some((service) => service.href === pathname)

  useEffect(() => {
    setServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!servicesOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false)
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!(event.target instanceof Node)) return
      if (!desktopMenuRef.current?.contains(event.target)) {
        setServicesOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("touchstart", handlePointerDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("touchstart", handlePointerDown)
    }
  }, [servicesOpen])

  return (
    <header
      className="sticky top-0 w-full section-shell pb-3 pt-3 sm:py-4"
      style={{ zIndex: "var(--z-nav)", paddingTop: "calc(env(safe-area-inset-top, 0px) + 0.75rem)" }}
    >
      <div className="content-shell">
        <div className="liquid-glass-header relative flex h-14 items-center justify-between rounded-full px-4 sm:h-16 sm:px-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 rounded-l-full bg-[radial-gradient(circle_at_left,rgba(106,129,255,0.12),transparent_70%)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 rounded-r-full bg-[radial-gradient(circle_at_right,rgba(198,235,104,0.08),transparent_70%)]" />

          <Link
            href="/"
            className="relative flex h-10 items-center justify-center px-1 sm:h-11 sm:px-2"
            aria-label="Go to DANVERSE homepage"
          >
            <DanverseHeaderLogo className="scale-[0.9] sm:scale-[0.94]" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-white/90 md:flex lg:gap-8">
            <div ref={desktopMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setServicesOpen((current) => !current)}
                aria-expanded={servicesOpen}
                aria-controls="services-panel"
                className="nav-link inline-flex items-center gap-2 bg-transparent px-0 text-white"
                data-active={servicesOpen || isServiceRoute}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {servicesOpen ? (
                  <motion.div
                    id="services-panel"
                    initial={{ opacity: 0, y: -10, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.985 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-[calc(100%+1rem)] z-[140] w-[min(34rem,calc(100vw-3rem))] -translate-x-1/2"
                  >
                    <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(160deg,rgba(9,12,17,0.98),rgba(14,19,28,0.96),rgba(20,14,20,0.94))] p-2 shadow-[0_28px_80px_rgba(0,0,0,0.42),0_0_30px_rgba(106,129,255,0.08)] backdrop-blur-2xl">
                      <div className="grid gap-2">
                        {SERVICES.map((service, index) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 rounded-[1.2rem] border border-white/0 bg-white/[0.015] px-4 py-3 transition-all duration-200 hover:border-white/8 hover:bg-white/[0.04]"
                          >
                            <span className="flex h-10 w-10 items-center justify-center rounded-[1rem] border border-white/8 bg-white/[0.035] text-[var(--color-electric-blue-strong)] transition-transform duration-200 group-hover:scale-[1.03] group-hover:-rotate-3">
                              <service.icon className="h-4.5 w-4.5" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold tracking-[-0.02em] text-white group-hover:text-[var(--color-acid-lime)]">
                                {service.label}
                              </span>
                              <span className="mt-1 block text-[0.78rem] leading-6 text-white/60">{service.description}</span>
                            </span>
                            <span className="pt-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/24">
                              0{index + 1}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {LINKS.map((link) => (
              <HoverLift key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link transition-colors hover:text-white"
                  data-active={isActive(pathname, link.href)}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </HoverLift>
            ))}
          </nav>

          <div className="hidden flex-shrink-0 md:block">
            <HoverLift>
              <Button
                asChild
                size="sm"
                className="cta-primary rounded-full px-5 font-semibold tracking-[-0.02em] text-white"
              >
                <Link href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--color-acid-lime)] shadow-[0_0_14px_rgba(217,255,38,0.42)]" />
                  Chat With Us
                </Link>
              </Button>
            </HoverLift>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-white hover:bg-white/10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex h-full w-[min(20rem,100vw)] max-w-full flex-col border-white/10 bg-[linear-gradient(180deg,rgba(10,13,18,0.98),rgba(18,22,32,0.96),rgba(27,17,26,0.94))] p-0 backdrop-blur-xl"
              >
                <div className="border-b border-white/10 px-4 py-5">
                  <DanverseHeaderLogo className="scale-[0.92] origin-left" />
                </div>
                <nav aria-label="Mobile" className="flex flex-1 flex-col overflow-y-auto py-2 pb-6">
                  <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between px-5 py-3 text-white/90 transition-colors hover:bg-white/5 hover:text-white">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-4 w-4 text-[var(--color-electric-blue-strong)]" />
                        <span className="text-sm font-medium">Services</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-[var(--color-accent-blue-strong)] transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="mx-4 grid gap-2 rounded-[1.15rem] border border-white/10 bg-white/[0.035] p-2">
                        {SERVICES.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="rounded-[0.95rem] px-4 py-3 text-white/78 transition-colors hover:bg-white/[0.05] hover:text-white"
                          >
                            <span className="flex items-center gap-3">
                              <service.icon className="h-4 w-4 text-[var(--color-electric-blue-strong)]" />
                              <span className="text-sm font-medium">{service.label}</span>
                            </span>
                            <span className="mt-1.5 block pl-7 text-[0.76rem] leading-6 text-white/52">{service.description}</span>
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-5 py-3 text-white/90 transition-colors hover:bg-white/[0.04] hover:text-[var(--color-acid-lime)]"
                    >
                      <link.icon className="h-4 w-4 opacity-75" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  ))}
                </nav>

                <div
                  className="mt-auto border-t border-white/10 p-4"
                  style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
                >
                  <Button asChild className="cta-primary w-full rounded-full font-medium text-white">
                    <Link href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                      Chat With Us
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

function isActive(pathname: string, href: string) {
  if (href === "#process") {
    return pathname === "/"
  }

  return pathname === href
}
