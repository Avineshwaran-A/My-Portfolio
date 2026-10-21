/**
 * lib/types.ts
 * Shared TypeScript types mirroring the content JSON structure.
 */

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  subtext: string;
  institution: string;
  degree: string;
  status: string;
  location: string;
  timezone: string;
  focus: string[];
  stats: StatItem[];
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export interface SkillEntry {
  name: string;
  detail: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  tag: string;
  icon: string;
  color: 'violet' | 'cyan' | 'magenta';
  order: number;
  proficiency: number;
  entries: SkillEntry[];
}

export type ProjectStatus = 'running' | 'active' | 'paused';

export interface Project {
  id: string;
  pid: string;
  title: string;
  shortTitle: string;
  status: ProjectStatus;
  order: number;
  description: string;
  stack: string[];
  repoUrl: string | null;
  demoUrl: string | null;
  imageAlt: string;
}

export type TimelineType = 'Education' | 'Certification' | 'Achievement' | 'Project';
export type TimelineSeverity = 'info' | 'warn' | 'alert';
export type TimelineStatus = 'active' | 'completed';

export interface TimelineEntry {
  id: string;
  date: string;
  type: TimelineType;
  icon: string;
  title: string;
  description: string;
  status: TimelineStatus;
  severity: TimelineSeverity;
  order: number;
}

export interface SocialLink {
  platform: string;
  icon: string;
  url: string;
  label: string;
  color: 'violet' | 'cyan' | 'magenta';
  note?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialData {
  links: SocialLink[];
  navLinks: NavLink[];
}

export interface GitHubStats {
  stars: number;
  forks: number;
  updatedAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}
