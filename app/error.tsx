"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="error-page">
      <span className="error-page__code">500</span>
      <p className="tx-label">TX-500 / SIGNAL DROP</p>
      <h1 className="error-page__title">Transmission interrupted.</h1>
      <p className="error-page__desc">
        {error.message || "An unexpected interruption blocked the current channel."}
      </p>
      <div className="error-page__cta">
        <button className="signal-button" type="button" onClick={() => reset()}>
          Retry transmission
        </button>
      </div>
    </main>
  )
}
