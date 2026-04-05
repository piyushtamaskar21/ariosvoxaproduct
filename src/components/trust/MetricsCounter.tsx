'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const metrics = [
  { value: 2400, suffix: '+', label: 'Teams deployed globally' },
  { value: 50, suffix: 'M+', label: 'Minutes of voice AI delivered' },
  { value: 99.9, suffix: '%', label: 'Uptime across all regions', decimals: true },
  { value: 2.4, suffix: 'x', label: 'CSAT improvement vs legacy IVR', decimals: true },
];

const trustPillars = [
  { icon: '🔒', text: 'SOC 2 Type II Ready' },
  { icon: '🌐', text: 'Multi-region deployment (US, EU, APAC, India)' },
  { icon: '⚡', text: 'Sub-300ms global edge latency' },
];

function AnimatedValue({
  end,
  suffix,
  decimals = false,
  isActive,
}: {
  end: number;
  suffix: string;
  decimals?: boolean;
  isActive: boolean;
}) {
  const display = decimals
    ? (end * Math.min(1, isActive ? 1 : 0)).toFixed(1)
    : Math.round(end * Math.min(1, isActive ? 1 : 0)).toLocaleString();
  return <>{display}{suffix}</>;
}

export function MetricsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#0A0C14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-sora">
            Built for Enterprise.
            <span className="text-gray-500"> Trusted at Scale.</span>
          </h2>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono mb-2">
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  <AnimatedValue
                    end={m.value}
                    suffix={m.suffix}
                    decimals={m.decimals}
                    isActive={isInView}
                  />
                </span>
              </div>
              <div className="text-sm text-gray-400">{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Trust Pillars */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {trustPillars.map((p, i) => (
            <motion.div
              key={p.text}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-[#111827]/60 border border-white/[0.06] rounded-xl px-6 py-4 text-center"
            >
              <span className="text-xl">{p.icon}</span>
              <div className="text-sm text-gray-300 mt-2">{p.text}</div>
            </motion.div>
          ))}
        </div>

        {/* Security Ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="border-t border-white/5 pt-6"
        >
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-mono text-gray-600 tracking-wider uppercase">
            {['CRYPTO LINK SECURED', 'JWT Auth', 'E2E Encrypted', 'RBAC + Row-Level Security', 'TRAI Compliant (India)'].map(
              (item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  {item}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
