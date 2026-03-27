import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "https://danverse.ai",
    trace: "on-first-retry",
  },
})
