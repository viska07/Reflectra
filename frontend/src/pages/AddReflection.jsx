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
    { id: 'cemas', emoji: '😰', label: 'Cemas', color: '#F59E0B' },
  ];

  const save = async () => {
    if (!text.trim()) {
      alert('Tulis dulu ya');
      return;
    }

    try {
      setLoading(true);
      await reflectionService.create(text);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan refleksi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F7FFFC',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        padding: '20px 40px',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'none',
              border: 'none',
              color: '#6B7280',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '15px',
              fontWeight: '500',
              padding: '8px 12px',
              borderRadius: '10px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Kembali
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#64E2B7',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
              </svg>
            </div>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937' }}>Reflectra</span>
          </div>
          
          <div style={{ width: '100px' }} />
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '48px 40px'
      }}>
        {/* Title Section */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ECFEF7',
            padding: '8px 16px',
            borderRadius: '100px',
            marginBottom: '16px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span style={{ fontSize: '13px', color: '#064E3B', fontWeight: '600' }}>Refleksi Baru</span>
          </div>
          
          <h1 style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#1F2937',
            marginBottom: '12px'
          }}>
            Ceritakan harimu
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#6B7280',
            lineHeight: '1.6'
          }}>
            Tidak perlu sempurna. Cukup jujur dengan perasaanmu.
          </p>
        </div>

        {/* Mood Selection */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
        }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '16px'
          }}>
            Bagaimana perasaanmu hari ini?
          </label>
          
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            {moods.map((mood) => (
              <button
                key={mood.id}
                type="button"
                onClick={() => setSelectedMood(mood.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '14px',
                  border: selectedMood === mood.id ? `2px solid ${mood.color}` : '2px solid #E5E7EB',
                  backgroundColor: selectedMood === mood.id ? '#ECFEF7' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: '20px' }}>{mood.emoji}</span>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: selectedMood === mood.id ? mood.color : '#6B7280'
                }}>
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Text Area Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '28px',
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '16px'
          }}>
            Tuliskan pikiranmu
          </label>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Apa yang kamu rasakan? Apa yang terjadi hari ini? Tuliskan dengan bebas..."
            style={{
              width: '100%',
              height: '280px',
              padding: '20px',
              borderRadius: '16px',
              border: '2px solid #E5E7EB',
              backgroundColor: '#F9FAFB',
              fontSize: '15px',
              lineHeight: '1.7',
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s, background-color 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#64E2B7';
              e.target.style.backgroundColor = '#FFFFFF';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E5E7EB';
              e.target.style.backgroundColor = '#F9FAFB';
            }}
          />
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '12px'
          }}>
            <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
              {text.length} karakter
            </span>
            <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
              Tekan tombol di bawah untuk menyimpan
            </span>
          </div>
        </div>

        {/* Tips Card */}
        <div style={{
          backgroundColor: '#ECFEF7',
          borderRadius: '16px',
          padding: '20px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#DCFCE7',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#064E3B', marginBottom: '6px' }}>
              Tips Menulis Refleksi
            </h4>
            <p style={{ fontSize: '13px', color: '#047857', lineHeight: '1.6' }}>
              Fokus pada perasaan dan pengalaman spesifik. Tanyakan pada diri sendiri: Apa yang membuatku merasa seperti ini? Apa yang bisa kupelajari dari situasi ini?
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '16px'
        }}>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            style={{
              flex: 1,
              padding: '18px 24px',
              backgroundColor: 'transparent',
              border: '2px solid #E5E7EB',
              borderRadius: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              color: '#6B7280',
              fontSize: '16px',
              transition: 'all 0.2s'
            }}
          >
            Batal
          </button>
          
          <button
            type="button"
            onClick={save}
            disabled={loading || !text.trim()}
            style={{
              flex: 2,
              padding: '18px 32px',
              backgroundColor: loading || !text.trim() ? '#D1D5DB' : '#64E2B7',
              border: 'none',
              borderRadius: '16px',
              fontWeight: '700',
              cursor: loading || !text.trim() ? 'not-allowed' : 'pointer',
              color: loading || !text.trim() ? '#9CA3AF' : '#064E3B',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: loading || !text.trim() ? 'none' : '0 8px 24px rgba(100, 226, 183, 0.4)',
              transition: 'all 0.2s'
            }}
          >
            {loading ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Menyimpan...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Simpan Refleksi
              </>
            )}
          </button>
        </div>
      </main>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}