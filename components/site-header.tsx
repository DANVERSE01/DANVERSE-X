"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import { resolveCtaHref } from "@/lib/cta"
import { GENERAL_BRIEF_CTA } from "@/lib/site-ctas"
import { PRIMARY_NAV_ROUTES, resolveRouteHref } from "@/lib/routes"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[var(--z-nav)] transition-all duration-500 ${
        isScrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="content-shell">
        <nav
          className={`liquid-glass rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "mx-4" : "mx-0"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_15px_var(--color-primary)]" />
            <span className="text-xl font-black tracking-tighter">DANVERSE</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {PRIMARY_NAV_ROUTES.map((route) => (
              <Link
                key={route.href}
                href={resolveRouteHref(route, pathname)}
                className="text-[10px] font-bold tracking-[0.2em] text-white/60 hover:text-white transition-colors relative group"
              >
                {route.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href={resolveCtaHref(GENERAL_BRIEF_CTA)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2 bg-white text-black text-[10px] font-bold tracking-widest rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
            >
              START BRIEF
              <ArrowRight className="w-3 h-3" />
            </a>

            <button
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-background z-[var(--z-modal)] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-xl font-black tracking-tighter">DANVERSE</span>
              <button 
                className="p-2 rounded-full bg-white/5 border border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {PRIMARY_NAV_ROUTES.map((route, i) => (
                <motion.div
                  key={route.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={resolveRouteHref(route, pathname)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-5xl font-black tracking-tighter hover:text-primary transition-colors block"
                  >
                    {route.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto">
              <a
                href={resolveCtaHref(GENERAL_BRIEF_CTA)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-6 bg-white text-black text-center font-black tracking-widest rounded-2xl block hover:bg-primary hover:text-white transition-all"
              >
                START THE BRIEF
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
