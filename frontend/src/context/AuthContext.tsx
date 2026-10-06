'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  isGuest: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  loginAsGuest: () => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vastrie_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const loginAsGuest = () => {
    const guestUser: UserProfile = { name: 'Guest Client', email: '', isGuest: true };
    setUser(guestUser);
    localStorage.setItem('vastrie_user', JSON.stringify(guestUser));
  };

  const login = (email: string, name?: string) => {
    const regularUser: UserProfile = {
      name: name || email.split('@')[0],
      email,
      isGuest: false,
    };
    setUser(regularUser);
    localStorage.setItem('vastrie_user', JSON.stringify(regularUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vastrie_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginAsGuest,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
