const BASE_URL = 'https://reflectra-production.up.railway.app/api';

// ======================================================
// HELPER
// ======================================================

const getToken = () => {
  return localStorage.getItem('token');
};

const request = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // Tambahkan JWT jika tersedia
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data;

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  // Token tidak valid / expired
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    throw new Error(
      data.message || 'Sesi login telah berakhir'
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message || 'Terjadi kesalahan pada server'
    );
  }

  return data;
};

// ======================================================
// AUTH SERVICE
// ======================================================

export const authService = {
  // ----------------------------------------------------
  // REGISTER
  // ----------------------------------------------------

  register: async (name, email, password) => {
    return await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      }),
    });
  },

  // ----------------------------------------------------
  // LOGIN
  // ----------------------------------------------------

  login: async (email, password) => {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password,
      }),
    });

    // Simpan JWT
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    // Simpan user
    if (data.user) {
      localStorage.setItem(
        'user',
        JSON.stringify(data.user)
      );
    }

    return data;
  },

  // ----------------------------------------------------
  // LOGOUT
  // ----------------------------------------------------

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // ----------------------------------------------------
  // CURRENT USER
  // ----------------------------------------------------

  getCurrentUser: () => {
    const user = localStorage.getItem('user');

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  },

  // ----------------------------------------------------
  // AUTH CHECK
  // ----------------------------------------------------

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// ======================================================
// REFLECTION SERVICE
// ======================================================

export const reflectionService = {
  // ----------------------------------------------------
  // GET REFLECTIONS
  // ----------------------------------------------------

  getAll: async () => {
    return await request('/reflections', {
      method: 'GET',
    });
  },

  // ----------------------------------------------------
  // CREATE REFLECTION
  // ----------------------------------------------------

  create: async (content) => {
    if (!content || content.trim() === '') {
      throw new Error('Refleksi tidak boleh kosong');
    }

    return await request('/reflections', {
      method: 'POST',
      body: JSON.stringify({
        content: content.trim(),
      }),
    });
  },
};

// ======================================================
// AI SERVICE
// ======================================================

export const aiService = {
  // ----------------------------------------------------
  // ANALYZE TEXT
  // ----------------------------------------------------

  analyze: async (text) => {
    if (!text || text.trim() === '') {
      throw new Error('Teks tidak boleh kosong');
    }

    return await request('/ai/analyze', {
      method: 'POST',
      body: JSON.stringify({
        text: text.trim(),
      }),
    });
  },
};