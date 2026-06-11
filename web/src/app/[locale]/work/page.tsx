import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/page-shell";
import { CaseVisual } from "@/components/case-visual";
import { prisma } from "@/lib/prisma";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const zh = locale === "zh";

  const cases = await prisma.case.findMany({ orderBy: { order: "asc" } });

  return (
    <PageShell title={t("work.title")} sub={t("work.sub")}>
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="card-lift rounded-2xl border border-border bg-surface p-8 md:p-10 group flex flex-col"
            >
              <div className="mb-6 -mx-2">
                <CaseVisual industry={c.industry} />
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-muted text-muted-foreground">
                  {t("cases.sample")}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{c.industry}</span>
              </div>
              <h2 className="text-2xl font-medium mb-3 group-hover:text-accent transition-colors">
                {zh ? c.titleZh : c.titleEn}
              </h2>
              <p className="text-muted-foreground leading-relaxed flex-1">
                {zh ? c.summaryZh : c.summaryEn}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(JSON.parse(c.techJson) as string[]).map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
