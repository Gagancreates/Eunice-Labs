import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Lesson7Intro = () => (
  <>
    <p>
      The <strong>Transformer</strong> architecture (&quot;Attention Is All You Need&quot;, 2017) replaces
      recurrence entirely with attention. Its core innovation is <strong>Multi-Head Attention</strong>:
      instead of one attention operation, the model runs several in parallel, each with its own
      learned Q, K, V projections. The outputs of all heads are concatenated and projected — giving
      the model multiple &quot;perspectives&quot; on the same sequence simultaneously.
    </p>
    <p>
      Each Transformer block contains two sub-layers: <strong>Multi-Head Attention</strong> followed
      by a <strong>Feed-Forward Network</strong> (FFN) — two linear layers with a non-linearity
      (usually GELU) between them. Critically, both sub-layers use <strong>residual connections</strong>{' '}
      (y = F(x) + x) and <strong>Layer Normalization</strong>, which stabilize training in very
      deep networks and allow gradients to flow directly.
    </p>
    <p>
      Since Transformers process all tokens simultaneously (unlike RNNs), they have no inherent
      sense of order. <strong>Positional Encoding</strong> is added to each token&apos;s embedding to
      inject position information. The original paper used sinusoidal functions; modern models
      often use learned embeddings or rotary position encodings (RoPE).
    </p>
    <p>
      The architecture splits into <strong>Encoders</strong> (BERT — bidirectional, good for
      understanding) and <strong>Decoders</strong> (GPT — autoregressive, good for generation).
      Modern LLMs like GPT-4 stack 96+ decoder blocks, each with 96 attention heads.
    </p>
  </>
);

