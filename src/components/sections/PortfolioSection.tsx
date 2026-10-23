import React from 'react';
import PolygonDivider from '@/components/common/PolygonDivider';
import { projectsData } from '@/data/projects';

export default function PortfolioSection() {
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
              <div className="row">
                {projectsData.map((project) => (
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
            </div>
          </div>
        </div>
      </div>

      <PolygonDivider variant="svg_white" />
    </div>
  );
}
