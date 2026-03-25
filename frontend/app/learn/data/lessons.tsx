import React from 'react';
import { Lesson1Intro, Lesson1Vis, Lesson1Playground } from '../components/lessons/Lesson1';
import { Lesson2Intro, Lesson2Vis, Lesson2Playground } from '../components/lessons/Lesson2';
import { Lesson3Intro, Lesson3Vis, Lesson3Playground } from '../components/lessons/Lesson3';
import { Lesson4Intro, Lesson4Vis, Lesson4Playground } from '../components/lessons/Lesson4';
import { Lesson5Intro, Lesson5Vis, Lesson5Playground } from '../components/lessons/Lesson5';
import { Lesson6Intro, Lesson6Vis, Lesson6Playground } from '../components/lessons/Lesson6';
import { Lesson7Intro, Lesson7Vis, Lesson7Playground } from '../components/lessons/Lesson7';
import { Lesson8Intro, Lesson8Vis, Lesson8Playground } from '../components/lessons/Lesson8';

export type Question = {
  id: string;
  text: string;
  answer: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  intro: React.ReactNode;
  visualisation: React.ReactNode;
  playground: React.ReactNode;
  questions: Question[];
};

export const lessons: Lesson[] = [
  {
    id: 'tensors-matrix-ops',
    title: 'Tensors & Matrix Ops',
    description: 'The fundamental data structures of deep learning — scalars, vectors, matrices — and the dot product operation that powers every neural network layer.',
    duration: '8 min',
    intro: <Lesson1Intro />,
    visualisation: <Lesson1Vis />,
    playground: <Lesson1Playground />,
    questions: [
      {
        id: 'q1-1',
        text: 'What happens to the output if you set all weights to zero?',
        answer: 'The output becomes exactly zero, regardless of the input. This is called the "symmetry problem" — if all weights are zero, every neuron in a layer produces the same output, and gradient descent will update them all identically. They will never differentiate, and the network cannot learn. This is why random initialization (e.g., Xavier/Glorot, He initialization) is essential.',
      },
      {
        id: 'q1-2',
        text: 'If matrix A has shape (3 × 4) and matrix B has shape (4 × 2), what is the shape of A × B, and why do the inner dimensions need to match?',
        answer: 'The product A × B has shape (3 × 2). The inner dimensions (both 4) must match because each element of the output is computed as a dot product between one row of A (length 4) and one column of B (length 4). This is the fundamental constraint of matrix multiplication: you cannot multiply incompatible shapes.',
      },
      {
        id: 'q1-3',
        text: 'Why is the dot product (and matrix multiplication) so central to neural networks?',
        answer: 'Every linear layer in a neural network computes y = Wx + b — a matrix multiply followed by a bias addition. This single operation lets a layer learn any linear transformation of its inputs. By stacking these layers with non-linear activation functions between them, the network can approximate arbitrarily complex functions. Understanding the dot product is understanding the fundamental computation of all deep learning.',
      },
    ],
  },
  {
    id: 'neural-networks-mlps',
    title: 'Neural Networks & MLPs',
    description: 'How individual neurons combine weights, inputs, and activation functions to form Multi-Layer Perceptrons — the universal function approximators.',
    duration: '10 min',
    intro: <Lesson2Intro />,
    visualisation: <Lesson2Vis />,
    playground: <Lesson2Playground />,
    questions: [
      {
        id: 'q2-1',
        text: 'What happens if you remove all activation functions and use only linear layers?',
        answer: 'Without activation functions, no matter how many linear layers you stack, the entire network collapses into a single linear transformation. This is because the composition of linear functions is always linear: W₂(W₁x + b₁) + b₂ = (W₂W₁)x + (W₂b₁ + b₂). A network with 100 linear layers is equivalent to a single linear layer — it can only solve linearly separable problems, which is a tiny fraction of real-world tasks.',
      },
      {
        id: 'q2-2',
        text: 'How does a negative bias affect when a ReLU neuron activates?',
        answer: 'A negative bias makes activation harder. Since the neuron computes ReLU(w·x + b), a large negative b means the weighted sum w·x must exceed |b| before the neuron outputs anything non-zero. Geometrically, a negative bias shifts the "decision boundary" — the neuron becomes selective and only fires for strongly positive inputs. A positive bias has the opposite effect: the neuron is more easily triggered.',
      },
      {
        id: 'q2-3',
        text: 'Why does depth (more layers) generally outperform width (more neurons per layer)?',
        answer: 'Deep networks learn hierarchical representations. A shallow wide network learns all features in one shot, but a deep network can compose simple features into increasingly abstract ones — edges → textures → shapes → objects (in vision). Empirically and theoretically, exponentially more neurons are needed in a shallow network to match what a deep network achieves with far fewer total parameters. This is why modern networks have hundreds of layers rather than single massive layers.',
      },
    ],
  },
  {
    id: 'backprop-gradients',
    title: 'Backprop & Gradients',
    description: 'The chain rule applied recursively — how neural networks calculate the gradient of a loss function with respect to every weight, enabling learning.',
    duration: '12 min',
    intro: <Lesson3Intro />,
    visualisation: <Lesson3Vis />,
    playground: <Lesson3Playground />,
    questions: [
      {
        id: 'q3-1',
        text: 'What happens if you set the learning rate too high? Try α > 1.0 in the simulator.',
        answer: 'With a high learning rate, each step is so large that it overshoots the minimum entirely. The position bounces back and forth across the valley with increasing amplitude — the loss diverges to infinity rather than converging. This is why learning rate tuning is critical: too small means painfully slow convergence; too large means the training explodes. Modern optimizers like Adam use adaptive per-parameter learning rates to avoid this problem.',
      },
      {
        id: 'q3-2',
        text: 'Why do the steps naturally get smaller as you approach the minimum (even with a fixed learning rate)?',
        answer: 'The step size is α × gradient. For f(x) = x², the gradient is f′(x) = 2x. As x approaches 0 (the minimum), the gradient also approaches 0. So the update rule x ← x − α·2x automatically produces smaller and smaller steps as you get closer to the answer. This is a property of gradient descent on smooth functions — it naturally decelerates near optima.',
      },
      {
        id: 'q3-3',
        text: 'What is the chain rule and why is it the mathematical foundation of backpropagation?',
        answer: 'The chain rule states that for composed functions, the derivative is the product of derivatives: d/dx[f(g(x))] = f′(g(x)) · g′(x). A neural network is a deeply nested composition of functions (layers). Backpropagation applies the chain rule recursively from the output layer backward, computing how much each weight contributed to the final loss. Without the chain rule, there would be no efficient way to compute gradients in deep networks — we would need to perturb every weight individually, which is computationally prohibitive.',
      },
    ],
  },
  {
    id: 'cnns',
    title: 'Convolutional Neural Networks',
    description: 'How spatial feature extraction using shared filter weights gives CNNs their power for images — and the convolution operation that makes it work.',
    duration: '12 min',
    intro: <Lesson4Intro />,
    visualisation: <Lesson4Vis />,
    playground: <Lesson4Playground />,
    questions: [
      {
        id: 'q4-1',
        text: 'Why are CNNs dramatically more efficient than MLPs for images?',
        answer: 'Two reasons: local connectivity and weight sharing. An MLP connecting every pixel of a 256×256 image to 512 hidden units requires 33 million parameters for that layer alone. A CNN\'s 3×3 filter has just 9 parameters, applied everywhere. Additionally, CNNs preserve spatial structure — nearby pixels are processed together, so the network can detect local patterns like edges regardless of where they appear in the image. This translation invariance is a free inductive bias that MLPs must laboriously learn from scratch.',
      },
      {
        id: 'q4-2',
        text: 'What does the Edge Detection filter do mathematically, and why does it produce large values at edges?',
        answer: 'The edge detection kernel [-1,-1,-1,-1,8,-1,-1,-1,-1] compares a center pixel to all its neighbors. If the center equals the average of its neighbors (uniform region), the positive and negative terms cancel to zero. If the center is very different from its neighbors (an edge), the 8×center term dominates, producing a large positive value. The filter is essentially computing a discrete approximation of the Laplacian, a second derivative that measures local variation.',
      },
      {
        id: 'q4-3',
        text: 'How does stacking multiple convolutional layers build increasingly complex features?',
        answer: 'Each layer\'s feature maps become the input to the next layer\'s filters. The first layer might detect edges (simple, local patterns). The second layer, operating on edge maps, can detect corners and curves. Deeper layers combine these into textures, then object parts, then full objects. This compositional hierarchy is why deep CNNs dramatically outperform shallow ones on complex visual tasks — the depth allows the network to learn a rich vocabulary of features from simple atomic patterns.',
      },
    ],
  },
  {
    id: 'rnns-vanishing-gradients',
    title: 'RNNs & Vanishing Gradients',
    description: 'How recurrent networks process sequences through hidden state, and the vanishing gradient problem that crippled them — and the LSTM solution.',
    duration: '12 min',
    intro: <Lesson5Intro />,
    visualisation: <Lesson5Vis />,
    playground: <Lesson5Playground />,
    questions: [
      {
        id: 'q5-1',
        text: 'If the recurrent weight is 0.5, what happens to information from step 1 by step 10?',
        answer: 'It is multiplied by 0.5 ten times: 0.5¹⁰ ≈ 0.00097. The signal from step 1 has been reduced to less than 0.1% of its original magnitude. For the network to act on this information, the gradient flowing back from the loss must pass through the same multiplication — it becomes equally tiny. The network effectively cannot "blame" weights from 10 steps ago for current errors, so it cannot learn long-range dependencies. Try it in the simulator: set W=0.5 and watch the bars collapse.',
      },
      {
        id: 'q5-2',
        text: 'Why not just set the recurrent weight to exactly 1.0 to preserve information?',
        answer: 'With W=1.0, all past information is preserved with equal weight forever. The network cannot selectively forget irrelevant past context or assign more importance to recent inputs — critical for tasks like language where recent words usually matter more. Also, learning becomes degenerate: the gradient is 1.0^t = 1.0 for all t, providing no signal about which time steps are relevant. LSTMs solve this with learnable gates that control what to remember, forget, and output at each step.',
      },
      {
        id: 'q5-3',
        text: 'What key architectural innovation do LSTMs introduce to solve the vanishing gradient?',
        answer: 'LSTMs introduce a cell state — a separate "memory highway" that runs alongside the hidden state. Information flows through the cell state via addition rather than multiplication: c_t = f_t ⊙ c_{t-1} + i_t ⊙ g_t. The forget gate f_t (not a fixed weight, but a learned function) allows gradients to flow unchanged through time steps where the gate is open (near 1), while the additive update avoids the multiplicative decay that kills vanilla RNNs. This is why LSTMs can capture dependencies across hundreds of time steps.',
      },
    ],
  },
  {
    id: 'attention-mechanism',
    title: 'Attention Mechanism',
    description: 'The Query–Key–Value framework that lets models selectively focus on any part of a sequence — the breakthrough enabling modern language models.',
    duration: '14 min',
    intro: <Lesson6Intro />,
    visualisation: <Lesson6Vis />,
    playground: <Lesson6Playground />,
    questions: [
      {
        id: 'q6-1',
        text: 'Why do we apply softmax to the attention scores, and why divide by √d_k first?',
        answer: 'Softmax converts raw dot-product scores into a probability distribution — values between 0 and 1 that sum to exactly 1.0. This means the model distributes exactly 100% of its "attention" across the context, creating a weighted average of the values. We divide by √d_k (the square root of the key dimension) because in high dimensions, dot products grow large (proportional to d_k), pushing the softmax into regions of near-zero gradient where learning stalls. The scaling keeps the inputs to softmax in a reasonable range regardless of embedding dimension.',
      },
      {
        id: 'q6-2',
        text: 'If the Query for "bank" is exactly orthogonal (perpendicular) to the Key for "river", what attention weight does "river" receive?',
        answer: 'Their dot product is exactly 0. After softmax, this score of 0 becomes exp(0)/Σ = 1/Σ — a low weight compared to words with positive scores. "Bank" would effectively ignore "river" when building its context vector, even though "river" is highly relevant for disambiguation. This is what the model must learn during training: adjust Q and K projections so that "bank" near "river" has a large Q·K dot product, while "bank" near "money" has a different pattern.',
      },
      {
        id: 'q6-3',
        text: 'What is the difference between self-attention and cross-attention?',
        answer: 'In self-attention, the queries, keys, and values all come from the same sequence — every token can attend to every other token in the same sequence. This is how a Transformer encoder builds contextualized representations. Cross-attention is used in encoder-decoder architectures (like the original Transformer for translation): the queries come from the decoder\'s current state, while the keys and values come from the encoder\'s output. This lets the decoder "attend" to relevant parts of the input sequence when generating each output token.',
      },
    ],
  },
  {
    id: 'transformers',
    title: 'Transformers',
    description: 'Multi-head attention, residual connections, layer normalization, and positional encoding — the architecture behind GPT, BERT, and all modern LLMs.',
    duration: '15 min',
    intro: <Lesson7Intro />,
    visualisation: <Lesson7Vis />,
    playground: <Lesson7Playground />,
    questions: [
      {
        id: 'q7-1',
        text: 'Why do Transformers require Positional Encoding?',
        answer: 'Unlike RNNs that process tokens sequentially (step 1, then 2, then 3…), Transformers process all tokens simultaneously in parallel via attention. This parallel processing has no inherent sense of order: "The dog bit the man" and "The man bit the dog" would look identical to a pure attention mechanism — just the same bag of tokens. Positional encoding injects position information by adding a unique vector to each token\'s embedding before processing. Original Transformers used sinusoidal functions; modern LLMs use learned embeddings or RoPE (rotary position encoding).',
      },
      {
        id: 'q7-2',
        text: 'What is the purpose of residual connections (skip connections) in each Transformer block?',
        answer: 'Residual connections add the layer\'s input directly to its output: y = F(x) + x. This has two crucial benefits. First, it combats the vanishing gradient problem in very deep networks: gradients can flow directly from the output to any earlier layer via the residual path, without passing through many multiplications. Second, each sub-layer only needs to learn the "correction" to the identity transformation rather than a complete transformation — this is much easier to optimize. Residual networks (ResNets) scaled from ~20 layers to 100+ layers when this technique was introduced.',
      },
      {
        id: 'q7-3',
        text: 'What is the difference between an encoder-only, decoder-only, and encoder-decoder Transformer?',
        answer: 'Encoder-only models (BERT) process the full input bidirectionally — every token attends to all others. They are good at understanding and classification tasks (sentiment, NER, question answering). Decoder-only models (GPT) use causal (masked) attention — each token can only attend to previous tokens. This enables autoregressive generation: predict the next token, append it, repeat. Most modern LLMs (GPT-4, LLaMA, Claude) are decoder-only. Encoder-decoder models (original Transformer, T5) use an encoder to process input and a decoder to generate output — ideal for translation and summarization where input and output are different sequences.',
      },
    ],
  },
  {
    id: 'tokenization-embeddings',
    title: 'Tokenization & Embeddings',
    description: 'How text becomes numbers: BPE tokenization, the embedding lookup table, semantic vector spaces, and why embeddings capture meaning geometrically.',
    duration: '10 min',
    intro: <Lesson8Intro />,
    visualisation: <Lesson8Vis />,
    playground: <Lesson8Playground />,
    questions: [
      {
        id: 'q8-1',
        text: 'Why do language models use subword tokenization (BPE) instead of assigning one number per word?',
        answer: 'Word-level tokenization has two fatal flaws: (1) Vocabulary explosion — English alone has millions of words, dialects, proper nouns, typos, and code. A word-level vocabulary would be enormous, making the embedding table memory-prohibitive. (2) Out-of-vocabulary words — any word not seen during training becomes an unknown token, losing all meaning. BPE uses a vocabulary of ~50,000-100,000 subword pieces that can compose any word. Frequent words get their own token; rare words are split into recognizable pieces. Nothing is ever truly "unknown."',
      },
      {
        id: 'q8-2',
        text: 'Why can\'t we just assign a simple integer to each word (apple=1, banana=2, cherry=3) instead of a high-dimensional embedding?',
        answer: 'Integer encoding implies a false ordering and distance: is banana twice apple? Is cherry 50% more than banana? These relationships are meaningless. High-dimensional embeddings (512–12288d vectors) let the model encode rich geometric relationships: similar words are nearby in space, semantic directions are consistent across words (the "royalty" direction that goes from king to queen also goes from man to woman), and word analogies can be solved by vector arithmetic. The embedding space is a learned, compressed semantic map of language.',
      },
      {
        id: 'q8-3',
        text: 'How are embeddings learned, and what determines their quality?',
        answer: 'Embedding vectors are initialized randomly and updated during training via backpropagation — exactly like any other weights in the network. The loss function (predicting the next token, or masked tokens in BERT\'s case) provides the training signal. Over billions of examples, words that appear in similar contexts end up with similar embeddings because they produce similar predictions. Quality depends on the quantity and diversity of training data, the embedding dimension (more dimensions = more capacity to encode nuance), and the training objective. Pre-trained embeddings like Word2Vec or those from large LLMs transfer remarkably well to new tasks.',
      },
    ],
  },
];
