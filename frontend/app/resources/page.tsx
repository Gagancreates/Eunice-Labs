'use client';

import React from 'react';
import Navigation from '../components/Navigation';
import { allResources } from '../lib/resources';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ResourcesPage: React.FC = () => {
  const papers = allResources.filter(r => r.type === 'Paper');
  const others = allResources.filter(r => r.type !== 'Paper');

  return (
    <div className="min-h-screen text-lab-text font-sans selection:bg-lab-accent/20 selection:text-lab-accent">
      <Navigation />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <Link
              href="/#resources"
              className="inline-flex items-center gap-2 font-sans text-sm text-lab-text/60 hover:text-lab-accent transition-colors"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="font-serif text-4xl md:text-5xl text-lab-text mb-4 border-b border-lab-accent/20 pb-4 inline-block pr-16">
              All Resources
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/50 p-6 md:p-8 mb-14 border-l-4 border-lab-accent/30"
          >
            <p className="font-sans text-lab-text/80 leading-relaxed">
              Important papers I have read and GitHub repos which contain code implementations — spanning foundational architectures, reasoning techniques, and model compression.
            </p>
          </motion.div>

          {/* Papers */}
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-2xl text-lab-text mb-6 border-b border-lab-accent/20 pb-2"
          >
            Papers
          </motion.h2>

          <div className="space-y-5 mb-14">
            {papers.map((resource, idx) => (
              <motion.a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + idx * 0.08 }}
                className="group block bg-white hover:bg-white/80 p-6 shadow-sm transition-all border-l-2 border-transparent hover:border-lab-accent cursor-pointer"
              >
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-serif text-xl text-lab-text group-hover:text-lab-accent transition-colors pr-4">
                    {resource.title}
                  </h3>
                  <span className="text-xs font-sans uppercase tracking-widest text-gray-400 group-hover:text-lab-accent/70 shrink-0">
                    {resource.type}
                  </span>
                </div>
                <p className="font-sans text-sm text-gray-600 mb-2">
                  {resource.description}
                </p>
                <div className="flex items-center text-xs font-semibold text-lab-accent opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Access Resource <ArrowUpRight size={12} className="ml-1" />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Tutorials & Code */}
          {others.length > 0 && (
            <>
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="font-serif text-2xl text-lab-text mb-6 border-b border-lab-accent/20 pb-2"
              >
                Tutorials &amp; Code
              </motion.h2>

              <div className="space-y-5">
                {others.map((resource, idx) => (
                  <motion.a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + idx * 0.08 }}
                    className="group block bg-white hover:bg-white/80 p-6 shadow-sm transition-all border-l-2 border-transparent hover:border-lab-accent cursor-pointer"
                  >
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-serif text-xl text-lab-text group-hover:text-lab-accent transition-colors pr-4">
                        {resource.title}
                      </h3>
                      <span className="text-xs font-sans uppercase tracking-widest text-gray-400 group-hover:text-lab-accent/70 shrink-0">
                        {resource.type}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-gray-600 mb-2">
                      {resource.description}
                    </p>
                    <div className="flex items-center text-xs font-semibold text-lab-accent opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      Access Resource <ArrowUpRight size={12} className="ml-1" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </>
          )}

        </div>
      </main>

      <footer className="py-12 text-center border-t border-white/20">
        <p className="font-serif text-lab-text/60 italic mb-2">
          &quot;Purpose of Knowledge is Application&quot;
        </p>
        <p className="font-sans text-xs text-lab-text/40 tracking-widest uppercase">
          Built in the open. MIT Licensed. © {new Date().getFullYear()} Eunice Labs.
        </p>
      </footer>
    </div>
  );
};

export default ResourcesPage;
