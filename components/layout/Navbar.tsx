'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import type { NavLink } from '@/lib/types';
import { cn } from '@/lib/utils';

interface NavbarProps {
  navLinks: NavLink[];
}

function DecodeText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleHoverStart = () => {
    let iteration = 0;
    clearInterval(intervalRef.current ?? undefined);
    intervalRef.current = setInterval(() => {
      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      if (iteration >= text.length) {
        clearInterval(intervalRef.current ?? undefined);
        setDisplayed(text);
      }
      iteration += 0.5;
    }, 30);
  };

  const handleHoverEnd = () => {
    clearInterval(intervalRef.current ?? undefined);
    setDisplayed(text);
  };

  return (
    <span
      className="font-mono text-xs tracking-wide cursor-pointer select-none"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onFocus={handleHoverStart}
      onBlur={handleHoverEnd}
    >
      {displayed}
    </span>
  );
}

function NavLinkItem({
  link,
  active,
  onClick,
}: {
  link: NavLink;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <a
      href={link.href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
      }}
      className={cn(
        'relative group px-3 py-1.5 rounded-md transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nature-forest/40',
        active ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
      )}
      aria-current={active ? 'page' : undefined}
    >
      <DecodeText text={link.label} />
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{ background: 'var(--accent)' }}
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: active ? '100%' : 0,
          opacity: active ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <span
        className="absolute bottom-0 left-0 h-[2px] rounded-full opacity-0 group-hover:opacity-50 transition-all duration-300"
        style={{ background: 'var(--accent-soft)', width: '100%' }}
      />
    </a>
  );
}

export function Navbar({ navLinks }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: '-64px 0px 0px 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [navLinks]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'border-b' : 'border-transparent'
        )}
        style={
          scrolled
            ? {
                background: 'var(--bg-panel)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }
            : { background: 'transparent' }
        }
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[68px]">
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.href}
                link={link}
                active={activeSection === link.href.replace('#', '')}
                onClick={() => {}}
              />
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto">
            <motion.button
              onClick={toggleTheme}
              className={cn(
                'p-2 rounded-md transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nature-forest/40'
              )}
              style={{
                background: 'var(--bg-surface)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'rgba(47,107,79,0.1)',
                border: '1px solid rgba(47,107,79,0.28)',
                color: 'var(--accent)',
              }}
            >
              Get in Touch
            </a>

            <motion.button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-md"
              style={{
                background: 'var(--bg-surface)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: 'var(--bg-panel)' }}
          >
            <div className="h-[68px]" />
            <nav
              className="flex flex-col items-center justify-center flex-1 gap-6"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    setTimeout(() => {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                  className="text-2xl font-sans font-medium text-gradient"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  setTimeout(() => {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
                className="mt-4 px-8 py-3 rounded-lg text-lg font-medium"
                style={{
                  background: 'linear-gradient(135deg, #2f6b4f, #4a8f6a)',
                  color: '#f4f8f2',
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Get in Touch
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
