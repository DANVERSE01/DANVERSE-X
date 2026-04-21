"use client"

interface Category {
  value: string
  label: string
  count: number
}

interface FilterBarProps {
  categories: Category[]
  activeFilter: string
  activeView: "list" | "grid"
  onFilter: (value: string) => void
  onView: (value: "list" | "grid") => void
}

export function FilterBar({ categories, activeFilter, activeView, onFilter, onView }: FilterBarProps) {
  return (
    <div className="archive-filter">
      <div className="archive-filter__chips" role="tablist" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            role="tab"
            aria-selected={activeFilter === cat.value}
            className="archive-filter__chip"
            data-active={activeFilter === cat.value}
            onClick={() => onFilter(cat.value)}
            data-cursor="magnetic"
          >
            <span>{cat.label}</span>
            <span className="archive-filter__count">{cat.count.toString().padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      <div className="archive-filter__toggle" role="tablist" aria-label="View mode">
        <button
          type="button"
          role="tab"
          aria-selected={activeView === "list"}
          className="archive-filter__mode"
          data-active={activeView === "list"}
          onClick={() => onView("list")}
          data-cursor="magnetic"
        >
          List
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeView === "grid"}
          className="archive-filter__mode"
          data-active={activeView === "grid"}
          onClick={() => onView("grid")}
          data-cursor="magnetic"
        >
          Grid
        </button>
      </div>
    </div>
  )
}
