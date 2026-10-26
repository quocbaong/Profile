import React from 'react';
import { ProfileInfo } from '@/types';

interface SocialBarProps {
  profile?: ProfileInfo | null;
}

export default function SocialBar({ profile }: SocialBarProps) {
  const socialLinks = [
    { name: 'GitHub', url: profile?.github_url || 'https://github.com/quocbaong', icon: 'fa fa-github' },
    { name: 'LinkedIn', url: profile?.linkedin_url || 'https://www.linkedin.com/in/ngquocbao-dev106/', icon: 'fa fa-linkedin' },
    { name: 'Facebook', url: profile?.facebook_url || 'https://www.facebook.com/qbao.henry', icon: 'fa fa-facebook' },
    { name: 'Instagram', url: profile?.instagram_url || 'https://www.instagram.com/quocbao.106/', icon: 'fa fa-instagram' },
  ];

  return (
    <div className="right-social-bar">
      <div className="social-text">SOCIAL</div>
      <ul className="social-icons">
        {socialLinks.map((s) => (
          <li key={s.name}>
            <a href={s.url} target="_blank" rel="noreferrer" title={s.name} aria-label={s.name}>
              <i className={s.icon}></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
