'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Users, Globe2 } from 'lucide-react';

const tiers = [
  { name: 'STARTER', desc: 'For teams getting started with voice AI', icon: Shield },
  { name: 'BUSINESS PRO', desc: 'For scaling contact center operations', icon: Users, featured: true },
  { name: 'ENTERPRISE', desc: 'Custom infra, SLAs & dedicated support', icon: Globe2 },
];

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="bg-gradient-to-br from-indigo-950 via-violet-950/50 to-indigo-950">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-600/10 blur-[80px] rounded-full" />
        </div>

        <div className="relative py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-sora">
                Your AI Workforce Is Ready to Deploy.
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                No credit card. No infrastructure. No waiting.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                <button className="group inline-flex items-center gap-2 bg-white text-indigo-950 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-white/10 hover:-translate-y-0.5">
                  Start Free — 30 Days
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="inline-flex items-center gap-2 border border-white/20 text-white font-medium px-6 py-4 rounded-xl hover:bg-white/10 transition-all">
                  Talk to Sales
                </button>
              </div>

              {/* Tiers */}
              <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
                {tiers.map((tier, i) => {
                  const Icon = tier.icon;
                  return (
                    <div
                      key={tier.name}
                      className={`relative rounded-xl p-5 text-center transition-all duration-300
                        ${tier.featured
                          ? 'bg-white/10 border border-indigo-400/30 shadow-lg shadow-indigo-500/10'
                          : 'bg-white/5 border border-white/10'
                        }`}
                    >
                      {tier.featured && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-[10px] font-bold px-3 py-0.5 rounded-full text-white uppercase tracking-wider">
                          Most Popular
                        </span>
                      )}
                      <Icon className={`w-6 h-6 mx-auto mb-3 ${tier.featured ? 'text-indigo-300' : 'text-gray-500'}`} />
                      <div className="text-xs tracking-widest text-indigo-300 font-bold mb-1">{tier.name}</div>
                      <div className="text-xs text-gray-400">{tier.desc}</div>
                    </div>
                  );
                })}
              </div>

              <a href="#" className="inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                View Pricing Plans <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#060810] border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L4 28h5l7-16 7 16h5L16 4z" fill="url(#footerLogoGrad)" />
                <defs>
                  <linearGradient id="footerLogoGrad" x1="4" y1="4" x2="28" y2="28">
                    <stop stopColor="#6366F1" />
                    <stop offset="1" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-gray-500 text-sm">ARIOS VOXA STUDIO</span>
            </a>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              {['Product', 'Pricing', 'Docs', 'Blog', 'Security', 'Careers'].map((link) => (
                <a key={link} href="#" className="hover:text-gray-300 transition-colors">
                  {link}
                </a>
              ))}
            </div>

            {/* Flags + Copyright */}
            <div className="flex flex-col items-center gap-3">
              <div className="text-lg tracking-widest" aria-label="Serving regions globally">
                🇺🇸 🇧 🇦🇪 🇮🇳 🇬 🇧🇷
              </div>
              <div className="text-xs text-gray-600">
                © 2026 Arios AI. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
