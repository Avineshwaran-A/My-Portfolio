'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, MapPin, Clock } from 'lucide-react';
import type { Profile } from '@/lib/types';

interface HeroProps {
  profile: Profile;
}

function LiveClock({ timezone }: { timezone: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [timezone]);

  return <span className="tabular-nums">{time}</span>;
}

function AnimatedName({ name }: { name: string }) {
  return (
    <span className="inline-block">
      {name.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.35 + i * 0.035,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero({ profile }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-5 sm:px-8 lg:px-12 overflow-hidden"
      aria-label={`${profile.name} introduction`}
    >
      <motion.div
        className="pointer-events-none absolute -right-24 top-1/4 w-[420px] h-[420px] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(107,158,120,0.35) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.06, 1], rotate: [0, 4, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-5xl mx-auto"
      >
        <div className="max-w-3xl">
          <motion.p
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm mb-8"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ background: 'var(--accent-soft)' }}
                />
                <span
                  className="relative inline-flex rounded-full h-1.5 w-1.5"
                  style={{ background: 'var(--accent)' }}
                />
              </span>
              Available
            </span>
            <span aria-hidden="true" style={{ color: 'var(--border)' }}>·</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} />
              Chennai, IN
            </span>
            <span aria-hidden="true" style={{ color: 'var(--border)' }}>·</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs">
              <Clock size={12} />
              <LiveClock timezone={profile.timezone} />
            </span>
          </motion.p>

          <h1
            className="font-sans font-semibold tracking-tight leading-[1.05] mb-10"
            style={{
              fontSize: 'clamp(3rem, 9vw, 5.75rem)',
              color: 'var(--text-primary)',
            }}
          >
            <AnimatedName name={profile.name} />
          </h1>

          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-medium text-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #2f6b4f, #4a8f6a)',
                color: '#f4f8f2',
                boxShadow: '0 8px 24px rgba(47,107,79,0.28)',
              }}
            >
              <span className="relative z-10">View Projects</span>
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
                }}
              />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'var(--bg-panel)',
                border: '1px solid var(--border-hover)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} style={{ color: 'var(--text-muted)' }} />
        </motion.div>
        <span
          className="text-[10px] font-mono tracking-widest uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
