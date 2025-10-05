import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-muted/60 dark:bg-slate-900/80 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="GenZ Resilience logo" className="w-10 h-10 rounded-md object-cover" />
            <div>
              <div className="font-semibold text-foreground">test<span style={{ color: 'hsl(var(--primary))' }}>GenZ</span>.com</div>
              <div className="text-sm text-muted-foreground">Helping learners build resilience</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <nav className="flex gap-4">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link to="/test" className="text-sm text-muted-foreground hover:text-foreground">
                Take Test
              </Link>
              <Link to="/results" className="text-sm text-muted-foreground hover:text-foreground">
                Results
              </Link>
            </nav>

            <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} testGenZ.com. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
