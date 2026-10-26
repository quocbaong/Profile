'use client';

import React, { useEffect, useState } from 'react';
import { getAdminProfile, updateAdminProfile, uploadImageFile } from '@/lib/adminApi';
import { getProjectImageUrl } from '@/lib/apiClient';
import { Save, Upload, CheckCircle2, User, Mail, Globe, Sparkles } from 'lucide-react';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingAbout, setUploadingAbout] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', isError: false });

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    subtitle: '',
    about_title: '',
    about_description: '',
    email: '',
    phone: '',
    address: '',
    hero_image: '',
    about_image: '',
    resume_url: '',
    github_url: '',
    linkedin_url: '',
    facebook_url: '',
    instagram_url: '',
  });

  useEffect(() => {
    getAdminProfile()
      .then((data) => {
        if (data) {
          setFormData({
            name: data.name || '',
            title: data.title || '',
            subtitle: data.subtitle || '',
            about_title: data.about_title || '',
            about_description: data.about_description || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            hero_image: data.hero_image || '',
            about_image: data.about_image || '',
            resume_url: data.resume_url || '',
            github_url: data.github_url || '',
            linkedin_url: data.linkedin_url || '',
            facebook_url: data.facebook_url || '',
            instagram_url: data.instagram_url || '',
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load profile:', err);
        setLoading(false);
      });
  }, []);

  const handleUploadImage = async (file: File, type: 'hero' | 'about') => {
    if (type === 'hero') setUploadingHero(true);
    else setUploadingAbout(true);
    try {
      const res = await uploadImageFile(file);
      if (res && res.url) {
        if (type === 'hero') setFormData((prev) => ({ ...prev, hero_image: res.url }));
        else setFormData((prev) => ({ ...prev, about_image: res.url }));
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Tải ảnh thất bại';
      alert(msg);
    } finally {
      if (type === 'hero') setUploadingHero(false);
      else setUploadingAbout(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg({ text: '', isError: false });

    try {
      await updateAdminProfile(formData);
      setStatusMsg({ text: 'Cập nhật thông tin Profile thành công!', isError: false });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lưu thất bại';
      setStatusMsg({ text: `Lỗi: ${msg}`, isError: true });
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMsg({ text: '', isError: false }), 4000);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Cài đặt Thông tin Cá nhân</h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Quản lý họ tên, tiểu sử, thông tin liên hệ và liên kết mạng xã hội trên toàn bộ website.</p>
      </div>

      {statusMsg.text && (
        <div style={{
          backgroundColor: statusMsg.isError ? '#fef2f2' : '#ecfdf5',
          border: `1px solid ${statusMsg.isError ? '#fecaca' : '#a7f3d0'}`,
          color: statusMsg.isError ? '#b91c1c' : '#047857',
          padding: '0.875rem 1.25rem',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 500,
        }}>
          <CheckCircle2 size={18} />
          <span>{statusMsg.text}</span>
        </div>
      )}

      {loading ? (
        <p style={{ color: '#94a3b8' }}>Đang tải cài đặt...</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Card 1: Giới thiệu chính & Hero */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
              <Sparkles size={20} color="#2563eb" />
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Thông tin Tiêu đề & Hero Banner</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Họ và Tên *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Chức danh nghề nghiệp *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Full Stack Developer / Software Engineer"
                  style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Lời chào phụ (Hero Subtitle)</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="I am Nguyễn Quốc Bảo"
                style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Ảnh nền Hero Banner</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={formData.hero_image}
                  onChange={(e) => setFormData({ ...formData, hero_image: e.target.value })}
                  style={{ flex: 1, backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                />
                <label style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', padding: '0.625rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  <Upload size={16} /> {uploadingHero ? 'Tải...' : 'Tải ảnh'}
                  <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleUploadImage(e.target.files[0], 'hero')} style={{ display: 'none' }} />
                </label>
              </div>
              {formData.hero_image && (
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src={getProjectImageUrl(formData.hero_image)} alt="Hero Preview" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }} />
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{formData.hero_image}</span>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Mục Giới thiệu (About Section) */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
              <User size={20} color="#2563eb" />
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Mục Giới thiệu Bản thân (About Me)</h2>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Tiêu đề phần About</label>
              <input
                type="text"
                value={formData.about_title}
                onChange={(e) => setFormData({ ...formData, about_title: e.target.value })}
                placeholder="Professional And Dedicated Full Stack Developer"
                style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Nội dung giới thiệu chi tiết</label>
              <textarea
                rows={5}
                value={formData.about_description}
                onChange={(e) => setFormData({ ...formData, about_description: e.target.value })}
                placeholder="Đoạn văn tự giới thiệu quá trình học tập, kinh nghiệm và đam mê công nghệ..."
                style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none', lineHeight: 1.6 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Ảnh đại diện cá nhân (About Image)</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={formData.about_image}
                  onChange={(e) => setFormData({ ...formData, about_image: e.target.value })}
                  style={{ flex: 1, backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                />
                <label style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', padding: '0.625rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  <Upload size={16} /> {uploadingAbout ? 'Tải...' : 'Tải ảnh'}
                  <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleUploadImage(e.target.files[0], 'about')} style={{ display: 'none' }} />
                </label>
              </div>
              {formData.about_image && (
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src={getProjectImageUrl(formData.about_image)} alt="About Preview" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '50%', border: '1px solid #cbd5e1' }} />
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{formData.about_image}</span>
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Thông tin liên hệ & Mạng xã hội */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
              <Mail size={20} color="#2563eb" />
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Thông tin Liên hệ</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Email nhận tin nhắn</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nbao76296@gmail.com"
                  style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Số điện thoại</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+84 399 609 008"
                  style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Địa chỉ liên hệ</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Ho Chi Minh City, Vietnam"
                style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
              />
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
              <Globe size={18} color="#2563eb" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Liên kết Mạng xã hội</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>GitHub URL</label>
                <input
                  type="text"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>LinkedIn URL</label>
                <input
                  type="text"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Facebook URL</label>
                <input
                  type="text"
                  value={formData.facebook_url}
                  onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                  style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Instagram URL</label>
                <input
                  type="text"
                  value={formData.instagram_url}
                  onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                  style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Submit Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem', paddingBottom: '2.5rem' }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                padding: '0.875rem 2rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3)',
                transition: 'all 0.15s ease',
              }}
            >
              <Save size={18} />
              <span>{saving ? 'Đang lưu...' : 'Lưu tất cả thay đổi'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
