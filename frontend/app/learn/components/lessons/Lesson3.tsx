import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Lesson3Intro = () => (
  <>
    <p>
      How does a neural network <em>learn</em>? Through two interlocking mechanisms:{' '}
      <strong>Backpropagation</strong> and <strong>Gradient Descent</strong>.
    </p>
    <p>
      First, the network makes a prediction (the <strong>forward pass</strong>). We measure how
      wrong it is using a <strong>Loss Function</strong> — Mean Squared Error for regression,
      Cross-Entropy for classification. The loss is a single number: lower is better.
    </p>
    <p>
      <strong>Backpropagation</strong> then computes the gradient of the loss with respect to
      every parameter in the network. It does this by applying the <strong>Chain Rule</strong>{' '}
      recursively from the output layer back to the input:{' '}
      <em>∂L/∂w = (∂L/∂y)(∂y/∂w)</em>. This tells us — for every weight — which direction
      increases the loss.
    </p>
    <p>
      <strong>Gradient Descent</strong> updates each weight by stepping in the{' '}
      <em>opposite</em> direction of its gradient:{' '}
      <em>w ← w − α · ∂L/∂w</em>. Here <em>α</em> is the{' '}
      <strong>learning rate</strong> — a crucial hyperparameter. Too small and training is
      painfully slow. Too large and the updates overshoot, causing divergence. Most modern
      training uses <strong>Adam</strong>, an adaptive optimizer that adjusts the learning rate
      per parameter automatically.
    </p>
  </>
);

export const Lesson3Vis = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 800 420" className="w-full h-full p-8" preserveAspectRatio="xMidYMid meet">
      {[100, 200, 300].map(y => (
        <line key={y} x1="60" y1={y} x2="740" y2={y} stroke="#111" strokeWidth="1" strokeDasharray="3 8" />
      ))}

      <line x1="60" y1="360" x2="740" y2="360" stroke="#2a2a2a" strokeWidth="2" />
      <line x1="60" y1="40" x2="60" y2="360" stroke="#2a2a2a" strokeWidth="2" />
      <text x="750" y="365" fill="#666" fontSize="13" fontFamily="monospace">weight</text>
      <text x="65" y="35" fill="#666" fontSize="13" fontFamily="monospace">loss</text>

      <path d="M 100 345 Q 400 -80 700 345" stroke="#3a3a3a" strokeWidth="2.5" fill="none" />

      <line x1="400" y1="100" x2="400" y2="360" stroke="#1e1e1e" strokeWidth="1" strokeDasharray="4 4" />
      <text x="395" y="375" fill="#555" fontSize="11" fontFamily="monospace" textAnchor="middle">minimum</text>

      <motion.line
        stroke="#555" strokeWidth="1.5" strokeDasharray="5 4"
        initial={{ x1: 50, y1: 390, x2: 165, y2: 225, opacity: 0.9 } as any}
        animate={{
          x1: [50, 150, 250, 305, 340, 365],
          y1: [390, 250, 160, 130, 118, 110],
          x2: [165, 255, 350, 400, 430, 450],
          y2: [225, 140, 100, 98, 102, 110],
          opacity: [0.9, 0.9, 0.8, 0.7, 0.5, 0],
        } as any}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', repeatDelay: 1 }}
      />

      <motion.text
        fill="#666" fontSize="11" fontFamily="monospace"
        initial={{ x: 80, y: 220, opacity: 0.9 } as any}
        animate={{
          x: [80, 180, 265, 310, 340, 360],
          y: [220, 148, 110, 107, 110, 115],
          opacity: [0.9, 0.8, 0.7, 0.6, 0.3, 0],
        } as any}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', repeatDelay: 1 }}
      >
        slope = gradient
      </motion.text>

      <motion.circle
        r="9" fill="#ffffff"
        initial={{ cx: 100, cy: 345 } as any}
        animate={{
          cx: [100, 200, 300, 352, 382, 400],
          cy: [345, 215, 130, 108, 102, 100],
        } as any}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', repeatDelay: 1 }}
      />

      <text x="110" y="310" fill="#666666" fontSize="11" fontFamily="monospace">step ← −α · gradient</text>
    </svg>
  </div>
);

