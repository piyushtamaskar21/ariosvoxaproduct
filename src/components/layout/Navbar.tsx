'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe2, ArrowRight } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0C14]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 shrink-0">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L4 28h5l7-16 7 16h5L16 4z" fill="url(#logoGrad)" />
              <defs>
                <linearGradient id="logoGrad" x1="4" y1="4" x2="28" y2="28">
                  <stop stopColor="#6366F1" />
                  <stop offset="1" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
            </svg>
            <div className="hidden sm:block">
              <span className="text-white font-sora font-bold text-lg tracking-tight">ARIOS</span>
              <span className="text-[#22D3EE] font-sora font-semibold text-xs tracking-widest ml-2">VOXA STUDIO</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {['Product', 'Solutions', 'Pricing', 'Docs'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {item}
              </a>
            ))}

            {/* Global Markets Toggle */}
            <div className="ml-4 flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
              <button className="px-3 py-1.5 text-xs text-white bg-indigo-600 rounded-md font-medium">
                Global Markets
              </button>
              <button className="px-3 py-1.5 text-xs text-gray-400 rounded-md hover:text-white transition-colors">
                India
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors px-4 py-2">
              Log in
            </a>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20"
            >
              Start Free
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-gray-300 hover:text-white p-2"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-[#0A0C14]/95 backdrop-blur-xl border-b border-white/5"
        >
          <div className="px-4 py-4 space-y-2">
            {['Product', 'Solutions', 'Pricing', 'Docs'].map((item) => (
              <a
                key={item}
                href="#"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a href="#" className="text-center px-4 py-2.5 text-sm text-gray-300 hover:text-white">
                Log in
              </a>
              <a
                href="#cta"
                className="text-center bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
              >
                Start Free
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
