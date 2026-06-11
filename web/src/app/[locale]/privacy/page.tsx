import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const zh = locale === "zh";

  return (
    <PageShell title={zh ? "隐私政策" : "Privacy Policy"}>
      <section className="mx-auto max-w-3xl px-6 pb-32 text-muted-foreground leading-relaxed space-y-4">
        <p>
          {zh
            ? "我们仅收集你主动提交的信息（邮箱、公司、需求描述），用于回应你的咨询。我们不出售、不共享你的个人数据。"
            : "We only collect information you actively submit (email, company, project details) in order to respond to your inquiry. We do not sell or share your personal data."}
        </p>
        <p>
          {zh
            ? "本页为占位文本，正式上线前请替换为经法务审阅的完整隐私政策。"
            : "This page is placeholder copy. Replace with a legally reviewed privacy policy before production launch."}
        </p>
      </section>
    </PageShell>
  );
}
