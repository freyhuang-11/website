import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/page-shell";
import { prisma } from "@/lib/prisma";

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const zh = locale === "zh";

  const industries = await prisma.industry.findMany({ orderBy: { order: "asc" } });

  return (
    <PageShell title={t("industries.title")} sub={t("industries.sub")}>
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              className="rounded-2xl border border-border bg-surface p-8 hover:border-accent/40 transition-colors group"
            >
              <h2 className="text-2xl font-medium mb-3 group-hover:text-accent transition-colors">
                {zh ? ind.nameZh : ind.nameEn}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {zh ? ind.taglineZh : ind.taglineEn}
              </p>
              <span className="text-sm text-accent">{t("industries.explore")} →</span>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
