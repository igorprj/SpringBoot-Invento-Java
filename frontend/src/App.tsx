import { useState } from 'react';
import { api } from './api/client';
import './App.css';

export function App() {
  const [status, setStatus] = useState<string>('Clique no botão para testar a conexão com o backend');
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState<boolean | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setStatus('Conectando ao backend em http://localhost:8080...');
    try {
      // Fazemos uma requisição OPTIONS ou tentamos acessar uma rota para verificar o CORS e conectividade
      await api.options('/v1/auth/login');
      setStatus('Conexão com o backend estabelecida com sucesso! CORS ativo e respondendo.');
      setConnected(true);
    } catch (err: any) {
      if (err.response) {
        setStatus(`Backend respondeu com status ${err.response.status}. Servidor online!`);
        setConnected(true);
      } else {
        setStatus(`Falha na conexão: ${err.message}. Verifique se o backend está rodando na porta 8080.`);
        setConnected(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Invento - Gestão de Estoque</h1>
        <p className="subtitle">Frontend React + TypeScript integrado com Spring Boot</p>
      </header>

      <main className="card">
        <h2>Etapa 1: Diagnóstico de Conexão</h2>
        <p className="description">
          Esta tela inicial valida a comunicação entre o Vite (porta 5173) e a API Spring Boot (porta 8080) através do Axios.
        </p>

        <button 
          onClick={testConnection} 
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Testando...' : 'Testar Conexão com a API'}
        </button>

        <div className={`status-box ${connected === true ? 'success' : connected === false ? 'error' : 'neutral'}`}>
          <strong>Status:</strong> {status}
        </div>
      </main>
    </div>
  );
}

export default App;
