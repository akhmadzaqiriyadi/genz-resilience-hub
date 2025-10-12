// src/components/admin/Sidebar.tsx

import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Home, History } from "lucide-react";
import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  const location = useLocation();

  const navLinks = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/users", icon: Users, label: "Pengguna" },
    { to: "/admin/test-history", icon: History, label: "Riwayat Tes" }, 
    { to: "/", icon: Home, label: "Kembali ke Situs" },
  ];

  return (
    <aside className="w-64 bg-background border-r p-6 flex-col hidden md:flex">
      <div className="flex items-center gap-2 mb-8">
        <img src="/images/logo.png" alt="Logo" className="w-8 h-8 rounded-md" />
        <span className="text-lg font-semibold">Admin Panel</span>
      </div>
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              location.pathname === link.to && "bg-muted text-primary"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;