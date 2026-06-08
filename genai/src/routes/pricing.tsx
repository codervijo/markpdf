import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Markpdf" },
      { name: "description", content: "Solo, Pro, and Studio plans for technical freelancers." },
    ],
  }),
  component: Pricing,
});

const TIERS = [
  { name: "Solo", price: 19, blurb: "For freelancers shipping a few proposals a month.", features: ["25 PDF exports / month", "1 brand kit", "All 3 templates", "Email support"] },
  { name: "Pro", price: 29, featured: true, blurb: "For consultants and full-time independents.", features: ["100 PDF exports / month", "3 brand kits", "All 3 templates", "Priority support"] },
  { name: "Studio", price: 49, blurb: "For small studios and teams.", features: ["Unlimited exports", "Team access", "Unlimited brand kits", "Priority support"] },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-sm bg-foreground" />
            <span className="text-base font-semibold tracking-tight">Markpdf</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/auth" className="px-3 py-2 text-muted-foreground hover:text-foreground">Sign in</Link>
            <ThemeToggle />
            <Button asChild size="sm"><Link to="/auth">Get started</Link></Button>
          </nav>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h1 className="font-serif text-5xl tracking-tight">Pricing</h1>
          <p className="mt-3 text-muted-foreground">Pick a plan. Cancel anytime.</p>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`rounded-xl border bg-card p-8 ${t.featured ? "border-foreground shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]" : "border-border"}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{t.name}</h3>
                {t.featured && <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Most popular</span>}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-serif text-5xl">${t.price}</span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
              <Button asChild className="mt-6 w-full" variant={t.featured ? "default" : "outline"}>
                <Link to="/auth">Start with {t.name}</Link>
              </Button>
              <ul className="mt-8 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-foreground shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
