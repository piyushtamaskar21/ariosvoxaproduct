'use client';

import { motion } from 'framer-motion';
import { Heart, Building2, Home, ShoppingCart, GraduationCap, Briefcase, Truck, Shield } from 'lucide-react';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const useCases = [
  { icon: Heart, industry: 'Healthcare', useCase: 'Patient appointment scheduling', langs: 'EN, AR, HI' },
  { icon: Building2, industry: 'Banking & Finance', useCase: 'Loan pre-qualification calls', langs: 'EN, PT, ZH' },
  { icon: Home, industry: 'Real Estate', useCase: 'Property inquiry qualification', langs: 'EN, HI, MR' },
  { icon: ShoppingCart, industry: 'E-commerce', useCase: 'Order status & returns', langs: 'EN, ES, FR, DE' },
  { icon: GraduationCap, industry: 'EdTech', useCase: 'Student enrollment outreach', langs: 'EN, HI, TA' },
  { icon: Briefcase, industry: 'Enterprise B2B', useCase: 'Sales development (SDR)', langs: 'EN, JA, KO' },
  { icon: Truck, industry: 'Logistics', useCase: 'Delivery confirmation calls', langs: 'EN, AR, TR' },
  { icon: Shield, industry: 'Insurance', useCase: 'Claims intake & FNOL', langs: 'EN, ES, IT' },
];

export function UseCaseCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#0A0C14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.useCase}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="group relative bg-[#111827]/60 border border-white/[0.06] rounded-2xl p-5 hover:border-indigo-500/20 transition-all duration-300 overflow-hidden"
              >
                {/* Teal left border on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:bg-indigo-600/10 group-hover:border-indigo-500/20 transition-colors">
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                </div>

                <div className="text-xs text-indigo-400 font-medium mb-1">{uc.industry}</div>
                <div className="text-sm text-gray-300 font-medium mb-3">{uc.useCase}</div>

                <div className="flex flex-wrap gap-1.5">
                  {uc.langs.split(', ').map((lang) => (
                    <span key={lang} className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                      {lang}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
