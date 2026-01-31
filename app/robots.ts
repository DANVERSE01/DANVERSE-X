export const dynamic = 'force-static';

import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.danverse.ai';

export default function robots(): MetadataRoute.Robots {
  // Netlify-friendly: static metadata route output for /robots.txt.
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
