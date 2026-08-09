'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  /** Shows a text label beside the icon — used in the mobile menu */
  withLabel?: boolean;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ withLabel = false, className = '' }) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  // Render the light-mode icon until mounted so server and client markup match
  const dark = mounted && isDark;

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`flex items-center gap-3 text-lab-text/70 hover:text-lab-accent transition-colors ${className}`}
    >
      {dark ? (
        <Sun className="w-[18px] h-[18px] md:w-5 md:h-5" />
      ) : (
        <Moon className="w-[18px] h-[18px] md:w-5 md:h-5" />
      )}
      {withLabel && (
        <span className="text-base font-serif">{dark ? 'Light mode' : 'Dark mode'}</span>
      )}
    </button>
  );
};

export default ThemeToggle;
