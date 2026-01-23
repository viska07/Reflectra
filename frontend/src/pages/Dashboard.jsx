import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reflectionService } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [reflections, setReflections] = useState([]);
  const [activeNav, setActiveNav] = useState('dashboard');

  useEffect(() => {
    reflectionService
      .getAll()
      .then(setReflections)
      .catch(console.error);
  }, []);

  const total = reflections.length;
  const lastReflection = reflections[0];

  const moodCount = reflections.reduce((acc, cur) => {
    acc[cur.mood] = (acc[cur.mood] || 0) + 1;
    return acc;
  }, {});

  const handleNavClick = (path, navItem) => {
    setActiveNav(navItem);
    navigate(path);
  };

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h2 style={styles.logo}>Reflectra</h2>
        </div>

        <nav style={styles.nav}>
          <button
            type="button"
            style={{
              ...styles.navItem,
              ...(activeNav === 'dashboard' ? styles.navItemActive : {})
            }}
            onClick={() => handleNavClick('/dashboard', 'dashboard')}
          >
            <span style={styles.navIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
            </span>
            Dashboard
          </button>

          <button
            type="button"
            style={{
              ...styles.navItem,
              ...(activeNav === 'reflections' ? styles.navItemActive : {})
            }}
            onClick={() => handleNavClick('/reflections', 'reflections')}
          >
            <span style={styles.navIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </span>
            Refleksi
          </button>
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.userSection}>
            <div style={styles.avatar}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div style={styles.userInfo}>
              <span style={styles.userName}>Pengguna</span>
              <span style={styles.userStatus}>Online</span>
            </div>
          </div>
          <button
            type="button"
            style={styles.logout}
            onClick={() => navigate('/')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Keluar
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        {/* HEADER */}
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.greetingBadge}>
              <span style={styles.wave}>👋</span>
              <span>Selamat datang kembali</span>
            </div>
            <h1 style={styles.title}>Dashboard Refleksi</h1>
            <p style={styles.subtitle}>
              Jaga pikiranmu, satu refleksi setiap hari.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/add-reflection')}
            style={styles.addBtn}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Catatan Baru
          </button>
        </header>

        {/* STATS */}
        <section style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statIconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <div style={styles.statInfo}>
              <h3 style={styles.statNumber}>{total}</h3>
              <p style={styles.statLabel}>Total Refleksi</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIconWrapper, background: '#DCFCE7'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </div>
            <div style={styles.statInfo}>
              <h3 style={styles.statNumber}>{moodCount.Positif || 0}</h3>
              <p style={styles.statLabel}>Hari Positif</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIconWrapper, background: '#FEE2E2'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </div>
            <div style={styles.statInfo}>
              <h3 style={styles.statNumber}>{moodCount.Negatif || 0}</h3>
              <p style={styles.statLabel}>Hari Sulit</p>
            </div>
          </div>
        </section>

        {/* LAST REFLECTION */}
        <section style={styles.reflectionSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Refleksi Terakhir</h2>
            <button
              type="button"
              style={styles.viewAllBtn}
              onClick={() => navigate('/add-reflection')}
            >
              Lihat Semua
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>
          </div>

          {lastReflection ? (
            <div style={styles.card}>
              <div style={styles.cardHead}>
                <div style={styles.moodBadge}>
                  <span style={styles.moodEmoji}>
                    {lastReflection.mood === 'Positif' ? '😊' : lastReflection.mood === 'Negatif' ? '😔' : '😐'}
                  </span>
                  <span style={{
                    ...styles.mood,
                    background: lastReflection.mood === 'Positif' ? '#DCFCE7' : lastReflection.mood === 'Negatif' ? '#FEE2E2' : '#FEF3C7',
                    color: lastReflection.mood === 'Positif' ? '#166534' : lastReflection.mood === 'Negatif' ? '#991B1B' : '#92400E'
                  }}>
                    {lastReflection.mood}
                  </span>
                </div>
                <div style={styles.dateWrapper}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span style={styles.date}>
                    {new Date(lastReflection.createdAt).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <div style={styles.cardBody}>
                <p style={styles.content}>
                  {lastReflection.content}
                </p>
              </div>

              <div style={styles.insight}>
                <div style={styles.insightHeader}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  <strong style={styles.insightTitle}>AI Insight</strong>
                </div>
                <p style={styles.insightText}>{lastReflection.ai_result}</p>
              </div>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
              </div>
              <p style={styles.emptyText}>Belum ada refleksi</p>
              <p style={styles.emptySubtext}>Mulai catat perjalanan harimu</p>
              <button
                type="button"
                onClick={() => navigate('/add-reflection')}
                style={styles.emptyBtn}
              >
                Buat Refleksi Pertama
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #F7FFFC 0%, #ECFEF7 100%)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  sidebar: {
    width: '280px',
    background: '#fff',
    padding: '28px 20px',
    borderRight: '1px solid #E5E7EB',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '4px 0 24px rgba(0,0,0,0.03)'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '40px',
    paddingLeft: '12px'
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    background: '#ECFEF7',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#111827',
    margin: 0,
    letterSpacing: '-0.5px'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  navItem: {
    background: 'transparent',
    border: 'none',
    textAlign: 'left',
    padding: '14px 16px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500',
    color: '#6B7280',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.2s ease'
  },
  navItemActive: {
    background: '#ECFEF7',
    color: '#10B981',
    fontWeight: '600'
  },
  navIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sidebarFooter: {
    marginTop: 'auto',
    paddingTop: '24px',
    borderTop: '1px solid #E5E7EB'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    marginBottom: '12px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    background: '#F3F4F6',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827'
  },
  userStatus: {
    fontSize: '12px',
    color: '#10B981'
  },
  logout: {
    width: '100%',
    background: 'transparent',
    border: '1px solid #E5E7EB',
    padding: '12px 16px',
    borderRadius: '12px',
    cursor: 'pointer',
    color: '#6B7280',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s ease'
  },
  main: {
    flex: 1,
    padding: '40px 48px',
    overflowY: 'auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '40px'
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  greetingBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: '#fff',
    padding: '8px 16px',
    borderRadius: '100px',
    fontSize: '13px',
    color: '#6B7280',
    marginBottom: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    width: 'fit-content'
  },
  wave: {
    fontSize: '16px'
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#111827',
    margin: 0,
    letterSpacing: '-0.5px'
  },
  subtitle: {
    fontSize: '15px',
    color: '#6B7280',
    margin: 0
  },
  addBtn: {
    background: 'linear-gradient(135deg, #64E2B7 0%, #10B981 100%)',
    border: 'none',
    padding: '14px 24px',
    borderRadius: '14px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
    transition: 'all 0.2s ease'
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    marginBottom: '40px'
  },
  statCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
    transition: 'all 0.2s ease',
    border: '1px solid rgba(0,0,0,0.04)'
  },
  statIconWrapper: {
    width: '56px',
    height: '56px',
    background: '#ECFEF7',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#111827',
    margin: 0,
    lineHeight: 1
  },
  statLabel: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '4px 0 0 0'
  },
  reflectionSection: {
    background: '#fff',
    borderRadius: '24px',
    padding: '28px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
    border: '1px solid rgba(0,0,0,0.04)'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
    margin: 0
  },
  viewAllBtn: {
    background: 'transparent',
    border: 'none',
    color: '#10B981',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease'
  },
  card: {
    background: '#FAFFFE',
    padding: '24px',
    borderRadius: '20px',
    border: '1px solid #E5E7EB'
  },
  cardHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid #E5E7EB'
  },
  moodBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  moodEmoji: {
    fontSize: '24px'
  },
  mood: {
    padding: '6px 14px',
    borderRadius: '100px',
    fontSize: '13px',
    fontWeight: '600'
  },
  dateWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  date: {
    fontSize: '13px',
    color: '#6B7280'
  },
  cardBody: {
    marginBottom: '20px'
  },
  content: {
    fontSize: '15px',
    lineHeight: 1.8,
    color: '#374151',
    margin: 0
  },
  insight: {
    background: 'linear-gradient(135deg, #ECFEF7 0%, #DCFCE7 100%)',
    padding: '20px',
    borderRadius: '16px'
  },
  insightHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px'
  },
  insightTitle: {
    fontSize: '14px',
    color: '#10B981',
    fontWeight: '600'
  },
  insightText: {
    fontSize: '14px',
    lineHeight: 1.7,
    color: '#166534',
    margin: 0
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center'
  },
  emptyIcon: {
    width: '80px',
    height: '80px',
    background: '#F3F4F6',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  emptyText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#374151',
    margin: '0 0 4px 0'
  },
  emptySubtext: {
    fontSize: '14px',
    color: '#9CA3AF',
    margin: '0 0 24px 0'
  },
  emptyBtn: {
    background: '#10B981',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#fff'
  }
};
