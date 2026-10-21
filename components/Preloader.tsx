'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');

  useEffect(() => {
    if (sessionStorage.getItem('preloader-shown')) {
      onComplete();
      return;
    }

    const duration = 1200;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.round(p));

      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase('done');
          sessionStorage.setItem('preloader-shown', '1');
          setTimeout(onComplete, 500);
        }, 180);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-label="Loading portfolio"
        >
          <motion.div
            className="mb-8"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="w-16 h-16 flex items-center justify-center text-xl font-bold font-sans rounded-xl"
              style={{
                background: 'linear-gradient(145deg, #2f6b4f, #6b9e78)',
                color: '#f4f8f2',
                boxShadow: '0 10px 28px rgba(47,107,79,0.28)',
              }}
            >
              AA
            </div>
          </motion.div>

          <motion.p
            className="text-sm font-mono tracking-widest uppercase mb-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            style={{ color: 'var(--text-muted)' }}
          >
            Avineshwaran A.
          </motion.p>

          <div className="w-44 relative">
            <div
              className="h-[3px] rounded-full overflow-hidden"
              style={{ background: 'var(--border)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #2f6b4f, #6b9e78, #c4a35a)',
                  width: `${progress}%`,
                  transition: 'width 16ms linear',
                }}
              />
            </div>
            <p
              className="text-right text-xs mt-2 font-mono tabular-nums"
              style={{ color: 'var(--text-muted)' }}
            >
              {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
