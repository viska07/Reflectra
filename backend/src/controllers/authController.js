const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ==============================
// REGISTER
// ==============================
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validasi
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Nama, email, dan password wajib diisi'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password minimal 6 karakter'
            });
        }

        // Cek email
        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email sudah terdaftar'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat user
        const user = await User.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword
        });

        return res.status(201).json({
            message: 'Register berhasil',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('❌ REGISTER ERROR:', error);

        return res.status(500).json({
            message: 'Register gagal',
            error: error.message
        });
    }
};


// ==============================
// LOGIN
// ==============================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validasi
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email dan password wajib diisi'
            });
        }

        // Cari user
        const user = await User.findOne({
            where: {
                email: email.trim().toLowerCase()
            }
        });

        if (!user) {
            return res.status(404).json({
                message: 'User tidak ditemukan'
            });
        }

        // Cek password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Password salah'
            });
        }

        // Pastikan JWT_SECRET tersedia
        if (!process.env.JWT_SECRET) {
            console.error('❌ JWT_SECRET belum tersedia di .env');

            return res.status(500).json({
                message: 'Konfigurasi server belum lengkap'
            });
        }

        // Buat JWT
        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        return res.json({
            message: 'Login berhasil',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('❌ LOGIN ERROR:', error);

        return res.status(500).json({
            message: 'Login gagal',
            error: error.message
        });
    }
};