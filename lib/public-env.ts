const PUBLIC_ENV_DEFAULTS = {
  NEXT_PUBLIC_SITE_URL: "https://danverse.ai",
  NEXT_PUBLIC_WHATSAPP_NUMBER: "201207346648",
  NEXT_PUBLIC_CONTACT_EMAIL: "danverseai@outlook.com",
  NEXT_PUBLIC_GTM_ID: undefined,
  NEXT_PUBLIC_GA_ID: undefined,
  NEXT_PUBLIC_SENTRY_DSN: undefined,
} as const

function withFallback(value: string | undefined, fallback: string) {
  if (typeof value !== "string") {
    return fallback
  }

  const trimmed = value.trim()
  return trimmed === "" ? fallback : trimmed
}

function optionalValue(value: string | undefined) {
  if (typeof value !== "string") {
    return undefined
  }

  const trimmed = value.trim()
  return trimmed === "" ? undefined : trimmed
}

export const publicEnv = {
  NEXT_PUBLIC_SITE_URL: withFallback(process.env.NEXT_PUBLIC_SITE_URL, PUBLIC_ENV_DEFAULTS.NEXT_PUBLIC_SITE_URL).replace(
    /\/$/,
    ""
  ),
  NEXT_PUBLIC_WHATSAPP_NUMBER: withFallback(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    PUBLIC_ENV_DEFAULTS.NEXT_PUBLIC_WHATSAPP_NUMBER
  ).replace(/\D/g, ""),
  NEXT_PUBLIC_CONTACT_EMAIL: withFallback(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    PUBLIC_ENV_DEFAULTS.NEXT_PUBLIC_CONTACT_EMAIL
  ).toLowerCase(),
  NEXT_PUBLIC_GTM_ID: optionalValue(process.env.NEXT_PUBLIC_GTM_ID),
  NEXT_PUBLIC_GA_ID: optionalValue(process.env.NEXT_PUBLIC_GA_ID),
  NEXT_PUBLIC_SENTRY_DSN: optionalValue(process.env.NEXT_PUBLIC_SENTRY_DSN),
} as const

export type PublicClientEnv = typeof publicEnv

export function createWhatsAppUrl(message?: string) {
  const baseUrl = `https://wa.me/${publicEnv.NEXT_PUBLIC_WHATSAPP_NUMBER}`
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl
}

export const contactEmailHref = `mailto:${publicEnv.NEXT_PUBLIC_CONTACT_EMAIL}`
