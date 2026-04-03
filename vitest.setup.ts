import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

process.env.NEXT_PUBLIC_SITE_URL ??= "https://danverse.ai"
process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??= "201207346648"
process.env.NEXT_PUBLIC_CONTACT_EMAIL ??= "danverseai@outlook.com"
process.env.NEXT_PUBLIC_GTM_ID ??= ""
process.env.NEXT_PUBLIC_GA_ID ??= ""
process.env.NEXT_PUBLIC_SENTRY_DSN ??= ""

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = "0px"
  readonly thresholds = [0]

  disconnect = vi.fn()
  observe = vi.fn()
  takeRecords = vi.fn(() => [])
  unobserve = vi.fn()
}

class MockResizeObserver implements ResizeObserver {
  disconnect = vi.fn()
  observe = vi.fn()
  unobserve = vi.fn()
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

Object.defineProperty(window, "requestIdleCallback", {
  writable: true,
  value: vi.fn((callback: IdleRequestCallback) =>
    window.setTimeout(
      () =>
        callback({
          didTimeout: false,
          timeRemaining: () => 50,
        }),
      0
    )
  ),
})

Object.defineProperty(window, "cancelIdleCallback", {
  writable: true,
  value: vi.fn((handle: number) => window.clearTimeout(handle)),
})

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
})

Object.defineProperty(globalThis, "ResizeObserver", {
  writable: true,
  value: MockResizeObserver,
})

Object.defineProperty(globalThis.HTMLMediaElement.prototype, "play", {
  configurable: true,
  value: vi.fn().mockResolvedValue(undefined),
})

Object.defineProperty(globalThis.HTMLMediaElement.prototype, "pause", {
  configurable: true,
  value: vi.fn(),
})

Object.defineProperty(globalThis.HTMLMediaElement.prototype, "load", {
  configurable: true,
  value: vi.fn(),
})

Object.defineProperty(navigator, "serviceWorker", {
  configurable: true,
  value: {
    getRegistrations: vi.fn().mockResolvedValue([]),
    register: vi.fn().mockResolvedValue({ scope: "/" }),
  },
})
