'use client';

import React from 'react';
import Navigation from './components/Navigation';
import Section from './components/Section';
import ExperimentCard from './components/ExperimentCard';
import { Experiment, Resource } from './types';
import { Github, Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const experiments: Experiment[] = [
  {
    id: '1',
    title: 'Tool Calling Benchmark Suite',
    date: 'Coming Soon',
    description: 'A comprehensive evaluation framework specifically designed to test the reliability, accuracy, and edge-case handling of LLM function calling capabilities across diverse domains.',
    tags: ['evals', 'agents', 'infrastructure'],
    link: '#'
  },
  {
    id: '2',
    title: 'Agent Memory Patterns',
    date: 'Research',
    description: 'Exploring novel architectures for long-term memory in autonomous agents. Investigating vector retrieval hierarchies vs. summary compression techniques for maintaining coherent persona state.',
    tags: ['memory', 'architecture', 'research'],
    link: '#'
  },
  {
    id: '3',
    title: 'Prompt Engineering Library',
    date: 'Alpha',
    description: 'An open-source collection of highly optimized system prompts and few-shot examples for common reasoning tasks. Built to be modular, versioned, and easily integrated into Python codebases.',
    tags: ['prompts', 'open-source', 'utils'],
    link: '#'
  }
];

const resources: Resource[] = [
  {
    id: '1',
    title: 'The Agentic Workflow Manifesto',
    type: 'Paper',
    description: 'Foundational reading on why loops and tools beat raw zero-shot intelligence.',
    url: '#'
  },
  {
    id: '2',
    title: 'LiteLLM Proxy Configs',
    type: 'Tool',
    description: 'My personal configuration setups for routing between Gemini, Claude, and GPT-4 cost-effectively.',
    url: '#'
  },
  {
    id: '3',
    title: 'Synthetic Reasoning Dataset v1',
    type: 'Dataset',
    description: '10k examples of chain-of-thought failures and corrections.',
    url: '#'
  }
];

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
            Eunice Labs is an independent research initiative focused on the practical and philosophical implications of Large Language Models. In a world rushing towards AGI, we believe there is immense value in slowing down to understand the fundamental building blocks of cognition.
          </p>
          <p className="mb-6">
            Run by <a href="https://gaganp.com" target="_blank" rel="noopener noreferrer" className="border-b border-lab-accent/30 hover:border-lab-accent hover:text-lab-accent transition-colors">Gagan</a>, this lab represents a commitment to "learning in public." There are no corporate KPIs here, only the pursuit of interesting questions. How do models reason? How can we give them reliable agency? What happens when software can write itself?
          </p>
          <p>
            Our philosophy is simple: Everything is open source. Knowledge should be free. The best way to learn is to build tools that break, fix them, and document the process.
          </p>
        </div>
      </Section>

      {/* Current Focus */}
      <Section id="focus" title="Current Focus">
        <div className="bg-white p-8 md:p-12 shadow-sm border border-transparent hover:border-lab-accent/10 transition-colors">
          <p className="font-serif text-2xl md:text-3xl leading-relaxed text-lab-text mb-6">
            We are currently obsessed with <span className="text-lab-accent italic">multi-agent systems</span> and the reliability of <span className="text-lab-accent italic">tool calling</span>.
          </p>
          <div className="h-px w-20 bg-lab-accent/20 mb-6"></div>
          <p className="font-sans text-lab-text/70 leading-relaxed max-w-2xl">
            Beyond the hype, we are investigating rigorous benchmarks for agentic behavior and building modular libraries for prompt optimization. The goal is to move from "it works sometimes" to "it works predictably."
          </p>
        </div>
      </Section>

      {/* Experiments */}
      <section id="experiments" className="py-20 md:py-32 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-lab-text mb-16 border-b border-lab-accent/20 pb-4 inline-block pr-12"
          >
            Experiments
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiments.map((exp, index) => (
              <ExperimentCard key={exp.id} experiment={exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <Section id="resources" title="Resources">
        <div className="space-y-6">
          {resources.map((resource, idx) => (
            <motion.div 
              key={resource.id}
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
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Connect */}
      <Section id="connect" title="Connect">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          <a href="https://github.com/Gagancreates" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center md:items-start p-6 bg-white shadow-sm hover:shadow-md transition-all">
            <Github className="w-8 h-8 text-lab-text mb-4 group-hover:text-lab-accent transition-colors" />
            <h3 className="font-serif text-xl mb-2">GitHub</h3>
            <p className="text-sm text-gray-500 font-sans">Follow the open source code</p>
          </a>
          <a href="mailto:gagan@ztutor.app" className="group flex flex-col items-center md:items-start p-6 bg-white shadow-sm hover:shadow-md transition-all">
            <Mail className="w-8 h-8 text-lab-text mb-4 group-hover:text-lab-accent transition-colors" />
            <h3 className="font-serif text-xl mb-2">Email</h3>
            <p className="text-sm text-gray-500 font-sans">Collaborations & inquiries</p>
          </a>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-white/20">
        <p className="font-serif text-lab-text/60 italic mb-2">
          "Chance favors the prepared mind."
        </p>
        <p className="font-sans text-xs text-lab-text/40 tracking-widest uppercase">
          Built in the open. MIT Licensed. © {new Date().getFullYear()} Eunice Labs.
        </p>
      </footer>
    </div>
  );
};

export default App;