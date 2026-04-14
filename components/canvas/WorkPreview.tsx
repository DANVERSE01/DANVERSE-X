import Image from "next/image"
import type { WorkItem } from "@/lib/work"

export function WorkPreview({ work }: { work: WorkItem }) {
  if (!work.cover) return null

  return (
    <div className="work-preview">
      <Image src={work.cover} alt={work.title} fill sizes="(max-width: 959px) 100vw, 50vw" className="work-preview__image" />
    </div>
  )
}
