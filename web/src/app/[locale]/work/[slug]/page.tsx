import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/page-shell";
import { CaseVisual } from "@/components/case-visual";
import { prisma } from "@/lib/prisma";

export default async function CaseDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const zh = locale === "zh";

  const c = await prisma.case.findUnique({ where: { slug } });
  if (!c) notFound();

  const sections = [
    { label: t("work.challenge"), text: zh ? c.challengeZh : c.challengeEn },
    { label: t("work.solution"), text: zh ? c.solutionZh : c.solutionEn },
    { label: t("work.result"), text: zh ? c.resultZh : c.resultEn },
  ];

  return (
    <PageShell
      kicker={`${t("cases.sample")} · ${t("cases.sampleNote")}`}
      title={zh ? c.titleZh : c.titleEn}
      sub={zh ? c.summaryZh : c.summaryEn}
    >
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="max-w-3xl mb-16 animate-fade-up">
          <CaseVisual industry={c.industry} />
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {sections.map((s) => (
            <div key={s.label} className="border-l-2 border-accent pl-6">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                {s.label}
              </h2>
              <p className="text-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
            {t("work.stack")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {(JSON.parse(c.techJson) as string[]).map((tech) => (
              <span
                key={tech}
                className="font-mono text-sm px-3 py-1.5 rounded bg-muted text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-16">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition"
          >
            {t("insights.ctaTitle")} →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
