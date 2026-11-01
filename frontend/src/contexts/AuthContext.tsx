import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

interface AuthContextType {
  token: string | null;
  userEmail: string | null;
  userRole: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Função nativa para ler o payload de um JWT sem dependências externas
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('invento_token'));
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('invento_token', token);
      const payload = parseJwt(token);
      if (payload) {
        setUserEmail(payload.sub || null);
        setUserRole(payload.role || null);
      }
    } else {
      localStorage.removeItem('invento_token');
      setUserEmail(null);
      setUserRole(null);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await api.post('/v1/auth/login', { email, password });
    // O backend retorna o token JWT como string pura
    const jwtToken = response.data;
    setToken(jwtToken);
  };

  const register = async (name: string, email: string, password: string) => {
    await api.post('/v1/auth/register', { name, email, password });
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userEmail,
        userRole,
        isAuthenticated: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};
