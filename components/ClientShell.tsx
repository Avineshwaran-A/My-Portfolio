'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Timeline } from '@/components/sections/Timeline';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';
import type { Profile, Project, TimelineEntry, SocialData } from '@/lib/types';

const NatureBackground = dynamic(
  () => import('@/components/background/NatureBackground').then((m) => m.NatureBackground),
  { ssr: false }
);

interface ClientShellProps {
  profile: Profile;
  projects: Project[];
  timeline: TimelineEntry[];
  social: SocialData;
}

export function ClientShell({ profile, projects, timeline, social }: ClientShellProps) {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetch('/api/visits', { method: 'POST' })
      .then((r) => r.json())
      .then((d) => setVisitorCount(d.count))
      .catch(() => {});
  }, []);

  return (
    <>
      <NatureBackground />

      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {preloaderDone && (
        <>
          <Navbar navLinks={social.navLinks} />
          <main id="main-content">
            <Hero profile={profile} />
            <Projects projects={projects} />
            <Timeline entries={timeline} />
            <Contact social={social} />
          </main>
          <Footer social={social} visitorCount={visitorCount} />
        </>
      )}
    </>
  );
}
