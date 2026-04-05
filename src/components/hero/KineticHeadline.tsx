'use client';

import { motion } from 'framer-motion';

function StaggeredLine({
  text,
  gradient = false,
  delayOffset = 0,
  className = '',
}: {
  text: string;
  gradient?: boolean;
  delayOffset?: number;
  className?: string;
}) {
  return (
    <div className={`inline-block ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: delayOffset + i * 0.02,
            duration: 0.5,
            ease: [0.21, 1.02, 0.73, 1],
          }}
          className={`inline-block ${gradient ? 'bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-[length:200%_auto] animate-[shimmer_4s_linear_infinite]' : ''}`}
          style={gradient ? { WebkitBackgroundClip: 'text', color: 'transparent' } : {}}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}

export function KineticHeadline({ started }: { started?: boolean }) {
  return (
    <div className="space-y-1">
      <h1 className="text-[32px] sm:text-[48px] md:text-[56px] lg:text-[72px] xl:text-[80px] font-extrabold leading-[1.1] sm:leading-[1.05] tracking-tight">
        <div>
          <StaggeredLine text="Your AI Voice" delayOffset={started ? 0.3 : 10} />
        </div>
        <div>
          <StaggeredLine text="Workforce." gradient delayOffset={started ? 0.35 : 10} />
        </div>
        <div className="mt-1">
          <StaggeredLine text="Always On." delayOffset={started ? 0.4 : 10} />
        </div>
        <div>
          <StaggeredLine
            text="Globally Fluent."
            gradient
            delayOffset={started ? 0.45 : 10}
          />
        </div>
      </h1>
    </div>
  );
}
