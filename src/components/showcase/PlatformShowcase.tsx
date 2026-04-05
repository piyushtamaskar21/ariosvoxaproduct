'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Phone, Zap, BookOpen, BarChart3, Sparkles, MousePointer } from 'lucide-react';

const tabs = [
  {
    id: 'agent-studio',
    label: 'Agent Studio',
    icon: Bot,
    metric: 'Configure in < 5 minutes',
    image: '/screenshots/agent-studio.png',
  },
  {
    id: 'live-calls',
    label: 'Live Calls',
    icon: Phone,
    metric: '120ms · Real-time transcription',
    image: '/screenshots/live-calls.png',
  },
  {
    id: 'campaigns',
    label: 'Campaign Orchestrator',
    icon: Zap,
    metric: '12.4% conversion · 8,420 active',
    image: '/screenshots/campaigns.png',
  },
  {
    id: 'knowledge-base',
    label: 'Knowledge Base',
    icon: BookOpen,
    metric: '842 vector nodes · 92% coverage',
    image: '/screenshots/knowledge-base.png',
  },
  {
    id: 'analytics',
    label: 'Executive Intelligence',
    icon: BarChart3,
    metric: '99.9% uptime · Live stream active',
    image: '/screenshots/analytics.png',
  },
];

export function PlatformShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMouse({ x, y });
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0A0C14]" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-sora">
            One Platform. Every Voice Touchpoint.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From first call to closed deal — orchestrated by AI.
          </p>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-12">
          {/* Tab Navigation */}
          <div className="flex flex-col gap-2">
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              const isActive = activeTab === i;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(i)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 group
                    ${isActive
                      ? 'bg-indigo-600/15 border border-indigo-500/30 text-white'
                      : 'bg-transparent border border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-indigo-600/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                      {tab.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{tab.metric}</div>
                  </div>
                  <Sparkles className={`w-4 h-4 transition-opacity ${isActive ? 'text-indigo-400 opacity-100' : 'opacity-0'}`} />
                </motion.button>
              );
            })}
          </div>

          {/* 3D Browser Mockup */}
          <motion.div
            style={{
              perspective: '1200px',
              rotateY: mouse.x * 4,
              rotateX: -mouse.y * 3,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="relative"
          >
            {/* Browser Frame */}
            <div className="bg-[#1A2235] rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#111827] border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white/5 rounded-lg px-3 py-1.5 text-xs text-gray-500 text-center font-mono">
                    studio.arios.dev/{tabs[activeTab].id}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0C14]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={tabs[activeTab].id}
                    src={tabs[activeTab].image}
                    alt={tabs[activeTab].label}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Particles on tab switch */}
                <ParticleBurst key={`burst-${activeTab}`} />
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-indigo-600/5 blur-3xl rounded-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ParticleBurst() {
  const [particles, setParticles] = useState<{ x: number; y: number; delay: number; dx: number; dy: number }[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.3,
        dx: (Math.random() - 0.5) * 60,
        dy: (Math.random() - 0.5) * 60,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-indigo-400"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: p.dx, y: p.dy }}
          transition={{ delay: p.delay, duration: 0.8 }}
        />
      ))}
    </div>
  );
}
