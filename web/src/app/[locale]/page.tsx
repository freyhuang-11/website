import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HeroCanvas } from "@/components/hero-canvas";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CaseVisual } from "@/components/case-visual";
import { prisma } from "@/lib/prisma";

const logos = ["Acme Corp", "Northwind", "Globex", "Initech", "Umbrella", "Hooli", "Stark Ltd", "Wayne Co"];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const zh = locale === "zh";

  const [cases, industries] = await Promise.all([
    prisma.case.findMany({ orderBy: { order: "asc" }, take: 3 }),
    prisma.industry.findMany({ orderBy: { order: "asc" } }),
  ]);

  const services = [
    { tier: "L1", title: t("services.l1Title"), desc: t("services.l1Desc") },
    { tier: "L2", title: t("services.l2Title"), desc: t("services.l2Desc") },
    { tier: "L3", title: t("services.l3Title"), desc: t("services.l3Desc") },
    { tier: "L4", title: t("services.l4Title"), desc: t("services.l4Desc") },
  ];

  const customDev = [
    { icon: "◻", title: t("customDev.c1"), desc: t("customDev.c1d") },
    { icon: "▣", title: t("customDev.c2"), desc: t("customDev.c2d") },
    { icon: "⬚", title: t("customDev.c3"), desc: t("customDev.c3d") },
    { icon: "⧉", title: t("customDev.c4"), desc: t("customDev.c4d") },
  ];

  const stats = [
    { k: t("stats.s1k"), v: t("stats.s1v") },
    { k: t("stats.s2k"), v: t("stats.s2v") },
    { k: t("stats.s3k"), v: t("stats.s3v") },
    { k: t("stats.s4k"), v: t("stats.s4v") },
  ];

  const tools = [
    { name: "Claude Code", desc: t("evidence.tools.claudeCode") },
    { name: "Cursor", desc: t("evidence.tools.cursor") },
    { name: "v0", desc: t("evidence.tools.v0") },
    { name: "Jimeng Agents", desc: t("evidence.tools.agents") },
  ];

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jimeng Network",
    url: process.env.PUBLIC_SITE_URL ?? "https://jimeng.it.com",
    slogan: "Your tools. Custom-built. AI-powered.",
    description: "Custom software development studio. Bespoke tools, workflows and AI agents.",
    email: "hello@jimeng.network",
    knowsAbout: ["Custom software development", "AI agents", "Workflow automation", "RAG"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <Nav />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <HeroCanvas />
        <div className="orb orb-accent w-[480px] h-[480px] -top-40 -right-40 animate-float" />
        <div className="mx-auto max-w-7xl px-6 py-32 w-full relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 backdrop-blur text-xs font-mono text-accent mb-8 animate-fade-up">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              {t("hero.badge")}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95] animate-fade-up delay-100">
              {t("hero.line1")}
              <br />
              <span className="text-muted-foreground">{t("hero.line2")}</span>
              <br />
              <span className="gradient-text glow">{t("hero.line3")}</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-up delay-200">
              {t("hero.sub")}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up delay-300">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition shadow-[0_0_40px_-8px_var(--accent)]"
              >
                {t("hero.ctaQuote")}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-border bg-surface/50 backdrop-blur hover:border-accent/40 transition"
              >
                {t("hero.ctaCall")}
              </Link>
            </div>
            <div className="mt-16 font-mono text-xs text-muted-foreground flex items-center gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-accent to-transparent" />
              {t("hero.scroll")}
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY — marquee */}
      <section className="border-y border-border bg-surface/40 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-6 text-center">
            {t("trusted.label")}
          </p>
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex w-max animate-marquee gap-16">
              {[...logos, ...logos].map((l, i) => (
                <div key={i} className="text-xl font-medium tracking-tight text-muted-foreground/70 whitespace-nowrap">
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="orb orb-emerald w-[360px] h-[360px] top-0 left-[-180px]" />
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {stats.map((s) => (
            <div key={s.v} className="bg-background/80 backdrop-blur p-8">
              <div className="text-4xl md:text-5xl font-medium gradient-text mb-2">{s.k}</div>
              <div className="text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI SERVICES — main business */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="absolute inset-0 bg-grid -z-10" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-xs font-mono text-accent tracking-widest uppercase mb-3">
              {t("services.kicker")}
            </p>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight max-w-2xl">
              {t("services.title")}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">{t("services.sub")}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <Link
              key={s.tier}
              href="/services"
              className="card-lift rounded-2xl border border-border bg-surface p-8 md:p-10 group relative overflow-hidden"
            >
              <div
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)", filter: "blur(50px)" }}
              />
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent">{s.tier}</span>
                <span className="text-2xl font-light text-muted-foreground/40 font-mono">0{i + 1}</span>
              </div>
              <h3 className="text-2xl font-medium mb-3 group-hover:text-accent transition-colors">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CUSTOM DEV — classic craft */}
      <section className="border-y border-border bg-surface/40 relative overflow-hidden">
        <div className="orb orb-accent w-[400px] h-[400px] bottom-[-200px] right-[-100px]" />
        <div className="mx-auto max-w-7xl px-6 py-24 relative">
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-3">
            {t("customDev.kicker")}
          </p>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight max-w-2xl mb-6">
            {t("customDev.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-16">{t("customDev.sub")}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {customDev.map((c) => (
              <div key={c.title} className="card-lift rounded-2xl border border-border bg-background p-7">
                <div className="text-2xl text-accent mb-4">{c.icon}</div>
                <h3 className="text-lg font-medium mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STRIP — with product visuals */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-mono text-accent tracking-widest uppercase mb-3">
              {t("cases.kicker")}
            </p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">{t("cases.title")}</h2>
          </div>
          <Link href="/work" className="hidden md:inline-flex text-sm text-muted-foreground hover:text-accent transition-colors">
            {t("cases.viewAll")} →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="card-lift rounded-2xl border border-border bg-surface overflow-hidden group flex flex-col"
            >
              <div className="p-3 pb-0">
                <CaseVisual industry={c.industry} />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <span className="self-start font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-muted text-muted-foreground mb-4">
                  {t("cases.sample")}
                </span>
                <h3 className="text-xl font-medium mb-2 group-hover:text-accent transition-colors">
                  {zh ? c.titleZh : c.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {zh ? c.summaryZh : c.summaryEn}
                </p>
                <span className="mt-5 text-sm text-accent">{t("cases.readCase")} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AI TOOLCHAIN EVIDENCE */}
      <section className="border-y border-border bg-surface/40 relative overflow-hidden">
        <div className="orb orb-emerald w-[300px] h-[300px] top-[-100px] left-[20%]" />
        <div className="mx-auto max-w-7xl px-6 py-24 relative">
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-3">
            {t("evidence.kicker")}
          </p>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight max-w-3xl mb-6">
            {t("evidence.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-16">{t("evidence.sub")}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <div key={tool.name} className="card-lift rounded-2xl border border-border bg-background p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-mono text-sm text-accent">{tool.name}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-10">
          {t("industries.title")}
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              className="card-lift min-w-60 snap-start rounded-2xl border border-border bg-surface p-6 group"
            >
              <h3 className="text-lg font-medium mb-2 group-hover:text-accent transition-colors">
                {zh ? ind.nameZh : ind.nameEn}
              </h3>
              <p className="text-sm text-muted-foreground">{zh ? ind.taglineZh : ind.taglineEn}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-surface p-12 md:p-20">
          <div className="orb orb-accent w-[500px] h-[500px] bottom-[-250px] right-[-150px] opacity-70" />
          <div className="absolute inset-0 bg-grid" />
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight max-w-2xl mb-6">
              {t("cta.title1")}
              <br />
              <span className="gradient-text">{t("cta.title2")}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mb-10 text-lg">{t("cta.sub")}</p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition shadow-[0_0_40px_-8px_var(--accent)]"
            >
              {t("cta.button")}
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
