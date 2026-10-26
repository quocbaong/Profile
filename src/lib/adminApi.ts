const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8085/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

export async function adminLogin(username: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Login failed');
  }
  if (json.data && json.data.token) {
    localStorage.setItem('admin_token', json.data.token);
    localStorage.setItem('admin_user', JSON.stringify(json.data.user));
  }
  return json.data;
}

export function adminLogout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/admin/login';
  }
}

async function adminFetch(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${API_BASE_URL}/admin${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    adminLogout();
    throw new Error('Unauthorized');
  }

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'API request failed');
  }
  return json.data;
}

export async function getDashboardStats() {
  return adminFetch('/dashboard/stats');
}

export async function getAdminProjects() {
  return adminFetch('/projects');
}

export async function createProject(project: unknown) {
  return adminFetch('/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
}

export async function updateProject(id: string | number, project: unknown) {
  return adminFetch(`/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
}

export async function deleteProject(id: string | number) {
  return adminFetch(`/projects/${id}`, {
    method: 'DELETE',
  });
}

export async function getAdminMessages() {
  return adminFetch('/messages');
}

export async function markMessageRead(id: string | number) {
  return adminFetch(`/messages/${id}/read`, {
    method: 'PATCH',
  });
}

export async function deleteMessage(id: string | number) {
  return adminFetch(`/messages/${id}`, {
    method: 'DELETE',
  });
}


export async function getAdminServices() {
  return adminFetch('/services');
}

export async function createService(service: unknown) {
  return adminFetch('/services', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  });
}

export async function updateService(id: string | number, service: unknown) {
  return adminFetch(`/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  });
}

export async function deleteService(id: string | number) {
  return adminFetch(`/services/${id}`, {
    method: 'DELETE',
  });
}

export async function getAdminSkills() {
  return adminFetch('/skills');
}

export async function createSkill(skill: unknown) {
  return adminFetch('/skills', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(skill),
  });
}

export async function updateSkill(id: string | number, skill: unknown) {
  return adminFetch(`/skills/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(skill),
  });
}

export async function deleteSkill(id: string | number) {
  return adminFetch(`/skills/${id}`, {
    method: 'DELETE',
  });
}

export async function getAdminProfile() {
  return adminFetch('/profile');
}

export async function updateAdminProfile(profile: unknown) {
  return adminFetch('/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
}
export async function uploadImageFile(file: File) {
  const token = getToken();
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE_URL}/admin/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (res.status === 401) {
    adminLogout();
    throw new Error('Unauthorized');
  }

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Upload failed');
  }
  return json.data;
}
