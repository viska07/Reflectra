import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');

    if (!email.trim() || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }

    try {
      setLoading(true);

      await authService.login(
        email.trim(),
        password
      );

      // Token sudah disimpan oleh authService.login()
      navigate('/dashboard');

    } catch (err) {
      console.error('Login error:', err);

      setError(
        err.message || 'Login gagal. Silakan coba lagi.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.backgroundGlow}></div>

      <div style={styles.card}>

        {/* LOGO */}
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>
            ✦
          </div>

          <h1 style={styles.logo}>
            Reflectra
          </h1>

          <p style={styles.logoSubtitle}>
            Your space to pause, reflect, and grow.
          </p>
        </div>

        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            Selamat datang kembali
          </h2>

          <p style={styles.subtitle}>
            Masuk untuk melanjutkan perjalanan refleksimu.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div style={styles.error}>
            <span>!</span>
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin}>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email kamu"
              style={styles.input}
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              style={styles.input}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.loginButton,
              opacity: loading ? 0.7 : 1
            }}
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>

        </form>

        {/* REGISTER */}
        <div style={styles.registerSection}>
          <span>
            Belum punya akun?
          </span>

          <Link
            to="/register"
            style={styles.registerLink}
          >
            Buat akun
          </Link>
        </div>

        {/* BACK */}
        <button
          type="button"
          onClick={() => navigate('/')}
          style={styles.backButton}
        >
          ← Kembali ke halaman utama
        </button>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px 20px',
    background:
      'linear-gradient(135deg, #F7FFFC 0%, #ECFEF7 50%, #E6FFF5 100%)',
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: 'relative',
    overflow: 'hidden'
  },

  backgroundGlow: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'rgba(16, 185, 129, 0.08)',
    filter: 'blur(80px)',
    top: '-200px',
    right: '-150px'
  },

  card: {
    width: '100%',
    maxWidth: '460px',
    background: '#FFFFFF',
    borderRadius: '28px',
    padding: '42px',
    boxShadow:
      '0 25px 70px rgba(15, 118, 92, 0.10)',
    border: '1px solid rgba(16, 185, 129, 0.08)',
    position: 'relative',
    zIndex: 1
  },

  logoSection: {
    textAlign: 'center',
    marginBottom: '34px'
  },

  logoIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '16px',
    margin: '0 auto 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background:
      'linear-gradient(135deg, #64E2B7, #10B981)',
    color: '#FFFFFF',
    fontSize: '23px',
    fontWeight: '700',
    boxShadow:
      '0 8px 20px rgba(16, 185, 129, 0.22)'
  },

  logo: {
    margin: 0,
    color: '#111827',
    fontSize: '24px',
    fontWeight: '800',
    letterSpacing: '-0.5px'
  },

  logoSubtitle: {
    margin: '7px 0 0',
    fontSize: '12px',
    color: '#9CA3AF'
  },

  header: {
    marginBottom: '26px'
  },

  title: {
    margin: '0 0 8px',
    fontSize: '25px',
    fontWeight: '800',
    color: '#111827',
    letterSpacing: '-0.4px'
  },

  subtitle: {
    margin: 0,
    fontSize: '14px',
    lineHeight: 1.6,
    color: '#6B7280'
  },

  error: {
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    background: '#FEF2F2',
    color: '#B91C1C',
    border: '1px solid #FECACA',
    padding: '12px 14px',
    borderRadius: '12px',
    fontSize: '13px',
    marginBottom: '20px'
  },

  formGroup: {
    marginBottom: '19px'
  },

  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151'
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #D1D5DB',
    borderRadius: '13px',
    padding: '13px 15px',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    background: '#FFFFFF'
  },

  loginButton: {
    width: '100%',
    border: 'none',
    borderRadius: '14px',
    padding: '14px',
    marginTop: '5px',
    background:
      'linear-gradient(135deg, #64E2B7 0%, #10B981 100%)',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow:
      '0 8px 20px rgba(16, 185, 129, 0.22)'
  },

  registerSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '5px',
    marginTop: '25px',
    fontSize: '13px',
    color: '#6B7280'
  },

  registerLink: {
    color: '#10B981',
    fontWeight: '700',
    textDecoration: 'none'
  },

  backButton: {
    display: 'block',
    margin: '20px auto 0',
    background: 'transparent',
    border: 'none',
    color: '#9CA3AF',
    fontSize: '12px',
    cursor: 'pointer'
  }
};