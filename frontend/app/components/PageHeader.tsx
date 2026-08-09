import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  intro?: string;
}

/** Shared header for the section pages so their alignment and type stay identical. */
const PageHeader: React.FC<PageHeaderProps> = ({ title, intro }) => (
  <div className="mb-14">
    <Link
      href="/"
      className="group inline-flex items-center gap-2 font-sans text-sm text-lab-text/60 hover:text-lab-accent transition-colors mb-8"
    >
      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to
      Home
    </Link>
    <h1 className={`font-serif text-4xl md:text-6xl text-lab-text tracking-tight ${intro ? 'mb-4' : ''}`}>
      {title}
    </h1>
    {intro && (
      <p className="font-sans text-sm md:text-base text-lab-text/70 leading-relaxed max-w-3xl">
        {intro}
      </p>
    )}
  </div>
);

export default PageHeader;
