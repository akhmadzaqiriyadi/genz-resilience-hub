import { useState } from "react";
import { Link } from "react-router-dom";

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
  >
    {children}
  </Link>
);

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-40 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">
                GR
              </div>
              <span className="text-lg font-semibold text-foreground">GenZ Resilience</span>
            </Link>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-4">
            <Link className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground" to="/">
              Home
            </Link>
            <Link className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground" to="/test">
              Take Test
            </Link>
            <Link className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground" to="/results">
              Results
            </Link>
          </nav>

          <div className="flex items-center">
            <div className="hidden md:block">
              <Link to="/test" className="inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium text-primary-foreground bg-primary hover:opacity-95">
                Start
              </Link>
            </div>

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
            <NavLink to="/">Home</NavLink>
            <NavLink to="/test">Take Test</NavLink>
            <NavLink to="/results">Results</NavLink>
            <div className="px-3 py-2">
              <Link to="/test" className="w-full inline-flex justify-center items-center px-4 py-2 border rounded-md text-sm font-medium text-primary-foreground bg-primary">
                Start
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
