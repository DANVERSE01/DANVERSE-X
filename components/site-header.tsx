"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Tag, HelpCircle, Info, ChevronDown, Building2, Palette, Globe } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import { DanverseHeaderLogo } from "@/components/danverse-logo"

export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false)

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
    { href: "#pricing", label: "Pricing", icon: Tag },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
    { href: "/About", label: "About", icon: Info },
  ]

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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white/90 hover:text-red-400 data-[state=open]:text-red-400 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-1 p-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl">
                      {services.map((service) => (
                        <li key={service.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={service.href}
                              className="group flex items-start gap-3 rounded-lg p-3 transition-all hover:bg-white/5"
                            >
                              <service.icon className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                              <div>
                                <div className="text-sm font-medium text-white group-hover:text-red-300">
                                  {service.label}
                                </div>
                                <p className="text-xs text-white/50 mt-0.5">{service.description}</p>
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
              <Link key={l.href} href={l.href} className="hover:text-red-400 transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA - Right */}
          <div className="hidden md:block flex-shrink-0">
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-full px-5 hover:from-red-400 hover:to-orange-400 transition-all"
            >
              <Link href="https://wa.link/rc25na" target="_blank">
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
              <SheetContent side="right" className="bg-black/95 backdrop-blur-xl border-white/10 p-0 w-72">
                {/* Brand Header */}
                <div className="flex items-center justify-center px-4 py-5 border-b border-white/10">
                  <DanverseHeaderLogo />
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col py-2">
                  <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full px-5 py-3 text-white/90 hover:bg-white/5 hover:text-red-400 transition-colors">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-4 w-4 text-white/50" />
                        <span className="text-sm font-medium">Services</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-white/50 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="bg-white/5 border-l-2 border-red-500/50 ml-5">
                        {services.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="flex items-center gap-3 px-5 py-2.5 text-white/70 hover:text-red-400 transition-colors"
                          >
                            <service.icon className="h-4 w-4 text-red-400/60" />
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
                      className="flex items-center gap-3 px-5 py-3 text-white/90 hover:bg-white/5 hover:text-red-400 transition-colors"
                    >
                      <l.icon className="h-4 w-4 text-white/50" />
                      <span className="text-sm font-medium">{l.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* CTA Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-full hover:from-red-400 hover:to-orange-400"
                  >
                    <Link href="https://wa.link/rc25na" target="_blank">
                      Get a Quote
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
