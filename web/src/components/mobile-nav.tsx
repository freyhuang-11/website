"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const links = [
  { href: "/services", key: "services" },
  { href: "/work", key: "work" },
  { href: "/industries", key: "industries" },
  { href: "/insights", key: "insights" },
  { href: "/about", key: "about" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
] as const;

export function MobileNav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="h-9 w-9 inline-flex flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-px w-5 bg-foreground transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
        />
        <span
          className={`h-px w-5 bg-foreground transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
        />
      </button>
      {open && (
        <div className="fixed inset-x-0 top-16 z-50 border-b border-border bg-background/95 backdrop-blur-xl p-6 space-y-1 animate-fade-up">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-xl text-lg hover:bg-surface transition-colors"
            >
              {t(l.key)}
            </Link>
          ))}
          <Link
            href="/quote"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 rounded-xl text-lg bg-accent text-accent-foreground font-medium text-center mt-4"
          >
            {t("getQuote")} →
          </Link>
        </div>
      )}
    </div>
  );
}
