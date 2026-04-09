"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const FOOTER_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/websites", label: "Services" },
  { href: "/faq", label: "Portfolio" },
  { href: "/checkout", label: "Contact" },
]

const SOCIAL_LINKS = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://twitter.com", label: "Twitter" },
]

export function AppverseFooter() {
  return (
    <footer className="bg-black px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        {/* Top Section - Wacus style: Big CTA */}
        <div className="mb-24 flex flex-col items-center text-center sm:mb-32">
          <h2 className="mb-12 text-[clamp(2rem,6vw,5rem)] font-medium uppercase tracking-tighter text-white">
            Work with us.
          </h2>
          <Link
            href="/checkout"
            className="group relative flex h-16 items-center justify-center border border-white px-16 text-xs font-bold uppercase tracking-[0.3em] text-white transition-all duration-500 hover:bg-white hover:text-black"
          >
            Start a Project
          </Link>
        </div>

        {/* Bottom Section - Wacus style: Clean grid */}
        <div className="grid gap-16 border-t border-white/10 pt-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <span className="text-xl font-bold tracking-[0.2em] text-white uppercase">
              DANVERSE
            </span>
            <p className="max-w-[240px] text-sm leading-relaxed text-white/40">
              Building high-performance digital platforms and cinematic brand experiences.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Navigation</span>
            <nav className="flex flex-col gap-4">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Social</span>
            <nav className="flex flex-col gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Legal</span>
            <div className="flex flex-col gap-4 text-sm text-white/40">
              <p>© 2026 DANVERSE. All rights reserved.</p>
              <Link href="/t&c" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/t&c" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
