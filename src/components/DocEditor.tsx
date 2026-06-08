import type { User } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { Link, useIdParam } from "@/lib/router-shim";
import { useQuery, useMutation, useQueryClient } from "@/lib/query-shim";
import { AuthedPage } from "@/components/AuthedPage";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Download, Save } from "lucide-react";
import { DocumentPreview } from "@/components/DocumentPreview";
import { TEMPLATES, DOC_TYPE_LABEL, type TemplateId, type DocType } from "@/lib/templates";
import { toast } from "sonner";

export function DocEditor() {
  return <AuthedPage>{(user) => <DocEditorInner user={user} />}</AuthedPage>;
}

function DocEditorInner({ user }: { user: User }) {
  const id = useIdParam();
  const qc = useQueryClient();

  const docQ = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("documents").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
  });

  const brandQ = useQuery({
    queryKey: ["brand_kit"],
    queryFn: async () => {
      const { data } = await supabase.from("brand_kits").select("*").limit(1).maybeSingle();
      return data;
    },
  });

  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [templateId, setTemplateId] = useState<TemplateId>("modern-proposal");
  const [docType, setDocType] = useState<DocType>("proposal");
  const dirty = useRef(false);

  useEffect(() => {
    if (docQ.data && !dirty.current) {
      setTitle(docQ.data.title);
      setClientName(docQ.data.client_name);
      setMarkdown(docQ.data.markdown);
      setTemplateId(docQ.data.template_id as TemplateId);
      setDocType(docQ.data.doc_type as DocType);
    }
  }, [docQ.data]);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("documents")
        .update({ title, client_name: clientName, markdown, template_id: templateId, doc_type: docType })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      dirty.current = false;
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to save"),
  });

  // Autosave 1.5s after last edit
  useEffect(() => {
    if (!docQ.data) return;
    dirty.current = true;
    const t = setTimeout(() => { if (dirty.current) save.mutate(); }, 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, clientName, markdown, templateId, docType]);

  const exportPdf = async () => {
    await supabase.from("exports").insert({ user_id: user.id, document_id: id });
    qc.invalidateQueries({ queryKey: ["exports"] });
    window.print();
  };

  if (docQ.isLoading) {
    return <div className="p-12 text-sm text-muted-foreground">Loading document…</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Toolbar */}
      <div className="no-print border-b border-border bg-card/60 backdrop-blur px-6 py-3 flex items-center gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link to="/documents"><ArrowLeft className="h-4 w-4 mr-1" />All documents</Link>
        </Button>
        <div className="h-5 w-px bg-border" />
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="max-w-xs border-transparent shadow-none focus-visible:border-input"
          placeholder="Untitled"
        />
        <Input
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="max-w-[200px] border-transparent shadow-none focus-visible:border-input"
          placeholder="Client name"
        />
        <Select value={templateId} onValueChange={(v) => setTemplateId(v as TemplateId)}>
          <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {TEMPLATES.map((t) => (
              <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground ml-2">
          {DOC_TYPE_LABEL[docType]} {save.isPending ? "· Saving…" : dirty.current ? "" : "· Saved"}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => save.mutate()}><Save className="h-4 w-4 mr-1" />Save</Button>
          <Button size="sm" onClick={exportPdf}><Download className="h-4 w-4 mr-1" />Export PDF</Button>
        </div>
      </div>

      {/* Editor + preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 min-h-0">
        <div className="no-print border-r border-border bg-card/40 flex flex-col min-h-0">
          <div className="px-5 py-2 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">Markdown</div>
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-1 rounded-none border-0 font-mono text-[13px] resize-none focus-visible:ring-0 leading-relaxed p-6 bg-transparent"
          />
        </div>
        <div className="overflow-auto bg-muted/30 p-8 lg:p-10 min-h-0">
          <div className="print-root">
            <DocumentPreview
              templateId={templateId}
              brand={brandQ.data ?? null}
              title={title}
              clientName={clientName}
              markdown={markdown}
              className="max-w-[820px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
