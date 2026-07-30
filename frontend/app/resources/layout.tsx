import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Curated papers and implementation guides on attention mechanisms, Transformers, and deep learning foundations.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Resources | Eunice Labs',
    description:
      'Curated papers and implementation guides on attention mechanisms, Transformers, and deep learning foundations.',
    url: '/resources',
    images: ['/opengraph-image.png'],
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
