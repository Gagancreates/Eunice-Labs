'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setTimeout(() => {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Experiments', href: '/experiments' },
    { name: 'Resources', href: '/resources' },
    { name: 'Writings', href: '/blog' },
    { name: 'Connect', href: '#connect' },
  ];

  const linkClass =
    'text-sm font-medium font-sans uppercase tracking-widest transition-colors cursor-pointer text-lab-text/80 hover:text-lab-accent';

  // Clicking Home while already on the homepage scrolls back up rather than
  // navigating to the route we're already on
  const handleHomeClick = (e: React.MouseEvent) => {
    if (!isHome) return;
    e.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // pointer-events-none so the full-width strip doesn't swallow clicks on the
    // page content beneath it; the bar and menu re-enable them for themselves
    <header className="fixed top-0 w-full z-50 flex flex-col items-end md:items-center px-4 pointer-events-none">
      {/* Flat across the top at rest; contracts into a floating pill on scroll */}
      <div
        className={`pointer-events-auto flex items-center gap-8 transition-all duration-500 ease-out ${
          isScrolled
            ? 'mt-3 p-2.5 md:px-7 md:py-3 rounded-full backdrop-blur-xl border bg-white/95 border-lab-accent/20 shadow-[0_8px_30px_rgba(0,0,0,0.14)] dark:bg-[#2b2521]/95 dark:border-lab-accent/40 dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
            : 'mt-6 px-2 py-1 rounded-full bg-transparent border border-transparent'
        }`}
      >
        {/* Desktop Nav — hash links only scroll on the homepage; elsewhere
            they navigate back to the homepage section */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) =>
            link.href.startsWith('/') || !isHome ? (
              <Link
                key={link.name}
                href={link.href.startsWith('/') ? link.href : `/${link.href}`}
                onClick={link.href === '/' ? handleHomeClick : undefined}
                className={linkClass}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={linkClass}
              >
                {link.name}
              </a>
            )
          )}
        </nav>

        {/* Desktop only — on mobile the theme switch lives in the menu */}
        <div className="hidden md:flex">
          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex text-lab-text"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto md:hidden mt-2 w-full max-w-sm rounded-2xl bg-lab-bg/90 backdrop-blur-md border border-lab-accent/15 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col p-6 space-y-4">
              {links.map((link) =>
                link.href.startsWith('/') || !isHome ? (
                  <Link
                    key={link.name}
                    href={link.href.startsWith('/') ? link.href : `/${link.href}`}
                    onClick={(e) => {
                      if (link.href === '/') handleHomeClick(e);
                      setMobileMenuOpen(false);
                    }}
                    className="text-base font-serif block cursor-pointer text-lab-text hover:text-lab-accent"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-base font-serif block cursor-pointer text-lab-text hover:text-lab-accent"
                  >
                    {link.name}
                  </a>
                )
              )}

              <div className="pt-3 mt-1 border-t border-lab-accent/10">
                <ThemeToggle withLabel />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
