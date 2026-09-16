import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F7FFFC',
      fontFamily: 'Inter, system-ui, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 48px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#64E2B7',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
            </svg>
          </div>
          <span style={{ fontSize: '24px', fontWeight: '800', color: '#1F2937' }}>Reflectra</span>
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="#features" style={{ color: '#6B7280', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>Fitur</a>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            style={{
              backgroundColor: 'transparent',
              border: '2px solid #64E2B7',
              padding: '10px 24px',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              color: '#064E3B',
              fontSize: '15px'
            }}
          >
            Masuk
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '80px 48px',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '60px'
      }}>
        <div style={{ flex: 1, maxWidth: '560px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ECFEF7',
            padding: '8px 16px',
            borderRadius: '100px',
            marginBottom: '24px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#10B981',
              borderRadius: '50%'
            }} />
            <span style={{ fontSize: '14px', color: '#064E3B', fontWeight: '600' }}>
              Ruang refleksi pribadimu
            </span>
          </div>
          
          <h1 style={{
            fontSize: '56px',
            fontWeight: '800',
            color: '#1F2937',
            lineHeight: '1.1',
            marginBottom: '24px'
          }}>
            Kenali dirimu
            <br />
            <span style={{ color: '#10B981' }}>lebih dalam</span>
          </h1>
          
          <p style={{
            fontSize: '18px',
            color: '#6B7280',
            lineHeight: '1.7',
            marginBottom: '40px'
          }}>
            Reflectra adalah ruang aman untuk menulis, memahami emosi, 
            dan menemukan insight berharga dari setiap pengalamanmu.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              style={{
                backgroundColor: '#64E2B7',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                color: '#064E3B',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 24px rgba(100, 226, 183, 0.4)'
              }}
            >
              Mulai Menulis
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
            <span style={{ color: '#9CA3AF', fontSize: '14px' }}>Gratis selamanya</span>
          </div>
        </div>
        
        {/* Hero Visual */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{
            width: '100%',
            maxWidth: '480px',
            aspectRatio: '1',
            backgroundColor: '#ECFEF7',
            borderRadius: '32px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '200px',
              height: '200px',
              backgroundColor: '#DCFCE7',
              borderRadius: '50%',
              opacity: 0.6
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-60px',
              left: '-60px',
              width: '280px',
              height: '280px',
              backgroundColor: '#64E2B7',
              borderRadius: '50%',
              opacity: 0.3
            }} />
            
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#FFFFFF',
              padding: '28px',
              borderRadius: '20px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
              width: '320px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px' }}>{"😊"}</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#1F2937' }}>Senang</div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF' }}>Hari ini</div>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.6', marginBottom: '16px' }}>
                Hari ini produktif sekali. Berhasil menyelesaikan proyek dan dapat apresiasi dari tim.
              </p>
              <div style={{
                backgroundColor: '#F7FFFC',
                padding: '12px 16px',
                borderRadius: '12px',
                borderLeft: '3px solid #10B981'
              }}>
                <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '600', marginBottom: '4px' }}>INSIGHT</div>
                <div style={{ fontSize: '13px', color: '#374151' }}>Kerja keras dan kolaborasi membawa hasil positif.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        padding: '80px 48px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '800', color: '#1F2937', marginBottom: '16px' }}>
            Fitur Unggulan
          </h2>
          <p style={{ fontSize: '18px', color: '#6B7280', maxWidth: '500px', margin: '0 auto' }}>
            Semua yang kamu butuhkan untuk perjalanan refleksi diri
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {[
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                  <path d="M9 9l1 0" />
                  <path d="M9 13l6 0" />
                  <path d="M9 17l6 0" />
                </svg>
              ),
              title: 'Tulis Refleksi',
              desc: 'Catat pikiran dan perasaanmu dengan mudah dalam format yang nyaman'
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4 -2 4 -2" />
                  <line x1="9" x2="9.01" y1="9" y2="9" />
                  <line x1="15" x2="15.01" y1="9" y2="9" />
                </svg>
              ),
              title: '',
              desc: ''
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                  <path d="M12 8l0 4l2 2" />
                </svg>
              ),
              title: 'Insight Harian',
              desc: 'Dapatkan pemahaman mendalam tentang pola pikir dan kebiasaanmu'
            }
          ].map((feature, idx) => (
            <div key={idx} style={{
              backgroundColor: '#FFFFFF',
              padding: '36px',
              borderRadius: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#ECFEF7',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937', marginBottom: '12px' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: '1.6' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 48px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: '#064E3B',
          borderRadius: '32px',
          padding: '64px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '300px',
            height: '300px',
            backgroundColor: '#10B981',
            borderRadius: '50%',
            opacity: 0.1
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '250px',
            height: '250px',
            backgroundColor: '#64E2B7',
            borderRadius: '50%',
            opacity: 0.1
          }} />
          
          <h2 style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#FFFFFF',
            marginBottom: '16px',
            position: 'relative'
          }}>
            Siap memulai perjalananmu?
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#A7F3D0',
            marginBottom: '32px',
            position: 'relative'
          }}>
            Bergabung dan mulai mengenal dirimu lebih dalam hari ini.
          </p>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            style={{
              backgroundColor: '#64E2B7',
              border: 'none',
              padding: '18px 40px',
              borderRadius: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              color: '#064E3B',
              fontSize: '17px',
              position: 'relative',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
            }}
          >
            Mulai Sekarang - Gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 48px',
        maxWidth: '1200px',
        margin: '0 auto',
        borderTop: '1px solid #E5E7EB',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#64E2B7',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
            </svg>
          </div>
          <span style={{ fontSize: '16px', fontWeight: '700', color: '#1F2937' }}>Reflectra</span>
        </div>
        <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
          2025 Reflectra. Dibuat dengan cinta.
        </p>
      </footer>
    </div>
  );
}