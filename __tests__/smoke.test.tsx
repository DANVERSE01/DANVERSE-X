import React from "react"
import type { AnchorHTMLAttributes, ImgHTMLAttributes, PropsWithChildren, ScriptHTMLAttributes } from "react"
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import Page from "@/app/page"
import { Hero } from "@/components/hero"

vi.mock("next/image", () => ({
  default: ({
    priority: _priority,
    fill: _fill,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean; fill?: boolean }) => (
    <img {...props} alt={props.alt ?? ""} />
  ),
}))

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock("next/script", () => ({
  default: ({ children, ...props }: PropsWithChildren<ScriptHTMLAttributes<HTMLScriptElement>>) => (
    <script {...props}>{children}</script>
  ),
}))

vi.mock("@/components/site-header", () => ({
  SiteHeader: () => <div data-testid="site-header" />,
}))

vi.mock("@/components/features", () => ({
  Features: () => <section data-testid="features" />,
}))

vi.mock("@/components/logo-marquee", () => ({
  LogoMarquee: () => <section data-testid="logo-marquee" />,
}))

vi.mock("@/components/pricing", () => ({
  Pricing: () => <section data-testid="process" />,
}))

vi.mock("@/components/appverse-footer", () => ({
  AppverseFooter: () => <footer data-testid="appverse-footer" />,
}))

afterEach(() => {
  cleanup()
})

describe("smoke tests", () => {
  it("homepage renders without crashing", async () => {
    render(<Page />)

    expect(screen.getByTestId("site-header")).toBeInTheDocument()
    expect(await screen.findByTestId("process")).toBeInTheDocument()
  })

  it("Hero component mounts correctly", () => {
    render(<Hero />)

    expect(screen.getByRole("heading", { name: /we build visual advantage/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /start the 4-point brief/i }).getAttribute("href")).toContain("https://wa.me/201207346648")
    expect(screen.getByRole("link", { name: /request the 15-minute call/i }).getAttribute("href")).toContain(
      "https://wa.me/201207346648"
    )
  })
})
