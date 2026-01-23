import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reflectionService } from '../services/api';

export default function Reflections() {
  const navigate = useNavigate();
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reflectionService.getAll()
      .then(data => setReflections(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            style={styles.backBtn}
          >
            ← Kembali ke Dashboard
          </button>

          <h1 style={styles.title}>Semua Refleksi</h1>
          <p style={styles.subtitle}>
            Catatan perjalanan emosimu 🌱
          </p>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p style={styles.loading}>Memuat refleksi...</p>
        ) : reflections.length === 0 ? (
          <p style={styles.empty}>Belum ada refleksi 📭</p>
        ) : (
          <div style={styles.list}>
            {reflections.map(item => (
              <div key={item.id} style={styles.card}>
                <div style={styles.cardHead}>
                  <span style={styles.mood}>{item.mood}</span>
                  <span style={styles.date}>
                    {new Date(item.createdAt).toLocaleDateString('id-ID')}
                  </span>
                </div>

                <p style={styles.content}>{item.content}</p>

                {item.ai_result && (
                  <div style={styles.insight}>
                    <strong>Insight:</strong> {item.ai_result}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: '100vh',
    background: '#F7FFFC',
    padding: '40px',
    fontFamily: 'Inter, system-ui'
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  header: {
    marginBottom: '32px'
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#10B981',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '16px',
    padding: 0
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    marginBottom: '6px'
  },
  subtitle: {
    color: '#6B7280',
    fontSize: '14px'
  },
  loading: {
    color: '#6B7280'
  },
  empty: {
    color: '#9CA3AF',
    marginTop: '40px'
  },
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px'
  },
  card: {
    background: '#FFFFFF',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  cardHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mood: {
    background: '#DCFCE7',
    color: '#065F46',
    padding: '4px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '600'
  },
  date: {
    fontSize: '12px',
    color: '#9CA3AF'
  },
  content: {
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#374151'
  },
  insight: {
    background: '#ECFEF7',
    padding: '12px',
    borderRadius: '12px',
    fontSize: '13px',
    color: '#065F46'
  }
};
