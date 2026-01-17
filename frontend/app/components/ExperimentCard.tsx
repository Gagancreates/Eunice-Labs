'use client';

import React from 'react';
import { Experiment } from '../types';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExperimentCardProps {
  experiment: Experiment;
  index: number;
}

const ExperimentCard: React.FC<ExperimentCardProps> = ({ experiment, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-transparent hover:border-lab-accent/10 group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-sans font-semibold tracking-wider text-lab-accent bg-lab-accent/5 px-2 py-1 rounded-sm uppercase">
          {experiment.date}
        </span>
      </div>
      
      <h3 className="font-serif text-2xl text-lab-text mb-3 group-hover:text-lab-accent transition-colors">
        {experiment.title}
      </h3>
      
      <p className="font-sans text-lab-text/70 text-sm leading-relaxed mb-6 flex-grow">
        {experiment.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {experiment.tags.map(tag => (
          <span key={tag} className="text-xs text-gray-500 font-mono">
            #{tag}
          </span>
        ))}
      </div>
      
      <a 
        href={experiment.link} 
        className="inline-flex items-center text-sm font-semibold text-lab-text group-hover:text-lab-accent transition-colors mt-auto"
      >
        View Project <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );
};

export default ExperimentCard;