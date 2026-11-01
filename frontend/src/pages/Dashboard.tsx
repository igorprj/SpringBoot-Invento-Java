import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { userEmail, userRole, logout } = useAuth();

  return (
    <div className="dashboard-layout">
      <header className="navbar">
        <div className="navbar-brand">
          <h1>Invento</h1>
          <span className="badge">Estoque</span>
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

      <main className="dashboard-content">
        <div className="welcome-banner">
          <h2>Bem-vindo ao Invento! 👋</h2>
          <p>
            Você está conectado com sucesso ao backend Spring Boot utilizando autenticação JWT.
          </p>
        </div>

        <div className="dashboard-cards-grid">
          <div className="stat-card">
            <span className="stat-label">Sessão Autenticada</span>
            <span className="stat-value active">Online</span>
            <p className="stat-desc">Token JWT ativo e validado no cliente</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Perfil de Acesso</span>
            <span className="stat-value">{userRole || 'USER'}</span>
            <p className="stat-desc">Permissões de gerenciamento de estoque</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Próxima Etapa</span>
            <span className="stat-value">Produtos</span>
            <p className="stat-desc">Listagem, cadastro e controle de estoque</p>
          </div>
        </div>
      </main>
    </div>
  );
};
