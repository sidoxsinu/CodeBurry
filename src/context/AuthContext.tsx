import React, { createContext, useContext, useState, useEffect } from 'react';

import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  hasRole: (role: User['role']) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Attempt to load session from API
    (async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (e) {
        // ignore
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const msg = (await res.json())?.message || 'Login failed';
        throw new Error(msg);
      }
      const data = await res.json();
      setUser(data.user);
    } catch (e: any) {
      setError(e?.message || 'Login failed');
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password })
      });
      if (!res.ok) {
        const msg = (await res.json())?.message || 'Registration failed';
        throw new Error(msg);
      }
      const data = await res.json();
      setUser(data.user);
    } catch (e: any) {
      setError(e?.message || 'Registration failed');
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
  };

  const hasRole = (role: User['role']) => {
    return !!user && user.role === role;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isLoading,
      error,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};