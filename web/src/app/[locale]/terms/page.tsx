import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const zh = locale === "zh";

  return (
    <PageShell title={zh ? "服务条款" : "Terms of Service"}>
      <section className="mx-auto max-w-3xl px-6 pb-32 text-muted-foreground leading-relaxed space-y-4">
        <p>
          {zh
            ? "所有项目合作以双方签署的工作说明书（SOW）与合同为准。网站上的报价区间仅供规划参考，不构成要约。"
            : "All engagements are governed by the signed Statement of Work (SOW) and contract. Estimate ranges on this site are for planning purposes only and do not constitute an offer."}
        </p>
        <p>
          {zh
            ? "本页为占位文本，正式上线前请替换为经法务审阅的完整服务条款。"
            : "This page is placeholder copy. Replace with legally reviewed terms before production launch."}
        </p>
      </section>
    </PageShell>
  );
}
