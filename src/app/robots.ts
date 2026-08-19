import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dharma-os.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/v1/suno', '/api/v1/shloka?*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
