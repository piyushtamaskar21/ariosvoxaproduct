'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { NoiseGrain } from './NoiseGrain';
import { KineticHeadline } from './KineticHeadline';
import { FloatingCards } from './FloatingCards';
import { StarFieldCanvas } from './StarField';
import { Play } from 'lucide-react';

import { Canvas } from '@react-three/fiber';

const VoiceGlobeScene = dynamic(
  () => import('./VoiceGlobe').then((m) => m.VoiceGlobeScene),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
  },
);

function AnimatedPill({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -2, borderColor: 'rgba(99,102,241,0.5)', backgroundColor: 'rgba(99,102,241,0.05)' }}
      className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3 cursor-default transition-all duration-200"
    >
      <div className="font-sora font-bold text-white text-base tabular-nums">{value}</div>
      <div className="text-[11px] text-gray-500 mt-0.5">{label}</div>
    </motion.div>
  );
}

export function HeroSection() {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #05040B 0%, #0D0820 100%)',
      }}
    >
      {/* Layer 0 — Background environment */}
      <NoiseGrain />

      {/* Bloom blobs */}
      <div className="absolute top-[-10%] right-[5%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(38,26,177,0.35) 0%, transparent 70%)',
        }}
      />
      <div className="absolute bottom-[-10%] right-[15%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(83,64,98,0.25) 0%, transparent 70%)',
        }}
      />
      <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Layer 0 — Star field */}
      <StarFieldCanvas />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 h-screen flex items-center">
        <div className="w-full grid lg:grid-cols-[55%_45%] gap-8 lg:gap-0 items-center">
          {/* Layer 3 — Hero copy (left column) */}
          <div className="flex flex-col justify-center space-y-8 z-[10]">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0, filter: 'blur(20px)', opacity: 0 }}
              animate={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span
                className="inline-flex items-center gap-2 border border-indigo-500/40 bg-indigo-500/[0.08] rounded-full px-5 py-2 text-[13px] font-medium text-[#A5B4FC]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Now live in 40+ languages globally
              </span>
            </motion.div>

            {/* H1 Kinetic Headline */}
            <div className="pt-2">
              <KineticHeadline started />
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-[#9CA3AF] text-base sm:text-lg leading-[1.7] max-w-[480px]"
            >
              Deploy intelligent voice agents that listen, reason, and act across every timezone, language, and business function — in under 2 minutes.
            </motion.p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3">
              <AnimatedPill value="< 300ms" label="Response Latency" delay={1.0} />
              <AnimatedPill value="99.9%" label="Uptime SLA" delay={1.1} />
              <AnimatedPill value="40+" label="Languages" delay={1.2} />
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group px-8 py-4 rounded-xl font-semibold text-white text-[15px] overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                  boxShadow: '0 0 40px rgba(99,102,241,0.3)',
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
                  const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
                  (e.currentTarget as HTMLButtonElement).style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = '';
                }}
              >
                <span className="relative z-10">Deploy Free for 30 Days →</span>
                {/* Breathing glow */}
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    boxShadow: '0 0 60px rgba(99,102,241,0.5)',
                    animation: 'breatheGlow 3s ease-in-out infinite',
                  }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-4 rounded-xl font-medium text-white text-[15px] border border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.08] transition-colors duration-200"
              >
                <Play className="w-4 h-4" />
                Watch Live Demo
              </motion.button>
            </motion.div>
          </div>

          {/* Layer 1 — 3D Globe (right column) */}
          <div className="relative h-[500px] lg:h-[650px]">
            {/* Layer 2 — Glassmorphism floating cards (z-index 10, on top of globe) */}
            <FloatingCards />
            <VoiceGlobe />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[11px] text-[#4B5563] tracking-widest uppercase">scroll to explore</span>
        <div className="flex flex-col items-center gap-0">
          {[0, 0.2].map((offset) => (
            <svg
              key={offset}
              width="20"
              height="10"
              viewBox="0 0 20 10"
              style={{ animation: `scrollCue 2s ease-in-out ${offset}s infinite` }}
            >
              <path d="M2 2L10 8L18 2" stroke="#6366F1" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes breatheGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes scrollCue {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(6px); }
        }
        @keyframes waveform {
          0% { height: 2px; }
          100% { height: 12px; }
        }
      `}</style>
    </section>
  );
}
