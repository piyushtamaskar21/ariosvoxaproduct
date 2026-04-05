'use client';

import { motion } from 'framer-motion';
import { Sparkles, Rocket, Globe2 } from 'lucide-react';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const steps = [
  {
    icon: Sparkles,
    label: 'Step 1 — Build',
    title: 'Configure Your AI Agent',
    desc: 'Set the persona, language, knowledge base, and reasoning model in Agent Studio. Takes under 5 minutes.',
    color: 'from-indigo-500 to-violet-500',
  },
  {
    icon: Rocket,
    label: 'Step 2 — Deploy',
    title: 'Connect & Go Live',
    desc: 'Connect to any telephony stack via our Telephony layer. Assign a number, set inbound/outbound mode. Zero infrastructure needed.',
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    icon: Globe2,
    label: 'Step 3 — Scale',
    title: 'Launch Globally',
    desc: 'Deploy campaigns to thousands of contacts simultaneously. Monitor every call live. Let AI handle objections, qualify leads, and book meetings.',
    color: 'from-fuchsia-500 to-cyan-500',
  },
];

export function StepsTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#0A0C14] relative overflow-hidden">
      {/* Background line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-sora">
            From Zero to Global Voice Workforce
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              in 3 Steps
            </span>
          </h2>
        </div>

        {/* Step Cards */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:flex absolute top-16 left-[16.66%] right-[16.66%] h-0.5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
              className="flex-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 origin-left"
            />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.25, duration: 0.6 }}
                className="flex-1 relative"
              >
                <div className="bg-[#111827]/60 border border-white/[0.06] rounded-2xl p-8 hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
                  {/* Number badge */}
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Step label */}
                  <div className="text-xs font-mono text-indigo-400 mb-2 tracking-wider uppercase">
                    {step.label}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
