'use client';

import React from 'react';
import PolygonDivider from '@/components/common/PolygonDivider';
import { getProjectImageUrl } from '@/lib/apiClient';
import { SectionId, ProfileInfo } from '@/types';

interface HeroSectionProps {
  scrollTo: (id: SectionId) => void;
  profile?: ProfileInfo | null;
}

export default function HeroSection({ scrollTo, profile }: HeroSectionProps) {
  const bgImg = profile?.hero_image
    ? `url(${getProjectImageUrl(profile.hero_image)})`
    : undefined;

  return (
    <section id="home" className="hero hero-slider-wrapper hero-style-1">
      <div className="hero-slider">
        <div
          className="slide"
          style={{
            backgroundImage: bgImg,
            backgroundPosition: 'center right',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col col-md-10 col-sm-12 slide-caption">
                <div className="slide-subtitle">
                  <h4>{profile?.subtitle || (profile?.name ? `I am ${profile.name}` : '')}</h4>
                </div>
                <div className="slide-title">
                  <h2>{profile?.title || ''}</h2>
                </div>
                <div className="btns">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo('contact');
                    }}
                    className="template-btn go-contact-area"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Geometric Polygon Divider */}
      <PolygonDivider variant="default" />
    </section>
  );
}
