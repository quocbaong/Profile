'use client';

import React, { useState, useEffect } from 'react';
import { submitContactForm, fetchPublicProfile } from '@/lib/apiClient';

import Header from '@/components/common/Header';
import SocialBar from '@/components/common/SocialBar';
import ScrollToTop from '@/components/common/ScrollToTop';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServiceSection from '@/components/sections/ServiceSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';
import { SectionId, ContactFormData, ProfileInfo, Project, Service, TechItem } from '@/types';

interface PortfolioClientProps {
  initialProfile?: ProfileInfo | null;
  initialProjects?: Project[];
  initialServices?: Service[];
  initialSkills?: TechItem[];
}

export default function PortfolioClient({
  initialProfile = null,
  initialProjects = [],
  initialServices = [],
  initialSkills = [],
}: PortfolioClientProps) {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileInfo | null>(initialProfile);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    lastname: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<string>('');

  useEffect(() => {
    // If SSR profile was null, fetch on client
    if (!profile) {
      fetchPublicProfile().then((data) => {
        if (data) setProfile(data);
      });
    }
  }, [profile]);

  // Scroll spy to update active nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections: SectionId[] = ['home', 'about', 'service', 'portfolio', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: SectionId) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Sending message...');
    try {
      await submitContactForm(formData);
      setFormStatus('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', lastname: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      setFormStatus(`Error: ${errorMsg}`);
    }
    setTimeout(() => setFormStatus(''), 5000);
  };

  return (
    <div className="br-app">
      {/* Fixed Left Sidebar Navigation */}
      <Header
        activeSection={activeSection}
        scrollTo={scrollTo}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Fixed Right Social Bar */}
      <SocialBar profile={profile} />

      {/* Main Page Content Area */}
      <div className="page-wrapper">
        <HeroSection scrollTo={scrollTo} profile={profile} />
        <AboutSection scrollTo={scrollTo} profile={profile} />
        <ServiceSection scrollTo={scrollTo} initialServices={initialServices} />
        <PortfolioSection initialProjects={initialProjects} />
        <SkillsSection initialSkills={initialSkills} />
        <ContactSection
          formData={formData}
          setFormData={setFormData}
          formStatus={formStatus}
          handleContactSubmit={handleContactSubmit}
          profile={profile}
        />
        <ScrollToTop />
      </div>
    </div>
  );
}
