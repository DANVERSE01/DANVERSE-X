/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: '.next',
  
  // Performance: Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
  
  // Performance: Optimize package imports
  experimental: {
    optimizePackageImports: ['@splinetool/react-spline', 'lucide-react'],
  },
  
  trailingSlash: true,
}

export default nextConfig