export const Lesson3Playground = () => {
  const [lr, setLr] = useState(0.1);
  const [position, setPosition] = useState(-4.0);
  const [history, setHistory] = useState<number[]>([-4.0]);
  const [autoRun, setAutoRun] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef = useRef({ position: -4.0, lr: 0.1 });
  stateRef.current = { position, lr };

  const loss = (x: number) => x * x;
  const gradient = (x: number) => 2 * x;

  const step = () => {
    const { position: pos, lr: rate } = stateRef.current;
    const grad = gradient(pos);
    const newPos = pos - rate * grad;
    setPosition(newPos);
    setHistory(prev => [...prev.slice(-20), newPos]);
  };

  const reset = () => {
    setAutoRun(false);
    setPosition(-4.0);
    setHistory([-4.0]);
  };

  useEffect(() => {
    if (autoRun) {
      intervalRef.current = setInterval(step, 350);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [autoRun]);

  const atMinimum = Math.abs(position) < 0.001;
  const diverged = Math.abs(position) > 20;

  return (
    <div className="flex-1 flex flex-col p-10 gap-10">
      <div className="text-center">
        <h3 className="text-2xl font-serif text-accent mb-2">Gradient Descent Simulator</h3>
        <p className="text-muted text-sm">
          Minimize f(x) = x². The gradient is f′(x) = 2x. Each step moves opposite the gradient.
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-10 items-center">
        <div className="flex flex-col gap-6 w-full md:w-72 border border-border p-7 bg-neutral-900">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted flex justify-between uppercase tracking-widest">
              <span>Learning Rate α</span>
              <span className={cn(
                'font-mono font-bold',
                lr > 0.9 ? 'text-red-400' : lr < 0.05 ? 'text-yellow-500' : 'text-accent'
              )}>{lr.toFixed(2)}</span>
            </label>
            <input type="range" min="0.01" max="1.1" step="0.01" value={lr}
              onChange={e => setLr(Number(e.target.value))} className="accent-accent" />
            <p className="text-xs text-muted leading-relaxed">
              {lr > 0.9 ? '⚠ Too high — will likely diverge' :
               lr < 0.05 ? '⚠ Very slow — many steps needed' :
               '✓ Good range for this problem'}
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={step} disabled={atMinimum || diverged}
              className="flex-1 bg-accent text-background font-bold py-2.5 text-xs uppercase tracking-widest hover:bg-accent/90 disabled:opacity-30 transition-colors">
              Step
            </button>
            <button
              onClick={() => setAutoRun(v => !v)}
              disabled={atMinimum || diverged}
              className={cn(
                'flex-1 py-2.5 text-xs uppercase tracking-widest border transition-colors disabled:opacity-30',
                autoRun ? 'border-accent text-accent' : 'border-border text-muted hover:border-accent hover:text-accent'
              )}>
              {autoRun ? 'Pause' : 'Auto'}
            </button>
            <button onClick={reset}
              className="border border-border text-muted px-4 py-2.5 text-xs uppercase tracking-widest hover:border-accent hover:text-accent transition-colors">
              ↺
            </button>
          </div>

          <div className="pt-4 border-t border-border font-mono text-sm space-y-1.5">
            <div className="flex justify-between">
              <span className="text-muted">x</span>
              <span className={cn(atMinimum ? 'text-green-400' : diverged ? 'text-red-400' : 'text-accent')}>
                {position.toFixed(5)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">gradient (2x)</span>
              <span className="text-foreground">{gradient(position).toFixed(5)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">loss (x²)</span>
              <span className="text-foreground">{loss(position).toFixed(5)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">steps taken</span>
              <span className="text-foreground">{history.length - 1}</span>
            </div>
          </div>

          {atMinimum && (
            <div className="text-xs text-green-400 border border-green-400/30 p-3 bg-green-400/5">
              ✓ Converged to minimum (x ≈ 0)
            </div>
          )}
          {diverged && (
            <div className="text-xs text-red-400 border border-red-400/30 p-3 bg-red-400/5">
              ✗ Diverged — learning rate too high. Reset and try α {'<'} 0.9
            </div>
          )}
        </div>

        <div className="flex-1 w-full h-64 md:h-80 border border-border bg-neutral-950 relative overflow-hidden">
          <svg viewBox="-5 -0.5 10 26" className="w-full h-full p-3" preserveAspectRatio="xMidYMid meet">
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#1a1a1a" strokeWidth="0.08" />
            <line x1="0" y1="-0.5" x2="0" y2="25" stroke="#1a1a1a" strokeWidth="0.08" />

            <text x="4.5" y="-0.2" fill="#555" fontSize="0.6" fontFamily="monospace">x</text>
            <text x="0.15" y="24.5" fill="#555" fontSize="0.6" fontFamily="monospace">f(x)=x²</text>

            <path
              d={Array.from({ length: 101 }, (_, i) => {
                const x = -5 + i * 0.1;
                const y = x * x;
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              stroke="#2a2a2a"
              strokeWidth="0.15"
              fill="none"
            />

            {history.map((x, i) => {
              if (i === 0) return null;
              const px = history[i - 1];
              return (
                <line key={`l${i}`}
                  x1={Math.max(-5, Math.min(5, px))} y1={Math.min(25, px * px)}
                  x2={Math.max(-5, Math.min(5, x))} y2={Math.min(25, x * x)}
                  stroke="#2a2a2a" strokeWidth="0.12" strokeDasharray="0.15 0.15"
                />
              );
            })}

            {history.map((x, i) => (
              <circle key={i}
                cx={Math.max(-5, Math.min(5, x))}
                cy={Math.min(25, x * x)}
                r={i === history.length - 1 ? 0.22 : 0.12}
                fill={i === history.length - 1 ? '#ffffff' : '#505050'}
              />
            ))}

            <text x="0.15" y="-0.1" fill="#555" fontSize="0.45" fontFamily="monospace">min</text>
          </svg>
        </div>
      </div>
    </div>
  );
};
