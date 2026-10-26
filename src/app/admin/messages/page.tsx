'use client';

import React, { useState } from 'react';
import { markMessageRead, deleteMessage } from '@/lib/adminApi';
import { useAdminData } from '@/context/AdminDataContext';
import { Mail, MailOpen, Trash2, Eye, X, Clock } from 'lucide-react';

interface ContactMessageItem {
  id: number;
  name: string;
  lastname?: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminMessagesPage() {
  const { messages, refreshMessages } = useAdminData();
  const [selectedMsg, setSelectedMsg] = useState<ContactMessageItem | null>(null);

  const handleView = async (msg: ContactMessageItem) => {
    setSelectedMsg(msg);
    if (!msg.is_read) {
      try {
        await markMessageRead(msg.id);
        await refreshMessages();
      } catch {
        // ignore error
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa tin nhắn này?')) return;
    try {
      await deleteMessage(id);
      await refreshMessages();
      if (selectedMsg && selectedMsg.id === id) {
        setSelectedMsg(null);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Xóa thất bại';
      alert(errorMessage);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Hộp thư Liên hệ</h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Danh sách tin nhắn được gửi từ khách truy cập qua form liên hệ trên website.</p>
      </div>

      {messages.length === 0 ? (
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '3.5rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)' }}>
          <div style={{ width: '64px', height: '64px', backgroundColor: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#94a3b8' }}>
            <Mail size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.25rem' }}>Chưa có tin nhắn nào</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Khi có khách liên hệ qua portfolio, tin nhắn sẽ hiển thị tại đây.</p>
        </div>
      ) : (
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '0.875rem 1.25rem', width: '60px', textAlign: 'center' }}>STT</th>
                  <th style={{ padding: '0.875rem 1.25rem' }}>Người gửi</th>
                  <th style={{ padding: '0.875rem 1.25rem' }}>Tiêu đề</th>
                  <th style={{ padding: '0.875rem 1.25rem', width: '180px' }}>Thời gian nhận</th>
                  <th style={{ padding: '0.875rem 1.25rem', textAlign: 'center', width: '110px' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m, idx) => (
                  <tr key={m.id} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: m.is_read ? 'transparent' : '#f0f9ff40', transition: 'background-color 0.15s' }}>
                    <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center', color: '#64748b', fontWeight: 600, fontSize: '0.875rem', verticalAlign: 'middle' }}>
                      {idx + 1}
                    </td>
                    <td style={{ padding: '0.875rem 1.25rem', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        {!m.is_read && (
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb', flexShrink: 0 }} title="Chưa đọc" />
                        )}
                        <div>
                          <p style={{ fontWeight: m.is_read ? 500 : 700, color: '#0f172a', fontSize: '0.925rem', margin: '0 0 2px 0' }}>
                            {m.name} {m.lastname}
                          </p>
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{m.email}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '0.875rem 1.25rem', verticalAlign: 'middle' }}>
                      <p style={{
                        fontWeight: m.is_read ? 400 : 600,
                        color: m.is_read ? '#475569' : '#0f172a',
                        fontSize: '0.875rem',
                        margin: 0,
                        fontStyle: m.subject ? 'normal' : 'italic',
                      }}>
                        {m.subject || '(Không có tiêu đề)'}
                      </p>
                    </td>
                    <td style={{ padding: '0.875rem 1.25rem', color: '#64748b', fontSize: '0.8125rem', verticalAlign: 'middle' }}>
                      {new Date(m.created_at).toLocaleDateString('vi-VN')} {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td style={{ padding: '0.875rem 1.25rem', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button onClick={() => handleView(m)} style={{ backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '0.45rem', borderRadius: '0.375rem', cursor: 'pointer', display: 'flex' }} title="Xem chi tiết">
                          <Eye size={15} />
                        </button>
                        <button onClick={() => handleDelete(m.id)} style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '0.45rem', borderRadius: '0.375rem', cursor: 'pointer', display: 'flex' }} title="Xóa">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Message Details Modal - Redesigned as Modern Email Reader */}
      {selectedMsg && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.875rem', width: '100%', maxWidth: '640px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', overflow: 'hidden' }}>
            {/* Modal Header */}
            <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '0.375rem', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={18} />
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Chi tiết Tin nhắn</h3>
              </div>
              <button
                onClick={() => setSelectedMsg(null)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '0.25rem', display: 'flex', borderRadius: '0.25rem' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.75rem' }}>
              {/* Subject Title */}
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', lineHeight: 1.35 }}>
                {selectedMsg.subject || '(Không có tiêu đề)'}
              </h2>

              {/* Sender & Timestamp - Clean Vertical Layout */}
              <div style={{
                paddingBottom: '1.25rem',
                borderBottom: '1px solid #f1f5f9',
                marginBottom: '1.5rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                    {selectedMsg.name} {selectedMsg.lastname}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    &lt;{selectedMsg.email}&gt;
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748b', fontSize: '0.8125rem' }}>
                  <Clock size={13} />
                  <span>{new Date(selectedMsg.created_at).toLocaleDateString('vi-VN')} {new Date(selectedMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              {/* Message Content Reading Area */}
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Nội dung thư
                </p>
                <div style={{
                  padding: '1.25rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.625rem',
                  color: '#334155',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                  minHeight: '120px',
                  maxHeight: '260px',
                  overflowY: 'auto',
                }}>
                  {selectedMsg.message}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div style={{ padding: '1rem 1.75rem', borderTop: '1px solid #f1f5f9', backgroundColor: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => handleDelete(selectedMsg.id)}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#dc2626',
                  border: '1px solid #fecaca',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  transition: 'background-color 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fef2f2'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
              >
                <Trash2 size={14} /> Xóa tin nhắn
              </button>

              <button
                onClick={() => setSelectedMsg(null)}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#334155',
                  border: '1px solid #cbd5e1',
                  padding: '0.55rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
