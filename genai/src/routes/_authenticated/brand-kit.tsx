import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload } from "lucide-react";

export const Route = createFileRoute("/_authenticated/brand-kit")({
  head: () => ({ meta: [{ title: "Brand Kit — Markpdf" }] }),
  component: BrandKit,
});

interface Form {
  id?: string;
  company_name: string;
  website: string;
  email: string;
  primary_color: string;
  accent_color: string;
  logo_url: string | null;
  footer_text: string;
}

const EMPTY: Form = {
  company_name: "",
  website: "",
  email: "",
  primary_color: "#0F172A",
  accent_color: "#0EA5E9",
  logo_url: null,
  footer_text: "",
};

function BrandKit() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const [form, setForm] = useState<Form>(EMPTY);

  const q = useQuery({
    queryKey: ["brand_kit"],
    queryFn: async () => {
      const { data, error } = await supabase.from("brand_kits").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (q.data) setForm({
      id: q.data.id,
      company_name: q.data.company_name ?? "",
      website: q.data.website ?? "",
      email: q.data.email ?? "",
      primary_color: q.data.primary_color ?? "#0F172A",
      accent_color: q.data.accent_color ?? "#0EA5E9",
      logo_url: q.data.logo_url,
      footer_text: q.data.footer_text ?? "",
    });
  }, [q.data]);

  const save = useMutation({
    mutationFn: async () => {
      const payload = { ...form, user_id: user.id };
      if (form.id) {
        const { error } = await supabase.from("brand_kits").update(payload).eq("id", form.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("brand_kits").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Brand kit saved");
      qc.invalidateQueries({ queryKey: ["brand_kit"] });
      qc.invalidateQueries({ queryKey: ["brand_kits", "default"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to save"),
  });

  const onLogoUpload = (file: File) => {
    if (file.size > 600 * 1024) {
      toast.error("Logo must be under 600KB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, logo_url: reader.result as string }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="px-8 md:px-12 py-10 max-w-3xl">
      <h1 className="font-serif text-4xl">Brand Kit</h1>
      <p className="mt-2 text-muted-foreground">
        Applied to every document you export. Update anytime.
      </p>

      <form
        className="mt-10 space-y-8"
        onSubmit={(e) => { e.preventDefault(); save.mutate(); }}
      >
        {/* Logo */}
        <section>
          <Label>Logo</Label>
          <div className="mt-2 flex items-center gap-4">
            <div className="h-20 w-20 rounded-md border border-border bg-card flex items-center justify-center overflow-hidden">
              {form.logo_url
                ? <img src={form.logo_url} alt="Logo" className="max-h-full max-w-full object-contain p-2" />
                : <span className="text-xs text-muted-foreground">No logo</span>}
            </div>
            <div className="flex gap-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && onLogoUpload(e.target.files[0])}
                />
                <span className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent">
                  <Upload className="h-4 w-4" /> Upload
                </span>
              </label>
              {form.logo_url && (
                <Button type="button" variant="ghost" size="sm" onClick={() => setForm((f) => ({ ...f, logo_url: null }))}>
                  Remove
                </Button>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">PNG, JPG, SVG, or WEBP. Max 600KB.</p>
        </section>

        <section className="grid md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="company">Company name</Label>
            <Input id="company" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} placeholder="Your Studio" />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="yoursite.com" />
          </div>
          <div>
            <Label htmlFor="email">Contact email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="hello@yoursite.com" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="primary">Primary color</Label>
              <div className="flex gap-2 mt-1">
                <input id="primary" type="color" value={form.primary_color} onChange={(e) => setForm({ ...form, primary_color: e.target.value })} className="h-9 w-12 rounded border border-input bg-background" />
                <Input value={form.primary_color} onChange={(e) => setForm({ ...form, primary_color: e.target.value })} />
              </div>
            </div>
            <div>
              <Label htmlFor="accent">Accent color</Label>
              <div className="flex gap-2 mt-1">
                <input id="accent" type="color" value={form.accent_color} onChange={(e) => setForm({ ...form, accent_color: e.target.value })} className="h-9 w-12 rounded border border-input bg-background" />
                <Input value={form.accent_color} onChange={(e) => setForm({ ...form, accent_color: e.target.value })} />
              </div>
            </div>
          </div>
        </section>

        <section>
          <Label htmlFor="footer">Default footer text</Label>
          <Textarea
            id="footer"
            value={form.footer_text}
            onChange={(e) => setForm({ ...form, footer_text: e.target.value })}
            placeholder="© 2026 Your Studio. All rights reserved."
            rows={2}
          />
        </section>

        <div className="flex justify-end">
          <Button type="submit" disabled={save.isPending}>{save.isPending ? "Saving…" : "Save brand kit"}</Button>
        </div>
      </form>
    </div>
  );
}
