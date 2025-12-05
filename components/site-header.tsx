"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Building2, Palette, Globe, Briefcase } from "lucide-react"
import { useState, useEffect } from "react"
import { DanverseHeaderLogo } from "@/components/danverse-logo"

export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Track active section for nav highlighting
      const sections = ["hero", "features", "work", "pricing", "contact"]
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const el = document.getElementById(sectionId)
    if (el) {
      const offsetTop = el.offsetTop - 80 // Account for header height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

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

  const navLinks = [
    { href: "#features", label: "Services", sectionId: "features" },
    { href: "#work", label: "Work", sectionId: "work" },
    { href: "#pricing", label: "Pricing", sectionId: "pricing" },
    { href: "/About", label: "About", sectionId: null },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="container mx-auto px-4">
        <div
          className={`flex h-14 items-center justify-between px-5 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-black/80 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20"
              : "bg-black/40 backdrop-blur-md border border-white/5"
          }`}
        >
          {/* Logo - Left */}
          <Link href="/" className="flex-shrink-0 group">
            <DanverseHeaderLogo />
          </Link>

          {/* Desktop Nav - Center */}
          <nav className="hidden items-center gap-1 text-sm md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={link.sectionId ? (e) => scrollToSection(e, link.sectionId) : undefined}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === link.sectionId
                    ? "text-lime-400 bg-lime-400/10"
                    : "text-white/80 hover:text-lime-400 hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA - Right */}
          <div className="hidden md:block flex-shrink-0">
            <Button
              asChild
              size="sm"
              className="bg-lime-400 text-black font-semibold rounded-full px-6 hover:bg-lime-300 hover:scale-105 transition-all duration-300 shadow-lg shadow-lime-400/20"
            >
              <Link href="https://wa.link/rc25na" target="_blank">
                Start Project
              </Link>
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/95 backdrop-blur-xl border-white/10 p-0 w-80">
                {/* Brand Header */}
                <div className="flex items-center justify-center px-4 py-6 border-b border-white/10">
                  <DanverseHeaderLogo />
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col py-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={link.sectionId ? (e) => scrollToSection(e, link.sectionId) : undefined}
                      className="flex items-center gap-3 px-6 py-4 text-white/90 hover:bg-lime-400/10 hover:text-lime-400 transition-colors border-b border-white/5"
                    >
                      <span className="text-base font-medium">{link.label}</span>
                    </a>
                  ))}

                  {/* Portfolio Link */}
                  <Link
                    href="/work"
                    className="flex items-center gap-3 px-6 py-4 text-white/90 hover:bg-lime-400/10 hover:text-lime-400 transition-colors border-b border-white/5"
                  >
                    <Briefcase className="h-4 w-4 text-lime-400/60" />
                    <span className="text-base font-medium">Portfolio</span>
                  </Link>
                </nav>

                {/* CTA Button */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
                  <Button
                    asChild
                    className="w-full bg-lime-400 text-black font-semibold rounded-full hover:bg-lime-300 py-6 text-base"
                  >
                    <Link href="https://wa.link/rc25na" target="_blank">
                      Start Your Project
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
