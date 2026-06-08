import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Trash2 } from "lucide-react";
import { DOC_TYPE_LABEL, type DocType } from "@/lib/templates";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/documents/")({
  head: () => ({ meta: [{ title: "Documents — Markpdf" }] }),
  component: DocumentsList,
});

function DocumentsList() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["documents", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("id,title,client_name,doc_type,updated_at")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("documents").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Document deleted");
      qc.invalidateQueries({ queryKey: ["documents"] });
    },
  });

  return (
    <div className="px-8 md:px-12 py-10 max-w-5xl">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl">Documents</h1>
          <p className="mt-2 text-muted-foreground">All your saved proposals, scopes, and briefs.</p>
        </div>
        <Button asChild><Link to="/documents/new"><Plus className="h-4 w-4 mr-1" />New</Link></Button>
      </div>

      {q.isLoading ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : q.data && q.data.length > 0 ? (
        <div className="rounded-lg border border-border bg-card divide-y divide-border">
          {q.data.map((d) => (
            <div key={d.id} className="flex items-center justify-between px-5 py-4 hover:bg-accent/30">
              <Link
                to="/documents/$id"
                params={{ id: d.id }}
                className="flex items-center gap-3 min-w-0 flex-1"
              >
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium truncate">{d.title}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {DOC_TYPE_LABEL[d.doc_type as DocType]} · {d.client_name || "No client"} ·{" "}
                    {new Date(d.updated_at).toLocaleDateString()}
                  </div>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => { if (confirm("Delete this document?")) del.mutate(d.id); }}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <FileText className="h-6 w-6 mx-auto text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No documents yet.</p>
          <Button asChild className="mt-4"><Link to="/documents/new">Create your first</Link></Button>
        </div>
      )}
    </div>
  );
}
