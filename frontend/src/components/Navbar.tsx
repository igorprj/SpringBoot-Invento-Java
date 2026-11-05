import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const { userEmail, userRole, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand-wrapper">
          <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
            <h1>Invento</h1>
            <span className="badge">Estoque</span>
          </Link>
          <button
            type="button"
            className="navbar-toggle-btn"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        <div className={`navbar-collapse ${mobileMenuOpen ? 'open' : ''}`}>
          <nav className="nav-links">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/products"
              className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Produtos
            </Link>
          </nav>

          <div className="navbar-user">
            <div className="user-info">
              <span className="user-email">{userEmail}</span>
              <span className="user-role">{userRole || 'USER'}</span>
            </div>
            <button
              onClick={() => {
                closeMobileMenu();
                logout();
              }}
              className="btn-secondary"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
