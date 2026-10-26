'use client';

import React, { useEffect, useState } from 'react';
import { getAdminMessages, markMessageRead, deleteMessage } from '@/lib/adminApi';
import { Mail, MailOpen, Trash2, Eye, X } from 'lucide-react';

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
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<ContactMessageItem | null>(null);

  const loadMessages = () => {
    setLoading(true);
    getAdminMessages()
      .then((data) => {
        if (data && Array.isArray(data)) setMessages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleView = async (msg: ContactMessageItem) => {
    setSelectedMsg(msg);
    if (!msg.is_read) {
      try {
        await markMessageRead(msg.id);
        setMessages(messages.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m)));
      } catch {
        // ignore error
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa tin nhắn này?')) return;
    try {
      await deleteMessage(id);
      setMessages(messages.filter((m) => m.id !== id));
      if (selectedMsg && selectedMsg.id === id) {
        setSelectedMsg(null);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Delete failed';
      alert(errorMessage);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Hộp thư Liên hệ</h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Danh sách tin nhắn được gửi từ khách truy cập qua form liên hệ trên website.</p>
        </div>

        {loading ? (
          <p style={{ color: '#94a3b8' }}>Đang tải tin nhắn...</p>
        ) : messages.length === 0 ? (
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
                    <th style={{ padding: '0.875rem 1.25rem', width: '60px' }}>Trạng thái</th>
                    <th style={{ padding: '0.875rem 1.25rem' }}>Người gửi</th>
                    <th style={{ padding: '0.875rem 1.25rem' }}>Tiêu đề</th>
                    <th style={{ padding: '0.875rem 1.25rem' }}>Thời gian gửi</th>
                    <th style={{ padding: '0.875rem 1.25rem' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m) => (
                    <tr key={m.id} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: m.is_read ? 'transparent' : '#f0f9ff' }}>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        {m.is_read ? (
                          <span style={{ color: '#94a3b8', display: 'flex' }} title="Đã xem">
                            <MailOpen size={18} />
                          </span>
                        ) : (
                          <span style={{ color: '#2563eb', display: 'flex' }} title="Chưa đọc">
                            <Mail size={18} />
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <p style={{ fontWeight: m.is_read ? 500 : 700, color: '#0f172a', fontSize: '0.925rem' }}>{m.name} {m.lastname}</p>
                        <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.email}</p>
                      </td>
                      <td style={{ padding: '1rem 1.25rem', color: m.is_read ? '#475569' : '#0f172a', fontWeight: m.is_read ? 400 : 600, fontSize: '0.875rem' }}>
                        {m.subject || '(Không có tiêu đề)'}
                      </td>
                      <td style={{ padding: '1rem 1.25rem', color: '#64748b', fontSize: '0.8125rem' }}>
                        {new Date(m.created_at).toLocaleDateString()} {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
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

        {/* Message Details Modal */}
        {selectedMsg && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', width: '100%', maxWidth: '600px', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>Chi tiết Tin nhắn</h3>
                <button onClick={() => setSelectedMsg(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex' }}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Người gửi</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a' }}>{selectedMsg.name} {selectedMsg.lastname} &lt;{selectedMsg.email}&gt;</p>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Chủ đề</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a' }}>{selectedMsg.subject || '(Không có tiêu đề)'}</p>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Nội dung tin nhắn</p>
                  <p style={{ fontSize: '0.925rem', color: '#334155', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{selectedMsg.message}</p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>Ngày nhận: {new Date(selectedMsg.created_at).toLocaleString()}</span>
                <button
                  onClick={() => setSelectedMsg(null)}
                  style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}
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
