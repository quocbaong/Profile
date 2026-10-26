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
                      style={{
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.45)',
                        textDecoration: 'none',
                      }}
                    >
                      Download CV <i className="fa fa-download" style={{ marginLeft: '8px' }}></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PolygonDivider variant="svg_white" />
    </section>
  );
}
