function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || '';
}

export function getProjectImageUrl(imagePath?: string): string {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  if (imagePath.startsWith('/uploads')) {
    const apiBase = getApiBaseUrl();
    const host = apiBase.replace(/\/api\/?$/, '');
    return host ? `${host}${imagePath}` : imagePath;
  }
  return imagePath;
}

export async function fetchPublicProjects() {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) return [];
  try {
    const res = await fetch(`${baseUrl}/projects`, { cache: 'no-store' });
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
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) return null;
  try {
    const res = await fetch(`${baseUrl}/profile`, { cache: 'no-store' });
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
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) return [];
  try {
    const res = await fetch(`${baseUrl}/services`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch services');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching services from API:', err);
    return [];
  }
}

export async function fetchPublicSkills() {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) return [];
  try {
    const res = await fetch(`${baseUrl}/skills`, { cache: 'no-store' });
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
  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/contact`, {
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
