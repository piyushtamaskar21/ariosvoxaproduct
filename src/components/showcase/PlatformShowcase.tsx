'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Bot, Phone, Zap, BookOpen, BarChart3, Activity, Globe, TrendingUp, Clock, Users, Mic2 } from 'lucide-react';

const tabs = [
  {
    id: 'agent-studio',
    label: 'Agent Studio',
    icon: Bot,
    metric: 'Configure in < 5 minutes',
    image: '/screenshots/agent-studio.png',
    accentColor: '#6366F1',
    tag: 'BUILD',
    description: 'Design your agent persona, select languages, embed knowledge, and wire reasoning models — all from a zero-code studio.',
  },
  {
    id: 'live-calls',
    label: 'Live Calls',
    icon: Phone,
    metric: '120ms · Real-time transcription',
    image: '/screenshots/live-calls.png',
    accentColor: '#22D3EE',
    tag: 'MONITOR',
    description: 'Watch every conversation unfold in real time. Full transcript, sentiment score, and live audio waveform — one screen.',
  },
  {
    id: 'campaigns',
    label: 'Campaign Orchestrator',
    icon: Zap,
    metric: '12.4% conversion · 8,420 active',
    image: '/screenshots/campaigns.png',
    accentColor: '#A78BFA',
    tag: 'SCALE',
    description: 'Launch outbound campaigns to thousands simultaneously. AI handles objections, qualifies leads, and books meetings autonomously.',
  },
  {
    id: 'knowledge-base',
    label: 'Knowledge Base',
    icon: BookOpen,
    metric: '842 vector nodes · 92% coverage',
    image: '/screenshots/knowledge-base.png',
    accentColor: '#34D399',
    tag: 'TRAIN',
    description: 'Feed your docs, FAQs, and SOPs. Vector search delivers the right answer in <30ms so agents never hallucinate.',
  },
  {
    id: 'analytics',
    label: 'Executive Intelligence',
    icon: BarChart3,
    metric: '99.9% uptime · Live stream active',
    image: '/screenshots/analytics.png',
    accentColor: '#F59E0B',
    tag: 'ANALYSE',
    description: 'Board-ready dashboards: conversion funnels, sentiment trends, cost-per-call, and CSAT — updated every 30 seconds.',
  },
];

const bentoMetrics = [
  { icon: Activity,    label: 'Active Calls',    value: '8,420',   delta: '+12%',   color: '#6366F1' },
  { icon: Clock,       label: 'Avg Response',     value: '120ms',   delta: 'p99',    color: '#22D3EE' },
  { icon: Users,       label: 'Leads Qualified',  value: '3,241',   delta: 'today',  color: '#A78BFA' },
  { icon: Globe,       label: 'Languages',        value: '40+',     delta: 'live',   color: '#34D399' },
  { icon: TrendingUp,  label: 'Conversion',       value: '12.4%',   delta: '↑2.1%',  color: '#F59E0B' },
  { icon: Mic2,        label: 'STT Accuracy',     value: '97.8%',   delta: 'STT',    color: '#EC4899' },
];

