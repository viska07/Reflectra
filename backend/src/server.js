require('dotenv').config({
  path: require('path').resolve(__dirname, '../../.env')
});

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// ======================================================
// IMPORT MODELS
// ======================================================
// Model harus di-load agar relasi Sequelize terbaca.
require('./models/User');
require('./models/Reflection');

// ======================================================
// IMPORT ROUTES
// ======================================================
const authRoutes = require('./routes/authRoutes');
const reflectionRoutes = require('./routes/reflectionRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

// ======================================================
// MIDDLEWARE
// ======================================================
app.use(cors());

app.use(express.json());

// ======================================================
// ROUTES
// ======================================================

// Authentication
app.use('/api/auth', authRoutes);

// Reflection
app.use('/api/reflections', reflectionRoutes);

// AI
app.use('/api/ai', aiRoutes);

// ======================================================
// TEST ROUTE
// ======================================================
app.get('/', (req, res) => {
  res.json({
    message: 'Backend Reflectra berjalan 🚀'
  });
});

// ======================================================
// DATABASE + SERVER
// ======================================================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Tes koneksi database
    await sequelize.authenticate();

    console.log('✅ Database Reflectra berhasil terhubung');

    // Jalankan server
    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );
    });

  } catch (error) {
    console.error(
      '❌ Gagal terhubung ke database:',
      error.message
    );
  }
};

startServer();