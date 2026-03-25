import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deep Learning & LLMs — Eunice Labs',
  description: 'An interactive learning path from tensors to Transformers. 8 lessons with live visualisations and playgrounds.',
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}
      className="font-mono antialiased text-foreground"
    >
      {children}
    </div>
  );
}
