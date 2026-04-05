'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function StarFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef<{ x: number; y: number; z: number; size: number; phase: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate stars
    starsRef.current = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 2 + 0.5,
      size: Math.random() * 1.5 + 0.5,
      phase: Math.random() * Math.PI * 2,
    }));

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    let raf: number;
    const animate = (time: number) => {
      if (!ctx || !canvas) {
        raf = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = (mouseRef.current.x - canvas.width / 2) * 0.02;
      const my = (mouseRef.current.y - canvas.height / 2) * 0.02;

      for (const star of starsRef.current) {
        const twinkle = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(time * 0.001 + star.phase));
        const px = star.x + mx * star.z;
        const py = star.y + my * star.z;

        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 210, 255, ${twinkle * 0.5})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
