import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { blogPosts } from '../../lib/blogs';
import BlogContent from '../../components/BlogContent';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
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
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: `${post.title} | Eunice Labs`,
      description: post.description,
      url: `/blog/${post.slug}`,
      tags: post.tags,
      images: ['/opengraph-image.png'],
    },
  };
}

// "Jan 2025" -> "2025-01-01"
function toIsoDate(date: string) {
  const parsed = new Date(`1 ${date}`);
  return isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10);
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

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: toIsoDate(post.date),
    keywords: post.tags.join(', '),
    url: `https://eunicelabs.com/blog/${post.slug}`,
    author: { '@type': 'Organization', name: 'Eunice Labs', url: 'https://eunicelabs.com' },
    publisher: { '@type': 'Organization', name: 'Eunice Labs', url: 'https://eunicelabs.com' },
  };

  return (
    <div className="min-h-screen text-lab-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navigation />

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 pt-7 pb-16 md:pt-32 relative">
        {/* Back arrow: inline above the title on mobile, floated into the
            left margin at title level on large screens */}
        <Link
          href="/blog"
          aria-label="Back to Writings"
          className="group inline-flex text-lab-accent hover:text-lab-text transition-colors mb-8 lg:mb-0 lg:absolute lg:-left-10 lg:top-[5rem]"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </Link>

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

      <Footer />
    </div>
  );
}
