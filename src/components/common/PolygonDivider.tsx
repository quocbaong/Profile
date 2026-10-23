import React from 'react';

interface PolygonDividerProps {
  variant?: 'default' | 'svg_white';
}

export default function PolygonDivider({ variant = 'default' }: PolygonDividerProps) {
  return (
    <div className={`white_svg ${variant === 'svg_white' ? 'svg_white' : ''}`}>
      <svg x="0px" y="0px" viewBox="0 186.5 1920 113.5">
        <polygon points="0,300 655.167,210.5 1432.5,300 1920,198.5 1920,300 "></polygon>
      </svg>
    </div>
  );
}
