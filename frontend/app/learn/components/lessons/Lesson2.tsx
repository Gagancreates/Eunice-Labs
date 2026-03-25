import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export const Lesson2Intro = () => (
  <>
    <p>
      A <strong>Neural Network</strong> is a series of matrix multiplications interspersed with
      non-linear functions. The simplest form is a{' '}
      <strong>Multi-Layer Perceptron (MLP)</strong> — data flows from an{' '}
      <strong>input layer</strong>, through one or more <strong>hidden layers</strong>, to an{' '}
      <strong>output layer</strong>.
    </p>
    <p>
      Each hidden unit computes:{' '}
      <em>h = activation(W · x + b)</em>. Here <em>W</em> is the weight matrix,{' '}
      <em>x</em> is the input, and <em>b</em> is a bias vector. The weight encodes{' '}
      <em>how much</em> each input matters; the bias shifts the threshold of activation.
    </p>
    <p>
      The <strong>activation function</strong> is the source of a network&apos;s power. Without
      it, every layer is just a linear transformation, and stacking them collapses to a single
      matrix multiply — useless for complex problems. <strong>ReLU</strong> (max(0, x)) is the
      dominant choice: it&apos;s fast, avoids vanishing gradients, and rarely saturates.{' '}
      <strong>Sigmoid</strong> squashes to (0, 1) — useful for probabilities. <strong>Tanh</strong>{' '}
      squashes to (-1, 1) — often better for hidden layers than sigmoid.
    </p>
    <p>
      The <strong>Universal Approximation Theorem</strong> guarantees that an MLP with even one
      hidden layer and enough neurons can approximate <em>any continuous function</em>. In
      practice, deeper networks (more layers) are far more parameter-efficient than wider ones.
    </p>
  </>
);

export const Lesson2Vis = () => {
  const inputs = [
    { cx: 150, cy: 175, label: 'x₁' },
    { cx: 150, cy: 325, label: 'x₂' },
  ];
  const hidden = [
    { cx: 440, cy: 115, label: 'h₁' },
    { cx: 440, cy: 250, label: 'h₂' },
    { cx: 440, cy: 385, label: 'h₃' },
  ];
  const output = { cx: 720, cy: 250, label: 'ŷ' };

  type Conn = { x1: number; y1: number; x2: number; y2: number; delay: number };
  const connections: Conn[] = [];
  let d = 0;
  inputs.forEach(inp => {
    hidden.forEach(h => {
      connections.push({ x1: inp.cx, y1: inp.cy, x2: h.cx, y2: h.cy, delay: d });
      d += 0.18;
    });
  });
  hidden.forEach(h => {
    connections.push({ x1: h.cx, y1: h.cy, x2: output.cx, y2: output.cy, delay: d });
    d += 0.22;
  });

  return (
    <svg viewBox="0 0 870 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <line x1="295" y1="60" x2="295" y2="440" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="585" y1="60" x2="585" y2="440" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 4" />

      {connections.map((c, i) => (
        <line key={i} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke="#222222" strokeWidth="1.5" />
      ))}

      {connections.map((c, i) => (
        <circle key={`p${i}`} r="4" fill="white" opacity="0.85">
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            begin={`${c.delay}s`}
            path={`M ${c.x1} ${c.y1} L ${c.x2} ${c.y2}`}
          />
        </circle>
      ))}

      {inputs.map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r="28" fill="#0a0a0a" stroke="#3a3a3a" strokeWidth="2" />
          <text x={n.cx} y={n.cy} textAnchor="middle" dominantBaseline="central"
            fill="#737373" fontSize="15" fontFamily="monospace">{n.label}</text>
        </g>
      ))}

      {hidden.map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r="32" fill="#0d0d0d" stroke="#ffffff" strokeWidth="2" />
          <text x={n.cx} y={n.cy} textAnchor="middle" dominantBaseline="central"
            fill="#ffffff" fontSize="14" fontFamily="monospace">{n.label}</text>
        </g>
      ))}

      <circle cx={output.cx} cy={output.cy} r="28" fill="#0a0a0a" stroke="#3a3a3a" strokeWidth="2" />
      <text x={output.cx} y={output.cy} textAnchor="middle" dominantBaseline="central"
        fill="#737373" fontSize="15" fontFamily="monospace">{output.label}</text>

      <text x="150" y="458" textAnchor="middle" fill="#555" fontSize="11" fontFamily="monospace" letterSpacing="2">INPUT</text>
      <text x="440" y="458" textAnchor="middle" fill="#555" fontSize="11" fontFamily="monospace" letterSpacing="2">HIDDEN · ReLU</text>
      <text x="720" y="458" textAnchor="middle" fill="#555" fontSize="11" fontFamily="monospace" letterSpacing="2">OUTPUT</text>

      <text x="440" y="488" textAnchor="middle" fill="#666666" fontSize="12" fontFamily="monospace">h = ReLU( W · x + b )</text>
    </svg>
  );
};

