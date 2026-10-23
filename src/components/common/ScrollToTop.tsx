'use client';

import React from 'react';

export default function ScrollToTop() {
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="header-menu">
      <ul className="smothscroll">
        <li>
          <a
            href="#home"
            onClick={handleScrollToTop}
            title="Back to top"
            aria-label="Back to top"
          >
            <i className="fa fa-arrow-up"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}
