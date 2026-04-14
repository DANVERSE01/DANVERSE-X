import type { ReactNode } from "react"

export function TxLabel({ children }: { children: ReactNode }) {
  return <div className="tx-label">{children}</div>
}
