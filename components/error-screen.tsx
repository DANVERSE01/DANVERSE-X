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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(230,60,47,0.24),transparent_52%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_25%,transparent_75%,rgba(230,60,47,0.08))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e63c2f] to-transparent opacity-70" />

      <div className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl sm:p-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#e63c2f]/30 bg-[#e63c2f]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#ff8a80]">
          <TriangleAlert className="h-3.5 w-3.5" />
          System Fault
        </div>

        <h1 className="mt-6 text-3xl font-semibold uppercase tracking-[0.16em] text-white sm:text-4xl">
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
            className="rounded-full bg-[#e63c2f] px-6 text-sm font-semibold uppercase tracking-[0.18em] text-black hover:bg-[#ff6a5e]"
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
