'use client';

import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="obsidian-theme">
      <div
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <style jsx global>{`
        .obsidian-theme {
          @apply max-w-none;
          line-height: 1.6;
        }

        /* HEADINGS - Clear hierarchy with breathing room */
        .markdown-content h1 {
          @apply font-serif font-bold tracking-tight;
          font-size: 2.5rem;
          line-height: 1.2;
          margin-top: 2em;
          margin-bottom: 0.5em;
          color: #2d2d2d;
          border-bottom: 2px solid #e0e0e0;
          padding-bottom: 0.5rem;
        }

        .markdown-content h1:first-child {
          margin-top: 0;
        }

        .markdown-content h2 {
          @apply font-serif font-semibold;
          font-size: 2rem;
          line-height: 1.3;
          margin-top: 2em;
          margin-bottom: 0.5em;
          color: #2d2d2d;
          border-bottom: 1px solid #e8e8e8;
          padding-bottom: 0.3rem;
        }

        .markdown-content h3 {
          @apply font-serif font-semibold;
          font-size: 1.5rem;
          line-height: 1.4;
          margin-top: 2em;
          margin-bottom: 0.5em;
          color: #3d3d3d;
        }

        .markdown-content h4 {
          @apply font-serif font-medium;
          font-size: 1.25rem;
          line-height: 1.4;
          margin-top: 2em;
          margin-bottom: 0.5em;
          color: #4d4d4d;
        }

        /* PARAGRAPHS */
        .markdown-content p {
          @apply font-sans;
          font-size: 1.0625rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          color: #3d3d3d;
        }

        /* STRONG & EM */
        .markdown-content strong {
          font-weight: 600;
          color: #2d2d2d;
        }

        .markdown-content em {
          font-style: italic;
          color: #5d5d5d;
        }

        /* CODE */
        .markdown-content code {
          font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
          font-size: 0.9em;
          background: rgba(0, 0, 0, 0.05);
          color: #eb5757;
          padding: 0.15em 0.4em;
          border-radius: 4px;
        }

        .markdown-content pre {
          background: #1e1e2e;
          border-radius: 8px;
          padding: 1.2em;
          margin: 2rem 0;
          overflow-x: auto;
        }

        .markdown-content pre code {
          font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
          background: transparent;
          color: #cdd6f4;
          padding: 0;
          font-size: 0.95rem;
          line-height: 1.6;
          border-radius: 0;
        }

        /* LISTS */
        .markdown-content ul,
        .markdown-content ol {
          @apply font-sans;
          margin: 1.5rem 0;
          padding-left: 1.5em;
          font-size: 1.0625rem;
          line-height: 1.8;
        }

        .markdown-content ul {
          list-style-type: disc;
        }

        .markdown-content ol {
          list-style-type: decimal;
        }

        .markdown-content li {
          margin-bottom: 0.4em;
          color: #3d3d3d;
        }

        .markdown-content li::marker {
          color: #999;
        }

        .markdown-content li > p {
          margin-bottom: 0.4em;
        }

        .markdown-content li ul,
        .markdown-content li ol {
          margin-top: 0.4em;
          margin-bottom: 0.4em;
        }

        /* BLOCKQUOTES */
        .markdown-content blockquote {
          background: rgba(0, 0, 0, 0.02);
          border-left: 3px solid #a0a0a0;
          padding: 0.8rem 1em;
          margin: 1.5rem 0;
          font-style: italic;
          color: #5d5d5d;
        }

        /* LINKS */
        .markdown-content a {
          color: #6366f1;
          text-decoration: none;
          border-bottom: 1px solid #6366f1;
          transition: all 0.2s;
        }

        .markdown-content a:hover {
          border-bottom: 2px solid #6366f1;
          color: #4f46e5;
        }

        /* HORIZONTAL RULES */
        .markdown-content hr {
          border: none;
          border-top: 2px solid #e8e8e8;
          margin: 3rem 0;
        }

        /* IMAGES */
        .markdown-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 2rem auto;
          display: block;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        /* TABLES */
        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-size: 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          overflow: hidden;
        }

        .markdown-content th {
          @apply font-serif;
          background: #f5f5f5;
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 600;
          border-bottom: 1px solid #d0d0d0;
          border-right: 1px solid #e8e8e8;
        }

        .markdown-content th:last-child {
          border-right: none;
        }

        .markdown-content td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e8e8e8;
          border-right: 1px solid #f0f0f0;
        }

        .markdown-content td:last-child {
          border-right: none;
        }

        .markdown-content tbody tr:nth-child(even) {
          background: rgba(0, 0, 0, 0.02);
        }

        .markdown-content tbody tr:hover {
          background: rgba(0, 0, 0, 0.04);
        }

        /* MATH/LATEX */
        .markdown-content .katex {
          font-size: 1.15em;
        }

        .markdown-content .katex-display {
          background: #f9f9f9;
          border-radius: 6px;
          padding: 1.5rem;
          margin: 2rem 0;
          overflow-x: auto;
          border: 1px solid #e8e8e8;
        }

        .markdown-content .katex-inline {
          padding: 0 0.2rem;
        }

        /* CODE BLOCKS - Special styling */
        .markdown-content pre.language-plaintext,
        .markdown-content pre.language- {
          background: #fafafa;
          border: 1px solid #e0e0e0;
          color: #2d2d2d;
        }

        .markdown-content pre.language-plaintext code,
        .markdown-content pre.language- code {
          color: #2d2d2d;
        }
      `}</style>
    </div>
  );
};

export default MarkdownRenderer;
