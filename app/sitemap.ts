import type { MetadataRoute } from "next"
import { works } from "@/content/work"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://danverse.studio"

  return [
    {
      url: base,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/work`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...works.map((work) => ({
      url: `${base}/work/${work.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
