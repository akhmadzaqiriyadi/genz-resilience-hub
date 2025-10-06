// src/components/auth/ProtectedRoute.tsx

import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoute = () => {
  const { user, loading, profileComplete } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!profileComplete && location.pathname !== '/profile') {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;