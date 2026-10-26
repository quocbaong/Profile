'use client';

import React from 'react';
import PolygonDivider from '@/components/common/PolygonDivider';
import { getProjectImageUrl } from '@/lib/apiClient';
import { SectionId, ProfileInfo } from '@/types';

interface AboutSectionProps {
  scrollTo: (id: SectionId) => void;
  profile?: ProfileInfo | null;
}

export default function AboutSection({ scrollTo, profile }: AboutSectionProps) {
  const photo = profile?.about_image
    ? getProjectImageUrl(profile.about_image)
    : '/images/profile.jpg';

  const defaultDesc = `I’m a fourth-year IT student at Industrial University of Ho Chi Minh City (IUH) on my journey to becoming a professional Software Engineer. I’m passionate about modern software architectures, enterprise backend systems, and crafting responsive web and mobile digital experiences that solve real-world problems.\n\nThrough hands-on projects spanning full-featured web platforms, desktop database systems, and cross-platform mobile apps, I have developed strong logical thinking, rapid problem-solving capabilities, and effective team collaboration skills.`;

  const paragraphs = (profile?.about_description || defaultDesc).split('\n\n');

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
                <img
                  src={photo}
                  alt={profile?.name || 'Nguyễn Quốc Bảo'}
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="col-lg-7 col-md-12 col-12">
            <div className="tp-about-text">
              <div className="tp-about-icon-content">
                <h2>{profile?.about_title || 'Professional And Dedicated Full Stack Developer'}</h2>
                {paragraphs.map((p, idx) => (
                  <p key={idx} style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
                    {p}
                  </p>
                ))}
                <div className="about-author-box">
                  <div className="author-name">{profile?.name || 'Nguyễn Quốc Bảo'}</div>
                  <div className="author-role">{profile?.title || 'Software Engineer'}</div>
                </div>
                <button
                  onClick={() => scrollTo('contact')}
                  className="template-btn about-btn-contact"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PolygonDivider variant="svg_white" />
    </section>
  );
}
