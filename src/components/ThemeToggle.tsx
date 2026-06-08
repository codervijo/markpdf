import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "markpdf-theme";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  const html = document.documentElement;
  if (resolved === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  return stored ?? "system";
}

export function initTheme() {
  const theme = getInitialTheme();
  applyTheme(theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme("system");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const cycle = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : t === "dark" ? "system" : "light"));
  }, []);

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const label = theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycle}
      title={`Theme: ${label}`}
      className="h-8 w-8 shrink-0"
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only">Toggle theme ({label})</span>
    </Button>
  );
}
