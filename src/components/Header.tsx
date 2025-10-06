// src/components/Header.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"; // <-- PERBAIKAN DI SINI
import { supabase } from "@/lib/supabaseClient";

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
import { LogOut, User as UserIcon, History as HistoryIcon, LayoutDashboard } from "lucide-react";

const NavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void; }) => (
  <Link to={to} onClick={onClick} className="block px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-all duration-200 active:scale-95">
    {children}
  </Link>
);

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, session, profile } = useAuth(); // Menggunakan profile dari useAuth
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
          <div className="flex items-center min-w-0 flex-1">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
              <img src="/images/logo.png" alt="GenZ Resilience logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-md object-cover shadow-md flex-shrink-0" />
              <span className="text-base sm:text-lg font-semibold text-foreground truncate">
                test<span className="ml-1" style={{ color: "hsl(var(--primary))" }}>GenZ</span>
                <span className="hidden xs:inline">.com</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-4 absolute left-1/2 transform -translate-x-1/2">
            <Link className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" to="/">Home</Link>
            <Link className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" to="/about">About Us</Link>
            <Link className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" to="/pre-test">Take Test</Link>
          </nav>

          <div className="flex items-center flex-1 justify-end">
            <div className="hidden md:block">
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">{getInitials(user?.email)}</AvatarFallback>
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
                    <DropdownMenuItem onClick={() => navigate("/profile")}><UserIcon className="mr-2 h-4 w-4" /><span>Profile</span></DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/history")}><HistoryIcon className="mr-2 h-4 w-4" /><span>Riwayat Tes</span></DropdownMenuItem>
                    {profile?.role === 'admin' && (
                        <DropdownMenuItem onClick={() => navigate("/admin")} className="text-primary focus:text-primary font-semibold">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Admin Dashboard</span>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" /><span>Log out</span></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" asChild><Link to="/login">Masuk</Link></Button>
                  <Button asChild><Link to="/register">Daftar</Link></Button>
                </div>
              )}
            </div>

            <div className="md:hidden">
              <button onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 touch-target active:scale-95">
                <svg className={`h-6 w-6 transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {open ? (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />) : (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />)}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm mobile-menu-enter">
          <div className="px-2 pt-2 pb-4 space-y-1">
            <NavLink to="/" onClick={closeMobileMenu}>Home</NavLink>
            <NavLink to="/about" onClick={closeMobileMenu}>About Us</NavLink>
            <NavLink to="/test" onClick={closeMobileMenu}>Take Test</NavLink>
            {session && (
              <>
                <div className="border-t border-border my-2"></div>
                <NavLink to="/profile" onClick={closeMobileMenu}>Profile</NavLink>
                <NavLink to="/history" onClick={closeMobileMenu}>Riwayat Tes</NavLink>
                 {profile?.role === 'admin' && (
                    <NavLink to="/admin" onClick={closeMobileMenu}>Admin Dashboard</NavLink>
                 )}
              </>
            )}
            <div className="px-3 py-3 border-t border-border mt-3">
              {session ? (
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">Signed in as <span className="font-medium text-foreground">{user?.email}</span></div>
                  <Button onClick={() => { handleLogout(); closeMobileMenu(); }} className="w-full justify-center" variant="destructive">Log Out</Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button variant="ghost" asChild className="w-full justify-center"><Link to="/login" onClick={closeMobileMenu}>Masuk</Link></Button>
                  <Button asChild className="w-full justify-center"><Link to="/register" onClick={closeMobileMenu}>Daftar</Link></Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}