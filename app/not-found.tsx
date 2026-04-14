import Link from "next/link"

export default function NotFound() {
  return (
    <main className="error-page">
      <span className="error-page__code">404</span>
      <p className="tx-label">TX-404 / SIGNAL LOST</p>
      <h1 className="error-page__title">Signal lost.</h1>
      <p className="error-page__desc">
        The channel you requested is not available on this frequency.
      </p>
      <div className="error-page__cta">
        <Link className="ghost-button" href="/">
          Return to DANVERSE
        </Link>
      </div>
    </main>
  )
}
