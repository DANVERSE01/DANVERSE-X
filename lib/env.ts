import { z } from "zod"

const publicEnvDefaults = {
  NEXT_PUBLIC_SITE_URL: "https://danverse.ai",
  NEXT_PUBLIC_WHATSAPP_NUMBER: "201207346648",
  NEXT_PUBLIC_CONTACT_EMAIL: "danverseai@gmail.com",
} as const

const optionalTrimmedString = z.preprocess((value) => {
  if (typeof value !== "string") {
    return undefined
  }

  const trimmed = value.trim()
  return trimmed === "" ? undefined : trimmed
}, z.string().optional())

const optionalUrl = optionalTrimmedString.refine(
  (value) => value === undefined || z.string().url().safeParse(value).success,
  "must be a valid URL"
)

function withFallback(value: string | undefined, fallback: string) {
  if (typeof value !== "string") {
    return fallback
  }

  const trimmed = value.trim()
  return trimmed === "" ? fallback : trimmed
}

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string({ required_error: "NEXT_PUBLIC_SITE_URL is required" })
    .trim()
    .url("NEXT_PUBLIC_SITE_URL must be a valid absolute URL")
    .transform((value) => value.replace(/\/$/, "")),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z
    .string({ required_error: "NEXT_PUBLIC_WHATSAPP_NUMBER is required" })
    .trim()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => value.length >= 8, {
      message: "NEXT_PUBLIC_WHATSAPP_NUMBER must contain at least 8 digits",
    }),
  NEXT_PUBLIC_CONTACT_EMAIL: z
    .string({ required_error: "NEXT_PUBLIC_CONTACT_EMAIL is required" })
    .trim()
    .email("NEXT_PUBLIC_CONTACT_EMAIL must be a valid email address")
    .transform((value) => value.toLowerCase()),
  NEXT_PUBLIC_GTM_ID: optionalTrimmedString.refine((value) => value === undefined || /^GTM-[A-Z0-9]+$/i.test(value), {
    message: "NEXT_PUBLIC_GTM_ID must look like GTM-XXXXXXX",
  }),
  NEXT_PUBLIC_GA_ID: optionalTrimmedString.refine((value) => value === undefined || /^G-[A-Z0-9]+$/i.test(value), {
    message: "NEXT_PUBLIC_GA_ID must look like G-XXXXXXX",
  }),
  NEXT_PUBLIC_SENTRY_DSN: optionalUrl,
})

const parsedPublicEnv = publicEnvSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: withFallback(process.env.NEXT_PUBLIC_SITE_URL, publicEnvDefaults.NEXT_PUBLIC_SITE_URL),
  NEXT_PUBLIC_WHATSAPP_NUMBER: withFallback(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    publicEnvDefaults.NEXT_PUBLIC_WHATSAPP_NUMBER
  ),
  NEXT_PUBLIC_CONTACT_EMAIL: withFallback(process.env.NEXT_PUBLIC_CONTACT_EMAIL, publicEnvDefaults.NEXT_PUBLIC_CONTACT_EMAIL),
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
})

if (!parsedPublicEnv.success) {
  const formattedIssues = parsedPublicEnv.error.issues
    .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
    .join("\n")

  throw new Error(
    `Invalid public environment configuration:\n${formattedIssues}\n\nSet the missing values in .env.local, CI, or your hosting platform settings.`
  )
}

export const env = parsedPublicEnv.data

export type PublicEnv = typeof env

export function createWhatsAppUrl(message?: string) {
  const baseUrl = `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}`

  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl
}

export const contactEmailHref = `mailto:${env.NEXT_PUBLIC_CONTACT_EMAIL}`
