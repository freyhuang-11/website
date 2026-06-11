import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/page-shell";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const tiers = [
    { tier: "L1", title: t("services.l1Title"), desc: t("services.l1Desc") },
    { tier: "L2", title: t("services.l2Title"), desc: t("services.l2Desc") },
    { tier: "L3", title: t("services.l3Title"), desc: t("services.l3Desc") },
    { tier: "L4", title: t("services.l4Title"), desc: t("services.l4Desc") },
  ];

  const journey = [
    { title: t("services.custom.discovery"), desc: t("services.custom.discoveryDesc") },
    { title: t("services.custom.build"), desc: t("services.custom.buildDesc") },
    { title: t("services.custom.ship"), desc: t("services.custom.shipDesc") },
    { title: t("services.custom.maintain"), desc: t("services.custom.maintainDesc") },
  ];

  const customDev = [
    { title: t("customDev.c1"), desc: t("customDev.c1d") },
    { title: t("customDev.c2"), desc: t("customDev.c2d") },
    { title: t("customDev.c3"), desc: t("customDev.c3d") },
    { title: t("customDev.c4"), desc: t("customDev.c4d") },
  ];

  return (
    <PageShell title={t("services.pageTitle")} sub={t("services.pageSub")}>
      {/* AI — main business */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <p className="text-xs font-mono text-accent tracking-widest uppercase mb-8">
          {t("services.kicker")}
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {tiers.map((s) => (
            <div key={s.tier} className="card-lift rounded-2xl border border-border bg-surface p-10 md:p-12">
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent">{s.tier}</span>
              <h2 className="text-3xl font-medium mt-5 mb-4">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Traditional custom dev */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <p className="text-xs font-mono text-accent tracking-widest uppercase mb-3">
          {t("customDev.kicker")}
        </p>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">{t("customDev.title")}</h2>
        <p className="text-muted-foreground max-w-2xl mb-12">{t("customDev.sub")}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {customDev.map((c) => (
            <div key={c.title} className="card-lift rounded-2xl border border-border bg-surface p-7">
              <h3 className="text-lg font-medium mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-3">
            {t("services.custom.kicker")}
          </p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-16">
            {t("services.custom.title")}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {journey.map((j, i) => (
              <div key={j.title} className="relative">
                <div className="font-mono text-5xl text-muted/80 font-medium mb-4">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-medium mb-3">{j.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{j.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition"
            >
              {t("cta.button")} →
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
