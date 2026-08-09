import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../lib/blogs';

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
      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Page header */}
        <div className="mb-16">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-sans text-sm text-lab-text/60 hover:text-lab-accent transition-colors mb-8"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <h1 className="font-serif text-5xl md:text-6xl text-lab-text tracking-tight">
            Writings
          </h1>
        </div>

        {/* Post list */}
        <div>
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6 py-6"
            >
              <div className="flex items-baseline gap-4 min-w-0">
                <span className="font-serif text-sm text-lab-accent/40">
                  {String(post.order).padStart(2, '0')}
                </span>
                <span className="font-serif text-xl md:text-2xl text-lab-text group-hover:text-lab-accent transition-colors">
                  {post.title}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-lab-text/50 font-sans shrink-0 pl-8 md:pl-0">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
                <ArrowUpRight
                  size={14}
                  className="text-lab-accent opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-lab-accent/10">
        <p className="font-serif text-lab-text/60 italic mb-2">
          &ldquo;Purpose of Knowledge is Application&rdquo;
        </p>
        <p className="font-sans text-xs text-lab-text/40 tracking-widest uppercase">
          © {new Date().getFullYear()} Eunice Labs
        </p>
      </footer>
    </div>
  );
}
