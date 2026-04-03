const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "frame-src 'self' https://player.vimeo.com",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://*.ingest.sentry.io https://*.sentry.io",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "media-src 'self' blob: https://player.vimeo.com https://i.vimeocdn.com",
  "upgrade-insecure-requests",
].join("; ")

export const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), accelerometer=(), gyroscope=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Origin-Agent-Cluster", value: "?1" },
  { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
]

export function getNetlifyHeadersFile() {
  const sections = [
    {
      path: "/*",
      headers: SECURITY_HEADERS,
    },
    {
      path: "/sw.js",
      headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
    },
    {
      path: "/_next/static/*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    },
    {
      path: "/icons/*",
      headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
    },
    {
      path: "/images/*",
      headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
    },
    {
      path: "/videos/*",
      headers: [{ key: "Cache-Control", value: "public, max-age=2592000, immutable" }],
    },
  ]

  return `${sections
    .map(
      ({ path, headers }) =>
        `${path}\n${headers.map(({ key, value }) => `  ${key}: ${value}`).join("\n")}`
    )
    .join("\n\n")}\n`
}
