'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useProgressStore } from '../store';
import { lessons } from '../data/lessons';
import { Check, Lock, ArrowRight, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

const LESSON_TAGS: Record<string, string[]> = {
  'tensors-matrix-ops': ['Foundations', 'Math'],
  'neural-networks-mlps': ['Foundations', 'Architecture'],
  'backprop-gradients': ['Foundations', 'Optimization'],
  'cnns': ['Vision', 'Architecture'],
  'rnns-vanishing-gradients': ['Sequences', 'Architecture'],
  'attention-mechanism': ['Sequences', 'Attention'],
  'transformers': ['Transformers', 'LLMs'],
  'tokenization-embeddings': ['Transformers', 'LLMs'],
};

export function Roadmap() {
  const { completedLessons } = useProgressStore();
  const totalCompleted = completedLessons.length;
  const progressPct = Math.round((totalCompleted / lessons.length) * 100);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-background sticky top-0 z-10 backdrop-blur-sm bg-background/90">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs text-muted uppercase tracking-widest hover:text-accent transition-colors"
          >
            ← Eunice Labs
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-0.5 w-24 bg-border overflow-hidden hidden sm:block">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
              />
            </div>
            <span className="text-xs text-muted font-mono">{totalCompleted}/{lessons.length} complete</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Hero */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-7xl mb-6 text-accent font-serif leading-tight">
              Deep Learning<br />&amp; LLMs
            </h1>
            <p className="text-muted text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              A progressive path through modern AI — from matrix multiplication to Transformers.
              Each concept builds on the last. See it, break it, understand it.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-neutral-500 font-mono">
              <span>{lessons.length} lessons</span>
              <span>·</span>
              <span>Interactive visualisations</span>
              <span>·</span>
              <span>Live playgrounds</span>
              <span>·</span>
              <span>{lessons.reduce((s, l: any) => {
                const mins = parseInt(l.duration || '0');
                return s + mins;
              }, 0)} min total</span>
            </div>
          </motion.div>
        </header>

        {/* Lessons timeline */}
        <div className="relative">
          <div className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-border" />

          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isUnlocked = index <= 2 || completedLessons.includes(lessons[index - 1]?.id);
            const tags = LESSON_TAGS[lesson.id] ?? [];

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
                className={cn(
                  'relative pl-12 md:pl-16 pb-12 group',
                  !isUnlocked && 'opacity-35'
                )}
              >
                {/* Timeline node */}
                <div className={cn(
                  'absolute left-0 md:left-0.5 top-1 w-7 h-7 rounded-sm border-2 flex items-center justify-center bg-background transition-all duration-300',
                  isCompleted
                    ? 'border-accent text-accent bg-accent/5'
                    : isUnlocked
                    ? 'border-muted text-muted group-hover:border-accent group-hover:text-accent'
                    : 'border-border text-neutral-500'
                )}>
                  {isCompleted
                    ? <Check size={12} strokeWidth={3} />
                    : !isUnlocked
                    ? <Lock size={10} />
                    : <span className="text-[10px] font-bold">{index + 1}</span>}
                </div>

                {/* Content */}
                <div className="max-w-xl">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {tags.map(tag => (
                      <span key={tag}
                        className="text-[10px] uppercase tracking-widest border border-border px-2 py-0.5 text-neutral-500">
                        {tag}
                      </span>
                    ))}
                    {'duration' in lesson && (
                      <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                        <Clock size={9} /> {(lesson as any).duration}
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] text-accent uppercase tracking-widest">✓ Done</span>
                    )}
                  </div>

                  <h2 className={cn(
                    'text-xl md:text-2xl mb-2 font-serif transition-colors',
                    isUnlocked ? 'text-accent group-hover:text-foreground' : 'text-muted'
                  )}>
                    {lesson.title}
                  </h2>

                  <p className="text-muted text-sm leading-relaxed mb-4 max-w-lg">
                    {lesson.description}
                  </p>

                  {isUnlocked ? (
                    <Link
                      href={`/learn/lesson/${lesson.id}`}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors border-b border-transparent hover:border-accent pb-0.5"
                    >
                      {isCompleted ? 'Review' : 'Start'} Lesson
                      <ArrowRight size={12} />
                    </Link>
                  ) : (
                    <span className="text-xs uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
                      <Lock size={10} /> Complete previous lesson to unlock
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Completion message */}
        {totalCompleted === lessons.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 border border-accent/30 bg-accent/5 p-6 text-center"
          >
            <div className="text-accent text-2xl font-serif mb-2">All lessons complete.</div>
            <p className="text-muted text-sm">
              You&apos;ve built a foundation in deep learning. The next step: implement these concepts in code.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
