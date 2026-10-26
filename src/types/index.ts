export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  description: string;
}

export interface Service {
  title: string;
  iconClass: string;
  desc: string;
}

export interface TechItem {
  name: string;
  category: string;
  color: string;
}

export interface ContactFormData {
  name: string;
  lastname: string;
  email: string;
  subject: string;
  message: string;
}

export type SectionId = 'home' | 'about' | 'service' | 'portfolio' | 'skills' | 'contact';

export interface ProfileInfo {
  name?: string;
  title?: string;
  subtitle?: string;
  about_title?: string;
  about_description?: string;
  email?: string;
  phone?: string;
  address?: string;
  hero_image?: string;
  about_image?: string;
  resume_url?: string;
  github_url?: string;
  linkedin_url?: string;
  facebook_url?: string;
  instagram_url?: string;
}
