import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Lesson4Intro = () => (
  <>
    <p>
      An image is a grid of numbers (pixels). A standard MLP would flatten it into a 1D vector —
      destroying all spatial structure. A 256×256 image has 65,536 pixels; connecting each to
      512 hidden units requires 33 million weights for just one layer.
    </p>
    <p>
      <strong>Convolutional Neural Networks (CNNs)</strong> solve this with two key ideas.
      First, <strong>local connectivity</strong>: each neuron looks at only a small region
      (e.g., a 3×3 patch) instead of the whole image. Second, <strong>weight sharing</strong>:
      the same filter is slid across the entire image — every patch uses the same weights.
      This reduces parameters dramatically and builds in <strong>translation invariance</strong>.
    </p>
    <p>
      A <strong>convolution</strong> multiplies a filter element-wise with the patch beneath it
      and sums the result, producing one value in the <strong>feature map</strong>. Different
      filters learn to detect different features: edges, corners, curves, textures. Stacking
      multiple layers builds a <strong>feature hierarchy</strong> — early layers detect edges,
      later layers detect shapes, the final layers detect objects.
    </p>
    <p>
      <strong>Pooling layers</strong> (typically MaxPool) downsample the feature maps, reducing
      spatial dimensions and building robustness to small shifts. Modern architectures like
      ResNets and EfficientNets are built entirely from these principles.
    </p>
  </>
);

const STATIC_GRID = [
  2, 8, 5, 1, 7,
  6, 3, 9, 4, 2,
  1, 7, 3, 8, 5,
  9, 4, 6, 2, 1,
  3, 5, 1, 7, 4,
];

export const Lesson4Vis = () => {
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setPos(p => (p + 1) % 9), 1100);
    return () => clearInterval(timer);
  }, []);

  const col = pos % 3;
  const row = Math.floor(pos / 3);
  const stride = 42;
  const windowX = col * stride;
  const windowY = row * stride;

  return (
    <div className="flex items-center justify-center gap-12 w-full h-full p-10">
      <div className="flex flex-col items-center gap-4">
        <div className="text-xs text-muted uppercase tracking-widest">Input Image (5×5)</div>
        <div className="relative">
          <div className="grid grid-cols-5 gap-0.5 bg-border p-0.5">
            {STATIC_GRID.map((val, i) => (
              <div key={i}
                className="w-10 h-10 bg-neutral-900 flex items-center justify-center text-xs font-mono"
                style={{ color: `rgba(200, 200, 200, ${val / 10})` }}>
                {val}
              </div>
            ))}
          </div>

          <motion.div
            className="absolute border-2 border-accent bg-accent/10 pointer-events-none"
            style={{ width: 124, height: 124, top: 2, left: 2 }}
            animate={{ x: windowX, y: windowY }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
          />
        </div>
        <div className="text-xs text-neutral-500">pixels: 0–9 intensity</div>
      </div>

      <div className="flex flex-col items-center gap-2 text-muted">
        <div className="text-2xl">→</div>
        <div className="text-xs uppercase tracking-widest text-neutral-500">3×3 filter</div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="text-xs text-muted uppercase tracking-widest">Feature Map (3×3)</div>
        <div className="grid grid-cols-3 gap-0.5 bg-border p-0.5">
          {Array(9).fill(0).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 flex items-center justify-center text-xs font-mono transition-colors duration-300"
              style={{
                backgroundColor: i === pos ? '#222' : i < pos ? '#181818' : '#111',
                color: i === pos ? '#fff' : i < pos ? '#555' : '#444',
              }}
            >
              {i < pos ? '✓' : i === pos ? '···' : ''}
            </div>
          ))}
        </div>
        <div className="text-xs text-neutral-500">one value per patch</div>
      </div>

      <div className="hidden lg:flex flex-col gap-3 text-xs text-muted max-w-[160px]">
        <div className="border border-border p-3 bg-neutral-900">
          <strong className="text-foreground block mb-1">Weight sharing</strong>
          Same 3×3 filter applied to all 9 positions
        </div>
        <div className="border border-border p-3 bg-neutral-900">
          <strong className="text-foreground block mb-1">5×5 → 3×3</strong>
          (5−3+1) × (5−3+1) = 9 output values
        </div>
      </div>
    </div>
  );
};

