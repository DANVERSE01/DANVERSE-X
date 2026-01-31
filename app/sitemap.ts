export const dynamic = 'force-static';

import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.danverse.ai';

type ChangeFrequency = MetadataRoute.Sitemap[number]['changeFrequency'];

type SitemapEntry = {
  url: string;
  priority: number;
  changeFrequency: ChangeFrequency;
};

const URLS: SitemapEntry[] = [
  { url: '/', priority: 1, changeFrequency: 'weekly' },
  { url: '/3D-architecture-visualization-studio', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/3d-product-rendering', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/About', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/faq', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/revisions', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/checkout', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/t&c', priority: 0.5, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return URLS.map((entry) => ({
    url: `${BASE_URL}${entry.url}`,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
