import React, { createContext, useContext, ReactNode } from 'react';
import { db } from '@/lib/instantdb';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithEmail: (email: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isLoading, error } = db.useAuth();

  const signInWithEmail = (email: string) => {
    db.auth.sendMagicCode({ email });
  };

  const signOut = () => {
    db.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user as User | null,
        isLoading,
        signInWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
