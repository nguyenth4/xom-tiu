const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const cache = new Map<string, any>();

export const api = {
  get: async (endpoint: string, useCache = true) => {
    const cacheKey = `req_cache_${endpoint}`;
    
    if (useCache && cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    if (useCache) {
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          // Cache expires after 5 minutes
          if (Date.now() - parsed.timestamp < 5 * 60 * 1000) {
            cache.set(cacheKey, parsed.data);
            return parsed.data;
          }
        }
      } catch (e) {}
    }

    const token = localStorage.getItem('token');
    const headers: any = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}${endpoint}`, { headers });
    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    
    if (useCache) {
      cache.set(cacheKey, data);
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
      } catch (e) {}
    }
    
    return data;
  },
  
  clearCache: () => {
    cache.clear();
    try {
      sessionStorage.clear();
    } catch (e) {}
  },

  post: async (endpoint: string, data: any) => {
    const isFormData = data instanceof FormData;
    const token = localStorage.getItem('token');
    const headers: any = isFormData ? {} : { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: isFormData ? data : JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API request failed');
    api.clearCache();
    return response.json();
  },

  patch: async (endpoint: string, data: any) => {
    const token = localStorage.getItem('token');
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API request failed');
    api.clearCache();
    return response.json();
  },

  delete: async (endpoint: string) => {
    const token = localStorage.getItem('token');
    const headers: any = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers
    });
    if (!response.ok) throw new Error('API request failed');
    api.clearCache();
    return response.json();
  }
};
