import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { PageTransition } from './PageTransition';
import { Breadcrumb } from './Breadcrumb';
import { ScrollToTop } from './ScrollToTop';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/learning', label: 'Learning' },
  { to: '/hackathons', label: 'Hackathons' },
  { to: '/education', label: 'Education' },
  { to: '/contact', label: 'Contact' },
];

export const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggle } = useTheme();

  // Close mobile menu and scroll to top on route change
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <NavLink to="/" className="navbar-logo">
            AYAN<span className="dot">.</span>
          </NavLink>

          {/* Desktop links */}
          <div className="navbar-links">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Theme toggle — always visible */}
            <button
              onClick={toggle}
              className="theme-toggle"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile hamburger — hidden on desktop, visible on mobile */}
            <button
              className="navbar-toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Navigation Menu"
              id="mobile-hamburger"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`navbar-mobile-menu ${isOpen ? 'open' : ''}`}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `navbar-mobile-link${isActive ? ' active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Breadcrumb path indicator */}
      <Breadcrumb />

      {/* Main content with page-transition animation */}
      <main style={{ paddingTop: location.pathname === '/' ? '5rem' : '7rem' }}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      {/* Scroll-to-top floating button */}
      <ScrollToTop />
    </>
  );
};
