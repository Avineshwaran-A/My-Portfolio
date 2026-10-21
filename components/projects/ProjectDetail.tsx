'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Home } from 'lucide-react';
import type { Project } from '@/lib/types';
import { statusConfig } from '@/lib/utils';
import { ProjectVisual } from '@/components/projects/ProjectVisual';
import { cn } from '@/lib/utils';

interface ProjectDetailProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export function ProjectDetail({ project, prevProject, nextProject }: ProjectDetailProps) {
  const cfg = statusConfig[project.status];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <header
        className="sticky top-0 z-40 flex items-center justify-between gap-3 px-5 sm:px-8 h-16 border-b"
        style={{
          background: 'var(--bg-panel)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
        >
          <Home size={15} />
          Home
        </Link>

        <div className="flex items-center gap-2">
          {prevProject && (
            <Link
              href={`/projects/${prevProject.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs sm:text-sm transition-colors"
              style={{ color: 'var(--text-muted)' }}
              aria-label={`Previous: ${prevProject.shortTitle}`}
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">{prevProject.shortTitle}</span>
            </Link>
          )}
          {nextProject && (
            <Link
              href={`/projects/${nextProject.id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: 'rgba(47,107,79,0.1)',
                border: '1px solid rgba(47,107,79,0.28)',
                color: 'var(--accent)',
              }}
              aria-label={`Next: ${nextProject.shortTitle}`}
            >
              <span className="hidden sm:inline">{nextProject.shortTitle}</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[minmax(280px,42%)_1fr] min-h-[calc(100vh-4rem)]">
        <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]">
          <ProjectVisual projectId={project.id} title={project.title} />
        </div>

        <motion.div
          className="flex flex-col px-6 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-16"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="tag-mono text-[10px] mb-4">{project.pid}</span>

          <div className="flex flex-wrap items-start gap-3 mb-6">
            <h1
              className="font-sans font-semibold leading-tight flex-1 min-w-0"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                color: 'var(--text-primary)',
              }}
            >
              {project.title}
            </h1>
            <span
              className={cn(
                'text-xs font-mono px-3 py-1.5 rounded-md border flex-shrink-0 font-medium mt-1',
                cfg.colorClass
              )}
            >
              {cfg.label}
            </span>
          </div>

          <div className="mb-8">
            <p
              className="text-xs font-mono uppercase tracking-wider mb-3"
              style={{ color: 'var(--text-muted)' }}
            >
              Tech stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-sm px-3 py-1.5 rounded-md font-mono"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 mb-10">
            <p
              className="text-xs font-mono uppercase tracking-wider mb-3"
              style={{ color: 'var(--text-muted)' }}
            >
              Description
            </p>
            <p
              className="text-base sm:text-lg leading-relaxed max-w-2xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-auto pt-6" style={{ borderTop: '1px solid var(--border)' }}>
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: 'rgba(47,107,79,0.12)',
                  border: '1px solid rgba(47,107,79,0.3)',
                  color: 'var(--accent)',
                }}
              >
                <ExternalLink size={14} />
                View on GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                }}
              >
                Live Demo
              </a>
            )}
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 hover:scale-[1.02] ml-auto"
              style={{
                background: 'linear-gradient(135deg, #2f6b4f, #4a8f6a)',
                color: '#f4f8f2',
              }}
            >
              <Home size={14} />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
