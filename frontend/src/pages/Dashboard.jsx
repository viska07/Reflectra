import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reflectionService, authService } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();

  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = authService.getCurrentUser();

  useEffect(() => {
    loadReflections();
  }, []);

  const loadReflections = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await reflectionService.getAll();

      setReflections(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Gagal mengambil refleksi:', err);
      setError(err.message || 'Gagal mengambil data refleksi');
    } finally {
      setLoading(false);
    }
  };

  const latestReflection = reflections.length > 0
    ? reflections[0]
    : null;

  const moodCount = useMemo(() => {
    return reflections.reduce((total, item) => {
      if (item.mood) {
        total[item.mood] = (total[item.mood] || 0) + 1;
      }

      return total;
    }, {});
  }, [reflections]);

  const dominantMood = useMemo(() => {
    const entries = Object.entries(moodCount);

    if (entries.length === 0) {
      return '-';
    }

    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }, [moodCount]);

  const getMoodEmoji = (mood) => {
    const value = String(mood || '').toLowerCase();

    if (value.includes('posit')) return '😊';
    if (value.includes('negat')) return '😔';
    if (value.includes('netral')) return '😐';

    return '🌱';
  };

  const formatDate = (date) => {
    if (!date) return '-';

    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const firstName = user?.name
    ? user.name.split(' ')[0]
    : 'Teman';

  return (
    <div style={styles.page}>

      {/* SIDEBAR */}
      <aside style={styles.sidebar}>

        <div>
          <div style={styles.logoArea}>
            <div style={styles.logoMark}>R</div>

            <div>
              <h2 style={styles.logo}>Reflectra</h2>
              <span style={styles.logoSubtitle}>Personal reflection</span>
            </div>
          </div>

          <nav style={styles.navigation}>

            <button
              type="button"
              style={{
                ...styles.navItem,
                ...styles.navItemActive
              }}
              onClick={() => navigate('/dashboard')}
            >
              <span style={styles.navIcon}>⌂</span>
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              style={styles.navItem}
              onClick={() => navigate('/reflections')}
            >
              <span style={styles.navIcon}>◷</span>
              <span>Riwayat</span>
            </button>

          </nav>
        </div>

        <div style={styles.sidebarBottom}>

          <div style={styles.userCard}>
            <div style={styles.avatar}>
              {firstName.charAt(0).toUpperCase()}
            </div>

            <div style={styles.userDetails}>
              <strong>{user?.name || 'Pengguna'}</strong>
              <span>Reflektor</span>
            </div>
          </div>

          <button
            type="button"
            style={styles.logoutButton}
            onClick={handleLogout}
          >
            <span>↪</span>
            Keluar
          </button>

        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>

        <header style={styles.header}>

          <div>
            <div style={styles.smallGreeting}>
              Selamat datang kembali
            </div>

            <h1 style={styles.title}>
              Halo, {firstName} <span>👋</span>
            </h1>

            <p style={styles.subtitle}>
              Luangkan sedikit waktu untuk memahami dirimu hari ini.
            </p>
          </div>

          <button
            type="button"
            style={styles.primaryButton}
            onClick={() => navigate('/add-reflection')}
          >
            <span style={styles.plus}>+</span>
            Tulis Refleksi
          </button>

        </header>

        {/* STATISTICS */}
        <section style={styles.statsGrid}>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>✦</div>

            <div>
              <span style={styles.statLabel}>Total Refleksi</span>
              <strong style={styles.statValue}>
                {reflections.length}
              </strong>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>◷</div>

            <div>
              <span style={styles.statLabel}>Refleksi Terakhir</span>
              <strong style={styles.statValueSmall}>
                {latestReflection
                  ? formatDate(latestReflection.createdAt)
                  : '-'}
              </strong>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              {getMoodEmoji(dominantMood)}
            </div>

            <div>
              <span style={styles.statLabel}>Mood Dominan</span>
              <strong style={styles.statValueSmall}>
                {dominantMood}
              </strong>
            </div>
          </div>

        </section>

        {/* CONTENT */}
        <section style={styles.contentGrid}>

          {/* LATEST REFLECTION */}
          <div style={styles.latestSection}>

            <div style={styles.sectionHeader}>
              <div>
                <span style={styles.sectionEyebrow}>
                  JOURNAL
                </span>

                <h2 style={styles.sectionTitle}>
                  Refleksi Terbaru
                </h2>
              </div>

              <button
                type="button"
                style={styles.textButton}
                onClick={() => navigate('/reflections')}
              >
                Lihat semua →
              </button>
            </div>

            {loading ? (
              <div style={styles.stateCard}>
                <div style={styles.loaderCircle}>↻</div>
                <p>Memuat refleksi...</p>
              </div>
            ) : error ? (
              <div style={styles.stateCard}>
                <div style={styles.stateIcon}>!</div>
                <h3>Data belum dapat dimuat</h3>
                <p>{error}</p>

                <button
                  type="button"
                  style={styles.retryButton}
                  onClick={loadReflections}
                >
                  Coba lagi
                </button>
              </div>
            ) : !latestReflection ? (
              <div style={styles.stateCard}>
                <div style={styles.emptyIcon}>✎</div>

                <h3>Belum ada refleksi</h3>

                <p>
                  Mulai tuliskan apa yang sedang kamu rasakan
                  dan pikirkan hari ini.
                </p>

                <button
                  type="button"
                  style={styles.retryButton}
                  onClick={() => navigate('/add-reflection')}
                >
                  Tulis refleksi pertama
                </button>
              </div>
            ) : (
              <article style={styles.reflectionCard}>

                <div style={styles.reflectionTop}>
                  <div style={styles.moodContainer}>
                    <span style={styles.moodEmoji}>
                      {getMoodEmoji(latestReflection.mood)}
                    </span>

                    <span style={styles.moodBadge}>
                      {latestReflection.mood || 'Tidak diketahui'}
                    </span>
                  </div>

                  <span style={styles.date}>
                    {formatDate(latestReflection.createdAt)}
                  </span>
                </div>

                <p style={styles.reflectionContent}>
                  {latestReflection.content}
                </p>

                {latestReflection.ai_result && (
                  <div style={styles.insightBox}>

                    <div style={styles.insightTitle}>
                      <span>✦</span>
                      Insight Reflectra
                    </div>

                    <p>
                      {latestReflection.ai_result}
                    </p>

                  </div>
                )}

              </article>
            )}

          </div>

          {/* SIDE INFO */}
          <aside style={styles.sidePanel}>

            <div style={styles.miniHeader}>
              <span style={styles.miniIcon}>♡</span>

              <div>
                <span style={styles.sectionEyebrow}>
                  REFLECT
                </span>

                <h3 style={styles.miniTitle}>
                  Ruang untukmu
                </h3>
              </div>
            </div>

            <p style={styles.miniText}>
              Tidak perlu menulis dengan sempurna.
              Cukup jujur dengan apa yang kamu rasakan.
            </p>

            <div style={styles.quote}>
              “Memahami diri sendiri adalah awal
              dari perubahan.”
            </div>

            <button
              type="button"
              style={styles.secondaryButton}
              onClick={() => navigate('/add-reflection')}
            >
              Mulai menulis →
            </button>

          </aside>

        </section>

      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    background: '#F5FAF8',
    color: '#17211D',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },

  sidebar: {
    width: '250px',
    minHeight: '100vh',
    background: '#FFFFFF',
    borderRight: '1px solid #E4ECE8',
    padding: '28px 18px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    alignSelf: 'flex-start'
  },

  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '11px',
    padding: '4px 10px',
    marginBottom: '42px'
  },

  logoMark: {
    width: '40px',
    height: '40px',
    borderRadius: '13px',
    background: '#DDF7EC',
    color: '#15966C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '19px',
    fontWeight: '800'
  },

  logo: {
    margin: 0,
    fontSize: '19px',
    fontWeight: '800',
    letterSpacing: '-0.4px'
  },

  logoSubtitle: {
    display: 'block',
    marginTop: '2px',
    color: '#9AA8A2',
    fontSize: '10px'
  },

  navigation: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },

  navItem: {
    width: '100%',
    border: 'none',
    background: 'transparent',
    color: '#78847F',
    borderRadius: '12px',
    padding: '13px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    textAlign: 'left'
  },

  navItemActive: {
    background: '#E7F8F0',
    color: '#15966C',
    fontWeight: '700'
  },

  navIcon: {
    width: '20px',
    textAlign: 'center',
    fontSize: '18px'
  },

  sidebarBottom: {
    borderTop: '1px solid #E8EFEC',
    paddingTop: '18px'
  },

  userCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px'
  },

  avatar: {
    width: '38px',
    height: '38px',
    borderRadius: '12px',
    background: '#EAF0ED',
    color: '#53645D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '14px'
  },

  userDetails: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0
  },

  userDetailsStrong: {},

  logoutButton: {
    width: '100%',
    marginTop: '12px',
    padding: '10px',
    border: '1px solid #E3EBE7',
    borderRadius: '10px',
    background: '#FFFFFF',
    color: '#7C8984',
    cursor: 'pointer',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },

  main: {
    flex: 1,
    padding: '42px 48px',
    boxSizing: 'border-box',
    maxWidth: '1500px',
    margin: '0 auto'
  },

  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '30px',
    marginBottom: '34px'
  },

  smallGreeting: {
    color: '#7E8D86',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.3px',
    marginBottom: '7px'
  },

  title: {
    margin: 0,
    fontSize: '32px',
    lineHeight: 1.15,
    fontWeight: '800',
    letterSpacing: '-1px'
  },

  subtitle: {
    margin: '10px 0 0',
    color: '#7B8983',
    fontSize: '14px'
  },

  primaryButton: {
    border: 'none',
    borderRadius: '12px',
    padding: '13px 18px',
    background: '#15966C',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 8px 20px rgba(21, 150, 108, 0.16)'
  },

  plus: {
    fontSize: '19px',
    lineHeight: 1
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '16px',
    marginBottom: '28px'
  },

  statCard: {
    background: '#FFFFFF',
    border: '1px solid #E5EEEA',
    borderRadius: '17px',
    padding: '19px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },

  statIcon: {
    width: '43px',
    height: '43px',
    borderRadius: '13px',
    background: '#E8F8F1',
    color: '#15966C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    flexShrink: 0
  },

  statLabel: {
    display: 'block',
    color: '#8A9792',
    fontSize: '11px',
    marginBottom: '5px'
  },

  statValue: {
    display: 'block',
    fontSize: '25px',
    fontWeight: '800'
  },

  statValueSmall: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '700',
    color: '#35433D'
  },

  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 280px',
    gap: '20px',
    alignItems: 'start'
  },

  latestSection: {
    background: '#FFFFFF',
    border: '1px solid #E5EEEA',
    borderRadius: '20px',
    padding: '25px'
  },

  sectionHeader: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '15px',
    marginBottom: '20px'
  },

  sectionEyebrow: {
    display: 'block',
    color: '#15966C',
    fontSize: '9px',
    fontWeight: '800',
    letterSpacing: '1.5px',
    marginBottom: '5px'
  },

  sectionTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '800',
    letterSpacing: '-0.4px'
  },

  textButton: {
    border: 'none',
    background: 'transparent',
    color: '#15966C',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer'
  },

  reflectionCard: {
    background: '#F9FCFA',
    border: '1px solid #E5EEEA',
    borderRadius: '16px',
    padding: '21px'
  },

  reflectionTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '17px'
  },

  moodContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },

  moodEmoji: {
    fontSize: '20px'
  },

  moodBadge: {
    padding: '5px 10px',
    borderRadius: '100px',
    background: '#E5F7EF',
    color: '#197A5D',
    fontSize: '11px',
    fontWeight: '700'
  },

  date: {
    color: '#98A49F',
    fontSize: '11px'
  },

  reflectionContent: {
    margin: 0,
    color: '#43514B',
    fontSize: '14px',
    lineHeight: 1.8
  },

  insightBox: {
    marginTop: '18px',
    padding: '15px',
    borderRadius: '13px',
    background: '#EAF8F2'
  },

  insightTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    color: '#15966C',
    fontSize: '11px',
    fontWeight: '800',
    marginBottom: '7px'
  },

  insightBoxP: {},

  sidePanel: {
    background: '#173D31',
    borderRadius: '20px',
    padding: '24px',
    color: '#FFFFFF',
    minHeight: '240px',
    boxSizing: 'border-box'
  },

  miniHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '11px'
  },

  miniIcon: {
    width: '38px',
    height: '38px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px'
  },

  miniTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '700'
  },

  miniText: {
    color: '#C5D9D1',
    fontSize: '12px',
    lineHeight: 1.7,
    margin: '20px 0'
  },

  quote: {
    borderLeft: '2px solid #61C9A4',
    paddingLeft: '12px',
    color: '#E2F1EB',
    fontSize: '12px',
    lineHeight: 1.6,
    fontStyle: 'italic'
  },

  secondaryButton: {
    width: '100%',
    marginTop: '20px',
    border: '1px solid rgba(255,255,255,0.18)',
    background: 'rgba(255,255,255,0.08)',
    color: '#FFFFFF',
    borderRadius: '10px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '700'
  },

  stateCard: {
    minHeight: '260px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px'
  },

  stateIcon: {
    width: '42px',
    height: '42px',
    borderRadius: '14px',
    background: '#FFF1F1',
    color: '#D95C5C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800'
  },

  emptyIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '15px',
    background: '#EAF8F2',
    color: '#15966C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '21px'
  },

  loaderCircle: {
    color: '#15966C',
    fontSize: '25px'
  },

  retryButton: {
    border: 'none',
    background: '#15966C',
    color: '#FFFFFF',
    borderRadius: '10px',
    padding: '10px 15px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '8px'
  }
};