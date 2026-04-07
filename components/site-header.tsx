"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import {
  ChevronDown,
  Clapperboard,
  Globe,
  HelpCircle,
  Info,
  Menu,
  Palette,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DanverseHeaderLogo } from "@/components/danverse-logo"
import { HoverLift } from "@/components/hover-lift"
import { resolveCtaHref } from "@/lib/cta"
import { GENERAL_BRIEF_CTA, GENERAL_DISCOVERY_CTA } from "@/lib/site-ctas"
import { PRIMARY_NAV_ROUTES, isRouteActive, resolveRouteHref } from "@/lib/routes"

const SERVICES = [
  {
    href: "/cinematic-ads",
    label: "Cinematic Ads",
    icon: Clapperboard,
    description: "Opening-frame direction, paid-social hook logic, and rollout packs built for response.",
  },
  {
    href: "/branding",
    label: "Brand Systems",
    icon: Palette,
    description: "Identity systems that lock trust, consistency, and rollout control before launch pressure hits.",
  },
  {
    href: "/websites",
    label: "Launch Websites",
    icon: Globe,
    description: "Conversion architecture that tells the buyer what to trust, when to act, and why to move now.",
  },
] as const

const ROUTE_ICONS: Record<string, LucideIcon> = {
  "/about": Info,
  "/faq": HelpCircle,
  "/work": Globe,
  "#process": Workflow,
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) return []
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true")
}

// Framer Motion variants
const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
  exit: {
    opacity: 0, y: -6, scale: 0.97, filter: "blur(3px)",
    transition: { duration: 0.15, ease: [0.4, 0, 1, 1] as [number,number,number,number] },
  },
}

const dropdownItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.055, duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
}

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -16, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
  exit: {
    opacity: 0, y: -10, filter: "blur(6px)",
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] as [number,number,number,number] },
  },
}

const mobileItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.06 + i * 0.06, duration: 0.36, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
}

