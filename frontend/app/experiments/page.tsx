import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';

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
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-16 md:pt-36 md:pb-24">
        <PageHeader
          title="Experiments"
          intro="Interactive systems and research artifacts built at the lab — things we made to understand how these models actually work."
        />

        <div>
          {experiments.map((exp) => (
            <Link key={exp.href} href={exp.href} className="group block py-6">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6">
                <span className="font-serif text-lg md:text-2xl text-lab-text group-hover:text-lab-accent transition-colors">
                  {exp.title}
                </span>
                <span className="flex items-center gap-3 text-xs font-sans uppercase tracking-widest text-lab-text/40 shrink-0">
                  {exp.status}
                  <ArrowUpRight
                    size={14}
                    className="text-lab-accent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </span>
              </div>
              <p className="font-sans text-sm text-lab-text/60 mt-1 max-w-2xl">{exp.description}</p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
