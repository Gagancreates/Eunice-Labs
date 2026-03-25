'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgressStore } from '../store';
import { lessons } from '../data/lessons';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

const STEPS = ['Intro', 'Visualisation', 'Playground', 'Questions'] as const;

export function Lesson() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { markCompleted, completedLessons } = useProgressStore();

  const lessonIndex = lessons.findIndex(l => l.id === id);
  const lesson = lessons[lessonIndex];

  const [currentStep, setCurrentStep] = useState(0);
  const [answersRevealed, setAnswersRevealed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCurrentStep(0);
    setAnswersRevealed({});
  }, [id]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted">
        Lesson not found.
      </div>
    );
  }

  const isLastStep = currentStep === STEPS.length - 1;
  const isCompleted = completedLessons.includes(lesson.id);
  const allQuestionsRevealed = lesson.questions.every(q => answersRevealed[q.id]);

  const handleNext = () => {
    if (isLastStep) {
      markCompleted(lesson.id);
      if (lessonIndex < lessons.length - 1) {
        router.push(`/learn/lesson/${lessons[lessonIndex + 1].id}`);
      } else {
        router.push('/learn');
      }
    } else {
      setCurrentStep(s => s + 1);
    }
  };

  const handleReveal = (qId: string) => {
    setAnswersRevealed(prev => ({ ...prev, [qId]: true }));
  };

  const revealAll = () => {
    const all: Record<string, boolean> = {};
    lesson.questions.forEach(q => { all[q.id] = true; });
    setAnswersRevealed(all);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 bg-background/90 backdrop-blur-sm z-50">
        <div className="flex items-center gap-4">
          <Link
            href="/learn"
            className="text-muted hover:text-accent transition-colors flex items-center gap-2 text-xs uppercase tracking-widest">
            <ArrowLeft size={12} /> Roadmap
          </Link>
          <span className="text-neutral-500 text-xs">/</span>
          <span className="text-xs font-bold text-accent hidden sm:block truncate max-w-[200px]">
            {lesson.title}
          </span>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-1 md:gap-3">
          {STEPS.map((step, idx) => (
            <button
              key={step}
              onClick={() => idx < currentStep && setCurrentStep(idx)}
              disabled={idx > currentStep}
              className="flex items-center gap-2 group"
              title={step}
            >
              <div className={cn(
                'w-6 h-6 rounded-sm border flex items-center justify-center text-[10px] font-bold transition-all duration-300',
                idx === currentStep
                  ? 'border-accent bg-accent text-background'
                  : idx < currentStep
                  ? 'border-muted bg-muted/20 text-muted cursor-pointer hover:border-accent hover:text-accent'
                  : 'border-border text-neutral-500 cursor-default'
              )}>
                {idx < currentStep ? '✓' : idx + 1}
              </div>
              <span className={cn(
                'text-[10px] uppercase tracking-widest hidden md:block transition-colors',
                idx === currentStep ? 'text-accent' : idx < currentStep ? 'text-muted' : 'text-neutral-500'
              )}>
                {step}
              </span>
              {idx < STEPS.length - 1 && (
                <span className="text-neutral-500 text-xs hidden md:block">—</span>
              )}
            </button>
          ))}
        </div>

        {'duration' in lesson && (
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-neutral-500">
            <Clock size={11} />
            {(lesson as any).duration}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="flex-1 flex flex-col"
          >
            {/* Step 0: Intro */}
            {currentStep === 0 && (
              <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-20 flex flex-col justify-center">
                <div className="mb-3 text-xs text-neutral-500 uppercase tracking-widest">
                  Lesson {lessonIndex + 1} of {lessons.length}
                </div>
                <h1 className="text-5xl md:text-6xl mb-10 text-accent font-serif leading-tight">
                  {lesson.title}
                </h1>
                <div className={cn(
                  '[&>p]:text-muted [&>p]:text-lg [&>p]:leading-relaxed [&>p]:mb-5',
                  '[&>p>strong]:text-foreground [&>p>em]:text-foreground/80 [&>p>em]:italic',
                  '[&>p>sub]:text-[0.75em] [&>p>sup]:text-[0.75em]',
                )}>
                  {lesson.intro}
                </div>
              </div>
            )}

            {/* Step 1: Visualisation */}
            {currentStep === 1 && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-5xl">
                  <div className="text-xs text-neutral-500 uppercase tracking-widest mb-4 text-center">
                    Visualisation — {lesson.title}
                  </div>
                  <div className="w-full aspect-video border border-border bg-neutral-950 rounded-sm flex items-center justify-center relative overflow-hidden">
                    {lesson.visualisation}
                  </div>
                  <p className="mt-6 text-muted text-center text-sm max-w-2xl mx-auto leading-relaxed">
                    Study the animation above. This is the exact mathematical operation happening inside the model.
                    Notice the relationships between inputs, transformations, and outputs.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Playground */}
            {currentStep === 2 && (
              <div className="flex-1 flex flex-col p-4 md:p-8">
                <div className="flex-1 w-full max-w-6xl mx-auto border border-border bg-neutral-950 rounded-sm flex flex-col overflow-hidden min-h-0">
                  {lesson.playground}
                </div>
              </div>
            )}

            {/* Step 3: Questions */}
            {currentStep === 3 && (
              <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-16 flex flex-col">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl md:text-4xl text-accent font-serif">Conceptual Check</h2>
                  {!allQuestionsRevealed && (
                    <button
                      onClick={revealAll}
                      className="text-xs uppercase tracking-widest text-neutral-500 hover:text-muted transition-colors border border-border px-4 py-2 hover:border-muted">
                      Reveal All
                    </button>
                  )}
                </div>

                <div className="space-y-10">
                  {lesson.questions.map((q, idx) => (
                    <div key={q.id} className="border-l-2 border-border pl-6 hover:border-muted transition-colors">
                      <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2">
                        Question {idx + 1} of {lesson.questions.length}
                      </div>
                      <p className="text-lg md:text-xl text-accent leading-relaxed mb-5 font-serif">
                        {q.text}
                      </p>

                      {!answersRevealed[q.id] ? (
                        <button
                          onClick={() => handleReveal(q.id)}
                          className="text-xs uppercase tracking-widest border border-border px-6 py-3 hover:border-accent hover:text-accent transition-colors text-muted"
                        >
                          Reveal Answer
                        </button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-muted leading-relaxed text-base [&>strong]:text-foreground [&>em]:text-foreground/80"
                        >
                          {q.answer}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                {allQuestionsRevealed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-12 border border-border bg-neutral-900 p-5 text-sm text-muted"
                  >
                    <strong className="text-accent block mb-1">All questions answered.</strong>
                    You can now complete this lesson and unlock the next one.
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-5 flex items-center justify-between bg-background z-50">
        <button
          onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
          disabled={currentStep === 0}
          className="text-xs uppercase tracking-widest px-6 py-3 border border-transparent hover:border-border disabled:opacity-20 disabled:pointer-events-none transition-colors flex items-center gap-2 text-muted hover:text-accent"
        >
          <ArrowLeft size={12} /> Previous
        </button>

        <div className="flex items-center gap-2">
          {STEPS.map((_, idx) => (
            <div key={idx} className={cn(
              'h-0.5 transition-all duration-300',
              idx === currentStep ? 'w-8 bg-accent' : idx < currentStep ? 'w-4 bg-muted' : 'w-4 bg-border'
            )} />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={isLastStep && !allQuestionsRevealed && !isCompleted}
          className="text-xs uppercase tracking-widest px-8 py-3 bg-accent text-background hover:bg-accent/90 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-2 font-bold"
        >
          {isLastStep
            ? isCompleted ? 'Next Lesson' : 'Complete Lesson'
            : 'Continue'}
          {isLastStep && !isCompleted ? <CheckCircle2 size={14} /> : <ArrowRight size={14} />}
        </button>
      </footer>
    </div>
  );
}
