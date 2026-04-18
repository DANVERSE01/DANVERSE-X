/** @type {import('next').NextConfig} */
const config = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 86, 88, 90, 92],
    remotePatterns: [{ protocol: "https", hostname: "**.r2.cloudflarestorage.com" }],
  },
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },
}

export default config
