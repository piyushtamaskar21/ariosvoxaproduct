'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Rocket, Globe2 } from 'lucide-react';
import { useRef } from 'react';

const steps = [
  {
    icon: Sparkles,
    num: '01',
    label: 'Step 1 — Build',
    title: 'Configure Your AI Agent',
    desc: 'Set the persona, language, knowledge base, and reasoning model in Agent Studio. Takes under 5 minutes.',
    color: '#6366F1',
  },
  {
    icon: Rocket,
    num: '02',
    label: 'Step 2 — Deploy',
    title: 'Connect & Go Live',
    desc: 'Connect to any telephony stack via our Telephony layer. Assign a number, set inbound/outbound mode. Zero infrastructure needed.',
    color: '#A78BFA',
  },
  {
    icon: Globe2,
    num: '03',
    label: 'Step 3 — Scale',
    title: 'Launch Globally',
    desc: 'Deploy campaigns to thousands of contacts simultaneously. Monitor every call live. Let AI handle objections, qualify leads, and book meetings.',
    color: '#22D3EE',
  },
];

export function StepsTimeline() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0C14 0%, #0D0820 50%, #0A0C14 100%)' }}
    >
      {/* Parallax background orbs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)' }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 px-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono tracking-widest uppercase text-indigo-400 mb-3 sm:mb-4"
          >
            Deployment Playbook
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white font-sora leading-tight"
          >
            From Zero to Global Voice Workforce
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              in 3 Steps
            </span>
          </motion.h2>
        </div>

        {/* Step Cards */}
        <div className="relative flex flex-col lg:flex-row gap-6 sm:gap-8">

          {/* Vertical connecting line (mobile) */}
          <div
            className="lg:hidden absolute left-7 top-0 bottom-0 w-px"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.6, delay: 0.6, ease: 'easeInOut' }}
              className="w-full h-full bg-gradient-to-b from-indigo-500 via-violet-500 to-cyan-400 origin-top"
            />
          </div>

          {/* Animated connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-16 h-px"
            style={{
              left: 'calc(16.66% + 28px)',
              right: 'calc(16.66% + 28px)',
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.6, delay: 0.6, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 origin-left"
            />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="flex-1 group"
              >
                <div
                  className="relative h-full rounded-2xl p-5 sm:p-6 md:p-8 border transition-all duration-500"
                  style={{
                    background: 'rgba(17,24,39,0.6)',
                    borderColor: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Hover inner glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ boxShadow: `inset 0 0 40px ${step.color}08` }}
                  />
                  {/* Hover bottom accent */}
                  <div
                    className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right, transparent, ${step.color}, transparent)` }}
                  />

                  {/* Icon badge */}
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500"
                    style={{ background: `${step.color}18`, border: `1px solid ${step.color}30` }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: step.color }} />
                    <span
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ background: step.color, color: '#000' }}
                    >
                      {i + 1}
                    </span>
                  </div>

                  <div
                    className="text-[10px] font-mono tracking-widest uppercase mb-2"
                    style={{ color: step.color }}
                  >
                    {step.label}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-sora">{step.title}</h3>
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
