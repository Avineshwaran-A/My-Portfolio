/**
 * lib/utils.ts
 * Shared utility helpers.
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes safely, resolving conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a date string to a human-readable format. */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

/** Map project status to display label and color class. */
export const statusConfig = {
  running: { label: 'Running', colorClass: 'bg-nature-forest/15 text-nature-forest border-nature-forest/35' },
  active: { label: 'Active', colorClass: 'bg-nature-sky/15 text-nature-sky border-nature-sky/35' },
  paused: { label: 'Paused', colorClass: 'bg-rose-500/15 text-rose-600 border-rose-500/30' },
} as const;

/** Map timeline severity/type to colors. */
export const timelineSeverityConfig = {
  info: { color: 'nature-sky', glow: 'shadow-nature', dot: 'bg-nature-sky' },
  warn: { color: 'nature-forest', glow: 'shadow-nature', dot: 'bg-nature-leaf' },
  alert: { color: 'nature-sun', glow: 'shadow-nature', dot: 'bg-nature-sun' },
} as const;

export const timelineTypeConfig = {
  Education: { gradient: 'from-nature-forest to-nature-leaf', badge: 'bg-nature-forest/15 text-nature-forest border-nature-forest/30' },
  Certification: { gradient: 'from-nature-sky to-nature-leaf', badge: 'bg-nature-sky/15 text-nature-sky border-nature-sky/30' },
  Achievement: { gradient: 'from-nature-sun to-amber-600', badge: 'bg-nature-sun/20 text-amber-800 border-nature-sun/40' },
  Project: { gradient: 'from-nature-bark to-nature-forest', badge: 'bg-nature-bark/15 text-nature-bark border-nature-bark/30' },
} as const;

/** Keys stay violet/cyan/magenta to match content JSON; visuals are nature remapped. */
export const skillColorConfig = {
  violet: {
    bg: 'bg-nature-forest/10',
    border: 'border-nature-forest/25',
    text: 'text-nature-forest',
    glow: 'shadow-nature',
    gradient: 'from-nature-forest to-nature-leaf',
    ring: 'ring-nature-forest/40',
  },
  cyan: {
    bg: 'bg-nature-sky/10',
    border: 'border-nature-sky/25',
    text: 'text-nature-sky',
    glow: 'shadow-nature',
    gradient: 'from-nature-sky to-nature-leaf',
    ring: 'ring-nature-sky/40',
  },
  magenta: {
    bg: 'bg-nature-sun/15',
    border: 'border-nature-sun/30',
    text: 'text-amber-800',
    glow: 'shadow-nature',
    gradient: 'from-nature-sun to-amber-600',
    ring: 'ring-nature-sun/40',
  },
} as const;
