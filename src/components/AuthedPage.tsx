import { type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { useUser } from "@/lib/use-user";
import { AppShell } from "@/components/AppShell";
import { Toaster } from "@/components/ui/sonner";

// Client-side equivalent of the source's `_authenticated` layout route:
// guards on the Supabase session, renders the AppShell chrome, and exposes
// the authenticated user to the page via a render prop.
export function AuthedPage({ children }: { children: (user: User) => ReactNode }) {
  const { user, loading } = useUser();

  if (loading || !user) {
    return (
      <AppShell>
        <div className="p-12 text-sm text-muted-foreground">Loading…</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {children(user)}
      <Toaster />
    </AppShell>
  );
}
