"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/websites", label: "Services" },
  { href: "/faq", label: "Portfolio" }, // Mapping existing routes to Wacus-style labels
]

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 sm:px-12",
        scrolled ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/10" : "py-8 bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        {/* Logo - Wacus style: Clean, Bold, All-caps */}
        <Link href="/" className="group relative z-[110]">
          <span className="text-xl font-bold tracking-[0.2em] text-white uppercase sm:text-2xl">
            DANVERSE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:text-white",
                pathname === link.href ? "text-white" : "text-white/60"
              )}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Language Switcher - Wacus style */}
          <div className="flex items-center gap-4 border-l border-white/20 pl-10">
            <button className="text-[10px] font-bold uppercase tracking-widest text-white">EN</button>
            <button className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white/60">AR</button>
          </div>

          {/* Contact Button - Wacus style */}
          <Link
            href="/checkout"
            className="ml-4 border border-white px-8 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="relative z-[110] flex h-10 w-10 items-center justify-center text-white md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[105] flex flex-col bg-black px-8 pt-32"
          >
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-3xl font-medium uppercase tracking-tighter text-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <Link
                  href="/checkout"
                  className="text-3xl font-medium uppercase tracking-tighter text-white"
                >
                  Contact
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
