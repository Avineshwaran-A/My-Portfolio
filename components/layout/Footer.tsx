'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import type { SocialData } from '@/lib/types';

const iconMap = { Github, Linkedin, Mail };

interface FooterProps {
  social: SocialData;
}

export function Footer({ social }: FooterProps) {
  return (
    <footer
      className="relative py-8 px-5 sm:px-8 mt-8"
      style={{ borderTop: '1px solid var(--border)' }}
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="font-sans font-semibold text-gradient mb-1">Avineshwaran A.</div>
            <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              Chennai, India
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
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
        </div>
      </div>
    </footer>
  );
}
