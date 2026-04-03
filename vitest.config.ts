import path from "node:path"
import { defineConfig } from "vitest/config"

const rootDir = __dirname

export default defineConfig({
  root: rootDir,
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  resolve: {
    alias: {
      "@": rootDir,
    },
  },
  test: {
    environment: "jsdom",
    exclude: ["e2e/**", "node_modules/**", ".next/**"],
    setupFiles: [path.resolve(rootDir, "vitest.setup.ts")],
  },
})
