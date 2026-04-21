"use client"

import Link from "next/link"
import { useDanverseStore } from "@/lib/store"

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/people", label: "People" },
]

export function MobileMenu() {
  const mobileMenuOpen = useDanverseStore((state) => state.mobileMenuOpen)
  const setMobileMenuOpen = useDanverseStore((state) => state.setMobileMenuOpen)

  return (
    <div className={`mobile-menu ${mobileMenuOpen ? "is-open" : ""}`} aria-hidden={!mobileMenuOpen}>
      <div className="mobile-menu__veil" onClick={() => setMobileMenuOpen(false)} />
      <div className="mobile-menu__inner">
        <button type="button" className="mobile-menu__close" onClick={() => setMobileMenuOpen(false)}>
          Close
        </button>
        <nav className="mobile-menu__links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
