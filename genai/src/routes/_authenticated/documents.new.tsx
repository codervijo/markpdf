import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TEMPLATES, type TemplateId, type DocType } from "@/lib/templates";
import { Upload, FileText, FilePen, FileBarChart } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/documents/new")({
  head: () => ({ meta: [{ title: "New Document — Markpdf" }] }),
  component: NewDocument,
});

const DOC_TYPE_OPTIONS: { value: DocType; label: string; templateId: TemplateId; icon: React.ElementType; description: string }[] = [
  { value: "proposal", label: "Proposal", templateId: "modern-proposal", icon: FileText, description: "Pitch a project with scope, deliverables, and fees." },
  { value: "scope_of_work", label: "Scope of Work", templateId: "clean-sow", icon: FilePen, description: "Contract-ready SOW with deliverables and assumptions." },
  { value: "project_brief", label: "Project Brief", templateId: "executive-brief", icon: FileBarChart, description: "One-page brief with context, goals, and success criteria." },
];

function NewDocument() {
  const navigate = useNavigate();
  const { user } = Route.useRouteContext();
  const [docType, setDocType] = useState<DocType>("proposal");
  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [markdown, setMarkdown] = useState("");

  const brandQ = useQuery({
    queryKey: ["brand_kit"],
    queryFn: async () => {
      const { data } = await supabase.from("brand_kits").select("*").limit(1).maybeSingle();
      return data;
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      const choice = DOC_TYPE_OPTIONS.find((o) => o.value === docType)!;
      const template = TEMPLATES.find((t) => t.id === choice.templateId)!;
      const md = markdown.trim() || template.starter({
        client: clientName,
        title,
        company: brandQ.data?.company_name ?? "Your Studio",
      });
      const { data, error } = await supabase
        .from("documents")
        .insert({
          user_id: user.id,
          doc_type: docType,
          template_id: choice.templateId,
          title: title || "Untitled",
          client_name: clientName,
          markdown: md,
          brand_kit_id: brandQ.data?.id ?? null,
        })
        .select("id")
        .single();
      if (error) throw error;
      return data.id as string;
    },
    onSuccess: (id) => {
      toast.success("Document created");
      navigate({ to: "/documents/$id", params: { id } });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to create"),
  });

  const onFileUpload = (file: File) => {
    if (!file.name.match(/\.(md|markdown|txt)$/i)) {
      toast.error("Use a .md or .txt file");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setMarkdown(reader.result as string);
    reader.readAsText(file);
  };

  return (
    <div className="px-8 md:px-12 py-10 max-w-3xl">
      <h1 className="font-serif text-4xl">New document</h1>
      <p className="mt-2 text-muted-foreground">Pick a type, add details, and start editing.</p>

      <form className="mt-10 space-y-8" onSubmit={(e) => { e.preventDefault(); create.mutate(); }}>
        <section>
          <Label className="mb-3 block">Document type</Label>
          <div className="grid md:grid-cols-3 gap-3">
            {DOC_TYPE_OPTIONS.map((o) => {
              const Icon = o.icon;
              const active = docType === o.value;
              return (
                <button
                  type="button"
                  key={o.value}
                  onClick={() => setDocType(o.value)}
                  className={`text-left rounded-lg border p-4 transition-colors ${
                    active ? "border-foreground bg-accent/40" : "border-border hover:border-foreground/40 bg-card"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <div className="mt-3 font-medium">{o.label}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{o.description}</div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="title">Project title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Website redesign" required />
          </div>
          <div>
            <Label htmlFor="client">Client name</Label>
            <Input id="client" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Northwind Labs" />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="md">Markdown (optional)</Label>
            <label className="cursor-pointer text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              <input type="file" accept=".md,.markdown,.txt" className="hidden" onChange={(e) => e.target.files?.[0] && onFileUpload(e.target.files[0])} />
              <Upload className="h-3.5 w-3.5" /> Upload .md
            </label>
          </div>
          <Textarea
            id="md"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Leave blank to start from the template…"
            rows={10}
            className="font-mono text-sm"
          />
        </section>

        <div className="flex justify-end">
          <Button type="submit" disabled={create.isPending}>
            {create.isPending ? "Creating…" : "Create document"}
          </Button>
        </div>
      </form>
    </div>
  );
}
