"use client"

interface EmptyStateProps {
  onReset: () => void
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="archive-empty" role="status">
      <span className="eyebrow eyebrow--signal">No objects</span>
      <p>Nothing matches this filter in the current index.</p>
      <button type="button" className="archive-empty__reset" onClick={onReset} data-cursor="magnetic">
        Clear filter
      </button>
    </div>
  )
}
