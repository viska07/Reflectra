import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      number: '01',
      icon: '✦',
      title: 'Tulis dengan bebas',
      description:
        'Tuangkan pikiran, perasaan, dan pengalamanmu ke dalam ruang pribadi yang nyaman.',
    },
    {
      number: '02',
      icon: '◌',
      title: 'Pahami emosimu',
      description:
        'Reflectra membantu membaca pola emosional dari setiap refleksi yang kamu tulis.',
    },
    {
      number: '03',
      icon: '↗',
      title: 'Temukan insight',
      description:
        'Dapatkan insight sederhana untuk membantumu memahami dirimu dengan lebih baik.',
    },
  ];

  return (
    <div className="landing-page">

      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <header className="landing-navbar">
        <div className="nav-inner">

          <button
            className="brand"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            type="button"
          >
            <span className="brand-mark">
              ◔
            </span>

            <span className="brand-name">
              Reflectra
            </span>
          </button>

          <nav className="nav-links">
            <a href="#features">
              Fitur
            </a>

            <a href="#how-it-works">
              Cara Kerja
            </a>

            <button
              type="button"
              className="nav-login"
              onClick={() => navigate('/login')}
            >
              Masuk
            </button>
          </nav>

        </div>
      </header>


      {/* =====================================================
          HERO
      ===================================================== */}
      <main>

        <section className="hero-section">

          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="hero-inner">

            {/* LEFT */}
            <div className="hero-content">

              <div className="hero-badge">
                <span className="badge-dot" />
                Ruang refleksi pribadimu
              </div>

              <h1>
                Kenali dirimu,
                <span>
                  lebih dalam.
                </span>
              </h1>

              <p className="hero-description">
                Sebuah ruang tenang untuk menulis, memahami perasaan,
                dan menemukan insight dari setiap perjalanan yang kamu lalui.
              </p>

              <div className="hero-actions">

                <button
                  type="button"
                  className="primary-button"
                  onClick={() => navigate('/login')}
                >
                  Mulai Menulis

                  <span className="button-arrow">
                    →
                  </span>
                </button>

                <a
                  href="#features"
                  className="secondary-link"
                >
                  Jelajahi Reflectra
                </a>

              </div>

              <div className="hero-meta">

                <div className="meta-item">
                  <strong>100%</strong>
                  <span>Pribadi</span>
                </div>

                <div className="meta-divider" />

                <div className="meta-item">
                  <strong>AI</strong>
                  <span>Insight</span>
                </div>

                <div className="meta-divider" />

                <div className="meta-item">
                  <strong>Free</strong>
                  <span>Selamanya</span>
                </div>

              </div>

            </div>


            {/* RIGHT VISUAL */}
            <div className="hero-visual">

              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />

              <div className="reflection-window">

                <div className="window-header">

                  <div className="window-dots">
                    <span />
                    <span />
                    <span />
                  </div>

                  <span className="window-title">
                    My Reflection
                  </span>

                  <span className="window-date">
                    Today
                  </span>

                </div>


                <div className="reflection-body">

                  <div className="mood-row">

                    <div className="mood-icon">
                      ☺
                    </div>

                    <div>
                      <span className="mood-label">
                        Feeling good
                      </span>

                      <span className="mood-date">
                        A moment of gratitude
                      </span>
                    </div>

                  </div>


                  <div className="reflection-lines">

                    <span>
                      Today I finally had some time
                    </span>

                    <span>
                      to slow down and appreciate
                    </span>

                    <span>
                      the little things around me...
                    </span>

                  </div>


                  <div className="insight-card">

                    <div className="insight-icon">
                      ✦
                    </div>

                    <div>
                      <span className="insight-label">
                        REFLECTRA INSIGHT
                      </span>

                      <p>
                        Gratitude can help you notice
                        positive moments more often.
                      </p>
                    </div>

                  </div>

                </div>

              </div>


              <div className="floating-card floating-card-top">

                <span className="floating-icon">
                  ✦
                </span>

                <div>
                  <strong>
                    Daily Insight
                  </strong>

                  <small>
                    Keep reflecting
                  </small>
                </div>

              </div>


              <div className="floating-card floating-card-bottom">

                <div className="mini-avatar">
                  ☺
                </div>

                <div>
                  <strong>
                    You're doing great
                  </strong>

                  <small>
                    Keep going today
                  </small>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            INTRO / FEATURES
        ===================================================== */}
        <section
          className="features-section"
          id="features"
        >

          <div className="section-container">

            <div className="section-heading">

              <span className="section-eyebrow">
                WHY REFLECTRA
              </span>

              <h2>
                Ruang kecil untuk 
                <span>
                  memahami diri.
                </span>
              </h2>

              <p>
                Tidak perlu selalu mencari jawaban dari luar.
                Terkadang, jawabannya muncul ketika kita memberi
                waktu untuk mendengarkan diri sendiri.
              </p>

            </div>


            <div className="feature-grid">

              {features.map((feature) => (
                <article
                  className="feature-card"
                  key={feature.number}
                >

                  <div className="feature-top">

                    <span className="feature-number">
                      {feature.number}
                    </span>

                    <span className="feature-icon">
                      {feature.icon}
                    </span>

                  </div>

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.description}
                  </p>

                  <div className="feature-line" />

                </article>
              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            HOW IT WORKS
        ===================================================== */}
        <section
          className="how-section"
          id="how-it-works"
        >

          <div className="section-container">

            <div className="how-layout">

              <div className="how-intro">

                <span className="section-eyebrow">
                  SIMPLE PROCESS
                </span>

                <h2>
                  Refleksi yang
                  <span>
                    sederhana.
                  </span>
                </h2>

                <p>
                  Mulai dari satu kalimat sederhana.
                  Biarkan Reflectra membantumu melihat
                  pengalamanmu dari perspektif yang berbeda.
                </p>

                <button
                  type="button"
                  className="outline-button"
                  onClick={() => navigate('/login')}
                >
                  Mulai Refleksi
                  <span>→</span>
                </button>

              </div>


              <div className="steps">

                <div className="step">

                  <div className="step-number">
                    01
                  </div>

                  <div>
                    <h3>
                      Tulis
                    </h3>

                    <p>
                      Ceritakan apa yang sedang kamu rasakan
                      tanpa perlu takut dihakimi.
                    </p>
                  </div>

                </div>


                <div className="step">

                  <div className="step-number">
                    02
                  </div>

                  <div>
                    <h3>
                      Reflect
                    </h3>

                    <p>
                      Reflectra membaca pola emosi dari
                      tulisan refleksimu.
                    </p>
                  </div>

                </div>


                <div className="step">

                  <div className="step-number">
                    03
                  </div>

                  <div>
                    <h3>
                      Understand
                    </h3>

                    <p>
                      Temukan insight yang bisa membantumu
                      memahami perjalananmu.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            CTA
        ===================================================== */}
        <section className="cta-section">

          <div className="cta-container">

            <div className="cta-decoration cta-decoration-one" />
            <div className="cta-decoration cta-decoration-two" />

            <div className="cta-content">

              <span className="cta-eyebrow">
                YOUR JOURNEY STARTS HERE
              </span>

              <h2>
                Luangkan waktu
                <br />
                untuk dirimu sendiri.
              </h2>

              <p>
                Satu refleksi kecil hari ini bisa menjadi
                langkah besar untuk mengenal dirimu.
              </p>

              <button
                type="button"
                className="cta-button"
                onClick={() => navigate('/login')}
              >
                Mulai Sekarang
                <span>
                  →
                </span>
              </button>

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="landing-footer">

        <div className="footer-inner">

          <div className="footer-brand">

            <span className="brand-mark small">
              ◔
            </span>

            <span>
              Reflectra
            </span>

          </div>

          <p>
            © 2026 Reflectra. A space to understand yourself.
          </p>

        </div>

      </footer>

    </div>
  );
}