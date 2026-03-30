"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Workflow, HelpCircle, Info, ChevronDown, Building2, Palette, Globe } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { createWhatsAppUrl } from "@/lib/env"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { DanverseHeaderLogo } from "@/components/danverse-logo"

export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()

  const services = [
    {
      href: "/cinematic-ads",
      label: "Cinematic Ads & UGC",
      icon: Building2,
      description: "High-impact vertical and horizontal videos for TikTok, Reels, and campaigns",
    },
    {
      href: "/branding",
      label: "Branding & Visual Identity",
      icon: Palette,
      description: "Logos, visual systems, hero graphics, and brand worlds",
    },
    {
      href: "/websites",
      label: "Websites & Landing Pages",
      icon: Globe,
      description: "Modern websites and landing pages with clean UI and smooth motion",
    },
  ]

  const links = [
    { href: "#process", label: "Process", icon: Workflow },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
    { href: "/About", label: "About", icon: Info },
  ]

  const serviceHrefs = services.map((service) => service.href)
  const isServiceRoute = serviceHrefs.includes(pathname)

  const isLinkActive = (href: string) => {
    if (href === "#process") {
      return pathname === "/"
    }

    return pathname === href
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 py-3">
        <div className="flex h-14 items-center justify-between px-5 liquid-glass-header rounded-full">
          {/* Logo - Left */}
          <Link href="/" className="flex-shrink-0">
            <DanverseHeaderLogo />
          </Link>

          {/* Desktop Nav - Center */}
          <nav className="hidden items-center gap-8 text-sm text-white/90 md:flex">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`nav-link bg-transparent px-0 text-white hover:bg-transparent hover:text-white focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-white ${
                      isServiceRoute ? "text-white" : ""
                    }`}
                    data-active={servicesOpen || isServiceRoute}
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[320px] gap-1 rounded-2xl border border-[rgba(245,245,0,0.08)] bg-[rgba(17,17,17,0.94)] p-2 backdrop-blur-xl">
                      {services.map((service) => (
                        <li key={service.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={service.href}
                              className="group flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-white/5"
                            >
                              <service.icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-lime)]" />
                              <div>
                                <div className="text-sm font-semibold text-white group-hover:text-[var(--color-lime)]">
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
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link transition-colors hover:text-white"
                data-active={isLinkActive(l.href)}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA - Right */}
          <div className="hidden md:block flex-shrink-0">
            <Button
              asChild
              size="sm"
              className="cta-coral rounded-full px-5 font-medium text-white transition-all hover:scale-[1.02]"
            >
              <Link href={createWhatsAppUrl()} target="_blank">
                Chat With Us
              </Link>
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 border-[rgba(245,245,0,0.08)] bg-[rgba(17,17,17,0.96)] p-0 backdrop-blur-xl"
              >
                {/* Brand Header */}
                <div className="flex items-center justify-center px-4 py-5 border-b border-white/10">
                  <DanverseHeaderLogo />
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col py-2">
                  <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between px-5 py-3 text-white/90 transition-colors hover:bg-white/5 hover:text-white">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-4 w-4 text-[var(--color-lime)]" />
                        <span className="text-sm font-medium">Services</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-[var(--color-lavender)] transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="ml-5 border-l-2 border-[var(--color-lime)] bg-white/5">
                        {services.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="flex items-center gap-3 px-5 py-2.5 text-white/70 transition-colors hover:text-[var(--color-lime)]"
                          >
                            <service.icon className="h-4 w-4 text-[var(--color-lime)] opacity-70" />
                            <span className="text-sm">{service.label}</span>
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="flex items-center gap-3 px-5 py-3 text-white/90 transition-colors hover:bg-white/5 hover:text-[var(--color-lime)]"
                    >
                      <l.icon className="h-4 w-4 text-[var(--color-lime)] opacity-75" />
                      <span className="text-sm font-medium">{l.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* CTA Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                  <Button asChild className="cta-coral w-full rounded-full font-medium text-white">
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
