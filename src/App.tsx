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
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PreTest from "./pages/PreTest";
import Test from "./pages/Test";
import Loading from "./pages/Loading";
import Results from "./pages/Results";
import Profile from "./pages/Profile";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";

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
            <Route path="/about" element={<About />} />

            {/* Rute yang dilindungi: hanya bisa diakses jika profil lengkap */}
            <Route element={<ProtectedRoute />}>
              <Route path="/pre-test" element={<PreTest />} />
              <Route path="/test" element={<Test />} />
              <Route path="/results" element={<Results />} />
              <Route path="/history" element={<History />} />
            </Route>

            {/* Halaman profil berada di sini, di dalam MainLayout tapi di luar ProtectedRoute */}
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* Rute tanpa Header (full screen) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          {/* Rute Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
