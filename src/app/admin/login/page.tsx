'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/adminApi';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await adminLogin(username, password);
      router.push('/admin');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Tài khoản hoặc mật khẩu không chính xác';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', padding: '1rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#ffffff', borderRadius: '1rem', padding: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)', border: '1px solid #e2e8f0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#2563eb', border: '1px solid #bfdbfe' }}>
            <ShieldCheck size={32} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Đăng nhập Quản trị</h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Quản lý Portfolio Nguyễn Quốc Bảo</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Tên đăng nhập</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: '#94a3b8', display: 'flex' }}>
                <User size={18} />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập username"
                style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.75rem 1rem 0.75rem 2.75rem', color: '#0f172a', fontSize: '0.875rem', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Mật khẩu</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: '#94a3b8', display: 'flex' }}>
                <Lock size={18} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.75rem 1rem 0.75rem 2.75rem', color: '#0f172a', fontSize: '0.875rem', outline: 'none' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', backgroundColor: '#2563eb', color: '#ffffff', fontWeight: 600, padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.95rem', transition: 'background-color 0.2s' }}
          >
            {loading ? 'Đang xác thực...' : 'Đăng nhập'}
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
