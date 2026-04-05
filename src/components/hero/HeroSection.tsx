'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { NoiseGrain } from './NoiseGrain';
import { KineticHeadline } from './KineticHeadline';
import { FloatingCards } from './FloatingCards';
import { StarFieldCanvas } from './StarField';
import { Play } from 'lucide-react';

const VoiceGlobeScene = dynamic(
  () => import('./VoiceGlobe').then((m) => m.VoiceGlobeScene),
  { ssr: false, loading: () => null }
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
      className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2 sm:px-5 sm:py-3 cursor-default"
    >
      <div className="font-bold text-white text-sm sm:text-base tabular-nums">{value}</div>
      <div className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 whitespace-nowrap">{label}</div>
    </motion.div>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 });
  const [pct, setPct] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setPct(Math.round(v * 100)));

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-0.5"
        style={{
          scaleX,
          originX: '0%',
          background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #22D3EE 100%)',
          boxShadow: '0 0 12px rgba(99,102,241,0.4)',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 z-40 h-1"
        style={{
          scaleX,
          originX: '0%',
          background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #22D3EE)',
          filter: 'blur(4px)',
          opacity: 0.5,
        }}
      />
      {pct > 5 && (
        <motion.div
          className="hidden sm:block fixed top-3 right-4 z-50 text-[10px] font-mono tracking-wider text-indigo-300/80"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {pct}%
        </motion.div>
      )}
    </>
  );
}

function ScrollCue() {
  return (
    // hidden on very small screens to avoid crowding; shown sm+
    <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-0 z-10">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-px h-10 overflow-visible"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/60 to-transparent" />
        <motion.div
          className="absolute left-1/2 w-1.5 h-1.5 -ml-[2px] rounded-full bg-indigo-400"
          initial={{ top: 0, opacity: 0 }}
          animate={{ top: [0, 0, '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.3, 1] }}
        />
        <motion.div
          className="absolute left-1/2 w-0.5 -ml-[0.4px] rounded-full"
          initial={{ top: 0, height: 0, opacity: 0 }}
          animate={{ top: [0, 0, '80%'], height: ['40%', '40%', '20%'], opacity: [0, 0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.3, 1] }}
          style={{ background: 'linear-gradient(to bottom, transparent, #6366F1)' }}
        />
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.3] }}
        transition={{ delay: 2.8, duration: 3, ease: 'easeInOut' }}
        className="text-[10px] tracking-[0.25em] uppercase text-gray-600 mt-2 font-mono"
      >
        Explore
      </motion.span>
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #05040B 0%, #0D0820 100%)' }}
    >
      <ScrollProgressBar />
      <NoiseGrain />

      {/* Background glows */}
      <div
        className="absolute top-[-10%] right-[5%] w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(38,26,177,0.35) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-10%] right-[15%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(83,64,98,0.25) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[5%] left-[-5%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)' }}
      />

      <StarFieldCanvas />

      {/* ── Logo ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-12 z-20"
      >
        <div className="flex items-center gap-2 cursor-default">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="sm:hidden">
            <path d="M16 4L4 28h5l7-16 7 16h5L16 4z" fill="url(#lgH1)" />
            <defs>
              <linearGradient id="lgH1" x1="4" y1="4" x2="28" y2="28">
                <stop stopColor="#6366F1" /><stop offset="1" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="hidden sm:block">
            <path d="M16 4L4 28h5l7-16 7 16h5L16 4z" fill="url(#lgH2)" />
            <defs>
              <linearGradient id="lgH2" x1="4" y1="4" x2="28" y2="28">
                <stop stopColor="#6366F1" /><stop offset="1" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-sm font-semibold text-white/80 tracking-wide select-none font-sora">
            Arios Voxa
            <span className="hidden sm:inline text-indigo-400/60 font-normal"> Studio</span>
          </span>
        </div>
      </motion.div>

      {/* ── Main layout ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/*
          Mobile: single column, content centred, generous top padding clears logo.
          Desktop: two-column grid side by side, full viewport height.
        */}
        <div className="
          w-full
          flex flex-col items-center
          pt-24 pb-20
          sm:pt-28 sm:pb-24
          lg:grid lg:grid-cols-[55%_45%] lg:items-center lg:min-h-screen lg:py-0
          gap-8 lg:gap-0
        ">

          {/* LEFT — Hero copy */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-[600px] lg:max-w-none space-y-5 sm:space-y-7">

            {/* Badge */}
            <motion.div
              initial={{ scale: 0, filter: 'blur(20px)', opacity: 0 }}
              animate={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="inline-flex items-center gap-2 border border-indigo-500/40 bg-indigo-500/[0.08] rounded-full px-3 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-[13px] font-medium text-[#A5B4FC]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                Now live in 40+ languages globally
              </span>
            </motion.div>

            {/* Headline */}
            <div className="w-full">
              <KineticHeadline started />
            </div>

            {/* Subtext — no extra px on mobile since parent already has px-4 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-[#9CA3AF] text-sm sm:text-base lg:text-lg leading-relaxed max-w-[440px] lg:max-w-[480px]"
            >
              Deploy intelligent voice agents that listen, reason, and act across every timezone, language, and business function — in under 2 minutes.
            </motion.p>

            {/* Globe preview on mobile only — compact, no floating cards */}
            <div className="block md:hidden w-full max-w-[320px] mx-auto h-[260px] relative rounded-2xl overflow-hidden">
              <Canvas
                camera={{ position: [0, 0, 9], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
                className="absolute inset-0 w-full h-full"
                style={{ background: 'transparent' }}
              >
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />
                <VoiceGlobeScene />
              </Canvas>
            </div>

            {/* Stat pills */}
            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3 w-full justify-center lg:justify-start">
              <AnimatedPill value="< 300ms" label="Response Latency" delay={1.0} />
              <AnimatedPill value="99.9%" label="Uptime SLA" delay={1.1} />
              <AnimatedPill value="40+" label="Languages" delay={1.2} />
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            >
              <a
                href="https://ariosai.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white text-sm sm:text-[15px]"
                  style={{
                    background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                    boxShadow: '0 0 40px rgba(99,102,241,0.3)',
                  }}
                >
                  Talk to Sales →
                </motion.button>
              </a>
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-white text-sm sm:text-[15px] border border-white/[0.12] bg-white/[0.05]"
              >
                <Play className="w-4 h-4 flex-shrink-0" />
                Watch Live Demo
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT — 3D Globe (desktop/tablet only) */}
          <div className="hidden md:block relative w-full overflow-visible md:h-[400px] lg:h-[650px]">
            <Canvas
              camera={{ position: [0, 0, 9], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 1.5]}
              className="absolute inset-0 w-full h-full"
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={0.5} />
              <VoiceGlobeScene />
            </Canvas>
            <FloatingCards />
          </div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}
