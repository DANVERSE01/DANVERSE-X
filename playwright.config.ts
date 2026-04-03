import { defineConfig } from "@playwright/test"

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000"
const shouldUseLocalServer = !process.env.PLAYWRIGHT_BASE_URL

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: shouldUseLocalServer
    ? {
        command: "npx next dev -H 127.0.0.1 -p 3000",
        port: 3000,
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
      }
    : undefined,
})
