"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: { email: string } | null;
  loading: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: () => {},
  signOut: () => {},
});

const AUTH_COOKIE_NAME = 'kickstartu-auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = Cookies.get(AUTH_COOKIE_NAME);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
        console.error("Failed to parse user from cookie", error);
        Cookies.remove(AUTH_COOKIE_NAME);
    }
    setLoading(false);
  }, []);

  const signIn = (email: string) => {
    const newUser = { email };
    Cookies.set(AUTH_COOKIE_NAME, JSON.stringify(newUser), { expires: 7 }); // Expires in 7 days
    setUser(newUser);
  };

  const signOut = () => {
    Cookies.remove(AUTH_COOKIE_NAME);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};