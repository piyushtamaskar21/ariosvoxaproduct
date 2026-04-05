'use client';

import { motion } from 'framer-motion';

type LogoItem = { slug?: string; label: string };

const SIMPLE_ICONS = 'https://cdn.simpleicons.org/';

// Row 1 — AI Models & Voice (scrolls left)
const row1: LogoItem[] = [
  { slug: 'openai', label: 'OpenAI' },
  { slug: 'anthropic', label: 'Anthropic' },
  { slug: 'googlegemini', label: 'Gemini' },
  { slug: 'elevenlabs', label: 'ElevenLabs' },
  { slug: 'deepgram', label: 'Deepgram' },
  { slug: 'groq', label: 'Groq' },
  { slug: 'meta', label: 'Meta' },
  { slug: 'mistralai', label: 'Mistral' },
  { label: 'SARVAM' },
];

// Row 2 — Infra, Cloud & Frameworks (scrolls right)
const row2: LogoItem[] = [
  { slug: 'googlecloud', label: 'Google Cloud' },
  { slug: 'docker', label: 'Docker' },
  { label: 'LiveKit' },
  { label: 'Pipecat' },
  { slug: 'n8n', label: 'n8n' },
  { slug: 'terraform', label: 'Terraform' },
  { slug: 'postgresql', label: 'PostgreSQL' },
  { slug: 'redis', label: 'Redis' },
  { slug: 'keycloak', label: 'Keycloak' },
  { slug: 'github', label: 'GitHub' },
];

function LogoPill({ item }: { item: LogoItem }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-300 shrink-0 group cursor-default">
      {item.slug ? (
        <img
          src={`${SIMPLE_ICONS}${item.slug}/ffffff`}
          alt={item.label}
          width={24}
          height={24}
          className="w-3.5 h-3.5 sm:w-5 sm:h-5 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        />
      ) : (
        <span className="text-[10px] sm:text-xs font-bold text-white/30 group-hover:text-white/50 transition-opacity duration-300 tracking-wide">
          {item.label}
        </span>
      )}
      <span className="text-[9px] sm:text-[11px] text-white/30 font-medium group-hover:text-white/70 transition-opacity duration-300 whitespace-nowrap">
        {item.label}
      </span>
    </div>
  );
}

function MarqueeRow({
  logos,
  direction,
  duration,
}: {
  logos: LogoItem[];
  direction: 'left' | 'right';
  duration: number;
}) {
  // Multiply logos so animation loop is seamless
  const items = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  return (
    <div className="flex overflow-hidden select-none" style={{ touchAction: 'none' }}>
      <motion.div
        className="flex gap-3 sm:gap-6"
        animate={
          direction === 'left'
            ? { x: [0, `-${(100 / 3)}%`] }
            : { x: [`-${(100 / 3)}%`, 0] }
        }
        transition={{ duration, ease: 'linear', repeat: Infinity }}
        style={{ width: 'max-content' }}
      >
        {items.map((item, i) => (
          <LogoPill key={`${item.label}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export function LiveProofTicker() {
  return (
    <section className="relative py-10 md:py-20 overflow-hidden bg-transparent group/ticker">
      {/* Section label */}
      <div className="text-center mb-6 md:mb-10 px-2">
        <span className="text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] text-gray-600 uppercase font-mono">
          Built on the world's best stack
        </span>
      </div>

      {/* Marquee rows */}
      <div className="space-y-3 md:space-y-4" style={{ willChange: 'transform' }}>
        {/* Row 1 — scrolls left */}
        <MarqueeRow logos={row1} direction="left" duration={35} />

        {/* Row 2 — scrolls right */}
        <MarqueeRow logos={row2} direction="right" duration={45} />
      </div>
    </section>
  );
}
