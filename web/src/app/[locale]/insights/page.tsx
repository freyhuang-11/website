import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/page-shell";
import { prisma } from "@/lib/prisma";

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const zh = locale === "zh";

  const articles = await prisma.article.findMany({
    where: { state: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <PageShell title={t("insights.title")} sub={t("insights.sub")}>
      <section className="mx-auto max-w-4xl px-6 pb-32">
        <div className="space-y-6">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/insights/${a.slug}`}
              className="block rounded-2xl border border-border bg-surface p-8 hover:border-accent/40 transition-colors group"
            >
              <div className="font-mono text-xs text-muted-foreground mb-3">
                {a.publishedAt?.toISOString().slice(0, 10)} · {a.topic}
              </div>
              <h2 className="text-2xl font-medium mb-3 group-hover:text-accent transition-colors">
                {zh ? a.titleZh : a.titleEn}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {zh ? a.tldrZh : a.tldrEn}
              </p>
              <span className="mt-4 inline-block text-sm text-accent">
                {t("insights.readMore")} →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
