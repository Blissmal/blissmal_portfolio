import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://portfolio.blissmal.store', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://portfolio.blissmal.store/work', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://portfolio.blissmal.store/resume', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://portfolio.blissmal.store/services', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://portfolio.blissmal.store/contact', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]
}