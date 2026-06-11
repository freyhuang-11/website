import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { prisma } from "@/lib/prisma";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const zh = locale === "zh";

  const faqs = await prisma.faq.findMany({ orderBy: { order: "asc" } });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: zh ? f.questionZh : f.questionEn,
      acceptedAnswer: { "@type": "Answer", text: zh ? f.answerZh : f.answerEn },
    })),
  };

  return (
    <PageShell title={t("faq.title")} sub={t("faq.sub")}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto max-w-4xl px-6 pb-32">
        <div className="divide-y divide-border border-y border-border">
          {faqs.map((f) => (
            <details key={f.id} className="group py-6">
              <summary className="flex items-center justify-between cursor-pointer list-none text-lg font-medium">
                {zh ? f.questionZh : f.questionEn}
                <span className="text-muted-foreground group-open:rotate-45 transition-transform text-2xl font-light">
                  +
                </span>
              </summary>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {zh ? f.answerZh : f.answerEn}
              </p>
            </details>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
