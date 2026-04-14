import type { NextConfig } from "next"

const config: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "**.r2.cloudflarestorage.com" }],
  },
  experimental: {
    reactCompiler: true,
  },
}

export default config
