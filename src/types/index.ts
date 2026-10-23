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
