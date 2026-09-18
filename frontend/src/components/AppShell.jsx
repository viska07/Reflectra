import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AppShell({ children }) {
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const displayName = user?.name || 'Pengguna';

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.logoArea}>
            <div style={styles.logoMark}>
              R
            </div>

            <div>
              <div style={styles.logoText}>Reflectra</div>
              <div style={styles.logoSubtext}>Your reflection space</div>
            </div>
          </div>

          <nav style={styles.navigation}>
            <NavLink
              to="/dashboard"
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {})
              })}
            >
              <span style={styles.navIcon}>⌂</span>
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/reflections"
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {})
              })}
            >
              <span style={styles.navIcon}>◷</span>
              <span>Riwayat</span>
            </NavLink>

            <NavLink
              to="/add-reflection"
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {})
              })}
            >
              <span style={styles.navIcon}>＋</span>
              <span>Refleksi Baru</span>
            </NavLink>
          </nav>
        </div>

        <div style={styles.sidebarBottom}>
          <div style={styles.profile}>
            <div style={styles.avatar}>
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div style={styles.profileInfo}>
              <span style={styles.profileName}>
                {displayName}
              </span>

              <span style={styles.profileStatus}>
                Personal space
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            <span>↪</span>
            Keluar
          </button>
        </div>
      </aside>

      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    background: '#F6FBF9',
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#17201D'
  },

  sidebar: {
    width: '250px',
    minHeight: '100vh',
    boxSizing: 'border-box',
    background: '#FFFFFF',
    borderRight: '1px solid #E7EFEB',
    padding: '28px 18px',
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
    padding: '2px 10px 34px'
  },

  logoMark: {
    width: '40px',
    height: '40px',
    borderRadius: '13px',
    background: '#DDF8ED',
    color: '#159A6B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: '800'
  },

  logoText: {
    fontSize: '19px',
    fontWeight: '800',
    letterSpacing: '-0.4px'
  },

  logoSubtext: {
    marginTop: '2px',
    fontSize: '10px',
    color: '#9AA8A2'
  },

  navigation: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },

  navItem: {
    textDecoration: 'none',
    color: '#718079',
    padding: '12px 13px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease'
  },

  navItemActive: {
    background: '#E5F9F0',
    color: '#159A6B'
  },

  navIcon: {
    width: '20px',
    textAlign: 'center',
    fontSize: '18px'
  },

  sidebarBottom: {
    borderTop: '1px solid #E7EFEB',
    paddingTop: '18px'
  },

  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '4px 8px 14px'
  },

  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '11px',
    background: '#E8F1ED',
    color: '#159A6B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '800',
    flexShrink: 0
  },

  profileInfo: {
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column'
  },

  profileName: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#27332F',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },

  profileStatus: {
    fontSize: '11px',
    color: '#9AA8A2',
    marginTop: '2px'
  },

  logoutButton: {
    width: '100%',
    border: '1px solid #E7EFEB',
    background: '#FFFFFF',
    color: '#718079',
    borderRadius: '10px',
    padding: '10px 12px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px'
  },

  main: {
    flex: 1,
    minWidth: 0,
    padding: '34px 42px',
    boxSizing: 'border-box'
  }
};