import React, { useState, useEffect } from 'react';
import { ProductResponseDTO } from '../types/product';
import { api } from '../api/client';
import { Navbar } from '../components/Navbar';
import { ProductModal } from '../components/ProductModal';

export const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductResponseDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<ProductResponseDTO[]>('/v1/products');
      setProducts(response.data);
    } catch (err: any) {
      setError('Não foi possível carregar os produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    const confirm = window.confirm(`Tem certeza que deseja excluir o produto "${name}"?`);
    if (!confirm) return;

    try {
      await api.delete(`/v1/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert('Erro ao excluir o produto.');
    }
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard-content">
        <div className="page-header">
          <div>
            <h2>Inventário de Produtos</h2>
            <p>Gerencie o estoque, preços e disponibilidade dos itens</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            + Novo Produto
          </button>
        </div>

        <div className="table-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar por nome ou SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <span className="items-count">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </span>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="table-container">
          {loading ? (
            <div className="loading-state">Carregando inventário...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum produto cadastrado ou correspondente à busca.</p>
              <button onClick={() => setIsModalOpen(true)} className="btn-secondary">
                Cadastrar o primeiro produto
              </button>
            </div>
          ) : (
            <table className="products-table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Produto</th>
                  <th>Preço Custo</th>
                  <th>Preço Venda</th>
                  <th>Estoque</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => {
                  const isOutOfStock = p.quantity === 0;
                  const isLowStock = p.quantity <= p.minimumStock;

                  return (
                    <tr key={p.id}>
                      <td className="sku-cell">{p.sku}</td>
                      <td>
                        <div className="product-title">{p.name}</div>
                        {p.description && <div className="product-desc">{p.description}</div>}
                      </td>
                      <td>{formatCurrency(p.costPrice)}</td>
                      <td className="sale-price">{formatCurrency(p.salePrice)}</td>
                      <td>
                        <span className="qty-number">{p.quantity}</span>
                        <span className="qty-limits"> (Mín: {p.minimumStock} / Máx: {p.maximumStock})</span>
                      </td>
                      <td>
                        {isOutOfStock ? (
                          <span className="status-tag danger">Esgotado</span>
                        ) : isLowStock ? (
                          <span className="status-tag warning">Estoque Baixo</span>
                        ) : (
                          <span className="status-tag success">Normal</span>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="btn-danger-outline"
                          title="Excluir produto"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductCreated={fetchProducts}
      />
    </div>
  );
};
