// src/components/auth/ProtectedRoute.tsx

import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom"; // 1. Impor useLocation
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const ProtectedRoute = () => {
  const { user, loading: authLoading } = useAuth();
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);
  const location = useLocation(); // 2. Dapatkan lokasi saat ini

  useEffect(() => {
    if (authLoading || !user) {
      setProfileLoading(false);
      return;
    }
    
    setProfileLoading(true);

    const checkProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("username, full_name")
          .eq("id", user.id)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = baris tidak ditemukan
          throw error;
        }

        if (data && data.username && data.full_name) {
          setProfileComplete(true);
        } else {
          setProfileComplete(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfileComplete(false);
      } finally {
        setProfileLoading(false);
      }
    };

    checkProfile();
  }, [user, authLoading]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // 3. Tambahkan kondisi untuk mencegah redirect loop
  if (!profileComplete && location.pathname !== '/profile') {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
