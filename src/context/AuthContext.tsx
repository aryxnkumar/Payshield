import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  role: 'customer' | 'admin';
  memberSince: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  loginAsAdmin: () => void;
  loginAsDemo: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'payshield_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const persist = (u: User | null) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
    setUser(u);
  };

  const login = (email: string, _password: string): boolean => {
    if (!email) return false;
    const isAdmin = email.toLowerCase().includes('admin');
    const u: User = {
      name: isAdmin ? 'Admin User' : 'Rahul Sharma',
      email,
      role: isAdmin ? 'admin' : 'customer',
      memberSince: 'Jan 2026',
    };
    persist(u);
    return true;
  };

  const signup = (name: string, email: string, _password: string): boolean => {
    if (!name || !email) return false;
    const u: User = {
      name,
      email,
      role: 'customer',
      memberSince: 'Sep 2026',
    };
    persist(u);
    return true;
  };

  const logout = () => persist(null);

  const loginAsAdmin = () => {
    persist({ name: 'Admin User', email: 'admin@payshield.com', role: 'admin', memberSince: 'Jan 2026' });
  };

  const loginAsDemo = () => {
    persist({ name: 'Rahul Sharma', email: 'rahul.sharma@email.com', role: 'customer', memberSince: 'Jan 2026' });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loginAsAdmin, loginAsDemo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
