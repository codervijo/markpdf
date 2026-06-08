import { type ReactNode } from "react";
import { Link, useNavigate, usePathname } from "@/lib/router-shim";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { FileText, LayoutDashboard, Palette, Plus, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/documents", label: "Documents", icon: FileText },
  { to: "/brand-kit", label: "Brand Kit", icon: Palette },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const pathname = usePathname();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-sidebar">
        <Link to="/dashboard" className="flex items-center gap-2 px-5 h-16 border-b border-border">
          <div className="h-6 w-6 rounded-md bg-gradient-brand shadow-glow" />
          <span className="text-base font-semibold tracking-tight">Markpdf</span>
        </Link>
        <div className="px-3 py-4">
          <Button asChild className="w-full justify-start gap-2" size="sm">
            <Link to="/documents/new"><Plus className="h-4 w-4" />New document</Link>
          </Button>
        </div>
        <nav className="flex-1 px-3 space-y-0.5">
          {nav.map((n) => {
            const active = pathname === n.to || pathname.startsWith(n.to + "/");
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                }`}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border flex items-center justify-between">
          <button
            onClick={signOut}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
          <ThemeToggle />
        </div>
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
