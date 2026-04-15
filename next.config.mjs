/** @type {import('next').NextConfig} */
const config = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "**.r2.cloudflarestorage.com" }],
  },
}

export default config
