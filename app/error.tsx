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
      <p className="tx-label">TX-500 / SIGNAL DROP</p>
      <h1>Transmission interrupted.</h1>
      <p>{error.message || "An unexpected interruption blocked the current channel."}</p>
      <button className="signal-button" type="button" onClick={() => reset()}>
        Retry transmission
      </button>
    </main>
  )
}
