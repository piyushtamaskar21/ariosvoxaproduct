'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const cities = [
  { name: 'New York', lat: 40.7, lng: -74 },
  { name: 'London', lat: 51.5, lng: -0.1 },
  { name: 'Dubai', lat: 25.2, lng: 55.3 },
  { name: 'Singapore', lat: 1.3, lng: 103.8 },
  { name: 'Mumbai', lat: 19.1, lng: 72.9 },
  { name: 'São Paulo', lat: -23.5, lng: -46.6 },
  { name: 'Tokyo', lat: 35.7, lng: 139.7 },
];

function projectPoint(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return { x: Math.round(x * 1000) / 1000, y: Math.round(y * 1000) / 1000, z: Math.round(z * 1000) / 1000 };
}

export function GlobalGlobe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#0A0C14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-sora">
            Deployed Across Industries.
            <br />
            <span className="text-gray-500">Speaking Every Language.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            One voice platform. Infinite business contexts.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Globe */}
          <div className="relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="relative w-80 h-80 sm:w-96 sm:h-96"
            >
              {/* Globe base */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-900/30 via-transparent to-cyan-900/20 border border-white/10" />

              {/* Rotating rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
              >
                {/* Latitudes */}
                {[-3, -1, 0, 1, 3].map((i) => (
                  <div
                    key={`lat-${i}`}
                    className="absolute left-1/2 rounded-full border border-indigo-500/10"
                    style={{
                      width: `${30 + Math.abs(i) * 15}%`,
                      height: `${30 + Math.abs(i) * 15}%`,
                      top: `${50 - (30 + Math.abs(i) * 15) / 2}%`,
                      transform: `translateX(-50%) perspective(500px) rotateX(60deg)`,
                    }}
                  />
                ))}
                {/* Longitudes */}
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={`lng-${i}`}
                    className="absolute inset-0 rounded-full border border-indigo-500/10"
                    style={{
                      transform: `rotateY(${i * 45}deg) rotateX(10deg)`,
                    }}
                  />
                ))}
              </motion.div>

              {/* City dots */}
              {cities.map((city) => {
                const pos = projectPoint(city.lat, city.lng, 150);
                return (
                  <div
                    key={city.name}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${pos.x}px)`,
                      top: `calc(50% + ${pos.y}px)`,
                    }}
                  >
                    <div className="relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50" />
                      <motion.div
                        animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-cyan-400"
                      />
                    </div>
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] text-gray-400 font-mono whitespace-nowrap">
                      {city.name}
                    </div>
                  </div>
                );
              })}

              {/* Connection lines (simplified) */}
              <svg className="absolute inset-0 w-full h-full" viewBox="-200 -200 400 400">
                {cities.slice(1).map((city, i) => {
                  const city2 = cities[0];
                  const p1 = projectPoint(city2.lat, city2.lng, 190);
                  const p2 = projectPoint(city.lat, city.lng, 190);
                  return (
                    <motion.line
                      key={i}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke="url(#lineGrad)"
                      strokeWidth="0.5"
                      strokeDasharray="2 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
                      transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
                    />
                  );
                })}
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#6366F1" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#22D3EE" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Outer glow */}
              <div className="absolute inset-[-40px] rounded-full bg-indigo-600/5 blur-[60px]" />
            </motion.div>
          </div>

          {/* Globe stats overlay */}
          <div className="space-y-4">
            {[
              { label: 'Global Edge Nodes', value: '12', suffix: '' },
              { label: 'Countries Live', value: '42+' },
              { label: 'Languages Supported', value: '40+' },
              { label: 'Avg Latency', value: '< 300ms' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-[#111827]/60 border border-white/[0.06] rounded-xl p-4 flex items-center justify-between hover:border-indigo-500/20 transition-colors"
              >
                <span className="text-gray-400 text-sm">{s.label}</span>
                <span className="font-mono text-cyan-400 font-semibold">{s.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