export const Lesson4Playground = () => {
  const [image, setImage] = useState([
    0, 0, 0, 0, 0,
    0, 1, 1, 1, 0,
    0, 1, 0, 1, 0,
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 0,
  ]);

  const filters = {
    identity: {
      kernel: [0, 0, 0, 0, 1, 0, 0, 0, 0],
      label: 'Identity — passes image through unchanged',
    },
    edgeDetect: {
      kernel: [-1, -1, -1, -1, 8, -1, -1, -1, -1],
      label: 'Edge Detection — highlights boundaries',
    },
    sharpen: {
      kernel: [0, -1, 0, -1, 5, -1, 0, -1, 0],
      label: 'Sharpen — enhances high-frequency detail',
    },
    boxBlur: {
      kernel: [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9],
      label: 'Box Blur — averages neighbouring pixels',
    },
  } as const;

  const [activeFilter, setActiveFilter] = useState<keyof typeof filters>('edgeDetect');
  const { kernel } = filters[activeFilter];

  const output = Array(9).fill(0).map((_, idx) => {
    const oy = Math.floor(idx / 3);
    const ox = idx % 3;
    let sum = 0;
    for (let ky = 0; ky < 3; ky++) {
      for (let kx = 0; kx < 3; kx++) {
        sum += image[(oy + ky) * 5 + (ox + kx)] * kernel[ky * 3 + kx];
      }
    }
    return sum;
  });

  const maxAbs = Math.max(1, ...output.map(Math.abs));

  const togglePixel = (idx: number) => {
    const next = [...image];
    next[idx] = next[idx] === 0 ? 1 : 0;
    setImage(next);
  };

  const presets = {
    square: [0,0,0,0,0, 0,1,1,1,0, 0,1,0,1,0, 0,1,1,1,0, 0,0,0,0,0],
    cross: [0,0,1,0,0, 0,0,1,0,0, 1,1,1,1,1, 0,0,1,0,0, 0,0,1,0,0],
    diagonal: [1,0,0,0,0, 0,1,0,0,0, 0,0,1,0,0, 0,0,0,1,0, 0,0,0,0,1],
    full: Array(25).fill(1),
  };

  return (
    <div className="flex-1 flex flex-col p-10 gap-8">
      <div className="text-center">
        <h3 className="text-2xl font-serif text-accent mb-2">Convolution Explorer</h3>
        <p className="text-muted text-sm">
          Click pixels to toggle them. Select a filter to see its effect on the feature map.
        </p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-10 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted uppercase tracking-widest">Input (5×5)</span>
            <div className="flex gap-2">
              {(Object.entries(presets) as [string, number[]][]).map(([name, data]) => (
                <button key={name} onClick={() => setImage(data)}
                  className="text-xs border border-border px-2 py-1 text-muted hover:border-accent hover:text-accent transition-colors uppercase tracking-widest">
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-5 gap-0.5 bg-border p-0.5 cursor-pointer">
            {image.map((val, i) => (
              <div key={i} onClick={() => togglePixel(i)}
                className={cn(
                  'w-11 h-11 transition-colors duration-150',
                  val === 1 ? 'bg-accent' : 'bg-neutral-900 hover:bg-neutral-800'
                )} />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <span className="text-xs text-muted uppercase tracking-widest">Filter (3×3)</span>
          <div className="flex flex-wrap gap-2 justify-center max-w-xs">
            {(Object.keys(filters) as (keyof typeof filters)[]).map(k => (
              <button key={k} onClick={() => setActiveFilter(k)}
                className={cn(
                  'px-3 py-1.5 text-xs border uppercase tracking-widest transition-colors',
                  activeFilter === k ? 'border-accent text-accent bg-accent/10' : 'border-border text-muted hover:border-muted'
                )}>
                {k === 'edgeDetect' ? 'Edge' : k === 'boxBlur' ? 'Blur' : k === 'identity' ? 'Identity' : 'Sharpen'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-0.5 bg-border p-0.5">
            {kernel.map((val, i) => (
              <div key={i}
                className="w-10 h-10 bg-neutral-900 flex items-center justify-center text-xs font-mono"
                style={{
                  color: val > 0 ? '#4ade80' : val < 0 ? '#f87171' : '#555',
                }}>
                {Number.isInteger(val) ? val : val.toFixed(2)}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted text-center max-w-[160px]">{filters[activeFilter].label}</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-xs text-muted uppercase tracking-widest">Feature Map (3×3)</span>
          <div className="grid grid-cols-3 gap-0.5 bg-border p-0.5">
            {output.map((val, i) => {
              const intensity = Math.abs(val) / maxAbs;
              const isPositive = val >= 0;
              return (
                <div key={i}
                  className="w-11 h-11 flex items-center justify-center text-[10px] font-mono transition-all duration-200"
                  style={{
                    backgroundColor: isPositive
                      ? `rgba(255,255,255,${intensity * 0.85})`
                      : `rgba(100,100,255,${intensity * 0.6})`,
                    color: intensity > 0.6 ? '#000' : '#aaa',
                  }}>
                  {val.toFixed(1)}
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 text-xs text-muted">
            <span><span className="text-white">■</span> positive</span>
            <span><span className="text-blue-400">■</span> negative</span>
          </div>
        </div>
      </div>
    </div>
  );
};
