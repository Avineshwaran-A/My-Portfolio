'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import type { SocialData } from '@/lib/types';

const iconMap = { Github, Linkedin, Mail };

interface FooterProps {
  social: SocialData;
  visitorCount?: number;
}

export function Footer({ social, visitorCount }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-12 px-5 sm:px-8 mt-8"
      style={{ borderTop: '1px solid var(--border)' }}
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="font-sans font-semibold text-gradient mb-1">Avineshwaran A.</div>
            <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              Chennai, India
            </div>
          </div>

          <div className="flex items-center gap-3">
            {social.links.map((link) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (iconMap as any)[link.icon] ?? Mail;
              return (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target={link.platform !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                  }}
                  whileHover={{
                    scale: 1.08,
                    color: '#2f6b4f',
                    borderColor: 'rgba(47,107,79,0.4)',
                    background: 'rgba(47,107,79,0.1)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={15} />
                </motion.a>
              );
            })}
          </div>

          <div className="text-center md:text-right">
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              © {year} Avineshwaran A. — All rights reserved.
            </div>
            <div className="text-[10px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Built with Next.js 14 · Framer Motion · Tailwind CSS
              {visitorCount != null && (
                <span className="ml-2 opacity-60">· {visitorCount.toLocaleString()} visits</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
