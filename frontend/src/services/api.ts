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

    const response = await fetch(`${API_URL}${endpoint}`);
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
  
  post: async (endpoint: string, data: any) => {
    const isFormData = data instanceof FormData;
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? data : JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  patch: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  delete: async (endpoint: string) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  }
};
