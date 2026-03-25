import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Lesson8Intro = () => (
  <>
    <p>
      Before a neural network can process language, every word must become a number. This
      happens in two steps: <strong>Tokenization</strong> and <strong>Embedding</strong>.
    </p>
    <p>
      <strong>Tokenization</strong> splits text into subword units using algorithms like{' '}
      <strong>Byte-Pair Encoding (BPE)</strong>. BPE starts with characters and iteratively
      merges the most frequent adjacent pairs into new tokens. This gives a fixed vocabulary
      (GPT-4 uses ~100,000 tokens) that can represent any text: common words get their own
      token (&quot;the&quot; → [1234]), rare words split into meaningful pieces
      (&quot;unbelievable&quot; → [&quot;un&quot;, &quot;believ&quot;, &quot;able&quot;]), and nothing is ever out-of-vocabulary.
      A typical English sentence requires roughly 1.3–1.5 tokens per word.
    </p>
    <p>
      Each token ID is then looked up in an <strong>Embedding Table</strong> — a learned matrix
      of shape (vocab_size × embed_dim). The embedding dimension ranges from 512 (small models)
      to 12,288 (GPT-4). These dense vectors are learned during training so that tokens with
      similar meanings end up geometrically close. The famous example:{' '}
      <em>king − man + woman ≈ queen</em> in the vector space.
    </p>
    <p>
      Embeddings capture semantic relationships that no integer encoding could: synonyms cluster
      together, antonyms are in predictable directions, grammatical forms follow consistent
      patterns. The embedding layer is often the single largest component of a language model.
    </p>
  </>
);

