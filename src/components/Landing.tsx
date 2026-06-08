import { Link } from "@/lib/router-shim";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Palette, Check } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 backdrop-blur-sm bg-background/70 sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-brand shadow-glow" />
            <span className="text-base font-semibold tracking-tight">Markpdf</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/pricing" className="px-3 py-2 text-muted-foreground hover:text-foreground">Pricing</Link>
            <Link to="/auth" className="px-3 py-2 text-muted-foreground hover:text-foreground">Sign in</Link>
            <ThemeToggle />
            <Button asChild size="sm" className="bg-gradient-brand text-white border-0 hover:opacity-90"><Link to="/auth">Get started</Link></Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
            For freelancers and consultants
          </div>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight">
            Write in markdown.<br />
            <span className="italic text-gradient-brand">Send like a design agency.</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-muted-foreground">
            Markpdf turns plain markdown proposals into polished, branded client PDFs in seconds.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Button asChild size="lg" className="h-11 px-6 bg-gradient-brand text-white border-0 hover:opacity-90 shadow-glow">
              <Link to="/auth">Create your first PDF<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="h-11 px-6">
              <Link to="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mock preview */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-xl border border-border bg-card p-6 md:p-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)]">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-md border border-border bg-muted/30 p-5 font-mono text-[12px] leading-relaxed text-muted-foreground overflow-hidden">
              <div className="text-foreground"># Project Proposal</div>
              <div className="mt-2">Prepared for <span className="text-foreground">Northwind Labs</span></div>
              <div className="mt-4 text-foreground">## Scope</div>
              <div>- Discovery &amp; strategy</div>
              <div>- Design system</div>
              <div>- Frontend build</div>
              <div className="mt-4 text-foreground">## Investment</div>
              <div>Fixed fee **$24,000**</div>
            </div>
            <div className="rounded-md border border-border bg-white p-6 text-[12px]" style={{ color: "#0f172a" }}>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-sm" style={{ background: "#0F172A" }} />
                  <span className="font-medium">Your Studio</span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground">Proposal</span>
              </div>
              <div className="pt-5">
                <div className="text-[9px] uppercase tracking-widest" style={{ color: "#0EA5E9" }}>Prepared for Northwind Labs</div>
                <div className="font-serif text-2xl mt-2 leading-tight">Project Proposal</div>
                <div className="mt-3 h-px w-10" style={{ background: "#0EA5E9" }} />
                <div className="mt-5 font-serif text-base">Scope</div>
                <ul className="mt-1 list-disc pl-5 text-[11px] text-slate-700">
                  <li>Discovery &amp; strategy</li>
                  <li>Design system</li>
                  <li>Frontend build</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-3 gap-8">
          <Feature icon={FileText} title="Markdown in, PDF out" body="Headings, tables, code, blockquotes — all rendered into a typographic, client-ready document." tint="violet" />
          <Feature icon={Palette} title="Your brand, always" body="Logo, primary color, accent. Saved once in your brand kit, applied to every export." tint="coral" />
          <Feature icon={Check} title="Three pro templates" body="Modern Proposal, Clean Scope of Work, Executive Brief. Built for technical work." tint="teal" />
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Markpdf</span>
          <div className="flex gap-4">
            <Link to="/pricing">Pricing</Link>
            <Link to="/auth">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const tints: Record<string, string> = {
  violet: "bg-[oklch(0.62_0.21_295_/_0.12)] text-[oklch(0.55_0.21_295)] ring-[oklch(0.62_0.21_295_/_0.25)]",
  coral: "bg-[oklch(0.72_0.18_35_/_0.14)] text-[oklch(0.6_0.2_35)] ring-[oklch(0.72_0.18_35_/_0.25)]",
  teal: "bg-[oklch(0.78_0.17_195_/_0.14)] text-[oklch(0.5_0.15_195)] ring-[oklch(0.78_0.17_195_/_0.25)]",
};

function Feature({ icon: Icon, title, body, tint = "violet" }: { icon: React.ElementType; title: string; body: string; tint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 hover:shadow-glow transition-shadow">
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${tints[tint]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-serif text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
