// useUser — replaces the source's `_authenticated/route.tsx` beforeLoad guard
// and `Route.useRouteContext().user`. Fetches the Supabase user client-side;
// redirects to /auth when there's no session.
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    supabase.auth.getUser().then(({ data, error }) => {
      if (!alive) return;
      if (error || !data.user) {
        window.location.replace("/auth");
        return;
      }
      setUser(data.user);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  return { user, loading };
}
