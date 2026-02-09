# Blog Setup Documentation

## Overview
The blog section has been successfully integrated into Eunice Labs with support for:
- Beautiful markdown rendering
- LaTeX/math equation support via KaTeX
- EB Garamond typography for headings
- Inter font for body text
- Responsive card-based layout
- Individual blog post pages with navigation

## Structure

```
frontend/
├── app/
│   ├── blog/
│   │   └── [slug]/
│   │       ├── page.tsx       # Dynamic blog post page
│   │       └── layout.tsx     # KaTeX rendering wrapper
│   ├── components/
│   │   ├── BlogCard.tsx       # Blog card component
│   │   ├── BlogContent.tsx    # Client wrapper for blog content
│   │   └── MarkdownRenderer.tsx # Markdown styling
│   ├── lib/
│   │   ├── blogs.ts           # Blog metadata
│   │   └── markdown.ts        # Markdown parser with LaTeX
│   └── page.tsx               # Updated with Foundations section
└── content/
    └── blogs/
        ├── seq2seq.md
        ├── bahdanau_explained.md
        ├── luong_explained.md
        ├── self_attention_explained.md
        └── transformer_explained.md
```

## Blog Posts

### Current Series: "Foundations"
A progression through neural sequence modeling architectures:

1. **Sequence-to-Sequence Models** (`seq2seq.md`)
   - Foundation of encoder-decoder architecture
   - 8 min read

2. **Bahdanau Attention Mechanism** (`bahdanau_explained.md`)
   - First attention mechanism in seq2seq
   - 12 min read

3. **Luong Attention** (`luong_explained.md`)
   - Simplified attention variants
   - 10 min read

4. **Self-Attention** (`self_attention_explained.md`)
   - The paradigm shift that enabled Transformers
   - 15 min read

5. **Transformers** (`transformer_explained.md`)
   - Complete "Attention is All You Need" architecture
   - 20 min read

## Adding New Blog Posts

1. **Create markdown file** in `content/blogs/`
   ```bash
   touch content/blogs/your-post.md
   ```

2. **Add metadata** to `app/lib/blogs.ts`:
   ```typescript
   {
     slug: 'your-post',
     title: 'Your Post Title',
     date: 'Jan 2025',
     description: 'Brief description',
     tags: ['tag1', 'tag2'],
     readTime: '10 min',
     order: 6
   }
   ```

3. **Write content** using markdown with LaTeX support:
   - Use `$$...$$` for display math
   - Use `$...$` for inline math
   - Code blocks with ` ```language `
   - All standard markdown features

## LaTeX Support

The blog supports LaTeX via KaTeX:

### Display Math
```markdown
$$
E = mc^2
$$
```

### Inline Math
```markdown
The equation $E = mc^2$ shows energy-mass equivalence.
```

## Typography

- **Headings (h1-h4)**: EB Garamond (serif)
- **Body text**: Inter (sans-serif)
- **Code**: Monospace
- **Math**: KaTeX default fonts

## Landing Page Section

The "Foundations" section appears on the main landing page with:
- Introduction paragraph
- Grid of blog post cards
- Tags, read time, and date on each card
- Smooth animations on scroll

## Navigation

- Previous/Next post navigation at bottom of each post
- "Back to Foundations" link at top
- Order-based progression through the series

## Styling Features

- Responsive design
- Hover effects on cards
- Clean white/cream color scheme
- Shadow and border effects
- Smooth transitions
- Proper spacing and typography hierarchy

## Future Enhancements

Consider adding:
- Search functionality
- Category filtering
- Related posts
- Table of contents for long posts
- Social sharing buttons
- Reading progress indicator
- Comments system
