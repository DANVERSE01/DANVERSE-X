"use client"

import { useMemo } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import type { WorkItem } from "@/content/work"
import { FilterBar } from "@/components/archive/FilterBar"
import { ArchiveList } from "@/components/archive/ArchiveList"
import { ArchiveGrid } from "@/components/archive/ArchiveGrid"
import { EmptyState } from "@/components/archive/EmptyState"

interface ArchiveClientProps {
  works: WorkItem[]
}

type ViewMode = "list" | "grid"

export function ArchiveClient({ works }: ArchiveClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const viewParam = searchParams.get("view")
  const filterParam = searchParams.get("filter")

  const view: ViewMode = viewParam === "grid" ? "grid" : "list"
  const filter = filterParam ?? "all"

  const categories = useMemo(() => {
    const map = new Map<string, number>()
    for (const w of works) {
      const key = w.category ?? "Uncategorised"
      map.set(key, (map.get(key) ?? 0) + 1)
    }
    const entries = Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]))
    return [
      { value: "all", label: "All", count: works.length },
      ...entries.map(([label, count]) => ({
        value: label.toLowerCase().replace(/\s+/g, "-"),
        label,
        count,
      })),
    ]
  }, [works])

  const filteredWorks = useMemo(() => {
    if (filter === "all") return works
    return works.filter((w) => {
      const key = (w.category ?? "Uncategorised").toLowerCase().replace(/\s+/g, "-")
      return key === filter
    })
  }, [works, filter])

  const setParams = (next: { view?: ViewMode; filter?: string }) => {
    const params = new URLSearchParams(searchParams.toString())
    if (next.view) {
      if (next.view === "list") params.delete("view")
      else params.set("view", next.view)
    }
    if (next.filter !== undefined) {
      if (next.filter === "all") params.delete("filter")
      else params.set("filter", next.filter)
    }
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  return (
    <div className="archive-client">
      <FilterBar
        categories={categories}
        activeFilter={filter}
        activeView={view}
        onFilter={(v) => setParams({ filter: v })}
        onView={(v) => setParams({ view: v })}
      />

      <div className="archive-stage">
        <AnimatePresence mode="wait" initial={false}>
          {filteredWorks.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <EmptyState onReset={() => setParams({ filter: "all" })} />
            </motion.div>
          ) : view === "list" ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArchiveList works={filteredWorks} />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArchiveGrid works={filteredWorks} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
