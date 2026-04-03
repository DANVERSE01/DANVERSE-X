import type { MetadataRoute } from "next"
import { env } from "@/lib/env"

const URLS = [
  { url: "/", priority: 1.0, changeFrequency: "weekly" },
  { url: "/3D-architecture-visualization-studio", priority: 0.9, changeFrequency: "weekly" },
  { url: "/3d-product-rendering", priority: 0.9, changeFrequency: "weekly" },
  { url: "/cinematic-ads", priority: 0.9, changeFrequency: "weekly" },
  { url: "/branding", priority: 0.9, changeFrequency: "weekly" },
  { url: "/websites", priority: 0.9, changeFrequency: "weekly" },
  { url: "/faq", priority: 0.8, changeFrequency: "monthly" },
  { url: "/work", priority: 0.8, changeFrequency: "monthly" },
  { url: "/about", priority: 0.7, changeFrequency: "monthly" },
  { url: "/checkout", priority: 0.6, changeFrequency: "monthly" },
  { url: "/revisions", priority: 0.6, changeFrequency: "monthly" },
  { url: "/t&c", priority: 0.5, changeFrequency: "yearly" },
] satisfies Array<{
  url: string
  priority: number
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>
}>

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return URLS.map(({ url, priority, changeFrequency }) => ({
    url: `${env.NEXT_PUBLIC_SITE_URL}${url}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
