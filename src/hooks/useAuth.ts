// src/hooks/useAuth.ts

import { createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';

// 1. Pindahkan semua Tipe Data ke sini
export type ProfileData = {
  username?: string | null;
  full_name?: string | null;
  role?: string | null;
  institution?: string | null;
  major?: string | null;
  domicile?: string | null;
} | null;

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  profile: ProfileData;
  profileComplete: boolean;
  refreshProfile: () => Promise<void>;
};

// 2. Pindahkan pembuatan Konteks ke sini
export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  profile: null,
  profileComplete: false,
  refreshProfile: async () => {},
});

// 3. Hook untuk menggunakan konteks tetap di sini
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};