'use client';

import { useEffect, useRef } from 'react';

/**
 * Soft canopy atmosphere — organic orbs + dappled light.
 * No stars, aurora, or glass overlays.
 */
export function NatureBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDark = () =>
      document.documentElement.getAttribute('data-theme') === 'dark';

    const paintStatic = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const grad = ctx.createLinearGradient(0, 0, w * 0.2, h);
      if (isDark()) {
        grad.addColorStop(0, 'rgba(47,107,79,0.22)');
        grad.addColorStop(0.45, 'rgba(90,143,156,0.10)');
        grad.addColorStop(1, 'rgba(196,163,90,0.06)');
      } else {
        grad.addColorStop(0, 'rgba(107,158,120,0.28)');
        grad.addColorStop(0.4, 'rgba(212,232,216,0.35)');
        grad.addColorStop(1, 'rgba(196,163,90,0.12)');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    };

    if (prefersReduced) {
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        paintStatic();
      };
      resize();
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }

    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (!document.hidden) tick();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Orb = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: [number, number, number];
      alpha: number;
    };

    const orbs: Orb[] = [
      { x: 0.18, y: 0.22, vx: 0.00006, vy: 0.00004, radius: 0.42, color: [107, 158, 120], alpha: 0.22 },
      { x: 0.78, y: 0.18, vx: -0.00005, vy: 0.00007, radius: 0.36, color: [90, 143, 156], alpha: 0.16 },
      { x: 0.55, y: 0.72, vx: 0.00004, vy: -0.00005, radius: 0.38, color: [196, 163, 90], alpha: 0.12 },
      { x: 0.12, y: 0.68, vx: 0.00005, vy: 0.00003, radius: 0.28, color: [74, 143, 106], alpha: 0.14 },
      { x: 0.88, y: 0.58, vx: -0.00006, vy: -0.00004, radius: 0.26, color: [143, 188, 154], alpha: 0.13 },
    ];

    // Soft pollen motes (not stars)
    type Mote = { x: number; y: number; vx: number; vy: number; size: number; alpha: number };
    const motes: Mote[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -0.08 - Math.random() * 0.12,
      size: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.35 + 0.12,
    }));

    let lastTime = 0;

    const tick = (timestamp = 0) => {
      if (!isVisibleRef.current) return;
      const dt = Math.min(timestamp - lastTime, 40);
      lastTime = timestamp;

      const w = canvas.width;
      const h = canvas.height;
      const dark = isDark();

      ctx.clearRect(0, 0, w, h);

      // Soft vertical wash
      const wash = ctx.createLinearGradient(0, 0, 0, h);
      if (dark) {
        wash.addColorStop(0, 'rgba(21,36,28,0.35)');
        wash.addColorStop(0.5, 'rgba(15,26,20,0)');
        wash.addColorStop(1, 'rgba(47,107,79,0.12)');
      } else {
        wash.addColorStop(0, 'rgba(180,210,188,0.45)');
        wash.addColorStop(0.45, 'rgba(230,239,228,0)');
        wash.addColorStop(1, 'rgba(196,163,90,0.08)');
      }
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);

      orbs.forEach((orb) => {
        orb.x += orb.vx * dt;
        orb.y += orb.vy * dt;
        if (orb.x < 0.08 || orb.x > 0.92) orb.vx *= -1;
        if (orb.y < 0.08 || orb.y > 0.92) orb.vy *= -1;

        const gx = orb.x * w;
        const gy = orb.y * h;
        const gr = orb.radius * Math.max(w, h);
        const a = dark ? orb.alpha * 0.7 : orb.alpha;

        const gradient = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        const [r, g, b] = orb.color;
        gradient.addColorStop(0, `rgba(${r},${g},${b},${a})`);
        gradient.addColorStop(0.55, `rgba(${r},${g},${b},${a * 0.35})`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(gx, gy, gr * 0.85, gr * 0.7, 0.3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Dappled light streaks (subtle)
      ctx.save();
      ctx.globalAlpha = dark ? 0.04 : 0.07;
      for (let i = 0; i < 5; i++) {
        const lx = (w * (0.15 + i * 0.18) + Math.sin(timestamp * 0.0002 + i) * 30);
        const ray = ctx.createLinearGradient(lx, 0, lx + 80, h * 0.7);
        ray.addColorStop(0, 'rgba(255,248,220,0)');
        ray.addColorStop(0.3, 'rgba(255,248,220,0.9)');
        ray.addColorStop(1, 'rgba(255,248,220,0)');
        ctx.fillStyle = ray;
        ctx.beginPath();
        ctx.moveTo(lx, 0);
        ctx.lineTo(lx + 50, 0);
        ctx.lineTo(lx + 120, h * 0.65);
        ctx.lineTo(lx + 40, h * 0.65);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      motes.forEach((m) => {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -10) {
          m.y = h + 10;
          m.x = Math.random() * w;
        }
        if (m.x < 0) m.x = w;
        if (m.x > w) m.x = 0;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(196,163,90,${m.alpha * 0.7})`
          : `rgba(196,163,90,${m.alpha})`;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-[-20]"
        style={{ background: 'var(--bg)' }}
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[-10] pointer-events-none"
        aria-hidden="true"
      />
      {/* Soft bottom moss fade */}
      <div
        className="fixed inset-0 z-[-8] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 50% at 50% 100%, rgba(47,107,79,0.08) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />
    </>
  );
}
