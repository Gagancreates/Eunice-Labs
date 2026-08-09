import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../lib/blogs';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Writings',
  description: 'Deep technical explorations of the architectures that power modern AI — seq2seq, attention mechanisms, and Transformers.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Writings | Eunice Labs',
    description: 'Deep technical explorations of the architectures that power modern AI.',
    url: '/blog',
    images: ['/opengraph-image.png'],
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen text-lab-text">
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-16 md:pt-36 md:pb-24">
        <PageHeader
          title="Writings"
          intro="Deep technical explorations of the architectures that power modern AI — tracing the path from sequence models through attention to Transformers."
        />

        <div>
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block py-6">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6">
                <span className="font-serif text-lg md:text-2xl text-lab-text group-hover:text-lab-accent transition-colors">
                  {post.title}
                </span>
                <span className="flex items-center gap-3 text-xs font-sans uppercase tracking-widest text-lab-text/40 shrink-0">
                  {post.date}
                  <ArrowUpRight
                    size={14}
                    className="text-lab-accent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </span>
              </div>
              <p className="font-sans text-sm text-lab-text/60 mt-1 max-w-2xl">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
