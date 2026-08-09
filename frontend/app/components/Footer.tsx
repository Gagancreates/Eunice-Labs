import React from 'react';

/** Shared site footer — keeps the wording and spacing identical on every page. */
const Footer: React.FC = () => (
  <footer className="py-12 text-center border-t border-lab-accent/10">
    <p className="font-serif text-lab-text/60 italic mb-2">
      &ldquo;Purpose of Knowledge is Application&rdquo;
    </p>
    <p className="font-sans text-xs text-lab-text/40 tracking-widest uppercase">
      Built in the open. MIT Licensed. © {new Date().getFullYear()} Eunice Labs.
    </p>
  </footer>
);

export default Footer;
