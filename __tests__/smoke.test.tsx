import React from "react"
import type { AnchorHTMLAttributes, ImgHTMLAttributes, PropsWithChildren, ScriptHTMLAttributes } from "react"
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import Page from "@/app/page"
import { Hero } from "@/components/hero"

vi.mock("next/image", () => ({
  default: ({ priority: _priority, ...props }: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => (
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

vi.mock("@/components/cinematic-showcase", () => ({
  CinematicShowcase: () => <section data-testid="showcase" />,
}))

vi.mock("@/components/process-section", () => ({
  ProcessSection: () => <section data-testid="process-section" />,
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
    expect(screen.getByTestId("showcase")).toBeInTheDocument()
    expect(screen.getByTestId("process-section")).toBeInTheDocument()
  })

  it("Hero component mounts correctly", () => {
    render(<Hero />)

    expect(screen.getByRole("heading", { name: /launch visuals that feel cinematic on first contact\./i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /start your project/i })).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/201207346648")
    )
  })
})
