import type { MetadataRoute } from 'next';
import { blogPosts } from './lib/blogs';

const baseUrl = 'https://eunicelabs.com';

// Keep in sync with app/learn/data/lessons.tsx (not importable here —
// it pulls in client components)
const lessonIds = [
  'tensors-matrix-ops',
  'neural-networks-mlps',
  'backprop-gradients',
  'cnns',
  'rnns-vanishing-gradients',
  'attention-mechanism',
  'transformers',
  'tokenization-embeddings',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/blog`, priority: 0.8 },
    { url: `${baseUrl}/learn`, priority: 0.8 },
    { url: `${baseUrl}/resources`, priority: 0.6 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    priority: 0.7,
  }));

  const lessonPages: MetadataRoute.Sitemap = lessonIds.map((id) => ({
    url: `${baseUrl}/learn/lesson/${id}`,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...lessonPages];
}
