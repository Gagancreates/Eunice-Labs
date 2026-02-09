// Simple markdown parser with LaTeX support

export function parseMarkdown(markdown: string): string {
  let html = markdown;

  // Store code blocks and inline code with unique identifiers
  const codeBlocks = new Map<string, string>();
  const inlineCodes = new Map<string, string>();
  const displayMath = new Map<string, string>();
  const inlineMath = new Map<string, string>();

  // Handle code blocks first (to protect them from other replacements)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const id = `___CODE_BLOCK_${codeBlocks.size}___`;
    codeBlocks.set(id, `<pre class="language-${lang || ''}"><code>${escapeHtml(code.trim())}</code></pre>`);
    return id;
  });

  // Handle inline code (use a more specific pattern to avoid conflicts)
  html = html.replace(/`([^`\n]+?)`/g, (match, code) => {
    const id = `___INLINE_CODE_${inlineCodes.size}___`;
    inlineCodes.set(id, `<code>${escapeHtml(code)}</code>`);
    return id;
  });

  // Handle LaTeX display math ($$...$$)
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
    const id = `___DISPLAY_MATH_${displayMath.size}___`;
    displayMath.set(id, `<div class="katex-display">\\[${math.trim()}\\]</div>`);
    return id;
  });

  // Handle LaTeX inline math ($...$) - be careful not to match $$
  html = html.replace(/\$([^\$\n]+?)\$/g, (match, math) => {
    const id = `___INLINE_MATH_${inlineMath.size}___`;
    inlineMath.set(id, `<span class="katex-inline">\\(${math}\\)</span>`);
    return id;
  });

  // Headers (must be on their own line)
  html = html.replace(/^#### (.+)$/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gim, '<h1>$1</h1>');

  // Bold and italic (non-greedy matching)
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links (before images to avoid conflicts)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />');

  // Lists (process line by line to avoid issues)
  const lines = html.split('\n');
  const processed: string[] = [];
  let inList = false;
  let inParagraph = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if it's a list item
    const listMatch = trimmed.match(/^[\*\-] (.+)$/) || trimmed.match(/^(\d+)\. (.+)$/);

    if (listMatch) {
      if (inParagraph) {
        processed.push('</p>');
        inParagraph = false;
      }
      if (!inList) {
        processed.push('<ul>');
        inList = true;
      }
      const content = listMatch[2] || listMatch[1];
      processed.push(`<li>${content}</li>`);
    } else if (trimmed === '') {
      if (inList) {
        processed.push('</ul>');
        inList = false;
      }
      if (inParagraph) {
        processed.push('</p>');
        inParagraph = false;
      }
      processed.push('');
    } else if (trimmed.match(/^<(h[1-6]|ul|ol|li|pre|blockquote|hr|div)/)) {
      if (inList) {
        processed.push('</ul>');
        inList = false;
      }
      if (inParagraph) {
        processed.push('</p>');
        inParagraph = false;
      }
      processed.push(trimmed);
    } else {
      if (inList) {
        processed.push('</ul>');
        inList = false;
      }
      if (!inParagraph && trimmed) {
        processed.push('<p>');
        inParagraph = true;
        processed.push(trimmed);
      } else if (inParagraph) {
        processed.push(' ' + trimmed);
      }
    }
  }

  if (inList) {
    processed.push('</ul>');
  }
  if (inParagraph) {
    processed.push('</p>');
  }

  html = processed.join('\n');

  // Blockquotes
  html = html.replace(/^> (.+)$/gim, '<blockquote>$1</blockquote>');

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr />');

  // Restore everything in reverse order
  displayMath.forEach((value, key) => {
    html = html.split(key).join(value);
  });

  inlineMath.forEach((value, key) => {
    html = html.split(key).join(value);
  });

  codeBlocks.forEach((value, key) => {
    html = html.split(key).join(value);
  });

  inlineCodes.forEach((value, key) => {
    html = html.split(key).join(value);
  });

  return html;
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
