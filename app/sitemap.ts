import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.danverse.ai';
  const lastModified = new Date();

  const routes = [
    '',
    '/About',
    '/3D-architecture-visualization-studio',
    '/3d-product-rendering',
    '/faq',
    '/revisions',
    '/t&c',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
