import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Experiments',
  description:
    'Interactive systems and research artifacts built at Eunice Labs — from deep learning foundations to agent experiments.',
  alternates: { canonical: '/experiments' },
  openGraph: {
    title: 'Experiments | Eunice Labs',
    description: 'Interactive systems and research artifacts built at Eunice Labs.',
    url: '/experiments',
    images: ['/opengraph-image.png'],
  },
};

interface Experiment {
  title: string;
  status: string;
  description: string;
  href: string;
}

const experiments: Experiment[] = [
  {
    title: 'Deep Learning & LLMs — Interactive',
    status: 'Live',
    description:
      'An interactive path through the foundations — tensors to Transformers in 8 lessons, with live visualisations and playgrounds.',
    href: '/learn',
  },
];

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen text-lab-text">
      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Page header */}
        <div className="mb-16">
          <div className="flex items-center gap-5 mb-6">
            <Link
              href="/"
              aria-label="Back to home"
              className="group text-lab-accent hover:text-lab-text transition-colors"
            >
              <ArrowLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <h1 className="font-serif text-5xl md:text-6xl text-lab-text tracking-tight">
              Experiments
            </h1>
          </div>
          <div className="h-px w-20 bg-lab-accent/20" />
        </div>

        {/* Experiment list */}
        <div className="divide-y divide-lab-accent/10 border-y border-lab-accent/10">
          {experiments.map((exp) => (
            <Link key={exp.href} href={exp.href} className="group block py-8">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6">
                <span className="font-serif text-xl md:text-2xl text-lab-text group-hover:text-lab-accent transition-colors">
                  {exp.title}
                </span>
                <span className="flex items-center gap-3 text-xs text-lab-accent/70 font-sans uppercase tracking-widest shrink-0">
                  {exp.status}
                  <ArrowUpRight
                    size={14}
                    className="text-lab-accent opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
              <p className="font-sans text-sm text-lab-text/70 leading-relaxed max-w-2xl mt-2">
                {exp.description}
              </p>
            </Link>
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
