'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, BadgeCheck, Zap, Shield, ShieldCheck, Cpu } from 'lucide-react';
import type { TimelineEntry, TimelineType } from '@/lib/types';
import { timelineTypeConfig, formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

const iconMap = { GraduationCap, BadgeCheck, Zap, Shield, ShieldCheck, Cpu };

const ALL_TYPES: TimelineType[] = ['Education', 'Certification', 'Achievement', 'Project'];

function TimelineNode({
  entry,
  index,
  isActive,
}: {
  entry: TimelineEntry;
  index: number;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const typeCfg = timelineTypeConfig[entry.type];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (iconMap as any)[entry.icon] ?? Shield;

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-4 sm:gap-6"
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-center flex-shrink-0 w-10">
        <div className="relative z-10">
          <motion.div
            className={cn('w-10 h-10 rounded-full flex items-center justify-center', `bg-gradient-to-br ${typeCfg.gradient}`)}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.2 }}
          >
            <Icon size={16} color="white" />
          </motion.div>
          {isActive && (
            <span
              className="absolute inset-[-4px] rounded-full animate-[pulseRing_2s_ease_infinite]"
              style={{
                border: '1px solid rgba(47,107,79,0.4)',
                opacity: 0.55,
              }}
            />
          )}
        </div>
        <motion.div
          className="flex-1 w-[1.5px] mt-2 rounded-full"
          style={{
            background: 'linear-gradient(180deg, rgba(47,107,79,0.4) 0%, rgba(107,158,120,0.2) 50%, transparent 100%)',
            minHeight: 32,
          }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: index * 0.08 + 0.25, duration: 0.45 }}
        />
      </div>

      <div className="flex-1 pb-8">
        <motion.div
          className="nature-panel p-5 transition-all duration-300"
          whileHover={{
            scale: 1.01,
            boxShadow: 'var(--shadow-hover)',
          }}
        >
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={cn('text-xs font-mono px-2.5 py-0.5 rounded-md border', typeCfg.badge)}>
                  {entry.type}
                </span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                  {formatDate(entry.date)}
                </span>
              </div>
              <h3 className="font-sans font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                {entry.title}
              </h3>
            </div>
            {isActive && (
              <span
                className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md flex-shrink-0"
                style={{
                  background: 'rgba(74,143,106,0.12)',
                  color: 'var(--accent)',
                  border: '1px solid rgba(74,143,106,0.28)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: 'var(--accent)' }}
                />
                Active
              </span>
            )}
          </div>
          <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {entry.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const [activeFilter, setActiveFilter] = useState<TimelineType | 'All'>('All');
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

  const filtered = entries.filter(
    (e) => activeFilter === 'All' || e.type === activeFilter
  );

  return (
    <section id="timeline" className="py-24 sm:py-28 px-5 sm:px-8" aria-labelledby="timeline-heading">
      <div className="max-w-3xl mx-auto">
        <div ref={headingRef} className="mb-12">
          <motion.p
            className="section-eyebrow mb-3"
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
          >
            Timeline
          </motion.p>
          <motion.h2
            id="timeline-heading"
            className="font-sans font-semibold mb-4 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 18 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            The <span className="text-gradient">Journey</span> So Far
          </motion.h2>
          <motion.p
            className="max-w-md text-base"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Education, certifications, hackathons, and project milestones.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {(['All', ...ALL_TYPES] as const).map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={cn(
                  'px-3.5 py-1.5 rounded-md text-xs font-mono border transition-all duration-200 hover:scale-[1.03]',
                  activeFilter === type
                    ? 'border-nature-forest/45 text-nature-forest'
                    : 'text-[var(--text-muted)] border-[var(--border)] hover:border-nature-forest/30'
                )}
                style={
                  activeFilter === type
                    ? { background: 'rgba(47,107,79,0.12)' }
                    : { background: 'var(--bg-surface)' }
                }
                aria-pressed={activeFilter === type}
              >
                {type}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="space-y-0">
          {filtered.map((entry, i) => (
            <TimelineNode
              key={entry.id}
              entry={entry}
              index={i}
              isActive={entry.status === 'active'}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-center py-12 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
              No entries for this filter.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
