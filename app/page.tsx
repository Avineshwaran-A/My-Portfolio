import { getProfile, getProjects, getTimeline, getSocialData } from '@/lib/content';
import { ClientShell } from '@/components/ClientShell';

/** Home page — data fetched server-side, passed to client shell */
export default async function HomePage() {
  const [profile, projects, timeline, social] = await Promise.all([
    getProfile(),
    getProjects(),
    getTimeline(),
    getSocialData(),
  ]);

  return (
    <ClientShell
      profile={profile}
      projects={projects}
      timeline={timeline}
      social={social}
    />
  );
}
