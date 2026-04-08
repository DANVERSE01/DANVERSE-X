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
import { PRIMARY_NAV_ROUTES, isRouteActive, resolveRouteHref } from "@/lib/routes"
import { GENERAL_BRIEF_CTA } from "@/lib/site-ctas"

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

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.985,
    transition: { duration: 0.15, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
  },
}

const dropdownItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
  },
}

const mobileItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 + index * 0.05,
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) return []
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true")
}

export function SiteHeader() {
  const pathname = usePathname()
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const desktopMenuRef = useRef<HTMLDivElement | null>(null)
  const mobilePanelRef = useRef<HTMLDivElement | null>(null)
  const mobileTriggerRef = useRef<HTMLButtonElement | null>(null)
  const mobileCloseRef = useRef<HTMLButtonElement | null>(null)

  const isServiceRoute = SERVICES.some((service) => service.href === pathname)
  const mobileRoutes = useMemo(
    () => [...PRIMARY_NAV_ROUTES].sort((a, b) => (a.mobilePriority ?? 99) - (b.mobilePriority ?? 99)),
    []
  )

  useEffect(() => {
    setServicesOpen(false)
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (!(event.target instanceof Node)) return
      if (servicesOpen && !desktopMenuRef.current?.contains(event.target)) {
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

  useEffect(() => {
    if (!mobileMenuOpen) return

    const panel = mobilePanelRef.current
    const trigger = mobileTriggerRef.current
    const prevHtmlOverflow = document.documentElement.style.overflow
    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlTouchAction = document.documentElement.style.touchAction
    const prevBodyTouchAction = document.body.style.touchAction

    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    document.documentElement.style.touchAction = "none"
    document.body.style.touchAction = "none"

    const focusTarget = mobileCloseRef.current ?? getFocusableElements(panel)[0]
    window.requestAnimationFrame(() => focusTarget?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setMobileMenuOpen(false)
        return
      }

      if (event.key !== "Tab") return
      const focusableElements = getFocusableElements(panel)
      if (!focusableElements.length) {
        event.preventDefault()
        return
      }

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.touchAction = prevHtmlTouchAction
      document.body.style.touchAction = prevBodyTouchAction
      trigger?.focus()
    }
  }, [mobileMenuOpen])

  return (
    <header
      className="sticky top-0 z-[var(--z-nav)] w-full section-shell pb-3 pt-3 sm:py-4"
      style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 0.75rem)" }}
    >
      <div className="content-shell">
        <div
          className="liquid-glass-header relative flex h-14 items-center justify-between rounded-full px-4 sm:h-16 sm:px-5"
          style={{
            backdropFilter: scrolled ? "blur(18px) saturate(120%)" : "blur(10px) saturate(115%)",
            background: scrolled
              ? "linear-gradient(180deg, rgba(32,32,38,0.88), rgba(21,21,24,0.8))"
              : "linear-gradient(180deg, rgba(32,32,38,0.8), rgba(21,21,24,0.72))",
            borderColor: scrolled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)",
            boxShadow: scrolled ? "0 16px 40px rgba(0,0,0,0.26)" : "0 12px 28px rgba(0,0,0,0.18)",
            transition:
              "backdrop-filter 400ms ease, border-color 400ms ease, box-shadow 400ms ease, background 400ms ease",
          }}
        >
          <Link
            href="/"
            className="relative flex h-10 items-center justify-center px-1 sm:h-11 sm:px-2"
            aria-label="Go to DANVERSE homepage"
          >
            <DanverseHeaderLogo className="scale-[0.9] sm:scale-[0.94]" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-6 text-sm md:flex lg:gap-8">
            <div ref={desktopMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setServicesOpen((value) => !value)}
                aria-expanded={servicesOpen}
                aria-controls="services-panel"
                className="nav-link inline-flex items-center gap-2 bg-transparent px-0"
                data-active={servicesOpen || isServiceRoute}
              >
                Services
                <motion.span
                  animate={{ rotate: servicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  style={{ display: "flex" }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>

              <AnimatePresence>
                {servicesOpen ? (
                  <motion.div
                    id="services-panel"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-1/2 top-[calc(100%+1rem)] z-[140] w-[min(34rem,calc(100vw-3rem))] -translate-x-1/2"
                  >
                    <div className="overflow-hidden rounded-[1.3rem] border border-white/10 bg-[var(--color-surface)] p-2 shadow-[0_24px_64px_rgba(0,0,0,0.34)]">
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
                              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 rounded-[1rem] border border-white/0 bg-white/[0.02] px-4 py-3 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.05]"
                            >
                              <span className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] border border-white/10 bg-white/[0.03] text-[var(--color-electric-blue)]">
                                <service.icon className="h-4 w-4" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold tracking-[-0.02em] text-white transition-colors duration-200 group-hover:text-[var(--color-electric-blue)]">
                                  {service.label}
                                </span>
                                <span className="mt-1 block text-[0.78rem] leading-6 text-white/58">
                                  {service.description}
                                </span>
                              </span>
                              <span className="pt-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/22">
                                0{index + 1}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {PRIMARY_NAV_ROUTES.map((route) => (
              <HoverLift key={route.href}>
                <Link
                  href={resolveRouteHref(route, pathname)}
                  className="nav-link"
                  data-active={isRouteActive(pathname, route)}
                  aria-current={isRouteActive(pathname, route) && route.kind === "route" ? "page" : undefined}
                >
                  {route.label}
                </Link>
              </HoverLift>
            ))}
          </nav>

          <div className="hidden flex-shrink-0 md:block">
            <HoverLift>
              <Button asChild size="sm" className="px-5">
                <a href={resolveCtaHref(GENERAL_BRIEF_CTA)} target="_blank" rel="noopener noreferrer">
                  Start the brief
                </a>
              </Button>
            </HoverLift>
          </div>

          <div className="md:hidden">
            <Button
              ref={mobileTriggerRef}
              type="button"
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-white hover:bg-white/8"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-panel"
              onClick={() => setMobileMenuOpen((value) => !value)}
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

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            className="fixed inset-0 md:hidden"
            style={{ zIndex: 10020 }}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div aria-hidden="true" className="absolute inset-0 bg-[rgba(11,11,13,0.96)] backdrop-blur-md" />

            <div
              ref={mobilePanelRef}
              id="mobile-navigation-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              tabIndex={-1}
              className="absolute inset-0 flex h-full flex-col overflow-y-auto bg-[rgba(11,11,13,0.98)] px-5 pb-6 pt-5"
              style={{
                paddingTop: "calc(env(safe-area-inset-top, 0px) + 1rem)",
                paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)",
              }}
            >
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
                <nav aria-label="Mobile primary" className="grid gap-3">
                  <p className="section-label text-white/34">Navigation</p>
                  {mobileRoutes.map((route, index) => {
                    const Icon = ROUTE_ICONS[route.href]
                    const active = isRouteActive(pathname, route)
                    return (
                      <motion.div
                        key={route.href}
                        custom={index}
                        variants={mobileItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          href={resolveRouteHref(route, pathname)}
                          className="group flex rounded-[1.15rem] border border-white/10 bg-white/[0.02] px-4 py-4 transition-all duration-200 hover:border-white/16 hover:bg-white/[0.05]"
                          data-active={active}
                          aria-current={active && route.kind === "route" ? "page" : undefined}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="flex w-full items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              {Icon ? (
                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[var(--color-electric-blue)]">
                                  <Icon className="h-4 w-4" />
                                </span>
                              ) : null}
                              <div>
                                <p className="text-[1.02rem] font-semibold tracking-[-0.03em] text-white">
                                  {route.label}
                                </p>
                                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/30">0{index + 1}</p>
                              </div>
                            </div>
                            <span className="text-sm text-white/32 transition-colors group-hover:text-white/58">
                              Open
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </nav>

                <section className="grid gap-3">
                  <p className="section-label text-white/34">Services</p>
                  {SERVICES.map((service, index) => (
                    <motion.div
                      key={service.href}
                      custom={mobileRoutes.length + index}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={service.href}
                        className="flex rounded-[1.15rem] border border-white/10 bg-white/[0.02] px-4 py-4 transition-all duration-200 hover:border-white/16 hover:bg-white/[0.05]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[var(--color-electric-blue)]">
                            <service.icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-[1rem] font-semibold tracking-[-0.03em] text-white">{service.label}</p>
                            <p className="mt-1 text-sm leading-6 text-white/58">{service.description}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </section>

                <section className="grid gap-3">
                  <p className="section-label text-white/34">Next step</p>
                  <motion.div
                    custom={mobileRoutes.length + SERVICES.length}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <a
                      href={resolveCtaHref(GENERAL_BRIEF_CTA)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-[1.25rem] border border-[rgba(201,255,57,0.22)] bg-[rgba(201,255,57,0.08)] px-4 py-5 transition-transform duration-200 hover:-translate-y-0.5"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <p className="text-[1rem] font-semibold tracking-[-0.03em] text-white">
                        {GENERAL_BRIEF_CTA.label}
                      </p>
                      <p className="mt-2 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-electric-blue)]">
                        {GENERAL_BRIEF_CTA.durationLabel}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/64">{GENERAL_BRIEF_CTA.whatHappensText}</p>
                    </a>
                  </motion.div>
                </section>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
