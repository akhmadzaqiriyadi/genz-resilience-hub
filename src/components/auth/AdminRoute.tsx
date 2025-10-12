// src/components/auth/AdminRoute.tsx

import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AdminRoute = () => {
  const { user, profile, loading } = useAuth();

  // 1. Tampilkan loading jika data autentikasi belum siap
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  // 2. Jika tidak ada user atau rolenya bukan admin, lempar ke halaman utama
  if (!user || profile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // 3. Jika lolos, tampilkan halaman yang dituju
  return <Outlet />;
};

export default AdminRoute;