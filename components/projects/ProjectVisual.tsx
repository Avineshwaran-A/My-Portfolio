'use client';

import { motion } from 'framer-motion';

const visuals: Record<string, { label: string; accent: string; soft: string }> = {
  'cybersec-threat-sim': {
    label: 'THREAT SIM',
    accent: '#2f6b4f',
    soft: '#c4a35a',
  },
  'smart-resource-alloc': {
    label: 'ML SCHEDULER',
    accent: '#5a8f9c',
    soft: '#2f6b4f',
  },
  'threat-detection-system': {
    label: 'EDR ONLINE',
    accent: '#4a8f6a',
    soft: '#5a8f9c',
  },
};

function Illustration({ projectId }: { projectId: string }) {
  if (projectId === 'cybersec-threat-sim') {
    return (
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="pv1" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#c4a35a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2f6b4f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="180" r="150" fill="url(#pv1)" />
        <circle cx="200" cy="180" r="110" stroke="#6b9e78" strokeWidth="1.5" strokeOpacity="0.45" strokeDasharray="10 6" />
        <circle cx="200" cy="180" r="72" stroke="#2f6b4f" strokeWidth="2" strokeOpacity="0.55" strokeDasharray="8 4" />
        <path
          d="M200 100 L245 122 L245 165 C245 195 220 215 200 228 C180 215 155 195 155 165 L155 122 Z"
          fill="rgba(47,107,79,0.14)"
          stroke="#2f6b4f"
          strokeWidth="2"
        />
        <path d="M182 165 L195 178 L220 150" stroke="#2f6b4f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="120" y="280" width="160" height="36" rx="8" fill="rgba(47,107,79,0.1)" stroke="rgba(47,107,79,0.3)" />
        <text x="200" y="303" textAnchor="middle" fontSize="14" fill="#2f6b4f" fontFamily="monospace" fontWeight="600">
          THREAT SIM
        </text>
      </svg>
    );
  }

  if (projectId === 'smart-resource-alloc') {
    return (
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="pv2" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#5a8f9c" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2f6b4f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="180" r="150" fill="url(#pv2)" />
        {[
          [100, 120],
          [100, 180],
          [100, 240],
          [200, 100],
          [200, 150],
          [200, 210],
          [200, 260],
          [300, 140],
          [300, 220],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="10" fill="rgba(90,143,156,0.2)" stroke="#5a8f9c" strokeWidth="1.5" />
        ))}
        {[
          [100, 120, 200, 100],
          [100, 120, 200, 150],
          [100, 180, 200, 150],
          [100, 180, 200, 210],
          [100, 240, 200, 210],
          [100, 240, 200, 260],
          [200, 100, 300, 140],
          [200, 150, 300, 140],
          [200, 210, 300, 220],
          [200, 260, 300, 220],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5a8f9c" strokeWidth="1" strokeOpacity="0.45" />
        ))}
        <rect x="110" y="300" width="180" height="36" rx="8" fill="rgba(90,143,156,0.12)" stroke="rgba(90,143,156,0.35)" />
        <text x="200" y="323" textAnchor="middle" fontSize="13" fill="#5a8f9c" fontFamily="monospace" fontWeight="600">
          ML SCHEDULER
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="pv3" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#2f6b4f" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#5a8f9c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="180" r="150" fill="url(#pv3)" />
      <path
        d="M200 90 L265 120 L265 180 C265 225 235 255 200 275 C165 255 135 225 135 180 L135 120 Z"
        fill="rgba(47,107,79,0.14)"
        stroke="#4a8f6a"
        strokeWidth="2"
      />
      <path d="M170 180 L190 200 L235 155" stroke="#2f6b4f" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {[300, 320, 340].map((y, i) => (
        <line key={i} x1="80" y1={y} x2={220 + i * 10} y2={y} stroke="rgba(47,107,79,0.35)" strokeWidth="1.5" strokeDasharray="6 4" />
      ))}
      <text x="200" y="375" textAnchor="middle" fontSize="13" fill="#2f6b4f" fontFamily="monospace" fontWeight="600">
        EDR ONLINE
      </text>
    </svg>
  );
}

export function ProjectVisual({ projectId, title }: { projectId: string; title: string }) {
  const meta = visuals[projectId] ?? {
    label: 'PROJECT',
    accent: '#2f6b4f',
    soft: '#6b9e78',
  };

  return (
    <motion.div
      className="relative h-full min-h-[280px] sm:min-h-[360px] lg:min-h-0 overflow-hidden"
      style={{
        background: `linear-gradient(160deg, color-mix(in srgb, ${meta.accent} 12%, var(--bg-surface)) 0%, var(--bg-panel) 55%, color-mix(in srgb, ${meta.soft} 10%, var(--bg-surface)) 100%)`,
        borderRight: '1px solid var(--border)',
      }}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute -top-16 -left-10 w-64 h-64 rounded-full opacity-50"
        style={{
          background: `radial-gradient(circle, ${meta.accent}55 0%, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.08, 1], x: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-0 w-48 h-48 rounded-full opacity-40"
        style={{
          background: `radial-gradient(circle, ${meta.soft}44 0%, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.1, 1], y: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 lg:p-12">
        <div className="w-full max-w-[320px] aspect-square">
          <Illustration projectId={projectId} />
        </div>
        <p
          className="mt-2 text-xs font-mono tracking-[0.2em] uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          {meta.label}
        </p>
        <p className="sr-only">{title}</p>
      </div>
    </motion.div>
  );
}
