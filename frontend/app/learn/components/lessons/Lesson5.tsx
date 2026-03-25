import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Lesson5Intro = () => (
  <>
    <p>
      A standard neural network treats every input independently. But language, audio, and time-
      series data are <em>sequential</em> — order matters, and earlier inputs influence later ones.{' '}
      <strong>Recurrent Neural Networks (RNNs)</strong> address this by maintaining a{' '}
      <strong>hidden state</strong> that is passed from one time step to the next:
      {' '}<em>h</em><sub>t</sub> = tanh(W<sub>h</sub>·h<sub>t-1</sub> + W<sub>x</sub>·x<sub>t</sub> + b).
    </p>
    <p>
      This hidden state acts as a kind of &quot;memory.&quot; But it comes with a fatal flaw:{' '}
      the <strong>Vanishing Gradient Problem</strong>. During backpropagation through time (BPTT),
      the gradient is multiplied by the same weight matrix at every step. If the recurrent weight
      has magnitude less than 1, the gradient shrinks exponentially — the network{' '}
      <strong>forgets</strong>. If greater than 1, it explodes, causing instability.
    </p>
    <p>
      The solution came with <strong>Long Short-Term Memory (LSTM)</strong> networks (Hochreiter &amp;
      Schmidhuber, 1997). LSTMs introduce a <strong>cell state</strong> — a direct &quot;highway&quot; for
      gradient flow — controlled by three gates: the <strong>forget gate</strong> (what to discard),
      the <strong>input gate</strong> (what new information to store), and the <strong>output gate</strong>{' '}
      (what to expose). GRUs (Gated Recurrent Units) are a simpler, often equally effective variant.
      Both are now largely superseded by Transformers for most tasks.
    </p>
  </>
);

