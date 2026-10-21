'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';

export function Projects({ projects }: { projects: Project[] }) {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

  return (
    <section
      id="projects"
      className="py-24 sm:py-28 px-5 sm:px-8"
      aria-labelledby="projects-heading"
    >
      <div className="section-shell">
        <div ref={headingRef} className="mb-12 max-w-2xl">
          <motion.p
            className="section-eyebrow mb-3"
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
          >
            Projects
          </motion.p>
          <motion.h2
            id="projects-heading"
            className="font-sans font-semibold mb-4 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 18 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Things I&apos;ve <span className="text-gradient">Built</span>
          </motion.h2>
          <motion.p
            className="text-base"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Pick a project to open its full page.
          </motion.p>
        </div>

        <motion.div
          className="flex flex-wrap gap-2 sm:gap-3"
          role="tablist"
          aria-label="Project list"
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {projects.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              role="tab"
              className={cn(
                'group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg',
                'text-sm sm:text-base font-medium transition-all duration-200',
                'hover:scale-[1.02] active:scale-[0.98]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nature-forest/40'
              )}
              style={{
                background: 'var(--bg-panel)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
                animationDelay: `${i * 40}ms`,
              }}
            >
              <span className="font-mono text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{project.shortTitle}</span>
              <ArrowUpRight
                size={14}
                className="opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--accent)' }}
              />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
