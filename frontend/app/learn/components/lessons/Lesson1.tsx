import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const PAIR_COLORS = ['#ef4444', '#3b82f6', '#22c55e'];

export const Lesson1Intro = () => (
  <>
    <p>
      Deep learning is fundamentally about moving numbers through structured containers called{' '}
      <strong>Tensors</strong> — n-dimensional arrays. A <strong>0D tensor</strong> (scalar) is a
      single number like <em>3.14</em>. A <strong>1D tensor</strong> (vector) is a list with shape{' '}
      <em>(n,)</em>. A <strong>2D tensor</strong> (matrix) has shape <em>(rows, cols)</em>.
      Deep networks routinely work with 4D tensors (batch × channels × height × width).
    </p>
    <p>
      The most critical operation in all of deep learning is <strong>Matrix Multiplication</strong>.
      When input data flows through a neural network layer, the input matrix of shape{' '}
      <em>(m × n)</em> is multiplied by a weight matrix of shape <em>(n × k)</em>, producing an
      output of shape <em>(m × k)</em>. The inner dimensions <strong>must always match</strong> —
      this is the one rule you cannot violate.
    </p>
    <p>
      The <strong>dot product</strong> is the atomic building block: multiply corresponding
      elements, then sum. Every linear layer — from a simple regression to GPT-4 — reduces to
      exactly this operation, scaled up by billions of parameters. Understanding this is
      understanding the heartbeat of neural networks.
    </p>
  </>
);

export const Lesson1Vis = () => {
  const pairs = [
    { a: 1, b: 4, product: 4 },
    { a: 2, b: 5, product: 10 },
    { a: 3, b: 6, product: 18 },
  ];
  const total = 32;

  return (
    <div className="flex flex-col items-center justify-center gap-10 font-mono w-full h-full p-8">
      <div className="flex items-center gap-8 text-xl">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted uppercase tracking-widest">Row vector</span>
          <div className="flex gap-5 border-l-2 border-r-2 border-border px-6 py-4">
            {pairs.map((p, i) => (
              <motion.span
                key={i}
                style={{ color: PAIR_COLORS[i] }}
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.55 }}
                className="font-bold text-2xl"
              >
                {p.a}
              </motion.span>
            ))}
          </div>
          <span className="text-xs text-neutral-500">shape: (1, 3)</span>
        </div>

        <span className="text-muted text-3xl">·</span>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted uppercase tracking-widest">Column vector</span>
          <div className="flex flex-col gap-4 border-l-2 border-r-2 border-border px-6 py-4">
            {pairs.map((p, i) => (
              <motion.span
                key={i}
                style={{ color: PAIR_COLORS[i] }}
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.55 }}
                className="font-bold text-2xl text-center"
              >
                {p.b}
              </motion.span>
            ))}
          </div>
          <span className="text-xs text-neutral-500">shape: (3, 1)</span>
        </div>

        <span className="text-muted text-3xl">=</span>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted uppercase tracking-widest">Scalar output</span>
          <motion.div
            className="border-2 border-accent text-accent px-10 py-4 text-4xl font-bold"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.65 }}
          >
            {total}
          </motion.div>
          <span className="text-xs text-neutral-500">shape: (1, 1)</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
        {pairs.map((p, i) => (
          <React.Fragment key={i}>
            <motion.span
              style={{ color: PAIR_COLORS[i] }}
              className="bg-neutral-900 border border-border px-3 py-1.5 rounded-sm font-mono"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.55 }}
            >
              ({p.a} × {p.b} = <strong>{p.product}</strong>)
            </motion.span>
            {i < pairs.length - 1 && (
              <span className="text-neutral-500 text-lg font-bold">+</span>
            )}
          </React.Fragment>
        ))}
        <span className="text-muted ml-1">
          = <strong className="text-accent">{total}</strong>
        </span>
      </div>

      <div className="text-xs text-muted border border-border px-6 py-2 bg-neutral-900">
        Rule: <span className="text-foreground">(1 × 3)</span> · <span className="text-foreground">(3 × 1)</span> → inner dims match → result shape <span className="text-foreground">(1 × 1)</span>
      </div>
    </div>
  );
};

export const Lesson1Playground = () => {
  const [a, setA] = useState([1, 2, 3]);
  const [b, setB] = useState([4, 5, 6]);

  const products = a.map((ai, i) => ai * b[i]);
  const result = products.reduce((s, p) => s + p, 0);

  const updateA = (i: number, val: number) => {
    const next = [...a]; next[i] = val; setA(next);
  };
  const updateB = (i: number, val: number) => {
    const next = [...b]; next[i] = val; setB(next);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-10 gap-10">
      <div className="text-center">
        <h3 className="text-2xl font-serif text-accent mb-2">Interactive Dot Product</h3>
        <p className="text-muted text-sm">Edit any value — the result updates instantly. Watch the color-coded pairs.</p>
      </div>

      <div className="flex items-center gap-10 font-mono">
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs text-muted uppercase tracking-widest">Input</span>
          <div className="flex gap-4 border-l-2 border-r-2 border-border px-6 py-4">
            {a.map((val, i) => (
              <input
                key={i}
                type="number"
                value={val}
                onChange={e => updateA(i, Number(e.target.value))}
                className="w-14 bg-transparent border-b-2 text-center focus:outline-none text-xl font-bold transition-colors"
                style={{ color: PAIR_COLORS[i], borderColor: PAIR_COLORS[i] + '60' }}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-500">shape: (1, 3)</span>
        </div>

        <span className="text-muted text-3xl">·</span>

        <div className="flex flex-col items-center gap-3">
          <span className="text-xs text-muted uppercase tracking-widest">Weights</span>
          <div className="flex flex-col gap-3 border-l-2 border-r-2 border-border px-6 py-4">
            {b.map((val, i) => (
              <input
                key={i}
                type="number"
                value={val}
                onChange={e => updateB(i, Number(e.target.value))}
                className="w-14 bg-transparent border-b-2 text-center focus:outline-none text-xl font-bold transition-colors"
                style={{ color: PAIR_COLORS[i], borderColor: PAIR_COLORS[i] + '60' }}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-500">shape: (3, 1)</span>
        </div>

        <span className="text-muted text-3xl">=</span>

        <div className="flex flex-col items-center gap-3">
          <span className="text-xs text-muted uppercase tracking-widest">Output</span>
          <div className="border-2 border-accent px-10 py-4 text-accent text-4xl font-bold min-w-[6rem] text-center">
            {result}
          </div>
          <span className="text-xs text-neutral-500">shape: (1, 1)</span>
        </div>
      </div>

      <div className="font-mono text-sm bg-neutral-900 px-8 py-4 border border-border w-full max-w-xl">
        <div className="text-muted mb-2 text-xs uppercase tracking-widest">Expansion:</div>
        <div className="flex flex-wrap gap-2 items-center justify-center">
          {products.map((prod, i) => (
            <React.Fragment key={i}>
              <span style={{ color: PAIR_COLORS[i] }}>
                ({a[i]} × {b[i]} = {prod})
              </span>
              {i < products.length - 1 && <span className="text-neutral-500">+</span>}
            </React.Fragment>
          ))}
          <span className="text-muted">
            = <span className="text-accent font-bold">{result}</span>
          </span>
        </div>
      </div>

      <p className="text-xs text-neutral-500 text-center">
        Try setting all inputs to 0 — what happens? Or set all weights to the same value?
      </p>
    </div>
  );
};
