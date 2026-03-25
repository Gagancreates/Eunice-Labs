import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Lesson6Intro = () => (
  <>
    <p>
      The <strong>Attention Mechanism</strong> was the breakthrough that enabled modern language
      models. Instead of compressing an entire sequence into one hidden state (as RNNs must),
      attention allows a model to directly reference <em>any</em> position in the sequence when
      producing each output — with a learned, input-dependent weighting.
    </p>
    <p>
      Each token produces three learned projections: a <strong>Query (Q)</strong> (&quot;what am I
      looking for?&quot;), a <strong>Key (K)</strong> (&quot;what do I contain?&quot;), and a{' '}
      <strong>Value (V)</strong> (&quot;what is my actual content?&quot;). To compute attention from
      token A to token B, we take the dot product of A&apos;s Query with B&apos;s Key to get a{' '}
      <strong>score</strong>.
    </p>
    <p>
      The full formula is:{' '}
      <em>Attention(Q, K, V) = softmax(QK<sup>T</sup> / √d<sub>k</sub>) · V</em>.
      We divide by <em>√d<sub>k</sub></em> (the key dimension) to prevent dot products from
      growing so large that the softmax gradient vanishes. The softmax turns raw scores into a{' '}
      <strong>probability distribution</strong> — the attention weights — which sum to exactly 1.
      These weights are used to compute a weighted sum of the Values: the final{' '}
      <strong>context vector</strong>.
    </p>
    <p>
      <strong>Self-attention</strong> is when Q, K, V all come from the same sequence — each
      position attends to all others. This enables the model to build a rich, context-aware
      representation of every token.
    </p>
  </>
);

