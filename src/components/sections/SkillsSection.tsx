'use client';

import React, { useEffect, useState } from 'react';
import PolygonDivider from '@/components/common/PolygonDivider';
import TechIcon from '@/components/common/TechIcon';
import { fetchPublicSkills } from '@/lib/apiClient';
import { TechItem } from '@/types';

export default function SkillsSection() {
  const [skills, setSkills] = useState<TechItem[]>([]);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  useEffect(() => {
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
  }, []);

  return (
    <section id="skills" className="pricing-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col col-xs-12">
            <div className="section-title text-center">
              <span>Core Expertise</span>
              <h2>Technologies I Use</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col col-xs-12">
            <div className="tech-stack-grid">
              {skills.map((tech) => {
                const isHovered = hoveredTech === tech.name;
                return (
                  <div
                    key={tech.name}
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                    style={{
                      background: isHovered ? '#242424' : '#202020',
                      border: `1px solid ${isHovered ? tech.color + '77' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: '12px',
                      padding: '30px 16px',
                      textAlign: 'center',
                      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                      boxShadow: isHovered
                        ? `0 14px 28px rgba(0,0,0,0.5), 0 0 22px ${tech.color}30`
                        : '0 4px 10px rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        width: '70px',
                        height: '70px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        border: `1px solid ${isHovered ? tech.color : 'rgba(255,255,255,0.14)'}`,
                        margin: '0 auto 20px',
                        fontSize: '28px',
                        color: isHovered ? tech.color : '#ffffff',
                        background: isHovered ? `${tech.color}18` : 'rgba(255,255,255,0.03)',
                        boxShadow: isHovered ? `0 0 20px ${tech.color}45` : 'none',
                        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <TechIcon name={tech.name} icon={tech.icon} />
                    </div>
                    <h4
                      style={{
                        fontSize: '17px',
                        fontWeight: 700,
                        margin: '0 0 6px',
                        color: isHovered ? '#ffffff' : '#f0f0f0',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {tech.name}
                    </h4>
                    <span
                      style={{
                        fontSize: '13px',
                        color: isHovered ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.45)',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {tech.category}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <PolygonDivider variant="svg_white" />
    </section>
  );
}
