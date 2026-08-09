import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { allResources } from '../lib/resources';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';

export default function ResourcesPage() {
  const papers = allResources.filter((r) => r.type === 'Paper');
  const others = allResources.filter((r) => r.type !== 'Paper');

  const renderList = (items: typeof allResources) => (
    <div>
      {items.map((resource) => (
        <a
          key={resource.id}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block py-6"
        >
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6">
            <span className="font-serif text-lg md:text-2xl text-lab-text group-hover:text-lab-accent transition-colors">
              {resource.title}
            </span>
            <span className="flex items-center gap-3 text-xs font-sans uppercase tracking-widest text-lab-text/40 shrink-0">
              {resource.type}
              <ArrowUpRight
                size={14}
                className="text-lab-accent opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </span>
          </div>
          <p className="font-sans text-sm text-lab-text/60 mt-1 max-w-2xl">
            {resource.description}
          </p>
        </a>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen text-lab-text">
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-16 md:pt-36 md:pb-24">
        <PageHeader
          title="Resources"
          intro="Important papers I have read and GitHub repos which contain code implementations — spanning foundational architectures, reasoning techniques, and model compression."
        />

        <h2 className="font-serif text-xl md:text-2xl font-semibold text-lab-text mb-4">Papers</h2>
        {renderList(papers)}

        {others.length > 0 && (
          <>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-lab-text mb-4 mt-14">
              Tutorials &amp; Code
            </h2>
            {renderList(others)}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
