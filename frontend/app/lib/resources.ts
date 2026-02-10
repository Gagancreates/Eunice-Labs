import { Resource } from '../types';

export const featuredResources: Resource[] = [
  {
    id: '1',
    title: 'Attention is All You Need',
    type: 'Paper',
    description: 'The foundational 2017 paper by Vaswani et al. that introduced the Transformer architecture.',
    url: 'https://arxiv.org/abs/1706.03762'
  },
  {
    id: '2',
    title: 'Neural Machine Translation by Jointly Learning to Align and Translate',
    type: 'Paper',
    description: 'Bahdanau et al. (2015) - The paper that introduced attention mechanisms to seq2seq models.',
    url: 'https://arxiv.org/abs/1409.0473'
  },
  {
    id: '3',
    title: 'Effective Approaches to Attention-based Neural Machine Translation',
    type: 'Paper',
    description: 'Luong et al. (2015) - Introduced global and local attention variants for improved efficiency.',
    url: 'https://arxiv.org/abs/1508.04025'
  },
  {
    id: '4',
    title: 'The Annotated Transformer',
    type: 'Tutorial',
    description: 'Harvard NLP\'s line-by-line implementation guide with detailed explanations and code.',
    url: 'http://nlp.seas.harvard.edu/annotated-transformer/'
  },
  {
    id: '5',
    title: 'Deep Learning Implementation',
    type: 'Code',
    description: 'PyTorch implementations of all architectures covered in the Foundations series.',
    url: 'https://github.com/Gagancreates/Deep-Learning-Implementation'
  }
];

export const allResources: Resource[] = [
  ...featuredResources,
  {
    id: '6',
    title: 'Distilling the Knowledge in a Neural Network',
    type: 'Paper',
    description: 'Hinton et al. (2015) - Introduces knowledge distillation, showing how a smaller student model can be trained to mimic a larger teacher model using soft probability targets.',
    url: 'https://arxiv.org/abs/1503.02531'
  },
  {
    id: '7',
    title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models',
    type: 'Paper',
    description: 'Wei et al. (2022) - Demonstrates that prompting LLMs with intermediate reasoning steps significantly improves performance on complex reasoning tasks.',
    url: 'https://arxiv.org/abs/2201.11903'
  },
  {
    id: '8',
    title: 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning',
    type: 'Paper',
    description: 'DeepSeek (2025) - Shows how reinforcement learning alone can incentivize chain-of-thought reasoning in LLMs, achieving performance comparable to OpenAI o1.',
    url: 'https://arxiv.org/abs/2501.12948'
  }
];
