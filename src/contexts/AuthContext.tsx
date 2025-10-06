// src/contexts/AuthContext.tsx

import { createContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';
// Impor Konteks dan Tipe dari file hook yang sudah kita pisah sebelumnya
import { AuthContext, ProfileData } from '@/hooks/useAuth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData>(null);
  const [profileComplete, setProfileComplete] = useState(false);

  const getProfile = useCallback(async (user: User | null): Promise<ProfileData> => {
    if (!user) {
      console.log('👤 getProfile: No user provided');
      return null;
    }
    console.log('📋 Fetching profile for user:', user.id);
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, full_name, role, institution, major, domicile')
        .eq('id', user.id)
        .single();
      if (error && status !== 406) {
        console.error('❌ Error fetching profile:', error);
        throw error;
      }
      console.log('✅ Profile fetched:', data);
      return data ?? null;
    } catch (err) {
      console.error('❌ Error fetching profile:', err);
      return null;
    }
  }, []);

  // --- LOGIKA UTAMA DIPERBAIKI DI SINI ---
  useEffect(() => {
    let isMounted = true; // Guard untuk mencegah state update setelah unmount
    let lastUserId: string | null = null; // Track user ID untuk mencegah duplicate calls

    const initializeAuth = async () => {
      console.log('🚀 Initializing auth...');
      
      // 1. Cek session yang sudah ada saat aplikasi pertama kali dimuat
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      console.log('📱 Initial session check:', initialSession ? 'Found' : 'Not found');
      
      if (initialSession && isMounted) {
        console.log('👤 User from session:', initialSession.user.email);
        lastUserId = initialSession.user.id;
        const userProfile = await getProfile(initialSession.user);
        
        if (isMounted) {
          setSession(initialSession);
          setUser(initialSession.user);
          setProfile(userProfile);
          const isComplete = Boolean(userProfile && userProfile.username && userProfile.full_name);
          setProfileComplete(isComplete);
          console.log('✅ Profile complete:', isComplete);
        }
      }
      
      // 2. Selesai loading awal
      if (isMounted) {
        setLoading(false);
        console.log('✅ Initial auth check complete');
      }

      // 3. Setup listener untuk perubahan auth di masa depan
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('🔄 Auth state changed:', event, session ? 'Session exists' : 'No session');
        
        // Guard: Skip INITIAL_SESSION karena sudah diproses di atas
        if (event === 'INITIAL_SESSION') {
          console.log('⏭️ Skipping INITIAL_SESSION - already processed');
          return;
        }
        
        // Guard: Hanya proses jika user ID berubah atau event penting
        const currentUserId = session?.user?.id ?? null;
        const isSignificantEvent = ['SIGNED_IN', 'SIGNED_OUT', 'USER_UPDATED', 'TOKEN_REFRESHED'].includes(event);
        
        // Skip jika bukan event penting DAN user sama
        if (!isSignificantEvent && currentUserId === lastUserId) {
          console.log('⏭️ Skipping duplicate auth event');
          return;
        }
        
        // Skip jika user ID sama (mencegah duplicate processing)
        if (currentUserId === lastUserId && event !== 'USER_UPDATED') {
          console.log('⏭️ Skipping - same user ID');
          return;
        }
        
        lastUserId = currentUserId;
        const currentUser = session?.user ?? null;
        const userProfile = await getProfile(currentUser);

        if (isMounted) {
          setSession(session);
          setUser(currentUser);
          setProfile(userProfile);
          const isComplete = Boolean(userProfile && userProfile.username && userProfile.full_name);
          setProfileComplete(isComplete);
          console.log('✅ Auth state updated, profile complete:', isComplete);
        }
      });

      return () => {
        isMounted = false;
        subscription.unsubscribe();
      };
    };

    initializeAuth();
  }, [getProfile]);
  // --- AKHIR PERBAIKAN ---

  const refreshProfile = useCallback(async () => {
    if (user) {
      console.log('🔄 Refreshing profile for:', user.email);
      setLoading(true);
      const userProfile = await getProfile(user);
      setProfile(userProfile);
      setProfileComplete(Boolean(userProfile && userProfile.username && userProfile.full_name));
      setLoading(false);
      console.log('✅ Profile refreshed');
    }
  }, [user, getProfile]);

  return (
    <AuthContext.Provider value={{ session, user, loading, profile, profileComplete, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};