'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Globe, ShieldCheck, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Zap,
    label: '< 300ms Latency',
    description: 'Real-time voice pipeline with sub-300ms end-to-end response.',
    color: '#A78BFA',
  },
  {
    icon: Globe,
    label: '40+ Languages',
    description: 'Indic, European, and global languages. Always live.',
    color: '#22D3EE',
  },
  {
    icon: ShieldCheck,
    label: '99.9% Uptime SLA',
    description: 'Enterprise-grade infrastructure on GCP with full redundancy.',
    color: '#34D399',
  },
  {
    icon: Sparkles,
    label: 'AI Orchestrated',
    description: 'Agents that reason, remember, and act — not just respond.',
    color: '#F59E0B',
  },
];

export function FeaturesPlatform() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="py-16 md:py-32"
      style={{ background: 'linear-gradient(180deg, #0A0C14 0%, #0D0820 50%, #0A0C14 100%)' }}
    >
      <div className="mx-auto max-w-5xl space-y-12 px-4 sm:px-6 lg:px-8">

        {/* ── 2-Column Heading Row ──────────────────────────────────── */}
        <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl font-semibold text-white font-sora leading-snug"
          >
            One platform. Every voice touchpoint covered.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-sm sm:ml-auto text-sm text-gray-400 leading-relaxed"
          >
            From inbound to outbound — Arios orchestrates every call, every agent, every language, in real time.
          </motion.p>
        </div>

        {/* ── Large Screenshot in Browser Frame ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl p-2 md:p-3"
          style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Browser chrome bar */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#0D111C', borderRadius: '28px 28px 0 0' }}
          >
            {/* Traffic light dots */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            {/* Address bar */}
            <div className="flex-1 mx-4">
              <div className="bg-white/[0.05] rounded-md px-3 py-1 text-xs text-gray-500 text-center font-mono flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                studio.arios.dev/knowledge-base
              </div>
            </div>
            {/* Training tag */}
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(52,211,153,0.20)',
                color: '#34D399',
                border: '1px solid rgba(52,211,153,0.30)',
              }}
            >
              TRAIN
            </span>
          </div>

          {/* Screenshot */}
          <div className="relative overflow-hidden" style={{ borderRadius: '0 0 24px 24px' }}>
            <img
              src="/screenshots/knowledge-base.png"
              alt="Arios Voxa Knowledge Base — Neural Knowledge Base with 842 vector nodes"
              className="w-full h-auto object-cover"
            />
            {/* Gradient fade at bottom */}
            <div
              className="absolute inset-0 z-10"
              style={{
                background: 'linear-gradient(to top, #0A0C14 0%, transparent 40%)',
              }}
            />
          </div>
        </motion.div>

        {/* ── 4 Feature Pills ───────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-8 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" style={{ color: feature.color }} />
                  <h3 className="text-sm font-medium text-white">{feature.label}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
