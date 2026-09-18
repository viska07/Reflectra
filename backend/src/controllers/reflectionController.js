const Reflection = require('../models/Reflection');
const User = require('../models/User');

const { analyzeText } = require('./aiController');

// ======================================
// CREATE REFLECTION
// ======================================

exports.createReflection = async (req, res) => {
  try {
    const { content } = req.body;

    // Pastikan user sudah login
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: 'User belum terautentikasi'
      });
    }

    // Validasi content
    if (!content || content.trim() === '') {
      return res.status(400).json({
        message: 'Konten tidak boleh kosong'
      });
    }

    // Pastikan user masih ada
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: 'User tidak ditemukan'
      });
    }

    // Analisis AI
    const ai = analyzeText(content.trim());

    // Simpan reflection
    const reflection = await Reflection.create({
      content: content.trim(),
      mood: ai.mood,
      ai_result: ai.recommendation,
      UserId: req.user.id
    });

    return res.status(201).json({
      message: 'Refleksi berhasil disimpan',
      reflection
    });

  } catch (error) {
    console.error('❌ ERROR createReflection:', error);

    return res.status(500).json({
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

// ======================================
// GET USER REFLECTIONS
// ======================================

exports.getReflections = async (req, res) => {
  try {
    // Pastikan user login
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: 'User belum terautentikasi'
      });
    }

    // Hanya mengambil reflection milik user yang login
    const reflections = await Reflection.findAll({
      where: {
        UserId: req.user.id
      },
      order: [
        ['createdAt', 'DESC']
      ]
    });

    return res.json(reflections);

  } catch (error) {
    console.error('❌ ERROR getReflections:', error);

    return res.status(500).json({
      message: 'Gagal mengambil data refleksi',
      error: error.message
    });
  }
};