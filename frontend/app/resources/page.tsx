import React from 'react';
import { allResources } from '../lib/resources';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';
import ResourceList from '../components/ResourceList';
import Footer from '../components/Footer';

export default function ResourcesPage() {
  const papers = allResources.filter((r) => r.type === 'Paper');
  const others = allResources.filter((r) => r.type !== 'Paper');

  return (
    <div className="min-h-screen text-lab-text">
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 pt-7 pb-16 md:pt-36 md:pb-24">
        <PageHeader
          title="Resources"
          intro="Important papers I have read and GitHub repos which contain code implementations."
        />

        <h2 className="font-serif text-xl md:text-2xl font-semibold text-lab-text mb-4">Papers</h2>
        <ResourceList items={papers} initialCount={5} />

        {others.length > 0 && (
          <>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-lab-text mb-4 mt-14">
              Tutorials &amp; Code
            </h2>
            <ResourceList items={others} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
