'use client';

import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '@/lib/adminApi';
import { FolderGit2, CheckCircle2, MessageSquare, MailWarning, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    total_projects: 0,
    active_projects: 0,
    total_messages: 0,
    unread_messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((data) => {
        if (data) setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Tổng số Dự án', value: stats.total_projects, icon: FolderGit2, color: '#2563eb', bg: '#eff6ff', href: '/admin/projects' },
    { label: 'Dự án Đang hiển thị', value: stats.active_projects, icon: CheckCircle2, color: '#059669', bg: '#ecfdf5', href: '/admin/projects' },
    { label: 'Tổng số Tin nhắn', value: stats.total_messages, icon: MessageSquare, color: '#7c3aed', bg: '#f5f3ff', href: '/admin/messages' },
    { label: 'Tin nhắn Chưa đọc', value: stats.unread_messages, icon: MailWarning, color: '#d97706', bg: '#fffbeb', href: '/admin/messages' },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Tổng quan Bảng điều khiển</h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Xin chào! Dưới đây là tình trạng hoạt động trên portfolio của bạn.</p>
        </div>

        {loading ? (
          <p style={{ color: '#94a3b8' }}>Đang tải dữ liệu thống kê...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Link key={idx} href={card.href} style={{ textDecoration: 'none' }}>
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)', transition: 'all 0.2s ease', cursor: 'pointer' }}>
                    <div>
                      <p style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.375rem' }}>{card.label}</p>
                      <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>{card.value}</h3>
                    </div>
                    <div style={{ backgroundColor: card.bg, color: card.color, padding: '0.875rem', borderRadius: '0.625rem', display: 'flex' }}>
                      <Icon size={26} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', marginBottom: '1rem' }}>Thao tác Nhanh</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/admin/projects" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 500, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background-color 0.15s' }}>
              Quản lý Dự án <ArrowUpRight size={16} />
            </Link>
            <Link href="/admin/messages" style={{ backgroundColor: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 500, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.15s' }}>
              Xem Hộp thư Liên hệ <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
  );
}
