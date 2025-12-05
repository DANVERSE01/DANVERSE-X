import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://danverse.ai'
  
  const routes = [
    '',
    '/About',
    '/faq',
    '/revisions',
    '/t&c',
    '/work',
    '/3d-product-rendering',
    '/3D-architecture-visualization-studio',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
