'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FolderGit2, Briefcase, Code2, MessageSquare, User, LogOut, Menu, ExternalLink } from 'lucide-react';
import { adminLogout } from '@/lib/adminApi';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminName, setAdminName] = useState('Administrator');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setAuthorized(true);
      return;
    }

    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const userStr = localStorage.getItem('admin_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr) as Record<string, unknown>;
        if (user && typeof user.name === 'string') {
          setAdminName(user.name);
        }
      } catch {
        // ignore parse error
      }
    }

    setAuthorized(true);
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!authorized) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', color: '#64748b' }}>
        <p>Verifying authorization...</p>
      </div>
    );
  }

  const getPageTitle = () => {
    switch (pathname) {
      case '/admin':
        return 'Dashboard';
      case '/admin/settings':
        return 'Thông tin cá nhân';
      case '/admin/projects':
        return 'Quản lý Dự án';
      case '/admin/services':
        return 'Quản lý Dịch vụ';
      case '/admin/skills':
        return 'Quản lý Kỹ năng';
      case '/admin/messages':
        return 'Hộp thư Liên hệ';
      default:
        return 'Quản trị';
    }
  };
  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Thông tin cá nhân', href: '/admin/settings', icon: User },
    { label: 'Dự án', href: '/admin/projects', icon: FolderGit2 },
    { label: 'Dịch vụ', href: '/admin/services', icon: Briefcase },
    { label: 'Kỹ năng', href: '/admin/skills', icon: Code2 },
    { label: 'Hộp thư', href: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Sidebar for Desktop & Mobile */}
      <aside style={{
        width: '260px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 50,
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.02)',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* User Profile Header at Top */}
        <div style={{
          height: '64px',
          padding: '0 1.25rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
        }}>
          {/* User Icon Avatar */}
          <div style={{
            width: '38px',
            height: '38px',
            minWidth: '38px',
            borderRadius: '50%',
            backgroundColor: '#f1f5f9',
            color: '#475569',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #e2e8f0',
          }}>
            <User size={18} />
          </div>

          {/* Name & Role */}
          <div style={{ overflow: 'hidden', minWidth: 0, flex: 1 }}>
            <p style={{
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#0f172a',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              margin: 0,
              lineHeight: 1.25,
            }}>
              {adminName}
            </p>
            <p style={{
              fontSize: '0.8rem',
              color: '#64748b',
              margin: '3px 0 0 0',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              Quản trị hệ thống
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '1.25rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  color: isActive ? '#2563eb' : '#475569',
                  backgroundColor: isActive ? '#eff6ff' : 'transparent',
                  textDecoration: 'none',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.15s ease',
                  border: isActive ? '1px solid #bfdbfe' : '1px solid transparent',
                }}
              >
                <Icon size={18} style={{ color: isActive ? '#2563eb' : '#64748b' }} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Logout Button */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          marginTop: 'auto',
        }}>
          <button
            onClick={adminLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: '#f8fafc',
              color: '#dc2626',
              border: '1px solid #fecaca',
              padding: '0.625rem 1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fef2f2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
            }}
          >
            <LogOut size={16} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? '260px' : 0,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <header style={{
          height: '64px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.75rem',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxSizing: 'border-box',
        }}>
          {/* Left: Toggle & Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                color: '#475569',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.45rem',
                transition: 'all 0.15s ease',
              }}
              title="Đóng / Mở Menu"
            >
              <Menu size={18} />
            </button>

            {/* Current Page Title */}
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>
              {getPageTitle()}
            </h2>
          </div>

          {/* Right: Live Demo Button */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: '0.9rem',
                color: '#2563eb',
                textDecoration: 'none',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '0.45rem 0.95rem',
                borderRadius: '0.375rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontWeight: 600,
                transition: 'all 0.15s',
              }}
            >
              <span>Xem Website</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </header>

        <main style={{ padding: '2rem', flex: 1, backgroundColor: '#f8fafc' }}>
          {children}
        </main>
      </div>

    </div>
  );
}
