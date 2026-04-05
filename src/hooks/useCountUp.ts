'use client';

import { useState, useEffect, useRef } from 'react';

export function useCountUp(
  end: number | string,
  duration = 2000,
  startCounting = false,
  suffix = '',
  prefix = ''
) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (!startCounting) return;

    const numericEnd = Number(String(end).replace(/[^0-9.-]/g, ''));
    if (isNaN(numericEnd)) return;

    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      if (!startTimeRef.current) return;
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(numericEnd * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, startCounting]);

  return prefix + count.toLocaleString() + suffix;
}
