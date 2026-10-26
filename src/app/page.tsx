import PortfolioClient from '@/components/portfolio/PortfolioClient';
import {
  fetchPublicProfile,
  fetchPublicProjects,
  fetchPublicServices,
  fetchPublicSkills,
  getProjectImageUrl,
} from '@/lib/apiClient';
import { Project, Service, TechItem } from '@/types';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [profile, rawProjects, rawServices, rawSkills] = await Promise.all([
    fetchPublicProfile(),
    fetchPublicProjects(),
    fetchPublicServices(),
    fetchPublicSkills(),
  ]);
  const projects: Project[] = Array.isArray(rawProjects)
    ? rawProjects.map((p: unknown) => {
        const item = (p && typeof p === 'object' ? p : {}) as Record<string, unknown>;
        return {
          id: String(item.id || ''),
          title: typeof item.title === 'string' ? item.title : '',
          category: typeof item.category === 'string' ? item.category : '',
          tags: typeof item.tags === 'string' ? item.tags : '',
          image: getProjectImageUrl(typeof item.image === 'string' ? item.image : ''),
          githubUrl: typeof item.github_url === 'string' ? item.github_url : (typeof item.githubUrl === 'string' ? item.githubUrl : '#'),
          liveUrl: typeof item.live_url === 'string' ? item.live_url : (typeof item.liveUrl === 'string' ? item.liveUrl : undefined),
          description: typeof item.description === 'string' ? item.description : '',
        };
      })
    : [];

  const services: Service[] = Array.isArray(rawServices)
    ? rawServices.map((s: unknown) => {
        const item = (s && typeof s === 'object' ? s : {}) as Record<string, unknown>;
        return {
          title: typeof item.title === 'string' ? item.title : '',
          iconClass: typeof item.icon_class === 'string' ? item.icon_class : 'fi flaticon-laptop',
          desc: typeof item.description === 'string' ? item.description : '',
        };
      })
    : [];

  const skills: TechItem[] = Array.isArray(rawSkills)
    ? rawSkills.map((sk: unknown) => {
        const item = (sk && typeof sk === 'object' ? sk : {}) as Record<string, unknown>;
        return {
          name: typeof item.name === 'string' ? item.name : '',
          category: typeof item.category === 'string' ? item.category : '',
          color: typeof item.color === 'string' ? item.color : '#3b82f6',
          icon: typeof item.icon === 'string' ? item.icon : undefined,
        };
      })
    : [];

  return (
    <PortfolioClient
      initialProfile={profile}
      initialProjects={projects}
      initialServices={services}
      initialSkills={skills}
    />
  );
}
