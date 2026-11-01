import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const { userEmail, userRole, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <h1>Invento</h1>
          <span className="badge">Estoque</span>
        </Link>
        <nav className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>
            Produtos
          </Link>
        </nav>
      </div>

      <div className="navbar-user">
        <div className="user-info">
          <span className="user-email">{userEmail}</span>
          <span className="user-role">{userRole || 'USER'}</span>
        </div>
        <button onClick={logout} className="btn-secondary">
          Sair
        </button>
      </div>
    </header>
  );
};
