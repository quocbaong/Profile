'use client';

import React from 'react';
import PolygonDivider from '@/components/common/PolygonDivider';
import { servicesData } from '@/data/services';
import { SectionId } from '@/types';

interface ServiceSectionProps {
  scrollTo: (id: SectionId) => void;
}

export default function ServiceSection({ scrollTo }: ServiceSectionProps) {
  return (
    <div id="service" className="service-area section-padding">
      <div className="borderd"></div>
      <div className="container">
        <div className="col-l2">
          <div className="section-title section-title2 text-center">
            <span>What I am Expert In</span>
            <h2>My Service</h2>
          </div>
        </div>

        <div className="row">
          {servicesData.map((service, idx) => (
            <div key={idx} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
              <div className="service-section">
                <div className="services-wrapper">
                  <div className="services-icon-wrapper">
                    <div className="service-dot">
                      <div className="dots"></div>
                      <div className="dots2"></div>
                    </div>
                    <i className={service.iconClass}></i>
                  </div>
                  <div className="service-content">
                    <h2>{service.title}</h2>
                    <p>{service.desc}</p>
                    <button
                      onClick={() => scrollTo('portfolio')}
                      className="btn"
                      style={{
                        color: '#fff',
                        border: 'none',
                        background: 'transparent',
                        padding: 0,
                        textTransform: 'uppercase',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      View Works →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PolygonDivider variant="default" />
    </div>
  );
}
