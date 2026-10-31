import { Link } from "@/lib/router-shim";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Palette, Check } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { homeFaq } from "@/lib/markdown-to-pdf";

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
            <Link to="/pricing/" className="px-3 py-2 text-muted-foreground hover:text-foreground">Pricing</Link>
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
            Convert Markdown to PDF<br />
            <span className="italic text-gradient-brand">that looks designed.</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-muted-foreground">
            Write proposals and scopes of work in markdown. Markpdf exports them as polished PDFs with your logo and brand colours, so you can send them to clients as they are.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Button asChild size="lg" className="h-11 px-6 bg-gradient-brand text-white border-0 hover:opacity-90 shadow-glow">
              <Link to="/auth">Create your first PDF<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="h-11 px-6">
              <Link to="/pricing/">See pricing</Link>
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

      {/* How to convert Markdown to PDF — server-rendered guide content */}
      <section className="border-t border-border" aria-labelledby="convert-heading">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 id="convert-heading" className="font-serif text-4xl tracking-tight">How to convert Markdown to PDF</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            The quickest way is to export from your editor (Obsidian has Export to PDF built in), or to run{" "}
            <code className="font-mono text-[0.9em]">pandoc input.md -o output.pdf</code> from a terminal. Either gives you a
            readable document. Neither gives you one you'd send a client without fixing the styling, page breaks and branding
            first. Here are the options and where each one breaks down.
          </p>

          <dl className="mt-10 space-y-8">
            <div>
              <dt className="font-serif text-2xl">1. Export from your editor</dt>
              <dd className="mt-2 text-muted-foreground leading-relaxed">
                Obsidian exports a note to PDF from its command palette. In VS Code, the widely used Markdown PDF extension adds
                an export command. It's fast for notes and internal docs. Styling is whatever the editor or extension ships with,
                and adding a logo or letterhead means editing CSS.
              </dd>
            </div>
            <div>
              <dt className="font-serif text-2xl">2. Pandoc on the command line</dt>
              <dd className="mt-2 text-muted-foreground leading-relaxed">
                <code className="font-mono text-[0.9em]">pandoc input.md -o output.pdf</code> converts through LaTeX by default,
                so it needs a TeX distribution installed. Without one, Pandoc stops and tells you the PDF engine wasn't found.
                Add <code className="font-mono text-[0.9em]">--pdf-engine=xelatex</code> for documents with non-Latin characters,
                or use an HTML engine such as <code className="font-mono text-[0.9em]">--pdf-engine=weasyprint</code> to style the
                output with CSS. Pandoc is the right tool for scripted or batch conversion. The{" "}
                <a href="/guide/pandoc-markdown-to-pdf/" className="underline underline-offset-4 hover:text-foreground">Pandoc guide</a>{" "}
                has the full set of options and error fixes.
              </dd>
            </div>
            <div>
              <dt className="font-serif text-2xl">3. Render it, then print from the browser</dt>
              <dd className="mt-2 text-muted-foreground leading-relaxed">
                Open the rendered Markdown in a browser, press Ctrl+P (Cmd+P on a Mac) and choose Save as PDF. It's free and works
                everywhere, but you inherit the page's styles and long tables or code blocks split wherever the page ends. The{" "}
                <a href="/save-webpage-as-pdf/" className="underline underline-offset-4 hover:text-foreground">guide to saving a webpage as a PDF</a>{" "}
                covers cleaning up a page before you print it.
              </dd>
            </div>
            <div>
              <dt className="font-serif text-2xl">4. Markpdf, for documents clients will read</dt>
              <dd className="mt-2 text-muted-foreground leading-relaxed">
                Write or paste the markdown, and Markpdf applies your saved brand kit (logo, primary and accent colours) to a
                document layout built for proposals and scopes of work. Start from a{" "}
                <a href="/templates/consulting-proposal/" className="underline underline-offset-4 hover:text-foreground">consulting proposal</a>,{" "}
                <a href="/templates/web-design-proposal/" className="underline underline-offset-4 hover:text-foreground">web design proposal</a> or{" "}
                <a href="/templates/freelance-proposal/" className="underline underline-offset-4 hover:text-foreground">freelance proposal</a> template.
              </dd>
            </div>
          </dl>

          <h3 className="mt-16 font-serif text-3xl tracking-tight">Common conversion problems</h3>
          <ul className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">
                <code className="font-mono text-[0.9em]">LaTeX Error: Unicode character … not set up for use with LaTeX</code>
              </span>{" "}
              Pandoc's default pdflatex engine can't typeset some characters, such as emoji, symbols like ✓, and many non-Latin
              scripts. Switch to <code className="font-mono text-[0.9em]">--pdf-engine=xelatex</code> or{" "}
              <code className="font-mono text-[0.9em]">lualatex</code>, with a font that contains the character.
            </li>
            <li>
              <span className="font-medium text-foreground">Images are missing.</span> Relative image paths resolve from where the
              converter runs, not from where the .md file lives. Run the command from the file's folder, or point Pandoc at the
              images with <code className="font-mono text-[0.9em]">--resource-path</code>.
            </li>
            <li>
              <span className="font-medium text-foreground">Tables run off the page or split badly.</span> Wide tables overflow the
              right margin in LaTeX output. In HTML-based output, add{" "}
              <code className="font-mono text-[0.9em]">break-inside: avoid</code> to tables and code blocks in your CSS to keep each
              one on a single page.
            </li>
            <li>
              <span className="font-medium text-foreground">The URL and date print in the margins.</span> That's the browser's
              default header and footer. Turn off Headers and footers under More settings in the print dialog.
            </li>
          </ul>

          <h3 className="mt-16 font-serif text-3xl tracking-tight">FAQ</h3>
          <dl className="mt-6 space-y-6">
            {homeFaq.map((f) => (
              <div key={f.q}>
                <dt className="font-medium">{f.q}</dt>
                <dd className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-semibold text-foreground">Templates</h3>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li><a href="/templates/consulting-proposal/" className="hover:text-foreground">Consulting proposal</a></li>
              <li><a href="/templates/web-design-proposal/" className="hover:text-foreground">Web design proposal</a></li>
              <li><a href="/templates/freelance-proposal/" className="hover:text-foreground">Freelance proposal</a></li>
              <li><a href="/templates/proposal-cover-letter/" className="hover:text-foreground">Proposal cover letter</a></li>
              <li><a href="/templates/consulting-report/" className="hover:text-foreground">Consulting report</a></li>
              <li><a href="/templates/project-kickoff/" className="hover:text-foreground">Project kickoff</a></li>
              <li><a href="/templates/design-doc/" className="hover:text-foreground">Design doc</a></li>
              <li><a href="/templates/readme/" className="hover:text-foreground">README</a></li>
              <li><a href="/templates/pentest-report/" className="hover:text-foreground">Pentest report</a></li>
              <li><a href="/templates/" className="hover:text-foreground">All templates</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Guides</h3>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li><a href="/guide/how-to-write-a-scope-of-work/" className="hover:text-foreground">How to write a scope of work</a></li>
              <li><a href="/guide/statement-of-work-vs-scope-of-work/" className="hover:text-foreground">Statement of work vs scope of work</a></li>
              <li><a href="/guide/pandoc-markdown-to-pdf/" className="hover:text-foreground">Markdown to PDF with Pandoc</a></li>
              <li><a href="/guide/proposal-format/" className="hover:text-foreground">Proposal format</a></li>
              <li><a href="/guide/proposal-vs-quote/" className="hover:text-foreground">Proposal vs quote</a></li>
              <li><a href="/guide/fixed-price-vs-time-and-materials/" className="hover:text-foreground">Fixed price vs time and materials</a></li>
              <li><a href="/guide/markdown-to-docx/" className="hover:text-foreground">Markdown to Word (DOCX)</a></li>
              <li><a href="/consulting-rate-calculator/" className="hover:text-foreground">Consulting rate calculator</a></li>
              <li><a href="/day-rate-calculator/" className="hover:text-foreground">Day rate calculator</a></li>
              <li><a href="/save-webpage-as-pdf/" className="hover:text-foreground">Save a webpage as PDF</a></li>
              <li><a href="/guides/" className="hover:text-foreground">All guides</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Product</h3>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li><Link to="/pricing/" className="hover:text-foreground">Pricing</Link></li>
              <li><Link to="/auth" className="hover:text-foreground">Sign in</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 h-14 flex items-center text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Markpdf</span>
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
