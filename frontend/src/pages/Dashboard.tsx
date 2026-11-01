import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { ProductResponseDTO } from '../types/product';
import { Navbar } from '../components/Navbar';

export const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<ProductResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await api.get<ProductResponseDTO[]>('/v1/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Erro ao carregar dados do dashboard', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.quantity <= p.minimumStock).length;
  const totalStockValue = products.reduce((acc, p) => acc + p.costPrice * p.quantity, 0);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard-content">
        <div className="welcome-banner">
          <h2>Painel Geral de Inventário 📊</h2>
          <p>
            Visão consolidada do estoque integrado em tempo real com o backend Spring Boot.
          </p>
        </div>

        <div className="dashboard-cards-grid">
          <div className="stat-card">
            <span className="stat-label">Total de Itens</span>
            <span className="stat-value">{loading ? '...' : totalProducts}</span>
            <p className="stat-desc">Produtos cadastrados no catálogo</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Atenção ao Estoque</span>
            <span className={`stat-value ${lowStockProducts > 0 ? 'warning' : 'active'}`}>
              {loading ? '...' : lowStockProducts}
            </span>
            <p className="stat-desc">Itens com quantidade igual ou menor que o mínimo</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Valor Total do Estoque</span>
            <span className="stat-value">{loading ? '...' : formatCurrency(totalStockValue)}</span>
            <p className="stat-desc">Cálculo de custo total dos itens em depósito</p>
          </div>
        </div>

        <div className="quick-actions-card">
          <div className="quick-actions-header">
            <h3>Acesso Rápido</h3>
            <p>Gerencie rapidamente seus itens cadastrados</p>
          </div>
          <div className="quick-actions-buttons">
            <Link to="/products" className="btn-primary">
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