export const Lesson2Playground = () => {
  const [w1, setW1] = useState(0.5);
  const [w2, setW2] = useState(-0.5);
  const [b, setB] = useState(0.1);
  const [x1, setX1] = useState(1.0);
  const [x2, setX2] = useState(1.0);
  const [activation, setActivation] = useState<'relu' | 'sigmoid' | 'tanh'>('relu');

  const z = x1 * w1 + x2 * w2 + b;

  const activate = (val: number) => {
    if (activation === 'relu') return Math.max(0, val);
    if (activation === 'sigmoid') return 1 / (1 + Math.exp(-val));
    return Math.tanh(val);
  };

  const output = activate(z);

  const activationInfo = {
    relu: { formula: 'max(0, z)', range: '[0, +∞)', color: '#22c55e' },
    sigmoid: { formula: '1 / (1 + e⁻ᶻ)', range: '(0, 1)', color: '#3b82f6' },
    tanh: { formula: '(eᶻ − e⁻ᶻ) / (eᶻ + e⁻ᶻ)', range: '(−1, 1)', color: '#a855f7' },
  }[activation];

  return (
    <div className="flex-1 flex flex-col p-10 gap-8">
      <div className="text-center">
        <h3 className="text-2xl font-serif text-accent mb-2">Single Neuron Simulator</h3>
        <p className="text-muted text-sm">
          Adjust inputs, weights, bias, and activation function to see how a single neuron computes.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="flex flex-col gap-5">
          <span className="text-xs text-muted uppercase tracking-widest border-b border-border pb-2">Inputs</span>
          {([{ label: 'x₁', val: x1, set: setX1 }, { label: 'x₂', val: x2, set: setX2 }] as const).map(
            ({ label, val, set }: any) => (
              <div key={label} className="flex flex-col gap-1.5">
                <label className="text-sm text-muted flex justify-between">
                  <span>Input {label}</span>
                  <span className="text-accent font-mono">{val.toFixed(2)}</span>
                </label>
                <input type="range" min="-5" max="5" step="0.1" value={val}
                  onChange={e => set(Number(e.target.value))} className="accent-accent" />
              </div>
            )
          )}
        </div>

        <div className="flex flex-col gap-5 border-x border-border px-8">
          <span className="text-xs text-muted uppercase tracking-widest border-b border-border pb-2">Parameters</span>
          {([{ label: 'Weight w₁', val: w1, set: setW1 }, { label: 'Weight w₂', val: w2, set: setW2 }] as const).map(
            ({ label, val, set }: any) => (
              <div key={label} className="flex flex-col gap-1.5">
                <label className="text-sm text-muted flex justify-between">
                  <span>{label}</span>
                  <span className="text-accent font-mono">{val.toFixed(2)}</span>
                </label>
                <input type="range" min="-2" max="2" step="0.05" value={val}
                  onChange={e => set(Number(e.target.value))} className="accent-accent" />
              </div>
            )
          )}
          <div className="flex flex-col gap-1.5 pt-3 border-t border-border">
            <label className="text-sm text-muted flex justify-between">
              <span>Bias b</span>
              <span className="text-accent font-mono">{b.toFixed(2)}</span>
            </label>
            <input type="range" min="-3" max="3" step="0.05" value={b}
              onChange={e => setB(Number(e.target.value))} className="accent-accent" />
          </div>
          <div className="flex flex-col gap-2 pt-3 border-t border-border">
            <span className="text-xs text-muted uppercase tracking-widest">Activation Function</span>
            <div className="flex gap-2">
              {(['relu', 'sigmoid', 'tanh'] as const).map(fn => (
                <button key={fn} onClick={() => setActivation(fn)}
                  className={cn(
                    'flex-1 py-1.5 text-xs uppercase tracking-widest border transition-colors',
                    activation === fn ? 'border-accent text-accent' : 'border-border text-muted hover:border-muted'
                  )}>
                  {fn}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs text-muted uppercase tracking-widest border-b border-border pb-2">Result</span>

          <div className="bg-neutral-900 p-4 border border-border font-mono text-sm space-y-1">
            <div className="text-muted text-xs uppercase tracking-widest mb-2">Pre-activation z</div>
            <div className="text-muted">
              ({x1.toFixed(2)} × {w1.toFixed(2)}) + ({x2.toFixed(2)} × {w2.toFixed(2)}) + {b.toFixed(2)}
            </div>
            <div className="text-foreground font-bold">z = {z.toFixed(4)}</div>
          </div>

          <div className="bg-neutral-900 p-4 border border-border font-mono text-sm space-y-1">
            <div className="text-muted text-xs uppercase tracking-widest mb-2">After Activation</div>
            <div style={{ color: activationInfo.color }} className="text-xs">{activationInfo.formula}</div>
            <div className="text-muted text-xs">Range: {activationInfo.range}</div>
            <div className="text-4xl font-bold pt-1" style={{ color: activationInfo.color }}>
              {output.toFixed(4)}
            </div>
          </div>

          {z < 0 && activation === 'relu' && (
            <p className="text-xs text-muted border border-border p-3 bg-neutral-900">
              z is negative — ReLU outputs exactly 0. This neuron is &quot;dead&quot; for this input.
              Try increasing inputs or weights.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
