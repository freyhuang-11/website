import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { LeadForm } from "@/components/lead-form";
import { getContactSettings } from "@/lib/settings";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const contact = await getContactSettings();

  return (
    <PageShell title={t("contact.title")} sub={t("contact.sub")}>
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid lg:grid-cols-2 gap-16">
          <LeadForm />
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
              {t("contact.channels")}
            </h2>
            <div className="space-y-4">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center justify-between rounded-2xl border border-border bg-surface p-6 hover:border-accent/40 transition-colors group"
              >
                <span className="font-medium group-hover:text-accent transition-colors">
                  {t("contact.email")}
                </span>
                <span className="font-mono text-sm text-muted-foreground">{contact.email}</span>
              </a>
              {contact.whatsapp && (
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-between rounded-2xl border border-border bg-surface p-6 hover:border-accent/40 transition-colors group"
                >
                  <span className="font-medium group-hover:text-accent transition-colors">
                    {t("contact.whatsapp")}
                  </span>
                  <span className="text-muted-foreground">↗</span>
                </a>
              )}
              {contact.calendly && (
                <a
                  href={contact.calendly}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-between rounded-2xl border border-border bg-surface p-6 hover:border-accent/40 transition-colors group"
                >
                  <span className="font-medium group-hover:text-accent transition-colors">
                    {t("contact.book")}
                  </span>
                  <span className="text-muted-foreground">↗</span>
                </a>
              )}
              {contact.wechatQr && (
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <div className="font-medium mb-4">{t("contact.wechat")}</div>
                  <Image
                    src={contact.wechatQr}
                    alt={t("contact.wechatScan")}
                    width={160}
                    height={160}
                    className="rounded-xl border border-border"
                  />
                  <p className="text-sm text-muted-foreground mt-3">{t("contact.wechatScan")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