export const Lesson8Vis = () => {
  const steps = [
    {
      label: 'Raw Text',
      content: (
        <div className="border border-border px-5 py-3 bg-neutral-900 text-accent font-serif text-lg">
          &quot;unbelievable&quot;
        </div>
      ),
    },
    {
      label: 'BPE Tokenization',
      content: (
        <div className="flex gap-2">
          {[
            { text: 'un', id: 421 },
            { text: 'believ', id: 890 },
            { text: 'able', id: 112 },
          ].map(({ text, id }) => (
            <div key={text} className="border border-border bg-neutral-900 px-3 py-2 flex flex-col items-center gap-1">
              <span className="text-accent font-mono text-sm">{text}</span>
              <span className="text-xs text-neutral-500">ID: {id}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'Embedding Lookup',
      content: (
        <div className="flex flex-col gap-2">
          {[
            { id: 421, vals: [0.82, 0.21, 0.54, 0.91, 0.33] },
            { id: 890, vals: [0.12, 0.67, 0.38, 0.79, 0.05] },
            { id: 112, vals: [0.71, 0.44, 0.88, 0.16, 0.59] },
          ].map(({ id, vals }) => (
            <div key={id} className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 font-mono w-14">ID {id}</span>
              <div className="flex gap-0.5">
                {vals.map((v, i) => (
                  <div key={i} className="w-6 h-6"
                    style={{ backgroundColor: `rgba(255, 255, 255, ${v})` }}
                    title={v.toFixed(2)} />
                ))}
                <span className="text-xs text-muted ml-2 font-mono">···768d</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center gap-6 w-full h-full p-8 flex-wrap">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <motion.div
            className="flex flex-col items-center gap-3"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}>
            <div className="text-xs text-muted uppercase tracking-widest">{step.label}</div>
            {step.content}
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div
              className="text-2xl text-muted"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 + 0.5 }}>
              →
            </motion.div>
          )}
        </React.Fragment>
      ))}

      <div className="w-full flex justify-center mt-4">
        <div className="border border-border bg-neutral-900 px-6 py-3 text-xs text-muted max-w-lg text-center">
          <strong className="text-foreground">Semantic property: </strong>
          king − man + woman ≈ queen &nbsp;·&nbsp; Paris − France + Italy ≈ Rome
          <br />
          <span className="text-neutral-500">These relationships emerge purely from training, not manual design.</span>
        </div>
      </div>
    </div>
  );
};

function hashWord(word: string): number {
  let h = 5381;
  for (let i = 0; i < word.length; i++) {
    h = ((h << 5) + h) ^ word.charCodeAt(i);
  }
  return Math.abs(h);
}

function makeVec(word: string, dim: number): number[] {
  const h = hashWord(word);
  return Array.from({ length: dim }, (_, i) => {
    const v = Math.sin(h * (i + 1) * 0.3178) * 0.5 + 0.5;
    return Math.round(v * 100) / 100;
  });
}

function cosineSim(a: number[], b: number[]): number {
  const dot = a.reduce((s, ai, i) => s + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((s, ai) => s + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((s, bi) => s + bi * bi, 0));
  return normA && normB ? dot / (normA * normB) : 0;
}

export const Lesson8Playground = () => {
  const [inputText, setInputText] = useState('The quick brown fox');
  const [compareWord, setCompareWord] = useState('fox');

  const VEC_DIM = 6;

  const tokens = useMemo(() => {
    return inputText
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(word => ({
        text: word,
        id: hashWord(word) % 50000 + 100,
        vec: makeVec(word.toLowerCase(), VEC_DIM),
      }));
  }, [inputText]);

  const compareVec = useMemo(() => makeVec(compareWord.toLowerCase(), VEC_DIM), [compareWord]);

  return (
    <div className="flex-1 flex flex-col p-10 gap-8">
      <div className="text-center">
        <h3 className="text-2xl font-serif text-accent mb-2">Tokenizer &amp; Embedding Explorer</h3>
        <p className="text-muted text-sm">
          Type a sentence to see tokens and their embedding vectors. Compare semantic similarity with any word.
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-6 max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-xs text-muted uppercase tracking-widest">Input Sentence</span>
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="bg-neutral-900 border border-border text-accent px-5 py-3 outline-none focus:border-accent font-serif text-lg"
              placeholder="Type a sentence..."
            />
          </div>
          <div className="flex flex-col gap-2 md:w-48">
            <span className="text-xs text-muted uppercase tracking-widest">Compare to word</span>
            <input
              type="text"
              value={compareWord}
              onChange={e => setCompareWord(e.target.value)}
              className="bg-neutral-900 border border-border text-accent px-5 py-3 outline-none focus:border-accent font-mono"
              placeholder="fox"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs text-muted uppercase tracking-widest border-b border-border pb-2">
            Tokens &amp; Embeddings ({VEC_DIM}D slice shown)
          </span>

          <div className="flex flex-wrap gap-4">
            {tokens.map((token, i) => {
              const sim = cosineSim(token.vec, compareVec);
              const simPct = Math.round(sim * 100);
              return (
                <div key={i} className="border border-border bg-neutral-900 p-4 flex flex-col gap-3 min-w-[160px]">
                  <div className="text-accent font-serif text-lg text-center border-b border-border pb-2">
                    {token.text}
                  </div>

                  <div className="flex justify-between items-center font-mono text-xs">
                    <span className="text-muted">Token ID</span>
                    <span className="text-accent">{token.id}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-muted uppercase tracking-widest">Vector ({VEC_DIM}D)</span>
                    <div className="flex gap-0.5 h-7">
                      {token.vec.map((v, j) => (
                        <div key={j} className="flex-1 transition-all duration-300"
                          style={{ backgroundColor: `rgba(255,255,255,${v})` }}
                          title={v.toFixed(3)} />
                      ))}
                    </div>
                    <div className="text-[10px] font-mono text-muted text-center">
                      [{token.vec.map(v => v.toFixed(2)).join(', ')}]
                    </div>
                  </div>

                  {compareWord.trim() && (
                    <div className="pt-2 border-t border-border">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted">sim vs &quot;{compareWord}&quot;</span>
                        <span className={cn(
                          'font-mono font-bold',
                          simPct > 80 ? 'text-green-400' : simPct > 60 ? 'text-yellow-400' : 'text-muted'
                        )}>{simPct}%</span>
                      </div>
                      <div className="mt-1 h-1 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full bg-accent transition-all duration-300"
                          style={{ width: `${simPct}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {tokens.length === 0 && (
              <div className="text-muted italic p-4">Start typing to see tokens...</div>
            )}
          </div>
        </div>

        <p className="text-xs text-muted">
          Note: These are toy embeddings for demonstration. Real model embeddings (768–12288d) capture
          far richer semantic structure from training on billions of text examples.
        </p>
      </div>
    </div>
  );
};
