import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { blogPosts } from '../../lib/blogs';
import BlogContent from '../../components/BlogContent';
import fs from 'fs';
import path from 'path';

// This tells Next.js to generate static pages for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Eunice Labs`,
    description: post.description,
  };
}

async function getBlogPost(slug: string) {
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return null;
  }

  // Read markdown file
  const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.md`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
      ...post,
      content: fileContent,
    };
  } catch (error) {
    console.error('Error reading blog post:', error);
    return null;
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // No parsing needed - react-markdown handles it

  return (
    <div className="min-h-screen bg-[#FFDAD6] text-lab-text">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/#foundations"
            className="inline-flex items-center gap-2 text-lab-accent hover:text-lab-text transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-sans text-sm uppercase tracking-wider">Back to Foundations</span>
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Markdown content will have the H1 title */}

        {/* Content */}
        <BlogContent content={post.content} />

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-lab-accent/20">
          <div className="flex justify-between items-center">
            {post.order > 1 ? (
              <Link
                href={`/blog/${blogPosts.find(p => p.order === post.order - 1)?.slug}`}
                className="group flex items-center gap-2 text-lab-accent hover:text-lab-text transition-colors"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-lab-text/50 mb-1">Previous</div>
                  <div className="font-serif text-lg">
                    {blogPosts.find(p => p.order === post.order - 1)?.title}
                  </div>
                </div>
              </Link>
            ) : <div></div>}

            {post.order < blogPosts.length ? (
              <Link
                href={`/blog/${blogPosts.find(p => p.order === post.order + 1)?.slug}`}
                className="group flex items-center gap-2 text-lab-accent hover:text-lab-text transition-colors text-right"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-lab-text/50 mb-1">Next</div>
                  <div className="font-serif text-lg">
                    {blogPosts.find(p => p.order === post.order + 1)?.title}
                  </div>
                </div>
                <ArrowLeft size={20} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div></div>}
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-white/20">
        <p className="font-serif text-lab-text/60 italic mb-2">
          &quot;Purpose of Knowledge is Application&quot;
        </p>
        <p className="font-sans text-xs text-lab-text/40 tracking-widest uppercase">
          © {new Date().getFullYear()} Eunice Labs
        </p>
      </footer>
    </div>
  );
}
