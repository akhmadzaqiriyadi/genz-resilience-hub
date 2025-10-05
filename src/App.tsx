// src/App.tsx

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts & Guards
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Test from "./pages/Test";
import Loading from "./pages/Loading";
import Results from "./pages/Results";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Rute dengan Header */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            
            {/* Rute yang dilindungi: hanya bisa diakses jika profil lengkap */}
            <Route element={<ProtectedRoute />}>
              <Route path="/test" element={<Test />} />
              <Route path="/results" element={<Results />} />
            </Route>

            {/* Halaman profil berada di sini, di dalam MainLayout tapi di luar ProtectedRoute */}
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Rute tanpa Header (full screen) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rute Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
