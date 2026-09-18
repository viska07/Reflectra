import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reflectionService, authService } from '../services/api';

export default function Reflections() {
  const navigate = useNavigate();

  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('Semua');

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
      console.error('Gagal mengambil riwayat:', err);
      setError(err.message || 'Gagal mengambil riwayat refleksi');
    } finally {
      setLoading(false);
    }
  };

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

  const formatTime = (date) => {
    if (!date) return '';

    return new Date(date).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const moodOptions = useMemo(() => {
    const moods = reflections
      .map((item) => item.mood)
      .filter(Boolean);

    return ['Semua', ...new Set(moods)];
  }, [reflections]);

  const filteredReflections = useMemo(() => {
    if (filter === 'Semua') {
      return reflections;
    }

    return reflections.filter(
      (item) => item.mood === filter
    );
  }, [reflections, filter]);

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
              <span style={styles.logoSubtitle}>
                Personal reflection
              </span>
            </div>
          </div>

          <nav style={styles.navigation}>

            <button
              type="button"
              style={styles.navItem}
              onClick={() => navigate('/dashboard')}
            >
              <span style={styles.navIcon}>⌂</span>
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              style={{
                ...styles.navItem,
                ...styles.navItemActive
              }}
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

      {/* MAIN */}
      <main style={styles.main}>

        <header style={styles.header}>

          <div>
            <span style={styles.eyebrow}>
              YOUR JOURNEY
            </span>

            <h1 style={styles.title}>
              Riwayat Refleksi
            </h1>

            <p style={styles.subtitle}>
              Lihat kembali pikiran dan perasaan yang pernah
              kamu tuliskan.
            </p>
          </div>

          <button
            type="button"
            style={styles.primaryButton}
            onClick={() => navigate('/add-reflection')}
          >
            <span>+</span>
            Refleksi Baru
          </button>

        </header>

        {/* SUMMARY */}
        <section style={styles.summary}>

          <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>
              TOTAL CATATAN
            </span>

            <strong style={styles.summaryValue}>
              {reflections.length}
            </strong>
          </div>

          <div style={styles.summaryDivider} />

          <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>
              DITAMPILKAN
            </span>

            <strong style={styles.summaryValue}>
              {filteredReflections.length}
            </strong>
          </div>

          <div style={styles.summaryDivider} />

          <div style={styles.summaryItemWide}>
            <span style={styles.summaryLabel}>
              FILTER
            </span>

            <strong style={styles.summaryMood}>
              {filter}
            </strong>
          </div>

        </section>

        {/* FILTER */}
        {!loading && reflections.length > 0 && (
          <section style={styles.filterSection}>

            <span style={styles.filterLabel}>
              Tampilkan:
            </span>

            <div style={styles.filterList}>
              {moodOptions.map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setFilter(mood)}
                  style={{
                    ...styles.filterButton,
                    ...(filter === mood
                      ? styles.filterButtonActive
                      : {})
                  }}
                >
                  {mood !== 'Semua' && (
                    <span>
                      {getMoodEmoji(mood)}
                    </span>
                  )}

                  {mood}
                </button>
              ))}
            </div>

          </section>
        )}

        {/* TIMELINE */}
        <section style={styles.historySection}>

          {loading ? (
            <div style={styles.state}>
              <div style={styles.loadingIcon}>↻</div>
              <h3>Memuat perjalananmu...</h3>
              <p>Sebentar, kami mengambil catatanmu.</p>
            </div>
          ) : error ? (
            <div style={styles.state}>
              <div style={styles.errorIcon}>!</div>

              <h3>Riwayat belum dapat dimuat</h3>

              <p>{error}</p>

              <button
                type="button"
                style={styles.retryButton}
                onClick={loadReflections}
              >
                Coba lagi
              </button>
            </div>
          ) : filteredReflections.length === 0 ? (
            <div style={styles.state}>
              <div style={styles.emptyIcon}>◷</div>

              <h3>
                {reflections.length === 0
                  ? 'Belum ada perjalanan'
                  : 'Tidak ada refleksi yang cocok'}
              </h3>

              <p>
                {reflections.length === 0
                  ? 'Refleksi pertamamu akan muncul di sini.'
                  : 'Coba gunakan filter yang berbeda.'}
              </p>

              {reflections.length === 0 && (
                <button
                  type="button"
                  style={styles.retryButton}
                  onClick={() => navigate('/add-reflection')}
                >
                  Tulis refleksi
                </button>
              )}
            </div>
          ) : (
            <div style={styles.timeline}>

              {filteredReflections.map((item, index) => (

                <article
                  key={item.id}
                  style={styles.timelineItem}
                >

                  <div style={styles.timelineRail}>

                    <div style={styles.timelineDot}>
                      {getMoodEmoji(item.mood)}
                    </div>

                    {index !== filteredReflections.length - 1 && (
                      <div style={styles.timelineLine} />
                    )}

                  </div>

                  <div style={styles.entry}>

                    <div style={styles.entryMeta}>

                      <div>
                        <span style={styles.entryDate}>
                          {formatDate(item.createdAt)}
                        </span>

                        <span style={styles.entryTime}>
                          {formatTime(item.createdAt)}
                        </span>
                      </div>

                      <span style={styles.entryMood}>
                        {item.mood || 'Tidak diketahui'}
                      </span>

                    </div>

                    <div style={styles.entryBody}>

                      <p style={styles.entryContent}>
                        {item.content}
                      </p>

                      {item.ai_result && (
                        <div style={styles.insight}>

                          <div style={styles.insightHeader}>
                            <span>✦</span>
                            Insight Reflectra
                          </div>

                          <p>
                            {item.ai_result}
                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </article>

              ))}

            </div>
          )}

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
    maxWidth: '1450px',
    margin: '0 auto'
  },

  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '30px',
    marginBottom: '28px'
  },

  eyebrow: {
    display: 'block',
    color: '#15966C',
    fontSize: '9px',
    fontWeight: '800',
    letterSpacing: '1.7px',
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
    margin: '9px 0 0',
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

  summary: {
    display: 'flex',
    alignItems: 'center',
    background: '#FFFFFF',
    border: '1px solid #E5EEEA',
    borderRadius: '17px',
    padding: '18px 23px',
    marginBottom: '20px'
  },

  summaryItem: {
    minWidth: '145px'
  },

  summaryItemWide: {
    flex: 1
  },

  summaryLabel: {
    display: 'block',
    color: '#9AA59F',
    fontSize: '9px',
    fontWeight: '800',
    letterSpacing: '1.2px',
    marginBottom: '6px'
  },

  summaryValue: {
    fontSize: '22px',
    fontWeight: '800'
  },

  summaryMood: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#15966C'
  },

  summaryDivider: {
    width: '1px',
    height: '35px',
    background: '#E7EEEB',
    margin: '0 25px'
  },

  filterSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '13px',
    marginBottom: '22px',
    flexWrap: 'wrap'
  },

  filterLabel: {
    color: '#7D8A85',
    fontSize: '12px',
    fontWeight: '600'
  },

  filterList: {
    display: 'flex',
    gap: '7px',
    flexWrap: 'wrap'
  },

  filterButton: {
    border: '1px solid #DCE7E2',
    background: '#FFFFFF',
    color: '#718079',
    borderRadius: '100px',
    padding: '7px 12px',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },

  filterButtonActive: {
    background: '#DFF6EC',
    borderColor: '#DFF6EC',
    color: '#168260'
  },

  historySection: {
    background: '#FFFFFF',
    border: '1px solid #E5EEEA',
    borderRadius: '20px',
    padding: '27px'
  },

  timeline: {
    display: 'flex',
    flexDirection: 'column'
  },

  timelineItem: {
    display: 'grid',
    gridTemplateColumns: '50px minmax(0, 1fr)',
    gap: '14px'
  },

  timelineRail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  timelineDot: {
    width: '42px',
    height: '42px',
    borderRadius: '14px',
    background: '#EAF8F2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    flexShrink: 0
  },

  timelineLine: {
    width: '1px',
    flex: 1,
    minHeight: '30px',
    background: '#DDE9E4',
    margin: '8px 0'
  },

  entry: {
    paddingBottom: '28px'
  },

  entryMeta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '15px',
    marginBottom: '10px'
  },

  entryDate: {
    fontSize: '13px',
    fontWeight: '800',
    color: '#34423C'
  },

  entryTime: {
    color: '#A0ABA6',
    fontSize: '11px',
    marginLeft: '8px'
  },

  entryMood: {
    padding: '5px 10px',
    borderRadius: '100px',
    background: '#EAF8F2',
    color: '#197A5D',
    fontSize: '10px',
    fontWeight: '700'
  },

  entryBody: {
    background: '#F9FCFA',
    border: '1px solid #E6EEEA',
    borderRadius: '15px',
    padding: '18px'
  },

  entryContent: {
    margin: 0,
    color: '#46534E',
    fontSize: '13px',
    lineHeight: 1.8
  },

  insight: {
    marginTop: '15px',
    padding: '13px',
    borderRadius: '11px',
    background: '#EAF8F2'
  },

  insightHeader: {
    color: '#15966C',
    fontSize: '10px',
    fontWeight: '800',
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
    marginBottom: '5px'
  },

  state: {
    minHeight: '350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#65736D'
  },

  loadingIcon: {
    fontSize: '26px',
    color: '#15966C'
  },

  errorIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '14px',
    background: '#FFF1F1',
    color: '#D95C5C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800'
  },

  emptyIcon: {
    width: '52px',
    height: '52px',
    borderRadius: '16px',
    background: '#EAF8F2',
    color: '#15966C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px'
  },

  retryButton: {
    border: 'none',
    background: '#15966C',
    color: '#FFFFFF',
    borderRadius: '10px',
    padding: '10px 16px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer'
  }
};