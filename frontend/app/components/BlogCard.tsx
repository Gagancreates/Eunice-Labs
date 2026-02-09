'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { BlogPost } from '../lib/blogs';
import Link from 'next/link';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="group h-full bg-white p-8 shadow-sm border border-transparent hover:border-lab-accent/20 transition-all cursor-pointer hover:shadow-md">
          {/* Order number */}
          <div className="text-lab-accent/30 font-serif text-sm mb-3">
            {String(post.order).padStart(2, '0')}
          </div>

          {/* Title */}
          <h3 className="font-serif text-2xl text-lab-text mb-3 group-hover:text-lab-accent transition-colors">
            {post.title}
          </h3>

          {/* Description */}
          <p className="font-sans text-sm text-lab-text/70 mb-4 leading-relaxed">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-sans px-3 py-1 bg-lab-accent/5 text-lab-accent/70 border border-lab-accent/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-lab-text/50 font-sans">
            <div className="flex items-center gap-4">
              <span>{post.date}</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
            <ArrowUpRight
              size={16}
              className="text-lab-accent opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
