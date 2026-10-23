'use client';

import React from 'react';
import { SectionId } from '@/types';

interface HeaderProps {
  activeSection: string;
  scrollTo: (id: SectionId) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({
  activeSection,
  scrollTo,
  mobileMenuOpen,
  setMobileMenuOpen,
}: HeaderProps) {
  const navItems: { id: SectionId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'service', label: 'Service' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header id="header" className="site-header">
      <div className="sidebar-content-wrap">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('home');
          }}
          className="navbar-brand"
        >
          <img src="/images/portfar/logo_b_slanted.png" alt="Logo" />
        </a>

        <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id} className={activeSection === item.id ? 'active' : ''}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu toggle button */}
      <button
        className="d-lg-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
        aria-label="Toggle mobile menu"
      >
        <i className={mobileMenuOpen ? 'fa fa-times' : 'fa fa-bars'}></i>
      </button>

      <div className="sidebar-copyright d-none d-lg-block">
        © 2026 Nguyễn Quốc Bảo
      </div>
    </header>
  );
}
