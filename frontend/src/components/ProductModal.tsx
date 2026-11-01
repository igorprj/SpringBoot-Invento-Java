import React, { useState } from 'react';
import { ProductRequestDTO } from '../types/product';
import { api } from '../api/client';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onProductCreated }) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [costPrice, setCostPrice] = useState<number | ''>('');
  const [salePrice, setSalePrice] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<number | ''>(0);
  const [minimumStock, setMinimumStock] = useState<number | ''>(5);
  const [maximumStock, setMaximumStock] = useState<number | ''>(100);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload: ProductRequestDTO = {
      name,
      sku,
      description,
      costPrice: Number(costPrice),
      salePrice: Number(salePrice),
      quantity: Number(quantity),
      minimumStock: Number(minimumStock),
      maximumStock: Number(maximumStock),
      active: true,
    };

    try {
      await api.post('/v1/products', payload);
      onProductCreated();
      onClose();
      // Limpa os campos
      setName('');
      setSku('');
      setDescription('');
      setCostPrice('');
      setSalePrice('');
      setQuantity(0);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao salvar o produto. Verifique os campos.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Novo Produto</h3>
          <button type="button" onClick={onClose} className="modal-close-btn">
            &times;
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="form-group col-span-2">
              <label>Nome do Produto *</label>
              <input
                type="text"
                placeholder="Ex: Mouse Sem Fio 2.4GHz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>SKU (Código Único) *</label>
              <input
                type="text"
                placeholder="Ex: MOU-SEM-001"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Quantidade Inicial *</label>
              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label>Preço de Custo (R$) *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value === '' ? '' : Number(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label>Preço de Venda (R$) *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value === '' ? '' : Number(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label>Estoque Mínimo *</label>
              <input
                type="number"
                min="0"
                value={minimumStock}
                onChange={(e) => setMinimumStock(e.target.value === '' ? '' : Number(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label>Estoque Máximo *</label>
              <input
                type="number"
                min="1"
                value={maximumStock}
                onChange={(e) => setMaximumStock(e.target.value === '' ? '' : Number(e.target.value))}
                required
              />
            </div>

            <div className="form-group col-span-2">
              <label>Descrição</label>
              <textarea
                rows={3}
                placeholder="Detalhes ou especificações técnicas do produto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary" disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Cadastrar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
