'use client';

import React from 'react';
import Navigation from './components/Navigation';
import Section from './components/Section';
import { Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { featuredResources } from './lib/resources';
import Link from 'next/link';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-lab-text font-sans selection:bg-lab-accent/20 selection:text-lab-accent">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto flex flex-col items-center"
        >
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 text-lab-text tracking-tight text-center leading-none">
            Eunice Labs
          </h1>
          <p className="font-sans text-lg md:text-xl lg:text-2xl text-lab-text/70 max-w-3xl mx-auto leading-relaxed text-center">
            Exploring the frontiers of synthetic intelligence through curiosity-driven experimentation.
          </p>
        </motion.div>
      </section>

      {/* About Section */}
      <Section id="about" title="The Lab">
        <div className="font-sans text-lg md:text-xl text-lab-text/80 leading-relaxed max-w-none">
          <p className="mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:text-lab-accent">
            Eunice Labs is an independent AI research initiative run by <a href="https://gaganp.com" target="_blank" rel="noopener noreferrer" className="border-b border-lab-accent/30 hover:border-lab-accent hover:text-lab-accent transition-colors">Gagan</a>, focused on understanding how large language models actually work — particularly their reasoning capabilities, agent reliability, and self-modifying systems.
          </p>
          <p>
            Everything we build is open source. Documenting what works (and what breaks). The goal is simple: push the boundaries of what&apos;s possible with LLMs while making the research accessible to everyone.
          </p>
        </div>
      </Section>

      {/* Current Focus */}
      <Section id="focus" title="Current Focus">
        <div className="bg-white p-8 md:p-12 shadow-sm border border-transparent hover:border-lab-accent/10 transition-colors">
          <p className="font-serif text-2xl md:text-3xl leading-relaxed text-lab-text mb-6">
            We are currently focused on <span className="text-lab-accent italic">reinforcement learning</span> — from policy-gradient fundamentals to how modern <span className="text-lab-accent italic">reasoning and coding agents</span> are trained.
          </p>
          <div className="h-px w-20 bg-lab-accent/20 mb-6"></div>
          <p className="font-sans text-lab-text/70 leading-relaxed max-w-2xl">
            Alongside that, we are exploring harness engineering and agent memory: how tool-use loops stay reliable over long horizons, and what it actually takes for an agent to remember and build on its own past context. Beyond the hype, the goal is real depth in how these systems learn and operate — not repeating what papers claim.
          </p>
        </div>
      </Section>

      {/* Resources */}
      <Section id="resources" title="Resources">
        <div className="bg-white/50 p-6 md:p-8 mb-10 border-l-4 border-lab-accent/30">
          <p className="font-sans text-lab-text/80 leading-relaxed max-w-4xl">
            Important papers I have read and GitHub repos which contain code implementations — spanning foundational architectures, reasoning techniques, and model compression.
          </p>
        </div>

        <div className="space-y-6">
          {featuredResources.map((resource, idx) => (
            <motion.a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group block bg-white hover:bg-white/80 p-6 shadow-sm transition-all border-l-2 border-transparent hover:border-lab-accent cursor-pointer"
            >
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-serif text-xl text-lab-text group-hover:text-lab-accent transition-colors">
                  {resource.title}
                </h3>
                <span className="text-xs font-sans uppercase tracking-widest text-gray-400 group-hover:text-lab-accent/70">
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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-lab-accent border border-lab-accent/30 px-6 py-3 hover:bg-lab-accent hover:text-white transition-all"
          >
            View All Resources <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </Section>

      {/* Connect */}
      <Section id="connect" title="Connect">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          <a href="https://huggingface.co/Eunice-Labs" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center md:items-start p-6 bg-white shadow-sm hover:shadow-md transition-all">
            <span className="text-3xl leading-none mb-4" aria-hidden="true">🤗</span>
            <h3 className="font-serif text-xl mb-2">Hugging Face</h3>
            <p className="text-sm text-gray-500 font-sans">Models, datasets & open research</p>
          </a>
          <a href="mailto:gagan@eunicelabs.com" className="group flex flex-col items-center md:items-start p-6 bg-white shadow-sm hover:shadow-md transition-all">
            <Mail className="w-8 h-8 text-lab-text mb-4 group-hover:text-lab-accent transition-colors" />
            <h3 className="font-serif text-xl mb-2">Email</h3>
            <p className="text-sm text-gray-500 font-sans">Collaborations & inquiries</p>
          </a>
        </div>
      </Section>

      {/* Footer */}
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

export default App;