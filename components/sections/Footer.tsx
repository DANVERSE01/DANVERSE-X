import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer id="tx-06" className="footer-section tx-section">
      <div className="section-inner footer-grid">
        <div className="footer-brand">
          <Image src="/brand/danverse-mark.png" alt="DANVERSE" width={60} height={60} />
          <div>
            <strong>DANVERSE</strong>
            <span>AI Creative Studio</span>
          </div>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link href="/#tx-02">Work</Link>
          <Link href="/#tx-03">Services</Link>
          <Link href="/#tx-04">Process</Link>
          <Link href="/#tx-05">Contact</Link>
        </nav>
        <div className="footer-meta">
          <span>© 2026 DANVERSE. All rights reserved.</span>
          <span>Made with precision</span>
        </div>
      </div>
    </footer>
  )
}
