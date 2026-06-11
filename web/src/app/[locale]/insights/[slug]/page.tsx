import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { marked } from "marked";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/page-shell";
import { prisma } from "@/lib/prisma";

type FaqItem = { qEn: string; aEn: string; qZh: string; aZh: string };
type SourceItem = { title: string; url: string };

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const zh = locale === "zh";

  const a = await prisma.article.findUnique({ where: { slug } });
  if (!a || a.state !== "PUBLISHED") notFound();

  const body = zh ? a.bodyZh : a.bodyEn;
  const html = await marked.parse(body);
  const faqs: FaqItem[] = a.faqJson ? JSON.parse(a.faqJson) : [];
  const sources: SourceItem[] = a.sourcesJson ? JSON.parse(a.sourcesJson) : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: zh ? a.titleZh : a.titleEn,
    description: zh ? a.tldrZh : a.tldrEn,
    datePublished: a.publishedAt?.toISOString(),
    dateModified: a.updatedAt.toISOString(),
    author: { "@type": "Organization", name: "Jimeng Network" },
    publisher: { "@type": "Organization", name: "Jimeng Network" },
  };

  const faqLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: zh ? f.qZh : f.qEn,
            acceptedAnswer: { "@type": "Answer", text: zh ? f.aZh : f.aEn },
          })),
        }
      : null;

  return (
    <PageShell
      kicker={a.publishedAt?.toISOString().slice(0, 10)}
      title={zh ? a.titleZh : a.titleEn}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <article className="mx-auto max-w-3xl px-6 pb-32">
        {/* TL;DR — GEO citable unit */}
        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6 mb-12">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
            {t("insights.tldr")}
          </div>
          <p className="text-foreground leading-relaxed">{zh ? a.tldrZh : a.tldrEn}</p>
        </div>

        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {sources.length > 0 && (
          <div className="mt-16 border-t border-border pt-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
              {t("insights.sources")}
            </h2>
            <ul className="space-y-2">
              {sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    rel="nofollow noopener"
                    target="_blank"
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {s.title} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-16 rounded-2xl border border-border bg-surface p-8 text-center">
          <h2 className="text-2xl font-medium mb-4">{t("insights.ctaTitle")}</h2>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition"
          >
            {t("insights.ctaButton")} →
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
