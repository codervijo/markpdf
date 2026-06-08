import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, FileText, ArrowUpRight, Palette } from "lucide-react";
import { DOC_TYPE_LABEL, type DocType } from "@/lib/templates";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Markpdf" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();

  const docsQ = useQuery({
    queryKey: ["documents", "recent"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("id,title,client_name,doc_type,updated_at")
        .order("updated_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  const exportsQ = useQuery({
    queryKey: ["exports", "count"],
    queryFn: async () => {
      const start = new Date();
      start.setDate(1);
      const { count, error } = await supabase
        .from("exports")
        .select("*", { count: "exact", head: true })
        .gte("exported_at", start.toISOString());
      if (error) throw error;
      return count ?? 0;
    },
  });

  const brandQ = useQuery({
    queryKey: ["brand_kits", "default"],
    queryFn: async () => {
      const { data } = await supabase.from("brand_kits").select("id,company_name").limit(1).maybeSingle();
      return data;
    },
  });

  return (
    <div className="px-8 md:px-12 py-10 max-w-6xl">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-sm text-muted-foreground">
            Hi {user.user_metadata?.full_name || user.email?.split("@")[0]} —
          </p>
          <h1 className="font-serif text-4xl mt-1">Your workspace</h1>
        </div>
        <Button asChild className="bg-gradient-brand text-white border-0 hover:opacity-90 shadow-glow"><Link to="/documents/new"><Plus className="h-4 w-4 mr-1" />New document</Link></Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <Stat label="Documents" value={String(docsQ.data?.length ?? 0)} hint="Recent" tint="violet" />
        <Stat label="Exports this month" value={String(exportsQ.data ?? 0)} hint="PDF" tint="teal" />
        <Stat
          label="Brand kit"
          value={brandQ.data?.company_name || "Not set"}
          hint={brandQ.data ? "Active" : "Set it up"}
          cta={brandQ.data ? undefined : { to: "/brand-kit", label: "Set up" }}
          tint="coral"
        />
      </div>

      {!brandQ.isLoading && !brandQ.data && (
        <Link
          to="/brand-kit"
          className="flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4 mb-8 hover:bg-accent/40"
        >
          <div className="flex items-center gap-3">
            <Palette className="h-5 w-5" />
            <div>
              <div className="font-medium">Set up your brand kit</div>
              <div className="text-sm text-muted-foreground">Add your logo and colors so exports look on-brand.</div>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Recent documents</h2>
        <Link to="/documents" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
      </div>

      {docsQ.isLoading ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : docsQ.data && docsQ.data.length > 0 ? (
        <div className="rounded-lg border border-border bg-card divide-y divide-border">
          {docsQ.data.map((d) => (
            <Link
              key={d.id}
              to="/documents/$id"
              params={{ id: d.id }}
              className="flex items-center justify-between px-5 py-4 hover:bg-accent/40"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium truncate">{d.title}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {DOC_TYPE_LABEL[d.doc_type as DocType]} · {d.client_name || "No client"}
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(d.updated_at).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-10 text-center">
          <FileText className="h-6 w-6 mx-auto text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No documents yet.</p>
          <Button asChild className="mt-4" size="sm"><Link to="/documents/new">Create your first</Link></Button>
        </div>
      )}
    </div>
  );
}

const stripeTints: Record<string, string> = {
  violet: "bg-gradient-to-r from-[oklch(0.62_0.21_295)] to-[oklch(0.72_0.18_35)]",
  teal: "bg-gradient-to-r from-[oklch(0.78_0.17_195)] to-[oklch(0.62_0.21_295)]",
  coral: "bg-gradient-to-r from-[oklch(0.72_0.18_35)] to-[oklch(0.82_0.17_75)]",
};

function Stat({ label, value, hint, cta, tint = "violet" }: { label: string; value: string; hint?: string; cta?: { to: string; label: string }; tint?: string }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-card p-5">
      <div className={`absolute inset-x-0 top-0 h-0.5 ${stripeTints[tint]}`} />
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
      <div className="mt-2 font-serif text-3xl">{value}</div>
      <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
        <span>{hint}</span>
        {cta && <Link to={cta.to} className="underline">{cta.label}</Link>}
      </div>
    </div>
  );
}
