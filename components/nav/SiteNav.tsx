"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useDanverseStore } from "@/lib/store"

const navItems = [
  { href: "/#tx-02", label: "Work", activePath: "/work" },
  { href: "/#tx-03", label: "Services", activePath: null },
  { href: "/#tx-04", label: "Process", activePath: null },
  { href: "/#tx-05", label: "Contact", activePath: null },
]

export function SiteNav() {
  const pathname = usePathname()
  const setMobileMenuOpen = useDanverseStore((state) => state.setMobileMenuOpen)
  const headerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const onScroll = () => {
      if (window.scrollY > 80) {
        header.classList.add("is-scrolled")
      } else {
        header.classList.remove("is-scrolled")
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="site-nav" ref={headerRef}>
      <div className="nav-inner">
        <Link href="/" className="nav-brand" aria-label="DANVERSE home">
          <Image src="/brand/danverse-mark.png" alt="DANVERSE" width={34} height={34} className="nav-logo" priority />
          <span className="nav-wordmark">DANVERSE</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => {
            const isOnWorkSection = pathname.startsWith("/work") && item.activePath === "/work"
            const isMuted = pathname.startsWith("/work") && !isOnWorkSection
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isOnWorkSection ? "is-active" : isMuted ? "is-muted" : ""}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span className="nav-available">Available for projects</span>
          <button
            type="button"
            className="nav-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            MENU
          </button>
        </div>
      </div>
    </header>
  )
}
