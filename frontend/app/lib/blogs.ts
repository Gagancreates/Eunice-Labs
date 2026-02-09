export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readTime: string;
  order: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'seq2seq',
    title: 'Sequence-to-Sequence Models',
    date: 'Jan 2025',
    description: 'Understanding the foundation of neural machine translation and how encoder-decoder architectures transformed NLP.',
    tags: ['Deep Learning', 'NLP', 'Foundations'],
    readTime: '8 min',
    order: 1
  },
  {
    slug: 'bahdanau_explained',
    title: 'Bahdanau Attention Mechanism',
    date: 'Jan 2025',
    description: 'The breakthrough that taught neural networks to focus - exploring the first attention mechanism in seq2seq models.',
    tags: ['Deep Learning', 'Attention', 'NMT'],
    readTime: '12 min',
    order: 2
  },
  {
    slug: 'luong_explained',
    title: 'Luong Attention: Global vs Local',
    date: 'Jan 2025',
    description: 'Simplified attention mechanisms that improved efficiency while maintaining translation quality.',
    tags: ['Deep Learning', 'Attention', 'Optimization'],
    readTime: '10 min',
    order: 3
  },
  {
    slug: 'self_attention_explained',
    title: 'Self-Attention: The Paradigm Shift',
    date: 'Jan 2025',
    description: 'How self-attention eliminated recurrence and enabled the Transformer revolution.',
    tags: ['Deep Learning', 'Transformers', 'Architecture'],
    readTime: '15 min',
    order: 4
  },
  {
    slug: 'transformer_explained',
    title: 'Attention is All You Need: Transformers',
    date: 'Jan 2025',
    description: 'The complete architecture that changed everything - from positional encoding to multi-head attention.',
    tags: ['Deep Learning', 'Transformers', 'Foundation Models'],
    readTime: '20 min',
    order: 5
  }
];
