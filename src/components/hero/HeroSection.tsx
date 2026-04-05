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

// Dynamic import with ssr:false — loading spinner is OUTSIDE Canvas
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
      whileHover={{
        y: -2,
        borderColor: 'rgba(99,102,241,0.5)',
        backgroundColor: 'rgba(99,102,241,0.05)',
      }}
      className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3 cursor-default transition-all duration-200"
    >
      <div className="font-bold text-white text-base tabular-nums">{value}</div>
      <div className="text-[11px] text-gray-500 mt-0.5">{label}</div>
    </motion.div>
  );
}

/* ── Premium scroll progress bar (top of viewport) ──────────────────── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  const [pct, setPct] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setPct(Math.round(v * 100)));

  return (
    <>
      {/* Gradient progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-0.5"
        style={{
          scaleX,
          originX: '0%',
          background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #22D3EE 100%)',
          boxShadow: '0 0 12px rgba(99,102,241,0.4)',
        }}
      />
      {/* Subtle blur layer underneath */}
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
      {/* Percentage pill — fades in after 5% */}
      {pct > 5 && (
        <motion.div
          className="fixed top-3 right-4 z-50 text-[10px] font-mono tracking-wider text-indigo-300/80"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {pct}%
        </motion.div>
      )}
    </>
  );
}

/* ── Cinematic scroll cue — replaces the old "scroll to explore" ─── */
function ScrollCue() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0 z-10">
      {/* Thin animated line that elongates */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-px h-10 overflow-visible"
      >
        {/* Static base line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/60 to-transparent" />
        {/* Animated dot traveling down the line */}
        <motion.div
          className="absolute left-1/2 w-1.5 h-1.5 -ml-[2px] rounded-full bg-indigo-400"
          initial={{ top: 0, opacity: 0 }}
          animate={{
            top: [0, 0, '100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.3, 1],
          }}
        />
        {/* Glow tail */}
        <motion.div
          className="absolute left-1/2 w-0.5 -ml-[0.4px] rounded-full"
          initial={{ top: 0, height: 0, opacity: 0 }}
          animate={{
            top: [0, 0, '80%'],
            height: ['40%', '40%', '20%'],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.3, 1],
          }}
          style={{
            background: 'linear-gradient(to bottom, transparent, #6366F1)',
          }}
        />
      </motion.div>
      {/* Label with slow fade */}
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
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #05040B 0%, #0D0820 100%)',
      }}
    >
      {/* ── Scroll Progress Bar (top-level, outside grid) ─── */}
      <ScrollProgressBar />

      {/* Noise grain overlay */}
      <NoiseGrain />

      {/* Bloom blobs */}
      <div
        className="absolute top-[-10%] right-[5%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(38,26,177,0.35) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[15%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(83,64,98,0.25) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Star field */}
      <StarFieldCanvas />

      {/* ── Arios Voxa Logo — top-left, subtle ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-6 left-6 lg:top-8 lg:left-12 z-20"
      >
        <div className="flex items-center gap-2.5 group cursor-default">
          {/* Logo mark with subtle breath glow */}
          <motion.div
            className="relative"
            whileHover={{ filter: 'brightness(1.2)' }}
          >
            <div
              className="absolute -inset-1.5 rounded-lg blur opacity-40 group-hover:opacity-70 transition-opacity duration-700"
              style={{
                background:
                  'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
              }}
            />
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              className="relative"
            >
              <path
                d="M16 4L4 28h5l7-16 7 16h5L16 4z"
                fill="url(#logoGradHero)"
              />
              <defs>
                <linearGradient
                  id="logoGradHero"
                  x1="4"
                  y1="4"
                  x2="28"
                  y2="28"
                >
                  <stop stopColor="#6366F1" />
                  <stop offset="1" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          <span className="text-sm font-semibold text-white/80 tracking-wide select-none font-sora">
            Arios Voxa{' '}
            <span className="text-indigo-400/60 font-normal">Studio</span>
          </span>
        </div>
      </motion.div>

      {/* Main content grid */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 h-screen flex items-center">
        <div className="w-full grid lg:grid-cols-[55%_45%] gap-8 lg:gap-0 items-center">

          {/* LEFT — Hero copy */}
          <div className="flex flex-col justify-center space-y-8 z-[10]">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0, filter: 'blur(20px)', opacity: 0 }}
              animate={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="inline-flex items-center gap-2 border border-indigo-500/40 bg-indigo-500/[0.08] rounded-full px-5 py-2 text-[13px] font-medium text-[#A5B4FC]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Now live in 40+ languages globally
              </span>
            </motion.div>

            {/* Kinetic Headline */}
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

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="https://ariosai.com/contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-8 py-4 rounded-xl font-semibold text-white text-[15px] overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                    boxShadow: '0 0 40px rgba(99,102,241,0.3)',
                  }}
                >
                  Talk to Sales →
                </motion.button>
              </a>

              <button className="flex items-center gap-2 px-6 py-4 rounded-xl font-medium text-white text-[15px] border border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.08] transition-colors">
                <Play className="w-4 h-4" />
                Watch Live Demo
              </button>
            </motion.div>
          </div>

          {/* RIGHT — 3D Globe */}
          <div className="relative h-[500px] lg:h-[650px]">
            <Canvas
              camera={{ position: [0, 0, 9], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
              className="absolute inset-0 w-full h-full"
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={0.5} />
              <VoiceGlobeScene />
            </Canvas>

            {/* HTML overlay on top of WebGL canvas */}
            <FloatingCards />
          </div>
        </div>
      </div>

      {/* ── Cinematic scroll cue ──────────────────────────────── */}
      <ScrollCue />
    </section>
  );
}
