import Link from "next/link"

export default function NotFound() {
  return (
    <main className="state-screen">
      <p className="tx-label">404 / Object not found</p>
      <h1>No object here.</h1>
      <p>The requested place is outside the current assembly.</p>
      <Link className="ghost-button" href="/">
        Return to DANVERSE
      </Link>
    </main>
  )
}
