'use client';

import { motion } from 'framer-motion';

const items = [
  { text: 'Q1 Outreach · 72% conversion', active: true },
  { text: 'Lead Gen March · 890/2000 dialed', active: true },
  { text: 'Marathi SDR · 1420/1540 · 71%', active: true },
  { text: 'EU Expansion · 320/1000', active: false },
  { text: 'Dental Clinic Receptionist · 0 calls', active: true },
  { text: '8,420 Connected · 12.4% CVR · Avg 3:12', active: true },
  { text: 'Healthcare APAC · 2,100 calls · 78%', active: true },
  { text: 'Fintech Pre-qual · 450 leads · 67%', active: true },
];

const duplicated = [...items, ...items, ...items];

export function LiveProofTicker() {
  return (
    <section className="bg-[#0D0F1A] border-y border-white/5 py-3 overflow-hidden">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        {duplicated.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
            <span className={`w-2 h-2 rounded-full shrink-0 ${item.active ? 'bg-green-400' : 'bg-yellow-400/50'}
              ${item.active ? 'animate-pulse' : ''}`} />
            <span>
              ○ {item.text} <span className={`font-semibold ${item.active ? 'text-green-400' : 'text-yellow-400/60'}`}>
              {item.active ? 'ACTIVE' : 'PAUSED'}</span>
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