export const Lesson7Vis = () => {
  return (
    <div className="flex items-center justify-center gap-16 w-full h-full p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="text-xs text-muted uppercase tracking-widest">Input</div>
        <div className="flex gap-2">
          <div className="border border-border px-3 py-2 text-xs text-muted font-mono bg-neutral-900">Word Embed</div>
          <span className="text-muted self-center">+</span>
          <div className="border border-border px-3 py-2 text-xs text-muted font-mono bg-neutral-900">Pos Encode</div>
        </div>
      </div>

      <div className="text-muted text-xl">→</div>

      <div className="flex flex-col gap-0 border-2 border-accent/40 bg-neutral-950 relative">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-accent/60 uppercase tracking-widest whitespace-nowrap">
          Transformer Block (× N)
        </div>

        <div className="flex items-center border-b border-border/50">
          <div className="flex flex-col items-center border-r border-border/50 px-4 py-3 gap-1">
            <div className="text-[9px] text-muted uppercase tracking-widest">LayerNorm</div>
            <div className="w-28 h-8 bg-neutral-900 border border-border flex items-center justify-center text-xs text-muted">
              Normalize
            </div>
          </div>
          <div className="flex flex-col items-center px-4 py-3 gap-1">
            <div className="text-[9px] text-muted uppercase tracking-widest">Feed-Forward</div>
            <div className="w-32 h-8 bg-neutral-900 border border-border flex items-center justify-center text-xs text-muted">
              Linear → GELU → Linear
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex flex-col items-center border-r border-border/50 px-4 py-3 gap-1">
            <div className="text-[9px] text-muted uppercase tracking-widest">LayerNorm</div>
            <div className="w-28 h-8 bg-neutral-900 border border-border flex items-center justify-center text-xs text-muted">
              Normalize
            </div>
          </div>
          <div className="flex flex-col items-center px-4 py-3 gap-2">
            <div className="text-[9px] text-muted uppercase tracking-widest">Multi-Head Attention</div>
            <div className="flex gap-1.5">
              {['H₁', 'H₂', 'H₃', 'H₄'].map(h => (
                <motion.div key={h}
                  className="w-8 h-8 bg-neutral-900 border border-accent/40 flex items-center justify-center text-[9px] text-accent/70 font-mono"
                  animate={{ borderColor: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.2)'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: parseInt(h[1]) * 0.4 }}>
                  {h}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute -left-7 top-0 bottom-0 flex flex-col justify-around pointer-events-none">
          <svg width="24" height="60" viewBox="0 0 24 60">
            <path d="M 12 0 L 4 0 L 4 60 L 12 60" stroke="#333" strokeWidth="1.5" fill="none" />
            <polygon points="9,56 12,60 15,56" fill="#555" />
          </svg>
          <svg width="24" height="60" viewBox="0 0 24 60">
            <path d="M 12 0 L 4 0 L 4 60 L 12 60" stroke="#333" strokeWidth="1.5" fill="none" />
            <polygon points="9,56 12,60 15,56" fill="#555" />
          </svg>
        </div>
        <div className="absolute -left-14 top-1/4 text-[9px] text-neutral-500 rotate-[-90deg] whitespace-nowrap">residual +</div>
        <div className="absolute -left-14 top-3/4 text-[9px] text-neutral-500 rotate-[-90deg] whitespace-nowrap">residual +</div>
      </div>

      <div className="text-muted text-xl">→</div>

      <div className="flex flex-col items-center gap-3">
        <div className="text-xs text-muted uppercase tracking-widest">Output</div>
        <div className="border border-border px-4 py-2 text-xs text-muted font-mono bg-neutral-900">
          Contextual Embeddings
        </div>
        <div className="text-[9px] text-neutral-500 text-center max-w-[120px]">
          Each token now &quot;knows&quot; about all others
        </div>
      </div>
    </div>
  );
};

export const Lesson7Playground = () => {
  const [activeHead, setActiveHead] = useState(0);

  const words = ['The', 'cat', 'sat', 'on', 'the', 'mat'];

  const headDescriptions = [
    {
      name: 'Head 1 — Syntactic Flow',
      desc: 'Focuses on the immediately following word. Captures local sequential dependencies and basic word order.',
    },
    {
      name: 'Head 2 — Subject–Verb',
      desc: 'Links subjects to their verbs ("cat" ↔ "sat"). Captures grammatical relationships across distance.',
    },
    {
      name: 'Head 3 — Prepositional',
      desc: 'Links prepositions to their arguments ("on" → "cat", "mat"). Captures spatial and relational structure.',
    },
  ];

  const attentionPatterns = [
    [
      [0.05, 0.85, 0.04, 0.02, 0.02, 0.02],
      [0.02, 0.05, 0.85, 0.04, 0.02, 0.02],
      [0.02, 0.02, 0.05, 0.85, 0.03, 0.03],
      [0.02, 0.02, 0.02, 0.05, 0.85, 0.04],
      [0.02, 0.02, 0.02, 0.02, 0.05, 0.87],
      [0.02, 0.02, 0.02, 0.02, 0.02, 0.90],
    ],
    [
      [0.90, 0.04, 0.02, 0.02, 0.01, 0.01],
      [0.05, 0.08, 0.82, 0.02, 0.02, 0.01],
      [0.02, 0.88, 0.05, 0.02, 0.02, 0.01],
      [0.02, 0.02, 0.02, 0.92, 0.01, 0.01],
      [0.02, 0.02, 0.02, 0.02, 0.90, 0.02],
      [0.02, 0.02, 0.82, 0.03, 0.04, 0.07],
    ],
    [
      [0.92, 0.02, 0.02, 0.02, 0.01, 0.01],
      [0.02, 0.92, 0.02, 0.02, 0.01, 0.01],
      [0.02, 0.02, 0.92, 0.02, 0.01, 0.01],
      [0.02, 0.32, 0.08, 0.08, 0.06, 0.44],
      [0.02, 0.02, 0.02, 0.02, 0.90, 0.02],
      [0.02, 0.02, 0.04, 0.86, 0.04, 0.02],
    ],
  ];

  const pattern = attentionPatterns[activeHead];

  return (
    <div className="flex-1 flex flex-col p-10 gap-8">
      <div className="text-center">
        <h3 className="text-2xl font-serif text-accent mb-2">Multi-Head Attention Explorer</h3>
        <p className="text-muted text-sm">
          Switch heads to see how each &quot;lens&quot; focuses on different word relationships.
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-10 items-start justify-center">
        <div className="flex flex-col gap-5 w-full md:w-72 border border-border p-7 bg-neutral-900">
          <span className="text-xs text-muted uppercase tracking-widest border-b border-border pb-2">Select Attention Head</span>
          <div className="flex flex-col gap-2">
            {[0, 1, 2].map(h => (
              <button key={h} onClick={() => setActiveHead(h)}
                className={cn(
                  'py-3 px-4 border text-sm text-left transition-colors',
                  activeHead === h
                    ? 'border-accent text-accent bg-accent/5'
                    : 'border-border text-muted hover:border-muted'
                )}>
                Head {h + 1}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-border text-sm text-muted leading-relaxed">
            <strong className="text-foreground block mb-1">{headDescriptions[activeHead].name}</strong>
            {headDescriptions[activeHead].desc}
          </div>

          <div className="text-xs text-muted border border-border p-3 bg-neutral-950">
            <strong className="text-foreground block mb-1">Multi-Head Insight</strong>
            All three heads run in parallel and their outputs are concatenated.
            The model learns <em>which</em> relationships to specialize in.
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="text-xs text-muted uppercase tracking-widest">Attention Matrix — row attends to column</div>

          <div className="flex items-end gap-1">
            <div className="w-14" />
            {words.map((w, i) => (
              <div key={i} className="w-10 text-center text-[10px] text-muted" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', height: 48 }}>
                {w}
              </div>
            ))}
          </div>

          {words.map((rowWord, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-14 text-right text-xs text-muted pr-2 truncate">{rowWord}</div>
              {words.map((_, j) => {
                const w = pattern[i][j];
                return (
                  <motion.div key={j}
                    className="w-10 h-10 flex items-center justify-center text-[9px] font-mono transition-all duration-500 cursor-default"
                    style={{
                      backgroundColor: `rgba(255, 255, 255, ${w * 0.85})`,
                      color: w > 0.5 ? '#000' : '#444',
                    }}
                    title={`${rowWord} → ${words[j]}: ${(w * 100).toFixed(1)}%`}>
                    {w > 0.06 ? (w * 100).toFixed(0) + '%' : ''}
                  </motion.div>
                );
              })}
            </div>
          ))}

          <div className="flex gap-6 text-xs text-muted mt-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-3 bg-white" />
              <span>high attention</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-3 bg-neutral-900 border border-border" />
              <span>low attention</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
