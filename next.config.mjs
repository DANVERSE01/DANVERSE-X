import { withSentryConfig } from "@sentry/nextjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
}

export default withSentryConfig(nextConfig, {
  silent: !process.env.CI,
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
  },
})