export function SiteHeader() {
  const pathname     = usePathname()
  const [servicesOpen, setServicesOpen]   = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled]           = useState(false)
  const desktopMenuRef  = useRef<HTMLDivElement | null>(null)
  const mobilePanelRef  = useRef<HTMLDivElement | null>(null)
  const mobileTriggerRef = useRef<HTMLButtonElement | null>(null)
  const mobileCloseRef  = useRef<HTMLButtonElement | null>(null)

  const isServiceRoute = SERVICES.some((s) => s.href === pathname)
  const mobileRoutes   = useMemo(
    () => [...PRIMARY_NAV_ROUTES].sort((a, b) => (a.mobilePriority ?? 99) - (b.mobilePriority ?? 99)),
    []
  )

  // Close on route change
  useEffect(() => {
    setServicesOpen(false)
    setMobileMenuOpen(false)
  }, [pathname])

  // Scroll-blur: tracks whether user has scrolled past 24px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!(e.target instanceof Node)) return
      if (servicesOpen && !desktopMenuRef.current?.contains(e.target)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [servicesOpen])

  // Mobile menu: scroll lock + focus trap
  useEffect(() => {
    if (!mobileMenuOpen) return
    const panel = mobilePanelRef.current
    const trigger = mobileTriggerRef.current
    const prevHtmlOv = document.documentElement.style.overflow
    const prevBodyOv = document.body.style.overflow
    const prevHtmlTA = document.documentElement.style.touchAction
    const prevBodyTA = document.body.style.touchAction

    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    document.documentElement.style.touchAction = "none"
    document.body.style.touchAction = "none"

    const focus = mobileCloseRef.current ?? getFocusableElements(panel)[0]
    window.requestAnimationFrame(() => focus?.focus())

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); setMobileMenuOpen(false); return }
      if (e.key !== "Tab") return
      const els = getFocusableElements(panel)
      if (!els.length) { e.preventDefault(); return }
      const first = els[0], last = els[els.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.documentElement.style.overflow = prevHtmlOv
      document.body.style.overflow = prevBodyOv
      document.documentElement.style.touchAction = prevHtmlTA
      document.body.style.touchAction = prevBodyTA
      trigger?.focus()
    }
  }, [mobileMenuOpen])

  return (
    <header
      className="sticky top-0 w-full section-shell pb-3 pt-3 sm:py-4"
      style={{
        zIndex: mobileMenuOpen ? 10010 : "var(--z-nav)",
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 0.75rem)",
      }}
    >
      <div className="content-shell">
        <div
          className="liquid-glass-header relative flex h-14 items-center justify-between rounded-full px-4 sm:h-16 sm:px-5"
          style={{
            // Scroll-blur: progressively deepen backdrop and border on scroll
            backdropFilter: scrolled ? "blur(28px) saturate(160%)" : "blur(12px) saturate(130%)",
            borderColor: scrolled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.36), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 4px 16px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.05)",
            transition: "backdrop-filter 400ms ease, border-color 400ms ease, box-shadow 400ms ease",
          }}
        >
          {/* Ambient glow accents */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 rounded-l-full bg-[radial-gradient(circle_at_left,rgba(224,231,91,0.1),transparent_70%)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 rounded-r-full bg-[radial-gradient(circle_at_right,rgba(0,166,166,0.08),transparent_70%)]" />

          {/* Logo */}
          <Link
            href="/"
            className="relative flex h-10 items-center justify-center px-1 sm:h-11 sm:px-2"
            aria-label="Go to DANVERSE homepage"
          >
            <DanverseHeaderLogo className="scale-[0.9] sm:scale-[0.94]" />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-white/90 md:flex lg:gap-8">
            <div ref={desktopMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
                aria-controls="services-panel"
                className="nav-link inline-flex items-center gap-2 bg-transparent px-0 text-white"
                data-active={servicesOpen || isServiceRoute}
              >
                Services
                <motion.span
                  animate={{ rotate: servicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                  style={{ display: "flex" }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    id="services-panel"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-1/2 top-[calc(100%+1rem)] z-[140] w-[min(34rem,calc(100vw-3rem))] -translate-x-1/2"
                  >
                    <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(160deg,rgba(9,12,17,0.98),rgba(14,19,28,0.96),rgba(20,14,20,0.94))] p-2 shadow-[0_28px_80px_rgba(0,0,0,0.42),0_0_30px_rgba(224,231,91,0.06)] backdrop-blur-2xl">
                      <div className="grid gap-2">
                        {SERVICES.map((service, index) => (
                          <motion.div
                            key={service.href}
                            custom={index}
                            variants={dropdownItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <Link
                              href={service.href}
                              onClick={() => setServicesOpen(false)}
                              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 rounded-[1.2rem] border border-white/0 bg-white/[0.015] px-4 py-3 transition-all duration-200 hover:border-white/8 hover:bg-white/[0.04]"
                            >
                              <span className="flex h-10 w-10 items-center justify-center rounded-[1rem] border border-white/8 bg-white/[0.035] text-[var(--color-electric-blue-strong)] transition-transform duration-200 group-hover:scale-[1.06] group-hover:-rotate-3">
                                <service.icon className="h-4 w-4" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold tracking-[-0.02em] text-white group-hover:text-[var(--color-electric-blue-strong)] transition-colors duration-200">
                                  {service.label}
                                </span>
                                <span className="mt-1 block text-[0.78rem] leading-6 text-white/60">{service.description}</span>
                              </span>
                              <span className="pt-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/24">
                                0{index + 1}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {PRIMARY_NAV_ROUTES.map((route) => (
              <HoverLift key={route.href}>
                <Link
                  href={resolveRouteHref(route, pathname)}
                  className="nav-link transition-colors hover:text-white"
                  data-active={isRouteActive(pathname, route)}
                  aria-current={isRouteActive(pathname, route) && route.kind === "route" ? "page" : undefined}
                >
                  {route.label}
                </Link>
              </HoverLift>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden flex-shrink-0 md:block">
            <HoverLift>
              <Button asChild size="sm" className="cta-primary rounded-full px-5 font-semibold tracking-[-0.02em] text-white">
                <a href={resolveCtaHref(GENERAL_BRIEF_CTA)} target="_blank" rel="noopener noreferrer">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--color-acid-lime)] shadow-[0_0_14px_rgba(239,120,106,0.42)]" />
                  Start the 4-Point Brief
                </a>
              </Button>
            </HoverLift>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Button
              ref={mobileTriggerRef}
              type="button"
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-white hover:bg-white/10"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-panel"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "flex" }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "flex" }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 md:hidden"
            style={{ zIndex: 10020 }}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[rgba(4,6,10,0.96)] backdrop-blur-xl"
            />

            <div
              ref={mobilePanelRef}
              id="mobile-navigation-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              tabIndex={-1}
              className="absolute inset-0 flex h-full flex-col overflow-y-auto bg-[linear-gradient(180deg,rgba(4,6,10,0.985),rgba(8,11,18,0.985)_42%,rgba(14,10,18,0.985)_100%)] px-5 pb-6 pt-5"
              onClick={(e) => { if (e.target === e.currentTarget) setMobileMenuOpen(false) }}
              style={{
                paddingTop: "calc(env(safe-area-inset-top, 0px) + 1rem)",
                paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)",
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(224,231,91,0.1),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(0,166,166,0.08),transparent_26%)]" />

              <div className="relative flex items-center justify-between">
                <DanverseHeaderLogo className="origin-left scale-[0.92]" />
                <Button
                  ref={mobileCloseRef}
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-full border border-white/10 bg-white/[0.03] text-white hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>

              <div className="relative mt-10 grid gap-10">
                {/* Nav links */}
                <nav aria-label="Mobile primary" className="grid gap-3">
                  <p className="section-label text-white/34">Navigation</p>
                  {mobileRoutes.map((route, index) => {
                    const Icon = ROUTE_ICONS[route.href]
                    const active = isRouteActive(pathname, route)
                    return (
                      <motion.div key={route.href} custom={index} variants={mobileItemVariants} initial="hidden" animate="visible">
                        <Link
                          href={resolveRouteHref(route, pathname)}
                          className="group flex rounded-[1.45rem] border border-white/10 bg-white/[0.02] px-4 py-4 transition-all duration-200 hover:border-white/18 hover:bg-white/[0.05]"
                          data-active={active}
                          aria-current={active && route.kind === "route" ? "page" : undefined}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="flex w-full items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              {Icon ? (
                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[var(--color-acid-lime)]">
                                  <Icon className="h-4 w-4" />
                                </span>
                              ) : null}
                              <div>
                                <p className="text-[1.05rem] font-semibold tracking-[-0.03em] text-white">{route.label}</p>
                                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/34">0{index + 1}</p>
                              </div>
                            </div>
                            <span className="text-sm text-white/34 transition-colors group-hover:text-white/62">Open</span>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </nav>

                {/* Services */}
                <section className="grid gap-3">
                  <p className="section-label text-white/34">Services</p>
                  {SERVICES.map((service, index) => (
                    <motion.div key={service.href} custom={mobileRoutes.length + index} variants={mobileItemVariants} initial="hidden" animate="visible">
                      <Link
                        href={service.href}
                        className="flex rounded-[1.45rem] border border-white/10 bg-white/[0.02] px-4 py-4 transition-all duration-200 hover:border-white/18 hover:bg-white/[0.05]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[var(--color-electric-blue-strong)]">
                            <service.icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-[1rem] font-semibold tracking-[-0.03em] text-white">{service.label}</p>
                            <p className="mt-1 text-sm leading-6 text-white/60">{service.description}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </section>

                {/* CTAs */}
                <section className="grid gap-3">
                  <p className="section-label text-white/34">Next Step</p>
                  <motion.div custom={mobileRoutes.length + SERVICES.length} variants={mobileItemVariants} initial="hidden" animate="visible">
                    <a
                      href={resolveCtaHref(GENERAL_BRIEF_CTA)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-[1.55rem] border border-[rgba(224,231,91,0.22)] bg-[linear-gradient(140deg,rgba(224,231,91,0.1),rgba(0,166,166,0.07),rgba(255,255,255,0.02))] px-4 py-5 shadow-[0_18px_48px_rgba(0,0,0,0.32)] transition-transform duration-200 hover:-translate-y-0.5"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <p className="text-[1rem] font-semibold tracking-[-0.03em] text-white">{GENERAL_BRIEF_CTA.label}</p>
                      <p className="mt-2 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-electric-blue-strong)]">
                        {GENERAL_BRIEF_CTA.durationLabel}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/66">{GENERAL_BRIEF_CTA.whatHappensText}</p>
                    </a>
                  </motion.div>

                  <motion.div custom={mobileRoutes.length + SERVICES.length + 1} variants={mobileItemVariants} initial="hidden" animate="visible">
                    <a
                      href={resolveCtaHref(GENERAL_DISCOVERY_CTA)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-[1.55rem] border border-white/10 bg-white/[0.03] px-4 py-5 transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/18"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <p className="text-[1rem] font-semibold tracking-[-0.03em] text-white">{GENERAL_DISCOVERY_CTA.label}</p>
                      <p className="mt-2 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white/44">
                        {GENERAL_DISCOVERY_CTA.durationLabel}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/66">{GENERAL_DISCOVERY_CTA.whatHappensText}</p>
                    </a>
                  </motion.div>
                </section>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
