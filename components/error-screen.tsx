"use client"

import * as Sentry from "@sentry/nextjs"
import { ArrowLeft, RefreshCw, TriangleAlert } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ErrorScreenProps {
  error: Error & { digest?: string }
  reset?: () => void
}

export function ErrorScreen({ error, reset }: ErrorScreenProps) {
  const router = useRouter()

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
      style={{ background: "var(--color-surface-base)", color: "var(--color-text-primary)" }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at top, rgba(239, 120, 106, 0.24), transparent 52%)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02), transparent 25%, transparent 75%, rgba(239, 120, 106, 0.08))",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px opacity-70"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-accent-coral), transparent)" }}
      />

      <div className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl sm:p-10">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em]"
          style={{
            border: "1px solid rgba(239, 120, 106, 0.3)",
            background: "rgba(239, 120, 106, 0.1)",
            color: "var(--color-accent-coral)",
          }}
        >
          <TriangleAlert className="h-3.5 w-3.5" />
          System Fault
        </div>

        <h1 className="mt-6 text-3xl font-semibold uppercase tracking-[0.16em] sm:text-4xl">
          Something broke on our end
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
          The DANVERSE runtime hit an unexpected edge case. We silently logged the failure and kept the page
          recoverable.
        </p>

        {error.digest ? (
          <p className="mt-5 text-xs uppercase tracking-[0.24em] text-white/35">Trace digest: {error.digest}</p>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => reset?.()}
            className="rounded-full px-6 text-sm font-semibold uppercase tracking-[0.18em] hover:brightness-110"
            style={{
              background: "var(--color-accent-coral)",
              color: "var(--color-surface-base)",
            }}
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="rounded-full border-white/15 bg-transparent px-6 text-sm font-semibold uppercase tracking-[0.18em] text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}
