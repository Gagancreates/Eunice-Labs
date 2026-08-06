'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setPastHero(window.scrollY > window.innerHeight * 0.7);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // On the homepage the hero already shows the wordmark — only reveal
  // the header brand after scrolling past it
  const showBrand = pathname !== '/' || pastHero;

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    { name: 'About', href: '#about' },
    { name: 'Focus', href: '#focus' },
    { name: 'Experiments', href: '/experiments' },
    { name: 'Resources', href: '#resources' },
    { name: 'Writings', href: '/blog' },
    { name: 'Connect', href: '#connect' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#FFDAD6]/90 backdrop-blur-sm border-b border-white/20 py-4 shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center relative">
        {/* When hidden, the brand leaves the flex flow so the nav centers symmetrically */}
        <a
          href="#"
          onClick={scrollToTop}
          aria-hidden={!showBrand}
          tabIndex={showBrand ? 0 : -1}
          className={`font-serif text-2xl font-bold text-lab-text tracking-tight hover:text-lab-accent transition-opacity duration-300 ${
            showBrand ? 'opacity-100' : 'opacity-0 pointer-events-none absolute left-6'
          }`}
        >
          Eunice Labs
        </a>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex space-x-8 ${showBrand ? '' : 'mx-auto'}`}>
          {links.map((link) =>
            link.href.startsWith('/') ? (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium font-sans uppercase tracking-widest border-b transition-all pb-0.5 cursor-pointer text-lab-text/80 hover:text-lab-accent border-transparent hover:border-lab-accent"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium font-sans uppercase tracking-widest border-b transition-all pb-0.5 cursor-pointer text-lab-text/80 hover:text-lab-accent border-transparent hover:border-lab-accent"
              >
                {link.name}
              </a>
            )
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden ml-auto text-lab-text"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FFDAD6] border-b border-white/20 overflow-hidden"
          >
            <nav className="flex flex-col p-6 space-y-4">
              {links.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-serif block cursor-pointer text-lab-text hover:text-lab-accent"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-lg font-serif block cursor-pointer text-lab-text hover:text-lab-accent"
                  >
                    {link.name}
                  </a>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;