export function PlatformShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Auto-rotate tabs every 5s
  useEffect(() => {
    const t = setInterval(() => setActiveTab((p) => (p + 1) % tabs.length), 5000);
    return () => clearInterval(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    });
  };

  const active = tabs[activeTab];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0C14 0%, #0D0A1A 50%, #0A0C14 100%)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
    >
      {/* Parallax ambient glow — shifts color with active tab */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(ellipse, ${active.accentColor}18 0%, transparent 70%)`,
            transition: 'background 0.8s ease',
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-6"
              style={{
                border: `1px solid ${active.accentColor}40`,
                color: active.accentColor,
                background: `${active.accentColor}10`,
                transition: 'all 0.5s ease',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full glow-pulse" style={{ background: active.accentColor }} />
              One Platform. Every Voice Touchpoint.
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 font-sora leading-[1.1]"
          >
            From first call to{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${active.accentColor}, #fff)`,
                transition: 'background-image 0.5s ease',
              }}
            >
              closed deal
            </span>
            {' '}— orchestrated by AI.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto min-h-[56px] transition-all duration-500"
          >
            {active.description}
          </motion.p>
        </div>

        {/* ── Tab Pills ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-nowrap justify-start overflow-x-auto scrollbar-hide gap-2 mb-8 sm:mb-12 pb-2 sm:pb-0 sm:flex-wrap sm:justify-center"
        >
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            const isActive = activeTab === i;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-sm font-medium transition-all duration-300 whitespace-nowrap"
                style={{
                  background: isActive ? `${tab.accentColor}18` : 'rgba(255,255,255,0.04)',
                  border: isActive ? `1px solid ${tab.accentColor}50` : '1px solid rgba(255,255,255,0.07)',
                  color: isActive ? tab.accentColor : '#9CA3AF',
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="pill-active"
                    className="absolute inset-0 rounded-full"
                    style={{ boxShadow: `0 0 16px ${tab.accentColor}30` }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* ── Main Grid: Browser mockup + Bento sidebar ───────────── */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-6">

          {/* Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              rotateY: mouse.x * 3,
              rotateX: -mouse.y * 2,
            }}
            className="relative"
          >
            {/* Outer glow ring */}
            <div
              className="absolute -inset-1 rounded-3xl blur-xl opacity-30 transition-all duration-700"
              style={{ background: `radial-gradient(ellipse, ${active.accentColor} 0%, transparent 70%)` }}
            />

            {/* Browser frame */}
            <div
              className="relative rounded-2xl overflow-hidden border"
              style={{
                background: '#111827',
                borderColor: `${active.accentColor}25`,
                boxShadow: `0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px ${active.accentColor}10`,
              }}
            >
              {/* Browser chrome bar */}
              <div
                className="flex items-center gap-2 px-4 py-3 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#0D111C' }}
              >
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white/[0.05] rounded-md px-3 py-1 text-xs text-gray-500 text-center font-mono flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: active.accentColor }} />
                    studio.arios.dev/{active.id}
                  </div>
                </div>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{
                    background: `${active.accentColor}20`,
                    color: active.accentColor,
                    border: `1px solid ${active.accentColor}30`,
                  }}
                >
                  {active.tag}
                </span>
              </div>

              {/* Screenshot area */}
              <div className="relative aspect-[16/10] overflow-hidden" style={{ background: '#0A0C14' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <img
                      src={active.image}
                      alt={active.label}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle gradient overlay—bottom edge */}
                <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none" style={{ background: 'linear-gradient(to top, #0A0C14, transparent)' }} />
                {/* Scanline overlay — very faint */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* ── Bento Sidebar ──────────────────────────────────────── */}
          <div className="flex flex-col gap-4">

            {/* Live status */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-2xl p-4 border flex items-center gap-3"
              style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.2)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 glow-pulse flex-shrink-0" />
              <div>
                <div className="text-xs text-green-400 font-semibold">LIVE OPERATIONS</div>
                <div className="text-[11px] text-gray-500 mt-0.5">All systems nominal · 99.9% uptime</div>
              </div>
            </motion.div>

            {/* Data stream bar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="rounded-2xl p-4 border overflow-hidden"
              style={{ background: 'rgba(99,102,241,0.06)', borderColor: 'rgba(99,102,241,0.15)' }}
            >
              <div className="text-[10px] text-gray-500 font-mono mb-2 uppercase tracking-widest">Data Stream</div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="h-full rounded-full data-stream" />
              </div>
              <div className="text-[10px] text-gray-600 font-mono mt-1.5">24,891 events/min</div>
            </motion.div>

            {/* Metric bento grid */}
            <div className="grid grid-cols-2 gap-3 flex-1">
              {bentoMetrics.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.07 }}
                    className="rounded-xl p-3 border cursor-default"
                    style={{ background: `${m.color}08`, borderColor: `${m.color}18` }}
                  >
                    <Icon className="w-3.5 h-3.5 mb-2" style={{ color: m.color }} />
                    <div className="text-xl font-bold text-white tabular-nums leading-none">{m.value}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{m.label}</div>
                    <div className="text-[10px] font-mono mt-1" style={{ color: m.color }}>{m.delta}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Module progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="rounded-xl p-3 border"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div className="flex justify-between text-[10px] text-gray-500 mb-2">
                <span>Module</span>
                <span style={{ color: active.accentColor }}>{active.tag}</span>
              </div>
              {tabs.map((t, i) => (
                <div key={t.id} className="flex items-center gap-2 mb-1.5">
                  <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: t.accentColor }}
                      initial={{ width: 0 }}
                      animate={{ width: activeTab === i ? '100%' : '0%' }}
                      transition={{ duration: 5, ease: 'linear' }}
                      key={`prog-${i}-${activeTab}`}
                    />
                  </div>
                  <span
                    className="text-[9px] font-mono"
                    style={{ color: activeTab === i ? t.accentColor : '#4B5563', minWidth: 40 }}
                  >
                    {t.id.split('-')[0].toUpperCase()}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
