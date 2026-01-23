const BASE_URL = "http://localhost:5000/api";

export const reflectionService = {
  // Mengambil data untuk Dashboard
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/reflections`);
    if (!response.ok) throw new Error("Gagal mengambil data");
    return await response.json();
  },

  // Mengirim data ke reflectionController.js
  create: async (content) => {
    const response = await fetch(`${BASE_URL}/reflections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }), // Properti harus 'content'
    });
    if (!response.ok) throw new Error("Gagal menyimpan refleksi");
    return await response.json();
  }
};