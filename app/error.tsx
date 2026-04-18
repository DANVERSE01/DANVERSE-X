"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="state-screen">
      <p className="tx-label">500 / Room closed</p>
      <h1>The room failed to open.</h1>
      <p>{error.message || "An unexpected interruption blocked the current place."}</p>
      <button className="signal-button" type="button" onClick={() => reset()}>
        Try again
      </button>
    </main>
  )
}
