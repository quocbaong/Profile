'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  getAdminProjects,
  getAdminServices,
  getAdminSkills,
  getAdminMessages,
  getAdminProfile,
  getDashboardStats,
} from '@/lib/adminApi';

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string;
  image: string;
  live_url?: string;
  github_url: string;
  sort_order: number;
  is_active: boolean;
}

export interface ServiceItem {
  id: number;
  title: string;
  icon_class: string;
  description: string;
  sort_order: number;
  is_active: boolean;
}

export interface SkillItem {
  id: number;
  name: string;
  category: string;
  icon?: string;
  color: string;
  sort_order: number;
  is_active: boolean;
}

export interface ContactMessageItem {
  id: number;
  name: string;
  lastname?: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface DashboardStats {
  total_projects: number;
  active_projects: number;
  total_messages: number;
  unread_messages: number;
}

export interface ProfileData {
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

interface AdminDataContextType {
  initialized: boolean;
  projects: ProjectItem[];
  services: ServiceItem[];
  skills: SkillItem[];
  messages: ContactMessageItem[];
  profile: ProfileData | null;
  stats: DashboardStats;
  refreshProjects: () => Promise<void>;
  refreshServices: () => Promise<void>;
  refreshSkills: () => Promise<void>;
  refreshMessages: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  refreshStats: () => Promise<void>;
  refreshAll: () => Promise<void>;
}

const AdminDataContext = createContext<AdminDataContextType | null>(null);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    total_projects: 0,
    active_projects: 0,
    total_messages: 0,
    unread_messages: 0,
  });

  const refreshProjects = useCallback(async () => {
    try {
      const data = await getAdminProjects();
      if (data && Array.isArray(data)) setProjects(data);
    } catch {}
  }, []);

  const refreshServices = useCallback(async () => {
    try {
      const data = await getAdminServices();
      if (data && Array.isArray(data)) setServices(data);
    } catch {}
  }, []);

  const refreshSkills = useCallback(async () => {
    try {
      const data = await getAdminSkills();
      if (data && Array.isArray(data)) setSkills(data);
    } catch {}
  }, []);

  const refreshMessages = useCallback(async () => {
    try {
      const data = await getAdminMessages();
      if (data && Array.isArray(data)) setMessages(data);
    } catch {}
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const data = await getAdminProfile();
      if (data) setProfile(data);
    } catch {}
  }, []);

  const refreshStats = useCallback(async () => {
    try {
      const data = await getDashboardStats();
      if (data) setStats(data);
    } catch {}
  }, []);

  const refreshAll = useCallback(async () => {
    await Promise.allSettled([
      refreshProjects(),
      refreshServices(),
      refreshSkills(),
      refreshMessages(),
      refreshProfile(),
      refreshStats(),
    ]);
  }, [refreshProjects, refreshServices, refreshSkills, refreshMessages, refreshProfile, refreshStats]);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    if (token) {
      refreshAll().finally(() => {
        setInitialized(true);
      });
    } else {
      setInitialized(true);
    }
  }, [refreshAll]);

  return (
    <AdminDataContext.Provider
      value={{
        initialized,
        projects,
        services,
        skills,
        messages,
        profile,
        stats,
        refreshProjects,
        refreshServices,
        refreshSkills,
        refreshMessages,
        refreshProfile,
        refreshStats,
        refreshAll,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return ctx;
}
