import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/skills': 'Skills',
  '/projects': 'Projects',
  '/experience': 'Experience',
  '/learning': 'Currently Learning',
  '/hackathons': 'Hackathons',
  '/education': 'Education',
  '/contact': 'Contact',
};

export const Breadcrumb: React.FC = () => {
  const { pathname } = useLocation();
  if (pathname === '/') return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '4.5rem',
        left: 0,
        width: '100%',
        zIndex: 998,
        borderBottom: '1px solid var(--border)',
        background: 'var(--navbar-bg)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0.55rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
        }}
      >
        <Link
          to="/"
          style={{
            color: 'var(--text-muted)',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          Home
        </Link>
        <span style={{ opacity: 0.4, fontSize: '0.6rem' }}>›</span>
        <span style={{ color: 'var(--accent)' }}>
          {routeLabels[pathname] ?? 'Page'}
        </span>
      </div>
    </div>
  );
};
