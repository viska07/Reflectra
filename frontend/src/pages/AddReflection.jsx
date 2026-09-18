import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reflectionService } from '../services/api';

export default function AddReflection() {
  const navigate = useNavigate();

  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { id: 'senang', emoji: '😊', label: 'Senang', color: '#10B981' },
    { id: 'biasa', emoji: '😐', label: 'Biasa', color: '#6B7280' },
    { id: 'sedih', emoji: '😢', label: 'Sedih', color: '#3B82F6' },
    { id: 'marah', emoji: '😠', label: 'Marah', color: '#EF4444' },
    { id: 'cemas', emoji: '😰', label: 'Cemas', color: '#F59E0B' }
  ];

  const save = async () => {
    if (!text.trim()) {
      alert('Tulis refleksimu terlebih dahulu.');
      return;
    }

    try {
      setLoading(true);

      await reflectionService.create(text);

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Gagal menyimpan refleksi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* =========================
          TOP NAVBAR
      ========================== */}
      <header style={styles.navbar}>
        <div style={styles.navInner}>

          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            style={styles.backButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F0FDF9';
              e.currentTarget.style.color = '#059669';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#6B7280';
            }}
          >
            <span style={styles.backIcon}>←</span>
            <span>Kembali</span>
          </button>

          <div style={styles.brand}>
            <div style={styles.brandIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#047857"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 3z" />
              </svg>
            </div>

            <span>Reflectra</span>
          </div>

          <div style={styles.navSpacer} />
        </div>
      </header>

      {/* =========================
          MAIN
      ========================== */}
      <main style={styles.main}>

        {/* Hero */}
        <section style={styles.hero}>
          <div style={styles.heroBadge}>
            <span style={styles.badgeDot} />
            Ruang refleksi pribadi
          </div>

          <h1 style={styles.title}>
            Ceritakan harimu.
            <br />
            <span style={styles.titleAccent}>Tanpa perlu berpura-pura.</span>
          </h1>

          <p style={styles.subtitle}>
            Luangkan sedikit waktu untuk menuliskan apa yang kamu rasakan,
            pikirkan, dan alami hari ini.
          </p>
        </section>

        {/* =========================
            MOOD
        ========================== */}
        <section style={styles.section}>
          <div style={styles.sectionHeading}>
            <div>
              <h2 style={styles.sectionTitle}>
                Bagaimana perasaanmu?
              </h2>

              <p style={styles.sectionDescription}>
                Pilih yang paling menggambarkan keadaanmu saat ini.
              </p>
            </div>

            <span style={styles.optional}>Opsional</span>
          </div>

          <div style={styles.moodGrid}>
            {moods.map((mood) => {
              const active = selectedMood === mood.id;

              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setSelectedMood(mood.id)}
                  style={{
                    ...styles.moodCard,
                    ...(active
                      ? {
                          borderColor: mood.color,
                          background: '#F0FDF9',
                          transform: 'translateY(-2px)',
                          boxShadow: `0 8px 20px ${mood.color}22`
                        }
                      : {})
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.transform =
                        'translateY(-2px)';
                      e.currentTarget.style.borderColor = '#A7F3D0';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.transform =
                        'translateY(0)';
                      e.currentTarget.style.borderColor =
                        '#E5E7EB';
                    }
                  }}
                >
                  <span
                    style={{
                      ...styles.moodEmoji,
                      ...(active
                        ? { transform: 'scale(1.12)' }
                        : {})
                    }}
                  >
                    {mood.emoji}
                  </span>

                  <span
                    style={{
                      ...styles.moodLabel,
                      color: active ? mood.color : '#4B5563'
                    }}
                  >
                    {mood.label}
                  </span>

                  {active && (
                    <span
                      style={{
                        ...styles.check,
                        background: mood.color
                      }}
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================
            JOURNAL CARD
        ========================== */}
        <section style={styles.journalCard}>

          <div style={styles.journalTop}>
            <div>
              <div style={styles.journalLabel}>
                <span style={styles.labelIcon}>✦</span>
                Refleksi hari ini
              </div>

              <h2 style={styles.journalTitle}>
                Apa yang ada di pikiranmu?
              </h2>
            </div>

            <div style={styles.dateBadge}>
              <span>Today</span>
              <strong>
                {new Date().toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'short'
                })}
              </strong>
            </div>
          </div>

          <div style={styles.textareaWrapper}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                'Mulai menulis di sini...\n\nApa yang terjadi hari ini? Bagaimana perasaanmu? Adakah sesuatu yang ingin kamu pahami atau syukuri?'
              }
              style={styles.textarea}
              onFocus={(e) => {
                e.currentTarget.parentElement.style.borderColor =
                  '#6EE7B7';
                e.currentTarget.parentElement.style.boxShadow =
                  '0 0 0 4px rgba(16, 185, 129, 0.08)';
                e.currentTarget.parentElement.style.background =
                  '#FFFFFF';
              }}
              onBlur={(e) => {
                e.currentTarget.parentElement.style.borderColor =
                  '#E5E7EB';
                e.currentTarget.parentElement.style.boxShadow =
                  'none';
                e.currentTarget.parentElement.style.background =
                  '#FAFFFD';
              }}
            />

            <div style={styles.textareaFooter}>
              <span style={styles.characterCount}>
                {text.length} karakter
              </span>

              <span style={styles.privateText}>
                🔒 Hanya kamu yang dapat melihat refleksi ini
              </span>
            </div>
          </div>
        </section>

        {/* =========================
            WRITING TIP
        ========================== */}
        <section style={styles.tipCard}>
          <div style={styles.tipIcon}>
            💡
          </div>

          <div style={styles.tipContent}>
            <h3 style={styles.tipTitle}>
              Tidak tahu harus mulai dari mana?
            </h3>

            <p style={styles.tipText}>
              Coba mulai dengan kalimat sederhana:
              <br />
              <span>
                “Hari ini aku merasa... karena...”
              </span>
            </p>
          </div>
        </section>

        {/* =========================
            ACTIONS
        ========================== */}
        <div style={styles.actions}>

          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            style={styles.cancelButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F9FAFB';
              e.currentTarget.style.borderColor = '#D1D5DB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.borderColor = '#E5E7EB';
            }}
          >
            Batal
          </button>

          <button
            type="button"
            onClick={save}
            disabled={loading || !text.trim()}
            style={{
              ...styles.saveButton,
              ...(loading || !text.trim()
                ? styles.saveButtonDisabled
                : {})
            }}
            onMouseEnter={(e) => {
              if (!loading && text.trim()) {
                e.currentTarget.style.transform =
                  'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 12px 28px rgba(16, 185, 129, 0.28)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                'translateY(0)';
              e.currentTarget.style.boxShadow =
                text.trim()
                  ? '0 8px 20px rgba(16, 185, 129, 0.20)'
                  : 'none';
            }}
          >
            {loading ? (
              <>
                <span style={styles.spinner} />
                Menyimpan...
              </>
            ) : (
              <>
                Simpan Refleksi
                <span style={styles.arrow}>→</span>
              </>
            )}
          </button>

        </div>

        <p style={styles.bottomText}>
          Setiap refleksi adalah langkah kecil untuk lebih memahami dirimu.
        </p>

      </main>

      <style>
        {`
          @keyframes reflectraSpin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
          }

          textarea::placeholder {
            color: #A1A1AA;
            opacity: 1;
          }

          button {
            font-family: inherit;
          }

          @media (max-width: 768px) {
            .reflectra-main {
              padding-left: 20px !important;
              padding-right: 20px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

/* ======================================================
   STYLES
====================================================== */

const styles = {
  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at 85% 10%, rgba(167,243,208,0.35), transparent 28%), linear-gradient(145deg, #F8FFFC 0%, #F0FDF9 48%, #FFFFFF 100%)',
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#111827',
    paddingBottom: '60px'
  },

  navbar: {
    height: '76px',
    background: 'rgba(255,255,255,0.88)',
    borderBottom: '1px solid rgba(229,231,235,0.8)',
    backdropFilter: 'blur(16px)',
    position: 'sticky',
    top: 0,
    zIndex: 20
  },

  navInner: {
    maxWidth: '1080px',
    height: '100%',
    margin: '0 auto',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  backButton: {
    border: 'none',
    background: 'transparent',
    color: '#6B7280',
    padding: '10px 12px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },

  backIcon: {
    fontSize: '20px',
    lineHeight: 1
  },

  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '19px',
    fontWeight: '800',
    color: '#111827',
    letterSpacing: '-0.4px'
  },

  brandIcon: {
    width: '38px',
    height: '38px',
    borderRadius: '12px',
    background:
      'linear-gradient(135deg, #A7F3D0, #6EE7B7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(16,185,129,0.16)'
  },

  navSpacer: {
    width: '90px'
  },

  main: {
    maxWidth: '860px',
    margin: '0 auto',
    padding: '56px 32px 0'
  },

  hero: {
    marginBottom: '42px'
  },

  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(236,253,245,0.85)',
    border: '1px solid #D1FAE5',
    color: '#047857',
    padding: '8px 14px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '700',
    marginBottom: '18px'
  },

  badgeDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#10B981',
    boxShadow: '0 0 0 4px rgba(16,185,129,0.10)'
  },

  title: {
    fontSize: '42px',
    lineHeight: '1.12',
    letterSpacing: '-1.4px',
    fontWeight: '850',
    margin: '0 0 16px',
    color: '#111827'
  },

  titleAccent: {
    color: '#059669'
  },

  subtitle: {
    maxWidth: '650px',
    margin: 0,
    color: '#6B7280',
    fontSize: '16px',
    lineHeight: '1.75'
  },

  section: {
    background: '#FFFFFF',
    border: '1px solid rgba(229,231,235,0.85)',
    borderRadius: '24px',
    padding: '26px',
    marginBottom: '22px',
    boxShadow: '0 10px 30px rgba(15,23,42,0.035)'
  },

  sectionHeading: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '20px'
  },

  sectionTitle: {
    fontSize: '17px',
    fontWeight: '750',
    color: '#1F2937',
    margin: '0 0 5px'
  },

  sectionDescription: {
    margin: 0,
    color: '#9CA3AF',
    fontSize: '13px'
  },

  optional: {
    color: '#9CA3AF',
    fontSize: '11px',
    fontWeight: '600',
    background: '#F9FAFB',
    padding: '6px 10px',
    borderRadius: '999px',
    whiteSpace: 'nowrap'
  },

  moodGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(5, minmax(0, 1fr))',
    gap: '10px'
  },

  moodCard: {
    position: 'relative',
    border: '1.5px solid #E5E7EB',
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '17px 10px',
    minHeight: '86px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },

  moodEmoji: {
    fontSize: '25px',
    transition: 'transform 0.2s ease'
  },

  moodLabel: {
    fontSize: '12px',
    fontWeight: '650'
  },

  check: {
    position: 'absolute',
    top: '7px',
    right: '7px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: '800'
  },

  journalCard: {
    background: '#FFFFFF',
    border: '1px solid rgba(229,231,235,0.85)',
    borderRadius: '26px',
    padding: '30px',
    marginBottom: '22px',
    boxShadow: '0 14px 40px rgba(15,23,42,0.05)'
  },

  journalTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
    marginBottom: '22px'
  },

  journalLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    color: '#10B981',
    fontSize: '12px',
    fontWeight: '750',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '7px'
  },

  labelIcon: {
    fontSize: '14px'
  },

  journalTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '750',
    color: '#1F2937'
  },

  dateBadge: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '2px',
    padding: '9px 12px',
    background: '#F8FAFC',
    borderRadius: '12px',
    color: '#9CA3AF',
    fontSize: '10px',
    whiteSpace: 'nowrap'
  },

  textareaWrapper: {
    border: '1.5px solid #E5E7EB',
    borderRadius: '19px',
    background: '#FAFFFD',
    overflow: 'hidden',
    transition: 'all 0.2s ease'
  },

  textarea: {
    width: '100%',
    minHeight: '290px',
    border: 'none',
    outline: 'none',
    resize: 'vertical',
    background: 'transparent',
    padding: '22px',
    color: '#374151',
    fontSize: '15px',
    lineHeight: '1.8',
    fontFamily: 'inherit'
  },

  textareaFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '15px',
    padding: '12px 18px',
    borderTop: '1px solid #F1F5F9',
    background: '#FFFFFF'
  },

  characterCount: {
    fontSize: '11px',
    color: '#A1A1AA'
  },

  privateText: {
    fontSize: '11px',
    color: '#A1A1AA'
  },

  tipCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '18px 20px',
    marginBottom: '26px',
    borderRadius: '18px',
    background:
      'linear-gradient(135deg, #ECFDF5, #F0FDFA)',
    border: '1px solid #D1FAE5'
  },

  tipIcon: {
    width: '42px',
    height: '42px',
    flexShrink: 0,
    borderRadius: '13px',
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '19px',
    boxShadow: '0 4px 10px rgba(16,185,129,0.08)'
  },

  tipContent: {
    minWidth: 0
  },

  tipTitle: {
    margin: '0 0 4px',
    color: '#065F46',
    fontSize: '13px',
    fontWeight: '750'
  },

  tipText: {
    margin: 0,
    color: '#047857',
    fontSize: '12px',
    lineHeight: '1.6'
  },

  actions: {
    display: 'flex',
    gap: '12px'
  },

  cancelButton: {
    flex: '0 0 150px',
    padding: '15px 20px',
    borderRadius: '15px',
    border: '1.5px solid #E5E7EB',
    background: '#FFFFFF',
    color: '#6B7280',
    fontSize: '14px',
    fontWeight: '650',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },

  saveButton: {
    flex: 1,
    padding: '16px 24px',
    border: 'none',
    borderRadius: '15px',
    background:
      'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '750',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 8px 20px rgba(16,185,129,0.20)',
    transition: 'all 0.2s ease'
  },

  saveButtonDisabled: {
    background: '#D1D5DB',
    color: '#9CA3AF',
    cursor: 'not-allowed',
    boxShadow: 'none'
  },

  arrow: {
    fontSize: '18px',
    lineHeight: 1
  },

  spinner: {
    width: '17px',
    height: '17px',
    border: '2px solid rgba(255,255,255,0.45)',
    borderTopColor: '#FFFFFF',
    borderRadius: '50%',
    animation: 'reflectraSpin 0.8s linear infinite'
  },

  bottomText: {
    textAlign: 'center',
    margin: '22px 0 0',
    color: '#A1A1AA',
    fontSize: '11px'
  }
};