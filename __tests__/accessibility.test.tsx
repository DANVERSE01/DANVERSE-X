import React from "react"
import type { AnchorHTMLAttributes, ImgHTMLAttributes, PropsWithChildren, ScriptHTMLAttributes } from "react"
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { Hero } from "@/components/hero"
import { TrustBand } from "@/components/trust-band"

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

afterEach(() => {
  cleanup()
})

function getUnnamedInteractiveElements(container: HTMLElement) {
  const selector = 'a[href], button, input:not([type="hidden"]), select, textarea, [role="button"]'

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter((element) => {
    const labelledBy = element.getAttribute("aria-labelledby")
    const textContent = element.textContent?.trim()
    const ariaLabel = element.getAttribute("aria-label")?.trim()
    const title = element.getAttribute("title")?.trim()
    const value =
      element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement ? element.value?.trim() : undefined
    const placeholder =
      element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement
        ? element.placeholder?.trim()
        : undefined

    return !(ariaLabel || labelledBy || textContent || title || value || placeholder)
  })
}

describe("accessibility checks", () => {
  it("hero keeps a single primary heading and labelled calls to action", () => {
    const { container } = render(<Hero />)

    expect(container.querySelectorAll("h1")).toHaveLength(1)
    expect(screen.getByRole("heading", { level: 1, name: /we build visual advantage/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /start the 4-point brief/i })).toHaveAttribute("target", "_blank")
    expect(screen.getByRole("link", { name: /request the 15-minute call/i })).toHaveAttribute("target", "_blank")
    expect(getUnnamedInteractiveElements(container)).toEqual([])
  })

  it("trust band exposes readable trust signals with named links", () => {
    const { container } = render(<TrustBand />)

    expect(screen.getByRole("heading", { level: 2, name: /the answers serious buyers ask for before they approve the call/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /start the 4-point brief on whatsapp/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /request the 15-minute discovery call/i })).toBeInTheDocument()
    expect(getUnnamedInteractiveElements(container)).toEqual([])
  })

  it("decorative and content images always expose alt attributes", () => {
    const { container } = render(<Hero />)

    const imagesMissingAlt = Array.from(container.querySelectorAll("img")).filter((image) => !image.hasAttribute("alt"))
    expect(imagesMissingAlt).toHaveLength(0)
  })
})
