const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export function getProjectImageUrl(imagePath?: string): string {
  if (!imagePath) return '/images/project2.jpg';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  if (imagePath.startsWith('/uploads')) {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    const host = apiBase.replace(/\/api\/?$/, '');
    return host ? `${host}${imagePath}` : imagePath;
  }
  return imagePath;
}

export async function fetchPublicProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch projects');
    }
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching projects from backend API:', err);
    return [];
  }
}

export async function fetchPublicProfile() {
  try {
    const res = await fetch(`${API_BASE_URL}/profile`, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch profile');
    }
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error('Error fetching profile from API:', err);
    return null;
  }
}

export async function fetchPublicServices() {
  try {
    const res = await fetch(`${API_BASE_URL}/services`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch services');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching services from API:', err);
    return [];
  }
}

export async function fetchPublicSkills() {
  try {
    const res = await fetch(`${API_BASE_URL}/skills`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch skills');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching skills from API:', err);
    return [];
  }
}

export async function submitContactForm(data: {
  name: string;
  lastname: string;
  email: string;
  subject: string;
  message: string;
}) {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to submit contact message');
  }
  return json;
}
