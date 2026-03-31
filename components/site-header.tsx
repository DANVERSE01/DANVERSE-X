"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Building2, ChevronDown, Globe, HelpCircle, Info, Menu, Palette, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DanverseHeaderLogo } from "@/components/danverse-logo"
import { HoverLift } from "@/components/hover-lift"
import { createWhatsAppUrl } from "@/lib/env"

const SERVICES = [
  {
    href: "/cinematic-ads",
    label: "Performance Films & Social Video",
    icon: Building2,
    description: "Cinematic paid-social, launch films, and creator-native content engineered to stop scroll and move revenue.",
  },
  {
    href: "/branding",
    label: "Brand Systems & Visual Identity",
    icon: Palette,
    description: "Identity architecture, visual direction, and premium brand assets built for consistency across every touchpoint.",
  },
  {
    href: "/websites",
    label: "Conversion Websites & Launch Pages",
    icon: Globe,
    description: "High-conversion digital experiences with sharper positioning, premium motion, and launch-ready UX.",
  },
] as const

const LINKS = [
  { href: "#process", label: "Process", icon: Workflow },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/About", label: "About", icon: Info },
] as const

export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()
  const isServiceRoute = SERVICES.some((service) => service.href === pathname)

  return (
    <header className="sticky top-0 w-full section-shell py-4" style={{ zIndex: "var(--z-nav)" }}>
      <div className="content-shell">
        <div className="liquid-glass-header flex h-16 items-center justify-between rounded-full px-5">
          <Link href="/" className="flex-shrink-0" aria-label="Go to DANVERSE homepage">
            <DanverseHeaderLogo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 text-sm text-white/90 md:flex">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="nav-link bg-transparent px-0 text-white hover:bg-transparent hover:text-white focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-white"
                    data-active={servicesOpen || isServiceRoute}
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[340px] gap-1 rounded-2xl border border-white/10 bg-[rgba(8,11,16,0.96)] p-2 backdrop-blur-xl">
                      {SERVICES.map((service) => (
                        <li key={service.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={service.href}
                              className="group flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-white/5"
                            >
                              <service.icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-hot-pink)]" />
                              <div>
                                <div className="text-sm font-semibold text-white group-hover:text-[var(--color-hot-pink-strong)]">
                                  {service.label}
                                </div>
                                <p className="mt-0.5 text-xs body-copy">{service.description}</p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {LINKS.map((link) => (
              <HoverLift key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link transition-colors hover:text-white"
                  data-active={isActive(pathname, link.href)}
                >
                  {link.label}
                </Link>
              </HoverLift>
            ))}
          </nav>

          <div className="hidden flex-shrink-0 md:block">
            <HoverLift>
              <Button asChild size="sm" className="cta-primary rounded-full px-5 font-medium text-white">
                <Link href={createWhatsAppUrl()} target="_blank">
                  Chat With Us
                </Link>
              </Button>
            </HoverLift>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 border-white/10 bg-[rgba(8,11,16,0.96)] p-0 backdrop-blur-xl">
                <div className="border-b border-white/10 px-4 py-5">
                  <DanverseHeaderLogo />
                </div>
                <nav aria-label="Mobile" className="flex flex-col py-2">
                  <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between px-5 py-3 text-white/90 transition-colors hover:bg-white/5 hover:text-white">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-4 w-4 text-[var(--color-hot-pink)]" />
                        <span className="text-sm font-medium">Services</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-[var(--color-accent-blue-strong)] transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="ml-5 border-l-2 border-[var(--color-hot-pink)] bg-white/5">
                        {SERVICES.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="flex items-center gap-3 px-5 py-2.5 text-white/70 transition-colors hover:text-[var(--color-hot-pink-strong)]"
                          >
                            <service.icon className="h-4 w-4 opacity-70" />
                            <span className="text-sm">{service.label}</span>
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-5 py-3 text-white/90 transition-colors hover:bg-white/5 hover:text-[var(--color-hot-pink-strong)]"
                    >
                      <link.icon className="h-4 w-4 opacity-75" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
                  <Button asChild className="cta-primary w-full rounded-full font-medium text-white">
                    <Link href={createWhatsAppUrl()} target="_blank">
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
  return href === "#process" ? pathname === "/" : pathname === href
}