export const Lesson6Vis = () => {
  return (
    <div className="flex items-center justify-center gap-10 w-full h-full p-8">
      <div className="flex flex-col gap-5">
        <div className="text-xs text-muted uppercase tracking-widest mb-1">Projections</div>
        {[
          { label: 'Q', desc: 'Query', sub: '"What am I looking for?"', color: '#3b82f6' },
          { label: 'K', desc: 'Key', sub: '"What do I contain?"', color: '#a855f7' },
          { label: 'V', desc: 'Value', sub: '"What is my actual content?"', color: '#22c55e' },
        ].map(({ label, desc, sub, color }) => (
          <motion.div key={label}
            className="flex items-center gap-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, delay: label === 'Q' ? 0 : label === 'K' ? 1 : 2 }}>
            <div className="w-9 h-9 border-2 flex items-center justify-center font-mono font-bold text-sm"
              style={{ borderColor: color, color }}>
              {label}
            </div>
            <div>
              <div className="text-sm text-foreground">{desc}</div>
              <div className="text-xs text-muted">{sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-40 w-px bg-border" />

      <div className="flex flex-col items-center gap-3">
        <div className="text-xs text-muted uppercase tracking-widest mb-1">Attention Calculation</div>

        <motion.div className="flex items-center gap-2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0 }}>
          <div className="w-10 h-8 border border-blue-500 bg-blue-500/10 flex items-center justify-center text-[10px] font-mono text-blue-400">Q</div>
          <span className="text-muted text-sm">·</span>
          <div className="w-10 h-8 border border-purple-500 bg-purple-500/10 flex items-center justify-center text-[10px] font-mono text-purple-400">Kᵀ</div>
          <span className="text-muted">=</span>
          <div className="w-16 h-8 border border-border flex items-center justify-center text-[10px] font-mono text-muted">score</div>
        </motion.div>

        <motion.div className="text-xs text-muted flex items-center gap-2"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}>
          <span>÷</span>
          <span className="border border-border px-2 py-0.5 font-mono">√d<sub>k</sub></span>
          <span className="text-neutral-500">(scale for stability)</span>
        </motion.div>

        <div className="text-muted text-lg">↓</div>

        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}>
          <div className="border border-accent bg-accent/10 px-5 h-8 flex items-center justify-center text-xs font-mono text-accent">
            softmax → weights [0, 1], sum = 1
          </div>
        </motion.div>

        <div className="text-muted text-lg">↓</div>

        <motion.div className="flex items-center gap-2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}>
          <div className="w-14 h-8 border border-accent flex items-center justify-center text-[10px] font-mono text-accent">weight</div>
          <span className="text-muted">×</span>
          <div className="w-10 h-8 border border-green-500 bg-green-500/10 flex items-center justify-center text-[10px] font-mono text-green-400">V</div>
          <span className="text-muted">=</span>
          <div className="w-16 h-8 border-2 border-accent bg-accent/20 flex items-center justify-center text-[10px] font-mono text-accent">context</div>
        </motion.div>
      </div>

      <div className="h-40 w-px bg-border" />

      <div className="flex flex-col gap-3 max-w-[180px]">
        <div className="text-xs text-muted uppercase tracking-widest">Full Formula</div>
        <div className="font-mono text-xs text-foreground bg-neutral-900 border border-border p-4 leading-loose">
          Attention(Q,K,V)<br />
          = softmax(<br />
          &nbsp;&nbsp;QK<sup>T</sup> / √d<sub>k</sub><br />
          ) · V
        </div>
        <div className="text-xs text-muted">d<sub>k</sub> = key dimension<br />(e.g. 64 in GPT)</div>
      </div>
    </div>
  );
};

export const Lesson6Playground = () => {
  const [qBank, setQBank] = useState([1.0, 0.0]);
  const [kThe, setKThe] = useState([0.0, 1.0]);
  const [kBank, setKBank] = useState([1.0, 0.0]);
  const [kRiver, setKRiver] = useState([0.8, 0.6]);

  const dk = 2;

  const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1];

  const rawScores = [
    dot(qBank, kThe),
    dot(qBank, kBank),
    dot(qBank, kRiver),
  ].map(s => s / Math.sqrt(dk));

  const expScores = rawScores.map(Math.exp);
  const sumExp = expScores.reduce((s, e) => s + e, 0);
  const weights = expScores.map(e => e / sumExp);

  const words = ['The', 'bank', 'river'];
  const wordColors = ['#737373', '#ffffff', '#3b82f6'];

  return (
    <div className="flex-1 flex flex-col p-10 gap-8">
      <div className="text-center">
        <h3 className="text-2xl font-serif text-accent mb-2">Self-Attention Simulator</h3>
        <p className="text-muted text-sm">
          Sentence: <em className="text-foreground">&quot;The bank river&quot;</em>. Adjust Query for &quot;bank&quot; and Keys for context
          words to see how attention weights shift.
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-10 items-start justify-center">
        <div className="flex flex-col gap-5 w-full md:w-1/2 border border-border p-7 bg-neutral-900">
          <div className="flex flex-col gap-3">
            <span className="text-xs text-accent uppercase tracking-widest border-b border-border pb-2">
              Query Q for &quot;bank&quot; (2D)
            </span>
            <div className="flex items-center gap-3">
              {['Q[0]', 'Q[1]'].map((lbl, j) => (
                <div key={j} className="flex-1 flex flex-col gap-1">
                  <label className="text-xs text-muted flex justify-between">
                    <span>{lbl}</span>
                    <span className="text-accent font-mono">{qBank[j].toFixed(1)}</span>
                  </label>
                  <input type="range" min="-2" max="2" step="0.1" value={qBank[j]}
                    onChange={e => setQBank(prev => prev.map((v, k) => k === j ? Number(e.target.value) : v))}
                    className="accent-accent" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs text-muted uppercase tracking-widest border-b border-border pb-2">
              Keys K for context words (2D)
            </span>
            {[
              { label: 'K "The"', key: kThe, set: setKThe, color: '#737373' },
              { label: 'K "bank"', key: kBank, set: setKBank, color: '#ffffff' },
              { label: 'K "river"', key: kRiver, set: setKRiver, color: '#3b82f6' },
            ].map(({ label, key, set, color }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xs font-mono w-16" style={{ color }}>{label}</span>
                {[0, 1].map(j => (
                  <div key={j} className="flex-1 flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted">[{j}]</span>
                      <span className="font-mono" style={{ color }}>{key[j].toFixed(1)}</span>
                    </div>
                    <input type="range" min="-2" max="2" step="0.1" value={key[j]}
                      onChange={e => set(prev => prev.map((v, k) => k === j ? Number(e.target.value) : v))}
                      className="accent-accent" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-5">
          <div className="text-xs text-muted uppercase tracking-widest text-center">
            Attention from &quot;bank&quot; → each word (scaled dot product)
          </div>

          <div className="flex items-end justify-center gap-8 h-52 border-b border-border pb-4">
            {words.map((word, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-20">
                <span className="text-xs font-mono" style={{ color: wordColors[i] }}>
                  score: {rawScores[i].toFixed(2)}
                </span>
                <div className="flex-1 flex flex-col justify-end w-full">
                  <motion.div
                    className="w-full transition-all duration-300"
                    style={{
                      height: `${Math.max(weights[i] * 100, 2)}%`,
                      backgroundColor: wordColors[i],
                      opacity: 0.8,
                    }}
                    animate={{ height: `${Math.max(weights[i] * 100, 2)}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-accent">
                  {(weights[i] * 100).toFixed(1)}%
                </span>
                <span className="text-sm font-bold" style={{ color: wordColors[i] }}>{word}</span>
              </div>
            ))}
          </div>

          <div className="bg-neutral-900 border border-border p-4 font-mono text-xs space-y-1">
            <div className="text-muted uppercase tracking-widest mb-2">Attention weights (sum = 1.000)</div>
            {words.map((word, i) => (
              <div key={i} className="flex justify-between">
                <span style={{ color: wordColors[i] }}>&quot;{word}&quot;</span>
                <div className="flex gap-4">
                  <span className="text-muted">raw: {rawScores[i].toFixed(3)}</span>
                  <span style={{ color: wordColors[i] }}>weight: {weights[i].toFixed(3)}</span>
                </div>
              </div>
            ))}
            <div className="pt-1 border-t border-border text-muted">
              Total: {weights.reduce((s, w) => s + w, 0).toFixed(3)}
            </div>
          </div>

          <p className="text-xs text-muted text-center">
            Softmax amplifies differences — small score changes → large weight shifts.
            Try making Q &quot;bank&quot; parallel to K &quot;river&quot; for maximum attention.
          </p>
        </div>
      </div>
    </div>
  );
};
