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
  it("homepage renders without crashing", () => {
    render(<Page />)

    expect(screen.getByTestId("site-header")).toBeInTheDocument()
    expect(screen.getByTestId("process")).toBeInTheDocument()
  })

  it("Hero component mounts correctly", () => {
    render(<Hero />)

    expect(screen.getByRole("heading", { name: /films\. identity\. systems\./i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /chat with us/i })).toHaveAttribute("href", "https://wa.me/201207346648")
  })
})
