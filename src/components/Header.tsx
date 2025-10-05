// src/components/Header.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";

// Komponen UI dari shadcn
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";

const NavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode, onClick?: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
  >
    {children}
  </Link>
);

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, session } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getInitials = (email: string | undefined) => {
    if (!email) return "??";
    return email.substring(0, 2).toUpperCase();
  };

  const closeMobileMenu = () => setOpen(false);

  return (
    <header className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-40 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img src="/images/logo.png" alt="GenZ Resilience logo" className="w-10 h-10 rounded-md object-cover shadow-md" />
              <span className="text-lg font-semibold text-foreground">
                test<span className="ml-1" style={{ color: 'hsl(var(--primary))' }}>GenZ</span>.com
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-4">
            <Link className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground" to="/">
              Home
            </Link>
            <Link className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground" to="/test">
              Take Test
            </Link>
          </nav>

          {/* Auth buttons / User Menu */}
          <div className="flex items-center">
            <div className="hidden md:block">
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(user?.email)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs leading-none text-muted-foreground">Signed in as</p>
                        <p className="text-sm font-medium leading-none truncate">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" asChild>
                        <Link to="/login">Masuk</Link>
                    </Button>
                    <Button asChild>
                        <Link to="/register">Daftar</Link>
                    </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-white dark:bg-slate-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink to="/" onClick={closeMobileMenu}>Home</NavLink>
            <NavLink to="/test" onClick={closeMobileMenu}>Take Test</NavLink>
            <div className="px-3 py-2">
              {session ? (
                 <Button onClick={() => { handleLogout(); closeMobileMenu(); }} className="w-full justify-center">Log Out</Button>
              ) : (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" asChild className="w-full justify-center">
                        <Link to="/login" onClick={closeMobileMenu}>Masuk</Link>
                    </Button>
                    <Button asChild className="w-full justify-center">
                        <Link to="/register" onClick={closeMobileMenu}>Daftar</Link>
                    </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
