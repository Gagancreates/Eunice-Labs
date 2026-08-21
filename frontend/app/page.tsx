'use client';

import React from 'react';
import Navigation from './components/Navigation';
import Section from './components/Section';
import Footer from './components/Footer';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
          <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl mb-8 text-lab-text tracking-tight text-center leading-none">
            Eunice Labs
          </h1>
          <p className="font-sans text-base md:text-lg lg:text-xl text-lab-text/70 max-w-3xl mx-auto leading-relaxed text-center">
            Exploring the frontiers of synthetic intelligence through curiosity-driven experimentation.
          </p>
        </motion.div>
      </section>

      {/* About Section */}
      <Section id="about" title="The Lab">
        <div className="font-sans text-base md:text-lg text-lab-text/80 leading-relaxed max-w-none">
          <p className="mb-6 first-letter:text-3xl md:first-letter:text-4xl first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:text-lab-accent">
            Eunice Labs is an independent AI research initiative run by <a href="https://gaganp.com" target="_blank" rel="noopener noreferrer" className="border-b border-lab-accent/30 hover:border-lab-accent hover:text-lab-accent transition-colors">Gagan</a>, focused on understanding how large language models actually work — particularly their reasoning capabilities, agent reliability, and self-modifying systems.
          </p>
          <p>
            Everything we build is open source. Documenting what works (and what breaks). The goal is simple: push the boundaries of what&apos;s possible with LLMs while making the research accessible to everyone.
          </p>
        </div>
      </Section>

      {/* Current Focus */}
      <Section id="focus" title="Current Focus">
        <div className="bg-lab-card p-8 md:p-12 shadow-sm border border-transparent hover:border-lab-accent/10 transition-colors">
          <p className="font-serif text-lg md:text-2xl leading-relaxed text-lab-text mb-6">
            We are currently focused on <span className="text-lab-accent italic">reinforcement learning</span> — from policy-gradient fundamentals to how modern <span className="text-lab-accent italic">reasoning and coding agents</span> are trained.
          </p>
          <p className="font-sans text-lab-text/70 leading-relaxed max-w-2xl">
            Alongside that, we are exploring harness engineering and agent memory: how tool-use loops stay reliable over long horizons, and what it actually takes for an agent to remember and build on its own past context. Beyond the hype, the goal is real depth in how these systems learn and operate — not repeating what papers claim.
          </p>
        </div>
      </Section>

      {/* Connect */}
      <Section id="connect" title="Connect">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          <a href="https://huggingface.co/Eunice-Labs" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center md:items-start p-6 bg-lab-card shadow-sm hover:shadow-md transition-all">
            <Image src="/hf-logo.svg" alt="" width={28} height={28} className="mb-4" />
            <h3 className="font-serif text-base md:text-lg mb-2">Hugging Face</h3>
            <p className="text-sm text-lab-text/50 font-sans">Models, datasets & open research</p>
          </a>
          <a href="mailto:gagan@eunicelabs.com" className="group flex flex-col items-center md:items-start p-6 bg-lab-card shadow-sm hover:shadow-md transition-all">
            <Mail className="w-7 h-7 text-lab-text mb-4 group-hover:text-lab-accent transition-colors" />
            <h3 className="font-serif text-base md:text-lg mb-2">Email</h3>
            <p className="text-sm text-lab-text/50 font-sans">Collaborations & inquiries</p>
          </a>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default App;