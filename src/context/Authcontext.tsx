import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Usuario = { id: number; nome: string; nomeUsuario: string; email: string };

type AuthContextType = {
  usuario: Usuario | null;
  login: (u: Usuario, persistir?: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'auth_user';

function lerUsuarioPersistido(): Usuario | null {
  const raw = localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as Usuario; } catch { return null; }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    setUsuario(lerUsuarioPersistido());
  }, []);

  const login = (u: Usuario, persistir = false) => {
    setUsuario(u);
    const data = JSON.stringify(u);
    if (persistir) {
      localStorage.setItem(STORAGE_KEY, data);
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      sessionStorage.setItem(STORAGE_KEY, data);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({ usuario, login, logout }), [usuario]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>');
  return ctx;
}
