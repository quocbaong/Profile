'use client';

import React, { useEffect, useState } from 'react';
import PolygonDivider from '@/components/common/PolygonDivider';
import TechIcon from '@/components/common/TechIcon';
import { getProjectImageUrl, fetchPublicSkills } from '@/lib/apiClient';
import { SectionId, ProfileInfo, TechItem } from '@/types';

interface AboutSectionProps {
  scrollTo: (id: SectionId) => void;
  profile?: ProfileInfo | null;
  initialSkills?: TechItem[];
}

interface TechSubGroup {
  id: string;
  match: (item: TechItem) => boolean;
}

interface TechMainCategory {
  id: string;
  label: string;
  subGroups: TechSubGroup[];
}

const TECH_CATEGORIES: TechMainCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    subGroups: [
      {
        id: 'languages',
        match: (s) => (s.category || '').toLowerCase() === 'language',
      },
    ],
  },
  {
    id: 'frameworks_libraries',
    label: 'Frameworks/Libraries',
    subGroups: [
      {
        // Sub-line 1: Frontend
        id: 'frontend',
        match: (s) => (s.category || '').toLowerCase() === 'frontend',
      },
      {
        // Sub-line 2: Backend
        id: 'backend',
        match: (s) => (s.category || '').toLowerCase() === 'backend',
      },
    ],
  },
  {
    id: 'cloud_devops',
    label: 'Cloud/DevOps',
    subGroups: [
      {
        // Sub-line 1: Database & Server Storage
        id: 'database',
        match: (s) => (s.category || '').toLowerCase() === 'database',
      },
      {
        // Sub-line 2: Cloud, DevOps & Tools
        id: 'cloud_devops',
        match: (s) => {
          const c = (s.category || '').toLowerCase();
          return c === 'devops' || c === 'tools';
        },
      },
    ],
  },
];

export default function AboutSection({ scrollTo, profile, initialSkills = [] }: AboutSectionProps) {
  const [skills, setSkills] = useState<TechItem[]>(initialSkills);

  useEffect(() => {
    if (initialSkills.length === 0) {
      fetchPublicSkills().then((data) => {
        if (data && Array.isArray(data)) {
          const mapped: TechItem[] = data.map((sk: unknown) => {
            const item = sk as Record<string, unknown>;
            return {
              name: typeof item.name === 'string' ? item.name : '',
              category: typeof item.category === 'string' ? item.category : '',
              color: typeof item.color === 'string' ? item.color : '#3b82f6',
              icon: typeof item.icon === 'string' ? item.icon : undefined,
            };
          });
          setSkills(mapped);
        }
      });
    }
  }, [initialSkills]);

  const photo = profile?.about_image
    ? getProjectImageUrl(profile.about_image)
    : '';

  const paragraphs = (profile?.about_description || '').split('\n\n').filter(Boolean);

  return (
    <section id="about" className="tp-about-section">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Column: User's Authentic Photo with Frame */}
          <div className="col-lg-5 col-md-12 col-12">
            <div className="tp-about-wrap">
              <div
                className="tp-about-img"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {photo ? (
                  <img
                    src={photo}
                    alt={profile?.name || 'About'}
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                  />
                ) : null}
              </div>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="col-lg-7 col-md-12 col-12">
            <div className="tp-about-text">
              <div className="tp-about-icon-content">
                <h2>{profile?.about_title || ''}</h2>
                {paragraphs.map((p, idx) => (
                  <p key={idx} style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
                    {p}
                  </p>
                ))}
                <div className="about-author-box">
                  <div className="author-name">{profile?.name || ''}</div>
                  <div className="author-role">{profile?.title || ''}</div>
                </div>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button
                    onClick={() => scrollTo('contact')}
                    className="template-btn about-btn-contact"
                  >
                    Get In Touch
                  </button>
                  {profile?.resume_url && profile.resume_url !== '#' && (
                    <a
                      href={getProjectImageUrl(profile.resume_url)}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="template-btn about-btn-contact"
                    >
                      Download CV <i className="fa fa-download" style={{ marginLeft: '8px' }}></i>
                    </a>
                  )}
                </div>

                {/* Tech Stack Embedded - 3 Main Categories with Sub-lines */}
                {skills.length > 0 && (
                  <div className="about-tech-stack">
                    <div className="about-tech-stack-heading">Skills</div>
                    <div className="about-tech-rows">
                      {TECH_CATEGORIES.map((cat) => {
                        const hasSkills = cat.subGroups.some((sg) => skills.some((s) => sg.match(s)));
                        if (!hasSkills) return null;

                        return (
                          <div key={cat.id} className="about-tech-row">
                            <div className="about-tech-row-label">{cat.label}</div>
                            <div className="about-tech-sublines">
                              {cat.subGroups.map((sg) => {
                                const subSkills = skills.filter((s) => sg.match(s));
                                if (subSkills.length === 0) return null;

                                return (
                                  <div key={sg.id} className="about-tech-subline">
                                    {subSkills.map((tech) => (
                                      <div key={tech.name} className="about-tech-pill">
                                        <span
                                          className="about-tech-pill-icon"
                                          style={{ color: tech.color || '#ffffff' }}
                                        >
                                          <TechIcon name={tech.name} icon={tech.icon} monochrome={false} />
                                        </span>
                                        <span className="about-tech-pill-name">{tech.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <PolygonDivider variant="svg_white" />
    </section>
  );
}
