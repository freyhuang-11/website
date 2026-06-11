import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { QuoteWizard } from "@/components/quote-wizard";

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <PageShell title={t("quote.title")} sub={t("quote.sub")}>
      <section className="mx-auto max-w-3xl px-6 pb-32">
        <QuoteWizard />
      </section>
    </PageShell>
  );
}
