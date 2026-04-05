'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const cardStyle =
  "backdrop-blur-[20px] saturate-[180%] bg-white/[0.04] border border-white/[0.10] rounded-2xl p-4 " +
  "shadow-[0_0_0_0.5px_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(99,102,241,0.05)]";

/**
 * FloatingCards must be rendered INSIDE the globe column container
 * (position: relative) so that absolute positions are scoped to the
 * globe area — not the full hero section.
 */
export function FloatingCards() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* Card 1: US-EAST — top-right corner of globe column */}
      <motion.div
        className={`absolute top-[6%] right-[2%] ${cardStyle} w-[180px]`}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] font-bold text-green-400 tracking-widest">LIVE</span>
          <span className="ml-auto font-mono text-[11px] text-cyan-400">287ms</span>
        </div>
        <div className="text-[9px] text-gray-400 tracking-wide mb-2">US-EAST EDGE</div>
        <div className="flex items-end gap-0.5 h-4">
          {[3, 5, 2, 4, 6, 3, 5, 2, 4, 3, 5, 2, 4, 6, 3, 5].map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-sm bg-gradient-to-t from-indigo-500 to-cyan-400"
              style={{
                height: `${h * 3}px`,
                animation: `waveform ${0.6 + i * 0.08}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Card 2: Mumbai Edge — left side of globe column, vertically centred */}
      <motion.div
        className={`absolute top-1/2 -translate-y-1/2 left-[2%] ${cardStyle} w-[160px]`}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] font-semibold text-gray-200">Mumbai Edge</span>
        </div>
        <div className="font-mono text-lg font-bold text-cyan-400">120ms</div>
        <div className="text-[9px] text-gray-500 mt-0.5">latency</div>
      </motion.div>

      {/* Card 3: Active Calls — bottom-right corner of globe column */}
      <motion.div
        className={`absolute bottom-[8%] right-[2%] ${cardStyle} w-[170px]`}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] text-gray-500 tracking-wider font-bold">ACTIVE CALLS</span>
          <Zap className="w-3 h-3 text-indigo-400" />
        </div>
        <div className="font-mono text-2xl font-bold text-white">8,420</div>
        <div className="flex items-end gap-px h-6 mt-2">
          {[2, 3, 4, 3, 5, 6, 4, 5, 7, 6, 5, 4, 6, 7, 8, 6, 5, 7, 8, 7].map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-sm bg-gradient-to-t from-indigo-500/60 to-cyan-400/60"
              style={{ height: `${h * 3}px` }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
