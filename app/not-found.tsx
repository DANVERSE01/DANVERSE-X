import Link from "next/link"

export default function NotFound() {
  return (
    <main className="state-screen">
      <p className="tx-label">TX-404 / SIGNAL LOST</p>
      <h1>Signal lost.</h1>
      <p>The channel you requested is not available on this frequency.</p>
      <Link className="ghost-button" href="/">
        Return to DANVERSE
      </Link>
    </main>
  )
}
