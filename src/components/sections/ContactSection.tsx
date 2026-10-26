'use client';

import React from 'react';
import PolygonDivider from '@/components/common/PolygonDivider';
import { ContactFormData, ProfileInfo } from '@/types';

interface ContactSectionProps {
  formData: ContactFormData;
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>;
  formStatus: string;
  handleContactSubmit: (e: React.FormEvent) => void;
  profile?: ProfileInfo | null;
}
export default function ContactSection({
  formData,
  setFormData,
  formStatus,
  handleContactSubmit,
  profile,
}: ContactSectionProps) {
  return (
    <section id="contact" className="tp-contact-pg-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col col-lg-10 offset-lg-1">
            {/* 3 Contact Info Cards */}
            <div className="office-info">
              <div className="row">
                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                  <div className="office-info-item">
                    <div className="office-info-icon">
                      <i className="fa fa-map-marker"></i>
                    </div>
                    <div className="office-info-text">
                      <h2>Address</h2>
                      <p>{profile?.address || ''}</p>
                    </div>
                  </div>
                </div>

                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                  <div className="office-info-item">
                    <div className="office-info-icon">
                      <i className="fa fa-envelope"></i>
                    </div>
                    <div className="office-info-text">
                      <h2>Email Us</h2>
                      <p>{profile?.email || ''}</p>
                    </div>
                  </div>
                </div>

                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                  <div className="office-info-item">
                    <div className="office-info-icon">
                      <i className="fa fa-phone"></i>
                    </div>
                    <div className="office-info-text">
                      <h2>Call Now</h2>
                      <p>{profile?.phone || ''}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Title */}
            <div className="section-title section-title2 text-center">
              <h2>Have Any Question?</h2>
            </div>

            {formStatus && (
              <div
                style={{
                  background: 'rgba(74, 222, 128, 0.15)',
                  border: '1px solid #4ade80',
                  color: '#4ade80',
                  padding: '14px 20px',
                  borderRadius: '8px',
                  marginBottom: '25px',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                {formStatus}
              </div>
            )}

            {/* Contact Form */}
            <div className="tp-contact-form-area">
              <form onSubmit={handleContactSubmit} className="form">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-field">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-field">
                      <input
                        type="text"
                        value={formData.lastname}
                        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-field">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-field">
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Subject"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-field">
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Your Message..."
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-submit">
                      <button type="submit" className="template-btn">
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Geometric Polygon Divider at Bottom of Contact */}
      <PolygonDivider variant="svg_white" />
    </section>
  );
}
