"use client"

import Link from "next/link"
import { useDanverseStore } from "@/lib/store"

const navItems = [
  { href: "/#tx-02", label: "Work" },
  { href: "/#tx-03", label: "Services" },
  { href: "/#tx-04", label: "Process" },
  { href: "/#tx-05", label: "Contact" },
]

export function MobileMenu() {
  const mobileMenuOpen = useDanverseStore((state) => state.mobileMenuOpen)
  const setMobileMenuOpen = useDanverseStore((state) => state.setMobileMenuOpen)

  return (
    <div className={`mobile-menu ${mobileMenuOpen ? "is-open" : ""}`} aria-hidden={!mobileMenuOpen}>
      <div className="mobile-menu__inner">
        <button type="button" className="mobile-menu__close" onClick={() => setMobileMenuOpen(false)}>
          CLOSE
        </button>
        <nav className="mobile-menu__links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/work" onClick={() => setMobileMenuOpen(false)}>
            Archive
          </Link>
        </nav>
      </div>
    </div>
  )
}
