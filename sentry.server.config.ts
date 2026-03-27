import * as Sentry from "@sentry/nextjs"
import { env } from "@/lib/env"

const dsn = process.env.SENTRY_DSN || env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  tracesSampleRate: 0.1,
  sendDefaultPii: false,
})