export const Lesson5Vis = () => {
  const steps = [0, 1, 2, 3, 4];

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full h-full p-8">
      <div className="text-xs text-muted uppercase tracking-widest">Unrolled RNN through time</div>

      <div className="flex items-center gap-2">
        {steps.map((t) => (
          <React.Fragment key={t}>
            <div className="flex flex-col items-center gap-3">
              <div className="w-11 h-11 border border-border bg-neutral-900 flex items-center justify-center text-xs text-muted font-mono">
                x<sub>{t}</sub>
              </div>

              <div className="w-px h-5 bg-border mx-auto" />

              <div className="w-14 h-14 border-2 border-accent bg-neutral-950 flex items-center justify-center text-xs text-accent font-mono relative z-10">
                h<sub>{t}</sub>
              </div>

              <div className="w-px h-5 bg-border mx-auto" />

              <div className="w-11 h-11 border border-border bg-neutral-900 flex items-center justify-center text-xs text-muted font-mono">
                y<sub>{t}</sub>
              </div>
            </div>

            {t < 4 && (
              <div className="flex flex-col items-center gap-3 relative" style={{ marginTop: '-5px' }}>
                <div className="h-11" />
                <div className="h-5" />
                <div className="relative flex items-center" style={{ width: 48, height: 56 }}>
                  <svg width="48" height="56" viewBox="0 0 48 56" style={{ position: 'absolute', top: 0, left: 0 }}>
                    <line x1="0" y1="28" x2="40" y2="28" stroke="#555" strokeWidth="1.5" />
                    <polygon points="36,24 44,28 36,32" fill="#555" />
                    <motion.circle r="3" fill="#ffffff"
                      animate={{ cx: [0, 44] }}
                      transition={{ duration: 1, repeat: Infinity, delay: t * 0.25, ease: 'linear' }}>
                    </motion.circle>
                  </svg>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex gap-6 text-xs text-muted">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border border-border bg-neutral-900" />
          <span>input / output</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-accent bg-neutral-950" />
          <span>hidden state (memory)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-px bg-muted" />
          <span>recurrent connection</span>
        </div>
      </div>

      <div className="text-xs text-muted font-mono border border-border px-5 py-2 bg-neutral-900">
        h<sub>t</sub> = tanh( W<sub>h</sub> · h<sub>t-1</sub> + W<sub>x</sub> · x<sub>t</sub> + b )
      </div>
    </div>
  );
};

export const Lesson5Playground = () => {
  const [weight, setWeight] = useState(0.9);
  const STEPS = 20;

  const history: number[] = [1.0];
  for (let i = 1; i < STEPS; i++) {
    history.push(history[i - 1] * weight);
  }

  const finalSignal = history[STEPS - 1];
  const statusColor =
    finalSignal < 0.01 ? '#737373' : finalSignal > 5 ? '#ef4444' : '#22c55e';
  const statusText =
    weight < 1 ? `Vanishing — signal decays to ${finalSignal.toFixed(5)} after ${STEPS} steps` :
    weight > 1 ? `Exploding — signal grows to ${finalSignal.toFixed(2)} after ${STEPS} steps` :
    'Stable — signal preserved perfectly (hard to train in practice)';

  return (
    <div className="flex-1 flex flex-col p-10 gap-10">
      <div className="text-center">
        <h3 className="text-2xl font-serif text-accent mb-2">The Vanishing Gradient</h3>
        <p className="text-muted text-sm">
          Adjust the recurrent weight W. See how the signal magnitude evolves over {STEPS} time steps.
          Gradient flow follows the same pattern.
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-10 items-center">
        <div className="flex flex-col gap-6 w-full md:w-72 border border-border p-7 bg-neutral-900">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted uppercase tracking-widest flex justify-between">
              <span>Recurrent Weight W</span>
              <span className={cn(
                'font-mono font-bold',
                weight < 1 ? 'text-muted' : weight > 1 ? 'text-red-400' : 'text-green-400'
              )}>{weight.toFixed(2)}</span>
            </label>
            <input type="range" min="0.5" max="1.5" step="0.01" value={weight}
              onChange={e => setWeight(Number(e.target.value))} className="accent-accent" />
            <div className="flex justify-between text-xs text-neutral-500">
              <span>0.5 (vanish)</span>
              <span>1.0</span>
              <span>1.5 (explode)</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Initial signal</span>
              <span className="text-foreground">1.0000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">After t=10</span>
              <span className="text-foreground">{history[9].toFixed(5)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">After t=20</span>
              <span style={{ color: statusColor }}>{finalSignal.toFixed(5)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">W^20 =</span>
              <span style={{ color: statusColor }}>{Math.pow(weight, 20).toFixed(5)}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border text-xs leading-relaxed" style={{ color: statusColor }}>
            {statusText}
          </div>

          <div className="text-xs text-muted border border-border p-3 bg-neutral-950">
            <strong className="text-foreground block mb-1">Solution: LSTM / GRU</strong>
            Gated architectures maintain a cell state with additive gradient flow, avoiding
            the multiplicative decay that kills vanilla RNNs.
          </div>
        </div>

        <div className="flex-1 w-full h-64 md:h-80 border border-border bg-neutral-950 flex flex-col">
          <div className="flex items-end flex-1 gap-0.5 px-3 pb-3 pt-4 relative">
            <div className="absolute left-3 right-3 bottom-[53%] border-t border-dashed border-border pointer-events-none" />
            <span className="absolute left-4 bottom-[53%] text-[9px] text-muted -translate-y-1/2 bg-neutral-950 px-1">1.0</span>

            {history.map((val, i) => {
              const cappedVal = Math.min(val, 2.0);
              const heightPct = Math.max((cappedVal / 2.0) * 100, 0.5);
              const isOverflow = val > 2.0;
              return (
                <div key={i} className="flex-1 flex flex-col justify-end items-center group relative">
                  <div
                    className="w-full transition-all duration-300 relative"
                    style={{
                      height: `${heightPct}%`,
                      minHeight: '2px',
                      backgroundColor: val < 0.05 ? '#1e1e1e' : val > 2 ? '#ef4444' : '#3a3a3a',
                    }}>
                    {isOverflow && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] text-red-400">↑</div>
                    )}
                  </div>
                  <span className="absolute -bottom-5 text-[9px] text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    t={i}: {val.toFixed(3)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between px-3 pb-2 text-[10px] text-neutral-500">
            <span>t=0</span>
            <span>t=10</span>
            <span>t=19</span>
          </div>
        </div>
      </div>
    </div>
  );
};
