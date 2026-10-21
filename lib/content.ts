/**
 * lib/content.ts
 * Typed content-access layer — components never import JSON directly.
 * Swap this module's internals to fetch from a headless CMS without
 * touching any component.
 */

import type { Profile, SkillCategory, Project, TimelineEntry, SocialData } from './types';

import profileData from '@/content/profile.json';
import skillsData from '@/content/skills.json';
import projectsData from '@/content/projects.json';
import timelineData from '@/content/timeline.json';
import socialData from '@/content/social.json';

export async function getProfile(): Promise<Profile> {
  // In a CMS-backed version: return await cms.fetch('profile')
  return profileData as Profile;
}

export async function getSkills(): Promise<SkillCategory[]> {
  const sorted = [...(skillsData as SkillCategory[])].sort((a, b) => a.order - b.order);
  return sorted;
}

export async function getProjects(): Promise<Project[]> {
  const sorted = [...(projectsData as Project[])].sort((a, b) => a.order - b.order);
  return sorted;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id) ?? null;
}

export async function getTimeline(): Promise<TimelineEntry[]> {
  const sorted = [...(timelineData as TimelineEntry[])].sort((a, b) => a.order - b.order);
  return sorted;
}

export async function getSocialData(): Promise<SocialData> {
  return socialData as SocialData;
}
