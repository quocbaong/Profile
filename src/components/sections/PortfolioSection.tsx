'use client';

import React, { useState, useEffect } from 'react';
import PolygonDivider from '@/components/common/PolygonDivider';
import { fetchPublicProjects, getProjectImageUrl } from '@/lib/apiClient';
import { Project } from '@/types';

interface PortfolioSectionProps {
  initialProjects?: Project[];
}

export default function PortfolioSection({ initialProjects = [] }: PortfolioSectionProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState<boolean>(initialProjects.length === 0);

  useEffect(() => {
    if (initialProjects.length === 0) {
    fetchPublicProjects()
      .then((data) => {
        if (data && Array.isArray(data)) {
          const mapped: Project[] = data.map((p: unknown) => {
            const item = p as Record<string, unknown>;
            const rawImage = typeof item.image === 'string' ? item.image : '';
            return {
              id: String(item.id || ''),
              title: typeof item.title === 'string' ? item.title : '',
              category: typeof item.category === 'string' ? item.category : '',
              tags: typeof item.tags === 'string' ? item.tags : '',
              image: getProjectImageUrl(rawImage),
              githubUrl: typeof item.github_url === 'string' ? item.github_url : (typeof item.githubUrl === 'string' ? item.githubUrl : '#'),
              liveUrl: typeof item.live_url === 'string' ? item.live_url : (typeof item.liveUrl === 'string' ? item.liveUrl : undefined),
              description: typeof item.description === 'string' ? item.description : '',
            };
          });
          setProjects(mapped);
        } else {
          setProjects([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch projects from API:', err);
        setProjects([]);
        setLoading(false);
      });
    }
  }, [initialProjects]);

  return (
    <div id="portfolio" className="tp-protfolio-area section-padding">
      <div className="container">
        <div className="col-12">
          <div className="section-title text-center">
            <span>Portfolio</span>
            <h2>Latest Projects</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="tp-protfolio-item">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: '#64748b' }}>
                  <p>Loading projects from API...</p>
                </div>
              ) : projects.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: '#64748b' }}>
                  <p>No active projects found.</p>
                </div>
              ) : (
                <div className="row">
                  {projects.map((project) => (
                    <div key={project.id} className="col-lg-6 col-md-6 col-sm-12 custom-grid">
                      <div className="tp-protfolio-single">
                        <div className="tp-protfolio-img">
                          <img
                            src={project.image}
                            alt={project.title}
                          />
                        </div>
                        <div className="tp-protfolio-text">
                          <span className="project-category">{project.category}</span>
                          <h2 className="project-title">{project.title}</h2>
                          <p className="project-desc">{project.description}</p>
                          <span className="project-tags">{project.tags}</span>
                          <div className="project-actions">
                            {project.liveUrl ? (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="project-btn-primary"
                              >
                                Live Demo <i className="fa fa-external-link" style={{ marginLeft: '6px' }}></i>
                              </a>
                            ) : (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="project-btn-primary"
                              >
                                View Code <i className="fa fa-github" style={{ marginLeft: '6px' }}></i>
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="project-btn-secondary"
                              >
                                GitHub <i className="fa fa-github" style={{ marginLeft: '6px' }}></i>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PolygonDivider variant="svg_white" />
    </div>
  );
}
