"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useDanverseStore } from "@/lib/store"

const navItems = [
  { href: "/#tx-02", label: "Work" },
  { href: "/#tx-03", label: "Capabilities" },
  { href: "/#tx-04", label: "Process" },
  { href: "/#tx-05", label: "Contact" },
]

export function MobileMenu() {
  const mobileMenuOpen = useDanverseStore((state) => state.mobileMenuOpen)
  const setMobileMenuOpen = useDanverseStore((state) => state.setMobileMenuOpen)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [mobileMenuOpen, setMobileMenuOpen])

  return (
    <div
      className={`mobile-menu ${mobileMenuOpen ? "is-open" : ""}`}
      aria-hidden={!mobileMenuOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="mobile-menu__inner">
        <button
          type="button"
          className="mobile-menu__close"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation menu"
        >
          <span aria-hidden="true">✕</span>
          <span>CLOSE</span>
        </button>
        <nav className="mobile-menu__links" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/work" onClick={() => setMobileMenuOpen(false)}>
            Archive
          </Link>
        </nav>
        <div className="mobile-menu__footer">
          <a href="mailto:hello@danverse.io" className="mobile-menu__email">
            hello@danverse.io
          </a>
        </div>
      </div>
    </div>
  )
}
