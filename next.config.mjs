/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: '.next',
  images: {
    unoptimized: true, // Required for static export to serve images correctly
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
  // Ensure trailing slashes for consistent routing on static hosts
  trailingSlash: true,
}

export default nextConfig
