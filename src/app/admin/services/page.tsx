'use client';

import React, { useState } from 'react';
import { createService, updateService, deleteService } from '@/lib/adminApi';
import { useAdminData } from '@/context/AdminDataContext';
import { Plus, Edit, Trash2, X, CheckCircle, XCircle } from 'lucide-react';

interface ServiceItem {
  id: number;
  title: string;
  icon_class: string;
  description: string;
  sort_order: number;
  is_active: boolean;
}
export default function AdminServicesPage() {
  const { services, refreshServices } = useAdminData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    icon_class: 'fi flaticon-laptop',
    description: '',
    sort_order: 0,
    is_active: true,
  });

  const [errorMsg, setErrorMsg] = useState('');


  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      icon_class: 'fi flaticon-laptop',
      description: '',
      sort_order: services.length + 1,
      is_active: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (s: ServiceItem) => {
    setEditingId(s.id);
    setFormData({
      title: s.title,
      icon_class: s.icon_class || 'fi flaticon-laptop',
      description: s.description,
      sort_order: s.sort_order,
      is_active: s.is_active,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      if (editingId !== null) {
        await updateService(editingId, formData);
      } else {
        await createService(formData);
      }
      setModalOpen(false);
      await refreshServices();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi khi lưu dịch vụ';
      setErrorMsg(errorMessage);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) return;
    try {
      await deleteService(id);
      await refreshServices();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Xóa thất bại';
      alert(errorMessage);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Quản lý Dịch vụ</h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Các gói dịch vụ chuyên môn hiển thị trên mục Service của portfolio.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'background-color 0.15s' }}
        >
          <Plus size={18} /> Thêm Dịch vụ
        </button>
      </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '0.875rem 1.25rem', width: '60px', textAlign: 'center' }}>STT</th>
                  <th style={{ padding: '0.875rem 1.25rem', width: '120px' }}>Icon Class</th>
                  <th style={{ padding: '0.875rem 1.25rem' }}>Tên Dịch vụ</th>
                  <th style={{ padding: '0.875rem 1.25rem' }}>Mô tả</th>
                  <th style={{ padding: '0.875rem 1.25rem' }}>Trạng thái</th>
                  <th style={{ padding: '0.875rem 1.25rem', textAlign: 'center', width: '110px' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s, idx) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s' }}>
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'center', color: '#64748b', fontWeight: 600, fontSize: '0.875rem', verticalAlign: 'middle' }}>
                      {idx + 1}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                      <code style={{ backgroundColor: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', color: '#2563eb' }}>{s.icon_class}</code>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                      <p style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.925rem', margin: 0 }}>{s.title}</p>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#475569', fontSize: '0.85rem', maxWidth: '350px' }}>{s.description}</td>
                    <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                      {s.is_active ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>
                          <CheckCircle size={12} /> Hiển thị
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>
                          <XCircle size={12} /> Đang ẩn
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button onClick={() => handleOpenEdit(s)} style={{ backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '0.45rem', borderRadius: '0.375rem', cursor: 'pointer', display: 'flex' }} title="Chỉnh sửa">
                          <Edit size={15} />
                        </button>
                        <button onClick={() => handleDelete(s.id)} style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '0.45rem', borderRadius: '0.375rem', cursor: 'pointer', display: 'flex' }} title="Xóa">
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

      {/* Modal Add / Edit Service */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', width: '100%', maxWidth: '550px', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>{editingId !== null ? 'Chỉnh sửa Dịch vụ' : 'Thêm Dịch vụ Mới'}</h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex' }}>
                <X size={20} />
              </button>
            </div>

            {errorMsg && (
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', marginBottom: '1rem' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Tên Dịch vụ *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Web Development / Backend & APIs"
                  style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Icon Class (Flaticon)</label>
                <input
                  type="text"
                  value={formData.icon_class}
                  onChange={(e) => setFormData({ ...formData, icon_class: e.target.value })}
                  placeholder="fi flaticon-laptop, fi flaticon-web-design, fi flaticon-smartphone"
                  style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Mô tả Dịch vụ</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Thứ tự sắp xếp</label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                    style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1.25rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      style={{ width: '1.2rem', height: '1.2rem' }}
                    />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Hiển thị trên website</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ backgroundColor: '#f8fafc', color: '#64748b', border: '1px solid #cbd5e1', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
                  Hủy bỏ
                </button>
                <button type="submit" style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
                  Lưu Dịch vụ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
