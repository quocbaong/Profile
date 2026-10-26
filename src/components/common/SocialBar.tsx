import React from 'react';
import { ProfileInfo } from '@/types';

interface SocialBarProps {
  profile?: ProfileInfo | null;
}

export default function SocialBar({ profile }: SocialBarProps) {
  const socialLinks = [
    { name: 'GitHub', url: profile?.github_url, icon: 'fa fa-github' },
    { name: 'LinkedIn', url: profile?.linkedin_url, icon: 'fa fa-linkedin' },
    { name: 'Facebook', url: profile?.facebook_url, icon: 'fa fa-facebook' },
    { name: 'Instagram', url: profile?.instagram_url, icon: 'fa fa-instagram' },
  ].filter((s): s is { name: string; url: string; icon: string } => Boolean(s.url && s.url !== '#'));

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
