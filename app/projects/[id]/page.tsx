import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectById, getProjects } from '@/lib/content';
import { ProjectDetail } from '@/components/projects/ProjectDetail';

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProjectById(params.id);
  if (!project) {
    return { title: 'Project not found' };
  }
  return {
    title: `${project.title} | Avineshwaran A.`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === params.id);
  if (index === -1) notFound();

  const project = projects[index];
  const prevProject = index > 0 ? projects[index - 1] : null;
  const nextProject = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <ProjectDetail
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
