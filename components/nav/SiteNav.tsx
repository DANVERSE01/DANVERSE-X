"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useDanverseStore } from "@/lib/store"

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/about#admission", label: "People" },
]

export function SiteNav() {
  const pathname = usePathname()
  const mobileMenuOpen = useDanverseStore((state) => state.mobileMenuOpen)
  const setMobileMenuOpen = useDanverseStore((state) => state.setMobileMenuOpen)

  useEffect(() => {
    document.body.classList.toggle("is-menu-open", mobileMenuOpen)
    return () => document.body.classList.remove("is-menu-open")
  }, [mobileMenuOpen])

  return (
    <>
      <header className="site-nav">
        <div className="nav-inner">
          <Link href="/" className="nav-brand" aria-label="DANVERSE home">
            <Image src="/brand/danverse-mark.png" alt="" width={44} height={44} className="nav-logo" priority />
            <span>
              <span className="nav-wordmark">DANVERSE Assembly</span>
              <span className="nav-submark">Imagine possible</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? "is-active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <Link href="/about#admission" className="nav-request" data-cursor="magnetic">
              Seek admission
            </Link>
            <button
              type="button"
              className="nav-toggle"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="nav-toggle__lines" aria-hidden="true">
                <span />
                <span />
              </span>
              Menu
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${mobileMenuOpen ? "is-open" : ""}`} aria-hidden={!mobileMenuOpen}>
        <div className="mobile-menu__veil" onClick={() => setMobileMenuOpen(false)} />
        <div className="mobile-menu__inner">
          <button type="button" className="mobile-menu__close" onClick={() => setMobileMenuOpen(false)}>
            Close
          </button>
          <div className="mobile-menu__object" aria-hidden="true">
            <Image
              src="/images/work/shelby-alexandria/bridge-sunset-1.webp"
              alt=""
              fill
              sizes="70vw"
              quality={75}
            />
          </div>
          <nav className="mobile-menu__links" aria-label="Overlay navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/work" onClick={() => setMobileMenuOpen(false)}>
              Archive
            </Link>
            <Link href="/about#admission" onClick={() => setMobileMenuOpen(false)}>
              Admission
            </Link>
          </nav>
          <div className="mobile-menu__footer">
            <span>No social theater</span>
            <span>Independent practice across locations</span>
          </div>
        </div>
      </div>
    </>
  )
}
