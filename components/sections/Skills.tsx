'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Code2, Terminal, Cpu, ChevronDown, ChevronUp } from 'lucide-react';
import type { SkillCategory, Profile } from '@/lib/types';
import { skillColorConfig } from '@/lib/utils';
import { cn } from '@/lib/utils';

const iconMap = { Code2, Terminal, Cpu };

const progressColors = {
  violet: ['#4a8f6a', '#2f6b4f'],
  cyan: ['#5a8f9c', '#3d7380'],
  magenta: ['#c4a35a', '#a8863d'],
};

function RadialProgress({ value, color }: { value: number; color: 'violet' | 'cyan' | 'magenta' }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const gradientIds = { violet: 'grad-forest', cyan: 'grad-sky', magenta: 'grad-sun' };

  return (
    <div className="relative w-16 h-16 flex items-center justify-center" aria-hidden="true">
      <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
        <defs>
          <linearGradient id={gradientIds[color]} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={progressColors[color][0]} />
            <stop offset="100%" stopColor={progressColors[color][1]} />
          </linearGradient>
        </defs>
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth="5"
        />
        <motion.circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke={`url(#${gradientIds[color]})`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </svg>
      <span
        className="absolute text-xs font-mono font-medium"
        style={{ color: 'var(--text-secondary)' }}
      >
        {value}%
      </span>
    </div>
  );
}

function SkillCard({ skill, index }: { skill: SkillCategory; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const cfg = skillColorConfig[skill.color];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (iconMap as any)[skill.icon] ?? Code2;

  return (
    <motion.div
      ref={ref}
      className={cn('nature-card nature-border overflow-hidden', cfg.bg)}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div
            className={cn('p-2.5 rounded-lg', cfg.bg)}
            style={{ border: '1px solid var(--border)' }}
          >
            <Icon size={20} className={cfg.text} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-sans font-semibold text-base mb-0.5" style={{ color: 'var(--text-primary)' }}>
              {skill.category}
            </h3>
            <span className="tag-mono text-[10px]">{skill.tag}</span>
          </div>
          <RadialProgress value={skill.proficiency} color={skill.color} />
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {skill.entries.slice(0, 3).map((entry) => (
            <span
              key={entry.name}
              className={cn('text-xs px-2.5 py-1 rounded-md font-medium transition-all duration-200 hover:scale-[1.03]', cfg.text)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
              }}
            >
              {entry.name}
            </span>
          ))}
          {skill.entries.length > 3 && (
            <span
              className="text-xs px-2.5 py-1 rounded-md"
              style={{ color: 'var(--text-muted)', background: 'var(--bg-surface)' }}
            >
              +{skill.entries.length - 3} more
            </span>
          )}
        </div>

        <button
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            'w-full flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-mono transition-all duration-200',
            cfg.text
          )}
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          aria-expanded={expanded}
          aria-label={expanded ? 'Collapse details' : 'Expand details'}
        >
          {expanded ? 'Collapse' : 'View Details'}
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-6 pb-6 space-y-3 pt-2"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              {skill.entries.map((entry, i) => (
                <motion.div
                  key={entry.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${progressColors[skill.color].join(', ')})`,
                      }}
                    />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {entry.name}
                    </span>
                  </div>
                  <p className="text-xs pl-3.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {entry.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Skills({ skills, profile }: { skills: SkillCategory[]; profile: Profile }) {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-24 sm:py-28 px-5 sm:px-8" aria-labelledby="skills-heading">
      <div className="section-shell">
        <div ref={headingRef} className="mb-14 max-w-2xl">
          <motion.p
            className="section-eyebrow mb-3"
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            01 / About & Skills
          </motion.p>
          <motion.h2
            id="skills-heading"
            className="font-sans font-semibold mb-4 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 18 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            The <span className="text-gradient">Stack</span> Behind the Work
          </motion.h2>
          <motion.p
            className="text-base leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {profile.subtext}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {skills.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
