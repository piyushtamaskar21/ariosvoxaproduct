'use client';

import { motion } from 'framer-motion';
import { Clock, Globe, MessageSquare, UserPlus, TrendingUp, Eye } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const problems = [
  {
    icon: Clock,
    title: "Agents sleep. Customers don't.",
    desc: 'Voice AI works 24/7/365 — every timezone, every hour.',
  },
  {
    icon: Globe,
    title: 'Language barriers kill global deals.',
    desc: '40+ language fluency with native-level TTS & STT.',
  },
  {
    icon: MessageSquare,
    title: 'IVRs frustrate. Conversations convert.',
    desc: '2.4× CSAT lift over legacy phone trees.',
  },
  {
    icon: UserPlus,
    title: 'Hiring takes months.',
    desc: 'Configure and deploy a trained agent in under 2 minutes.',
  },
  {
    icon: TrendingUp,
    title: 'Scale = cost explosion.',
    desc: 'Cost Index 0.84 — flat per-minute, no headcount tax.',
  },
  {
    icon: Eye,
    title: "You can't see what reps say.",
    desc: 'Full transcript + analytics on every interaction.',
  },
];

function ProblemCard({ problem, index }: { problem: typeof problems[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = problem.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(99,102,241,0.08)' }}
      className="group bg-[#111827]/60 border border-white/[0.06] rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:border-indigo-500/20 hover:bg-[#1A2235]/40"
    >
      <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-600/20 transition-colors">
        <Icon className="w-5 h-5 text-indigo-400" />
      </div>
      <h3 className="text-white font-semibold text-base mb-2">{problem.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{problem.desc}</p>
    </motion.div>
  );
}

export function ProblemGrid() {
  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-[#0A0C14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-sora">
            Your Human Workforce Has Limits.
            <br />
            <span className="text-gray-500">Your AI One Shouldn{'\u0027'}t.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {problems.map((p, i) => (
            <ProblemCard key={p.title} problem={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}