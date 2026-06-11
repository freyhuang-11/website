"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const other = locale === "en" ? "zh" : "en";

  return (
    <button
      onClick={() => router.replace(pathname, { locale: other })}
      className="text-xs text-muted-foreground hover:text-foreground font-mono transition-colors"
      aria-label={`Switch language to ${other}`}
    >
      {locale === "en" ? "EN / 中" : "中 / EN"}
    </button>
  );
}
