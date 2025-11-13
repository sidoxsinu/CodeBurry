import React, { createContext, useContext, useState } from 'react';

import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email?: string, password?: string) => Promise<void>;
  register: (name?: string, email?: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  hasRole: (role: User['role']) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoUser: User = {
  id: 'demo-user',
  name: 'Demo Learner',
  email: 'demo@codeburry.com',
  waterDrops: 750,
  level: 5,
  joinedAt: new Date('2024-01-01T00:00:00Z'),
  garden: [
    {
      id: 'tree-1',
      name: 'Front-End Foundations',
      category: 'Web Development',
      growthStage: 'tree',
      plantedAt: new Date('2024-02-10T00:00:00Z'),
      waterDropsInvested: 180
    },
    {
      id: 'tree-2',
      name: 'API Integrations',
      category: 'Software Engineering',
      growthStage: 'sapling',
      plantedAt: new Date('2024-03-18T00:00:00Z'),
      waterDropsInvested: 95
    }
  ],
  role: 'admin'
};

const normaliseName = (input?: string) => {
  if (!input) return demoUser.name;
  const trimmed = input.trim();
  if (!trimmed) return demoUser.name;
  return trimmed
    .split(' ')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const createAuthenticatedUser = (overrides?: Partial<User>): User => {
  return {
    ...demoUser,
    ...overrides,
    joinedAt: overrides?.joinedAt ?? demoUser.joinedAt,
    garden: overrides?.garden ?? demoUser.garden
  };
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(demoUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResolveUser = (overrides?: Partial<User>) => {
    setUser(createAuthenticatedUser(overrides));
  };

  const login = async (email?: string, password?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      handleResolveUser({
        email: email || demoUser.email,
        name: normaliseName(email?.split('@')[0] ?? demoUser.name)
      });
    } catch (e: any) {
      setError(e?.message ?? 'Unable to start session');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name?: string, email?: string, password?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      handleResolveUser({
        name: normaliseName(name ?? demoUser.name),
        email: email || demoUser.email
      });
    } catch (e: any) {
      setError(e?.message ?? 'Unable to create session');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setError(null);
  };

  const hasRole = (role: User['role']) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.role === role;
  };

  const contextValue: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading,
    error,
    hasRole
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};