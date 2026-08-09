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

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-sans text-sm text-lab-text/60 hover:text-lab-accent transition-colors mb-8"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl text-lab-text mb-4">
              All Resources
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-14"
          >
            <p className="font-sans text-lab-text/70 leading-relaxed max-w-3xl">
              Important papers I have read and GitHub repos which contain code implementations — spanning foundational architectures, reasoning techniques, and model compression.
            </p>
          </motion.div>

          {/* Papers */}
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-2xl font-semibold text-lab-text mb-6"
          >
            Papers
          </motion.h2>

          <div className="mb-14">
            {papers.map((resource, idx) => (
              <motion.a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + idx * 0.08 }}
                className="group block py-5 cursor-pointer"
              >
                <div className="flex justify-between items-baseline gap-6">
                  <h3 className="font-serif text-xl text-lab-text group-hover:text-lab-accent transition-colors">
                    {resource.title}
                  </h3>
                  <span className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-gray-400 group-hover:text-lab-accent/70 shrink-0">
                    {resource.type}
                    <ArrowUpRight
                      size={12}
                      className="text-lab-accent opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </span>
                </div>
                <p className="font-sans text-sm text-lab-text/60 mt-1 max-w-2xl">
                  {resource.description}
                </p>
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
                className="font-serif text-2xl font-semibold text-lab-text mb-6"
              >
                Tutorials &amp; Code
              </motion.h2>

              <div>
                {others.map((resource, idx) => (
                  <motion.a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + idx * 0.08 }}
                    className="group block py-5 cursor-pointer"
                  >
                    <div className="flex justify-between items-baseline gap-6">
                      <h3 className="font-serif text-xl text-lab-text group-hover:text-lab-accent transition-colors">
                        {resource.title}
                      </h3>
                      <span className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-gray-400 group-hover:text-lab-accent/70 shrink-0">
                        {resource.type}
                        <ArrowUpRight
                          size={12}
                          className="text-lab-accent opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </span>
                    </div>
                    <p className="font-sans text-sm text-lab-text/60 mt-1 max-w-2xl">
                      {resource.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            </>
          )}

        </div>
      </main>

      <footer className="py-12 text-center border-t border-lab-accent/10">
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
