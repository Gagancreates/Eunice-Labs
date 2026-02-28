import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../lib/blogs';
import BlogCard from '../components/BlogCard';

export const metadata = {
  title: 'Blog | Eunice Labs',
  description: 'Deep technical explorations of the architectures that power modern AI.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen text-lab-text">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lab-accent hover:text-lab-text transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-sans text-sm uppercase tracking-wider">Eunice Labs</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Page header */}
        <div className="mb-16">
          <h1 className="font-serif text-5xl md:text-6xl text-lab-text mb-6 tracking-tight">
            Foundations
          </h1>
          <div className="h-px w-20 bg-lab-accent/20 mb-8" />
          <div className="bg-white/50 p-6 md:p-8 border-l-4 border-lab-accent/30 max-w-3xl">
            <p className="font-sans text-lab-text/80 leading-relaxed">
              Deep technical explorations of the architectures that power modern AI. Each post combines theory, mathematics, diagrams, and production-ready PyTorch code — breaking down complex concepts into buildable components.
            </p>
          </div>
        </div>

        {/* Series intro */}
        <div className="mb-12">
          <p className="font-serif text-2xl md:text-3xl text-lab-text/90 leading-relaxed mb-4">
            From attention mechanisms to transformers
          </p>
          <p className="font-sans text-lab-text/60 leading-relaxed max-w-3xl text-sm">
            This series traces the evolution of neural sequence modeling — from basic seq2seq to the attention revolution that powers modern LLMs. Topics progress from encoder-decoder architectures through Bahdanau and Luong attention mechanisms, culminating in the complete Transformer architecture from &ldquo;Attention is All You Need.&rdquo;
          </p>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-white/20">
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
