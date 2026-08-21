'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Resource } from '../types';

interface ResourceListProps {
  items: Resource[];
  /** How many to show before the reader asks for more, and how many each click reveals */
  initialCount?: number;
}

const ResourceList: React.FC<ResourceListProps> = ({ items, initialCount = 5 }) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const visible = items.slice(0, visibleCount);
  const remaining = items.length - visible.length;

  return (
    <div>
      {visible.map((resource) => (
        <a
          key={resource.id}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block py-6"
        >
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6">
            <span className="font-serif text-base md:text-xl text-lab-text group-hover:text-lab-accent transition-colors">
              {resource.title}
            </span>
            <span className="flex items-center gap-3 text-xs font-sans uppercase tracking-widest text-lab-text/40 shrink-0">
              {resource.type}
              <ArrowUpRight
                size={13}
                className="text-lab-accent opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </span>
          </div>
          <p className="font-sans text-xs md:text-sm text-lab-text/60 mt-1 max-w-2xl">
            {resource.description}
          </p>
        </a>
      ))}

      {(remaining > 0 || visibleCount > initialCount) && (
        <div className="mt-6 flex items-center gap-6">
          {remaining > 0 && (
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + initialCount)}
              className="font-sans text-xs uppercase tracking-widest text-lab-text/40 hover:text-lab-accent transition-colors"
            >
              Load more ({remaining})
            </button>
          )}
          {visibleCount > initialCount && (
            <button
              type="button"
              onClick={() => setVisibleCount(initialCount)}
              className="font-sans text-xs uppercase tracking-widest text-lab-text/40 hover:text-lab-accent transition-colors"
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ResourceList;
