'use client';

import React, { useState } from 'react';
import { createSkill, updateSkill, deleteSkill, uploadImageFile } from '@/lib/adminApi';
import { useAdminData } from '@/context/AdminDataContext';
import TechIcon from '@/components/common/TechIcon';
import { Plus, Edit, Trash2, X, CheckCircle, XCircle, Upload, ChevronDown } from 'lucide-react';

interface SkillItem {
  id: number;
  name: string;
  category: string;
  icon?: string;
  color: string;
  sort_order: number;
  is_active: boolean;
}

export default function AdminSkillsPage() {
  const { skills, refreshSkills } = useAdminData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Backend',
    icon: '',
    color: '#3b82f6',
    sort_order: 0,
    is_active: true,
  });

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Backend',
      icon: '',
      color: '#3b82f6',
      sort_order: skills.length + 1,
      is_active: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (sk: SkillItem) => {
    setEditingId(sk.id);
    setFormData({
      name: sk.name,
      category: sk.category,
      icon: sk.icon || '',
      color: sk.color || '#3b82f6',
      sort_order: sk.sort_order,
      is_active: sk.is_active,
    });
    setModalOpen(true);
  };

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setUploadingLogo(true);
    try {
      const res = await uploadImageFile(file);
      if (res && res.url) {
        setFormData((prev) => ({ ...prev, icon: res.url }));
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Tải logo thất bại';
      alert(msg);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      if (editingId !== null) {
        await updateSkill(editingId, formData);
      } else {
        await createSkill(formData);
      }
      setModalOpen(false);
      await refreshSkills();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi khi lưu kỹ năng';
      setErrorMsg(errorMessage);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa kỹ năng này?')) return;
    try {
      await deleteSkill(id);
      await refreshSkills();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Xóa thất bại';
      alert(errorMessage);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Quản lý Kỹ năng & Công nghệ</h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Danh sách tech stack, ngôn ngữ lập trình và công cụ hiển thị trên website.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'background-color 0.15s' }}
        >
          <Plus size={18} /> Thêm Kỹ năng
        </button>
      </div>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '0.875rem 1.25rem', width: '60px', textAlign: 'center' }}>STT</th>
                <th style={{ padding: '0.875rem 1.25rem', width: '90px' }}>Logo / Icon</th>
                <th style={{ padding: '0.875rem 1.25rem' }}>Tên Kỹ năng</th>
                <th style={{ padding: '0.875rem 1.25rem' }}>Phân loại</th>
                <th style={{ padding: '0.875rem 1.25rem' }}>Màu sắc (Theme)</th>
                <th style={{ padding: '0.875rem 1.25rem' }}>Trạng thái</th>
                <th style={{ padding: '0.875rem 1.25rem', textAlign: 'center', width: '110px' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((sk, idx) => (
                <tr key={sk.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s' }}>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'center', color: '#64748b', fontWeight: 600, fontSize: '0.875rem', verticalAlign: 'middle' }}>
                    {idx + 1}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '0.5rem',
                      backgroundColor: `${sk.color}15`,
                      border: `1px solid ${sk.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: sk.color,
                    }}>
                      <TechIcon name={sk.name} icon={sk.icon} />
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                    <p style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.925rem', margin: 0 }}>{sk.name}</p>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                    <span style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 500 }}>
                      {sk.category}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: sk.color, border: '1px solid #cbd5e1', display: 'inline-block' }} />
                      <code style={{ fontSize: '0.75rem', color: '#64748b' }}>{sk.color}</code>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                    {sk.is_active ? (
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
                      <button onClick={() => handleOpenEdit(sk)} style={{ backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '0.45rem', borderRadius: '0.375rem', cursor: 'pointer', display: 'flex' }} title="Chỉnh sửa">
                        <Edit size={15} />
                      </button>
                      <button onClick={() => handleDelete(sk.id)} style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '0.45rem', borderRadius: '0.375rem', cursor: 'pointer', display: 'flex' }} title="Xóa">
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

      {/* Modal Add / Edit Skill */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>{editingId !== null ? 'Chỉnh sửa Kỹ năng' : 'Thêm Kỹ năng Mới'}</h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex' }}>
                <X size={20} />
              </button>
            </div>

            {errorMsg && (
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', marginBottom: '1rem' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Tên Kỹ năng *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Java, Golang, React.js, Docker..."
                  style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Phân loại (Category)</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0.5rem',
                      padding: '0.625rem 2.5rem 0.625rem 0.875rem',
                      color: '#0f172a',
                      outline: 'none',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Database">Database</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Language">Language</option>
                    <option value="Tools">Tools</option>
                  </select>
                  <div style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b', display: 'flex', alignItems: 'center' }}>
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              {/* Logo / Image Upload Field */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Logo / Hình ảnh Kỹ năng</label>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Tải ảnh PNG/SVG hoặc dán link ảnh (.png, .svg)</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="URL ảnh hoặc tải file lên..."
                    style={{ flex: 1, backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                  />
                  <label style={{
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#334155',
                    padding: '0.625rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}>
                    <Upload size={16} /> {uploadingLogo ? 'Đang tải...' : 'Tải Logo'}
                    <input type="file" accept="image/*,.svg" onChange={handleUploadLogo} style={{ display: 'none' }} />
                  </label>
                </div>
                {formData.icon && (
                  <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.375rem', border: '1px solid #e2e8f0' }}>
                    <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <TechIcon name={formData.name} icon={formData.icon} />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', wordBreak: 'break-all' }}>{formData.icon}</span>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Màu sắc đại diện</label>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    style={{ width: '45px', height: '40px', padding: 0, border: '1px solid #cbd5e1', borderRadius: '0.375rem', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="#3b82f6"
                    style={{ flex: 1, backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                  />
                </div>
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ backgroundColor: '#f8fafc', color: '#64748b', border: '1px solid #cbd5e1', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
                  Hủy bỏ
                </button>
                <button type="submit" style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
                  Lưu Kỹ năng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
