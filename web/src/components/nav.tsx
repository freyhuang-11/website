import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

const links = [
  { href: "/services", key: "services" },
  { href: "/work", key: "work" },
  { href: "/industries", key: "industries" },
  { href: "/insights", key: "insights" },
  { href: "/about", key: "about" },
] as const;

export function Nav() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-6 w-6 rounded-sm bg-accent group-hover:rotate-12 transition-transform shadow-[0_0_16px_-2px_var(--accent)]" />
          <span className="font-mono text-sm tracking-tight">
            jimeng<span className="text-muted-foreground">.network</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LocaleSwitcher />
          <Link
            href="/quote"
            className="hidden md:inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition shadow-[0_0_24px_-6px_var(--accent)]"
          >
            {t("getQuote")}
            <span aria-hidden>→</span>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
