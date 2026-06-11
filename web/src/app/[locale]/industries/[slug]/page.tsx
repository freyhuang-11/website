import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/page-shell";
import { prisma } from "@/lib/prisma";

export default async function IndustryDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const zh = locale === "zh";

  const ind = await prisma.industry.findUnique({ where: { slug } });
  if (!ind) notFound();

  const cases = await prisma.case.findMany({
    where: { industry: slug },
    orderBy: { order: "asc" },
  });

  return (
    <PageShell
      kicker={t("industries.title")}
      title={zh ? ind.nameZh : ind.nameEn}
      sub={zh ? ind.taglineZh : ind.taglineEn}
    >
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-16">
          {zh ? ind.bodyZh : ind.bodyEn}
        </p>

        {cases.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-medium mb-8">{t("cases.title")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {cases.map((c) => (
                <Link
                  key={c.slug}
                  href={`/work/${c.slug}`}
                  className="rounded-2xl border border-border bg-surface p-8 hover:border-accent/40 transition-colors group"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-muted text-muted-foreground">
                    {t("cases.sample")}
                  </span>
                  <h3 className="text-xl font-medium mt-4 mb-2 group-hover:text-accent transition-colors">
                    {zh ? c.titleZh : c.titleEn}
                  </h3>
                  <p className="text-sm text-muted-foreground">{zh ? c.summaryZh : c.summaryEn}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link
          href="/quote"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition"
        >
          {t("cta.button")} →
        </Link>
      </section>
    </PageShell>
  );
}
