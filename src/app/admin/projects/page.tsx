'use client';

import React, { useEffect, useState } from 'react';
import { getAdminProjects, createProject, updateProject, deleteProject, uploadImageFile } from '@/lib/adminApi';
import { getProjectImageUrl } from '@/lib/apiClient';
import { Plus, Edit, Trash2, Upload, X, CheckCircle, XCircle } from 'lucide-react';

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string;
  image: string;
  live_url?: string;
  github_url: string;
  sort_order: number;
  is_active: boolean;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    tags: '',
    image: '',
    live_url: '',
    github_url: '',
    sort_order: 0,
    is_active: true,
  });

  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const loadProjects = () => {
    setLoading(true);
    getAdminProjects()
      .then((data) => {
        if (data && Array.isArray(data)) setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: '',
      description: '',
      tags: '',
      image: '',
      live_url: '',
      github_url: '',
      sort_order: 0,
      is_active: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p: ProjectItem) => {
    setEditingId(p.id);
    setFormData({
      title: p.title,
      category: p.category,
      description: p.description,
      tags: p.tags,
      image: p.image,
      live_url: p.live_url || '',
      github_url: p.github_url,
      sort_order: p.sort_order,
      is_active: p.is_active,
    });
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setUploading(true);
    setErrorMsg('');
    try {
      const res = await uploadImageFile(file);
      if (res && res.url) {
        setFormData({ ...formData, image: res.url });
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setErrorMsg(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await updateProject(editingId, formData);
      } else {
        await createProject(formData);
      }
      setModalOpen(false);
      loadProjects();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Operation failed';
      setErrorMsg(errorMessage);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa dự án này?')) return;
    try {
      await deleteProject(id);
      loadProjects();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Delete failed';
      alert(errorMessage);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Quản lý Dự án</h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Thêm mới, cập nhật và hiển thị các dự án nổi bật trên portfolio.</p>
          </div>
          <button
            onClick={handleOpenAdd}
            style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'background-color 0.15s' }}
          >
            <Plus size={18} /> Thêm Dự án
          </button>
        </div>

        {loading ? (
          <p style={{ color: '#94a3b8' }}>Đang tải danh sách dự án...</p>
        ) : (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '0.875rem 1.25rem', width: '60px', textAlign: 'center' }}>STT</th>
                    <th style={{ padding: '0.875rem 1.25rem', width: '90px' }}>Hình ảnh</th>
                    <th style={{ padding: '0.875rem 1.25rem' }}>Tên dự án</th>
                    <th style={{ padding: '0.875rem 1.25rem' }}>Thể loại</th>
                    <th style={{ padding: '0.875rem 1.25rem' }}>Công nghệ / Tags</th>
                    <th style={{ padding: '0.875rem 1.25rem' }}>Trạng thái</th>
                    <th style={{ padding: '0.875rem 1.25rem', textAlign: 'center', width: '110px' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p, idx) => {
                    const imgUrl = getProjectImageUrl(p.image);
                    return (
                      <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s' }}>
                        <td style={{ padding: '1rem 1.25rem', textAlign: 'center', color: '#64748b', fontWeight: 600, fontSize: '0.875rem', verticalAlign: 'middle' }}>
                          {idx + 1}
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                          <img
                            src={imgUrl}
                            alt={p.title}
                            style={{
                              width: '64px',
                              height: '44px',
                              objectFit: 'cover',
                              borderRadius: '0.375rem',
                              backgroundColor: '#f1f5f9',
                              border: '1px solid #e2e8f0',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                            }}
                          />
                        </td>
                        <td style={{ padding: '0.875rem 1.25rem', verticalAlign: 'middle' }}>
                          <p style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.925rem', lineHeight: 1.25, margin: 0 }}>{p.title}</p>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', color: '#334155', fontSize: '0.875rem' }}>{p.category}</td>
                        <td style={{ padding: '1rem 1.25rem', color: '#64748b', fontSize: '0.85rem' }}>{p.tags}</td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          {p.is_active ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>
                              <CheckCircle size={12} /> Hiển thị
                            </span>
                          ) : (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>
                              <XCircle size={12} /> Đang ẩn
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleOpenEdit(p)} style={{ backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '0.45rem', borderRadius: '0.375rem', cursor: 'pointer', display: 'flex' }} title="Chỉnh sửa">
                              <Edit size={15} />
                            </button>
                            <button onClick={() => handleDelete(p.id)} style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '0.45rem', borderRadius: '0.375rem', cursor: 'pointer', display: 'flex' }} title="Xóa">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal Form */}
        {modalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>{editingId !== null ? 'Chỉnh sửa Dự án' : 'Thêm Dự án Mới'}</h3>
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
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Tiêu đề dự án *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Thể loại</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Web Platform / Mobile App"
                      style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Tags (Công nghệ)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="React • Node.js • REST API"
                      style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Mô tả ngắn</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Ảnh đại diện (URL hoặc Tải file lên)</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/images/project.jpg hoặc đường dẫn ảnh"
                      style={{ flex: 1, backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                    />
                    <label style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', padding: '0.625rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                      <Upload size={16} /> {uploading ? 'Đang tải...' : 'Tải ảnh'}
                      <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                  {formData.image && (
                    <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                      <img src={getProjectImageUrl(formData.image)} alt="Preview" style={{ width: '48px', height: '34px', objectFit: 'cover', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }} />
                      <span style={{ fontSize: '0.75rem', color: '#475569', wordBreak: 'break-all' }}>{formData.image}</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>GitHub URL</label>
                    <input
                      type="text"
                      value={formData.github_url}
                      onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                      placeholder="https://github.com/..."
                      style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Live Demo URL (Tùy chọn)</label>
                    <input
                      type="text"
                      value={formData.live_url}
                      onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                      placeholder="https://..."
                      style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', color: '#0f172a', outline: 'none' }}
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
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Kích hoạt (Hiển thị ra ngoài trang chủ)</span>
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                  <button type="button" onClick={() => setModalOpen(false)} style={{ backgroundColor: '#f8fafc', color: '#64748b', border: '1px solid #cbd5e1', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
                    Hủy bỏ
                  </button>
                  <button type="submit" style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
                    Lưu dự án
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
  );
}
