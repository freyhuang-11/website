import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const values = [
    { title: t("about.v1"), desc: t("about.v1d") },
    { title: t("about.v2"), desc: t("about.v2d") },
    { title: t("about.v3"), desc: t("about.v3d") },
  ];

  const tools = [
    { name: "Claude Code", desc: t("evidence.tools.claudeCode") },
    { name: "Cursor", desc: t("evidence.tools.cursor") },
    { name: "v0", desc: t("evidence.tools.v0") },
    { name: "Jimeng Agents", desc: t("evidence.tools.agents") },
  ];

  return (
    <PageShell title={t("about.title")} sub={t("about.sub")}>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="text-2xl font-medium mb-10">{t("about.valuesTitle")}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div key={v.title} className="border-l-2 border-accent pl-6">
              <h3 className="text-xl font-medium mb-3">{v.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="text-2xl font-medium mb-3">{t("evidence.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">{t("evidence.sub")}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <div className="font-mono text-sm text-accent mb-3">{tool.name}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
