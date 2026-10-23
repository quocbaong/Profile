'use client';

import React from 'react';
import PolygonDivider from '@/components/common/PolygonDivider';
import { SectionId } from '@/types';

interface HeroSectionProps {
  scrollTo: (id: SectionId) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
    <section id="home" className="hero hero-slider-wrapper hero-style-1">
      <div className="hero-slider">
        <div
          className="slide"
          style={{
            backgroundImage: 'url(/images/user_slide.jpg)',
            backgroundPosition: 'center right',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col col-md-10 col-sm-12 slide-caption">
                <div className="slide-subtitle">
                  <h4>I am Nguyễn Quốc Bảo</h4>
                </div>
                <div className="slide-title">
                  <h2>Full Stack Developer</h2>
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
