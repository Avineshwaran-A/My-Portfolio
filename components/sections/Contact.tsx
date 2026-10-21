'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Send, CheckCircle, XCircle, Github, Linkedin, Mail } from 'lucide-react';
import { contactSchema, type ContactFormInput } from '@/lib/validators';
import type { SocialData } from '@/lib/types';
import { cn } from '@/lib/utils';

const iconMap = { Github, Linkedin, Mail };
const socialIconColors = {
  violet: {
    bg: 'rgba(47,107,79,0.1)',
    border: 'rgba(47,107,79,0.28)',
    color: '#2f6b4f',
    glow: 'rgba(47,107,79,0.18)',
  },
  cyan: {
    bg: 'rgba(90,143,156,0.1)',
    border: 'rgba(90,143,156,0.28)',
    color: '#5a8f9c',
    glow: 'rgba(90,143,156,0.18)',
  },
  magenta: {
    bg: 'rgba(196,163,90,0.12)',
    border: 'rgba(196,163,90,0.32)',
    color: '#a8863d',
    glow: 'rgba(196,163,90,0.2)',
  },
};

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 text-xs font-mono text-rose-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
  });

  const inputStyle = {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    borderRadius: '8px',
  };

  const onSubmit = async (data: ContactFormInput) => {
    setSubmitState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitState('success');
        reset();
        setTimeout(() => setSubmitState('idle'), 5000);
      } else {
        setSubmitState('error');
        setTimeout(() => setSubmitState('idle'), 5000);
      }
    } catch {
      setSubmitState('error');
      setTimeout(() => setSubmitState('idle'), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <input type="text" className="hidden" tabIndex={-1} aria-hidden="true" {...register('honeypot')} />

      <FormField label="Name" error={errors.name?.message}>
        <input
          type="text"
          placeholder="Your name"
          className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-nature-forest/35"
          style={inputStyle}
          {...register('name')}
          aria-invalid={!!errors.name}
        />
      </FormField>

      <FormField label="Email" error={errors.email?.message}>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-nature-forest/35"
          style={inputStyle}
          {...register('email')}
          aria-invalid={!!errors.email}
        />
      </FormField>

      <FormField label="Message" error={errors.message?.message}>
        <textarea
          rows={5}
          placeholder="What's on your mind?"
          className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-nature-forest/35 resize-none"
          style={inputStyle}
          {...register('message')}
          aria-invalid={!!errors.message}
        />
      </FormField>

      <motion.button
        type="submit"
        disabled={submitState === 'loading' || submitState === 'success'}
        className={cn(
          'relative w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm font-medium overflow-hidden',
          'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nature-forest/40',
          'disabled:cursor-not-allowed'
        )}
        style={{
          background:
            submitState === 'success'
              ? 'linear-gradient(135deg, #2f6b4f, #1e4a35)'
              : submitState === 'error'
              ? 'linear-gradient(135deg, #dc2626, #b91c1c)'
              : 'linear-gradient(135deg, #2f6b4f, #4a8f6a)',
          color: '#f4f8f2',
          boxShadow: '0 8px 22px rgba(47,107,79,0.25)',
        }}
        whileHover={submitState === 'idle' ? { scale: 1.015 } : {}}
        whileTap={submitState === 'idle' ? { scale: 0.985 } : {}}
        aria-live="polite"
        aria-label={
          submitState === 'loading' ? 'Sending message...' :
          submitState === 'success' ? 'Message sent!' :
          submitState === 'error' ? 'Failed to send. Try again.' :
          'Send message'
        }
      >
        <span
          className="absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }}
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={submitState}
            className="relative z-10 flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {submitState === 'idle' && <><Send size={15} /> Send Message</>}
            {submitState === 'loading' && (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full inline-block"
                />
                Sending…
              </>
            )}
            {submitState === 'success' && <><CheckCircle size={15} /> Sent! I&apos;ll be in touch.</>}
            {submitState === 'error' && <><XCircle size={15} /> Failed — please try again.</>}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </form>
  );
}

export function Contact({ social }: { social: SocialData }) {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="py-24 sm:py-28 px-5 sm:px-8" aria-labelledby="contact-heading">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-14 max-w-2xl">
          <motion.p
            className="section-eyebrow mb-3"
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
          >
            Contact
          </motion.p>
          <motion.h2
            id="contact-heading"
            className="font-sans font-semibold mb-4 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 18 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Let&apos;s <span className="text-gradient">Connect</span>
          </motion.h2>
          <motion.p
            className="text-base"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Whether it&apos;s a project, internship, collaboration, or just a conversation about OS theory — my inbox is open.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 lg:gap-8">
          <motion.div
            className="nature-card p-7 sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-sans font-semibold text-base mb-6" style={{ color: 'var(--text-primary)' }}>
              Send a Message
            </h3>
            <ContactForm />
          </motion.div>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-sans font-semibold text-sm mb-3 pl-1" style={{ color: 'var(--text-muted)' }}>
              OR FIND ME ON
            </h3>
            {social.links.map((link, i) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (iconMap as any)[link.icon] ?? Mail;
              const colors = socialIconColors[link.color];

              return (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target={link.platform !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex items-center gap-4 p-4 rounded-lg nature-panel group"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 + 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    scale: 1.015,
                    boxShadow: `0 8px 28px ${colors.glow}`,
                  }}
                  whileTap={{ scale: 0.985 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                    whileHover={{ rotate: 6, scale: 1.06 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon size={18} style={{ color: colors.color }} />
                  </motion.div>
                  <div>
                    <div className="text-sm font-semibold font-sans" style={{ color: 'var(--text-primary)' }}>
                      {link.platform}
                    </div>
                    <div className="text-xs font-mono truncate max-w-[180px]" style={{ color: 'var(--text-muted)' }}>
                      {link.url.replace('mailto:', '').replace('https://', '')}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
