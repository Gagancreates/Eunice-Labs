'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="py-20 md:py-32 px-6 scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl md:text-4xl text-lab-text mb-12 border-b border-lab-accent/20 pb-4 inline-block pr-12"
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </section>
  );
};

export default Section;
