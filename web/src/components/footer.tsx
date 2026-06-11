import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border mt-12">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-sm bg-accent" />
          <span className="font-mono text-sm text-muted-foreground">
            {t("rights")} · {t("tagline")}
          </span>
        </div>
        <div className="flex gap-8 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            {t("privacy")}
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            {t("terms")}
          </Link>
          <a
            href="mailto:hello@jimeng.network"
            className="hover:text-foreground transition-colors"
          >
            hello@jimeng.network
          </a>
        </div>
      </div>
    </footer>
  );
}
