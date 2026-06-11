import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [leadsToday, leadsTotal, unhandled, published, pending, sources, sourceErrors] =
    await Promise.all([
      prisma.lead.count({ where: { createdAt: { gte: today } } }),
      prisma.lead.count(),
      prisma.lead.count({ where: { handled: false } }),
      prisma.article.count({ where: { state: "PUBLISHED" } }),
      prisma.candidate.count({ where: { state: "PENDING_REVIEW" } }),
      prisma.source.count({ where: { enabled: true } }),
      prisma.source.count({ where: { lastError: { not: null } } }),
    ]);

  const cards = [
    { label: "今日新线索", value: leadsToday, href: "/admin/leads" },
    { label: "未处理线索", value: unhandled, href: "/admin/leads", warn: unhandled > 0 },
    { label: "累计线索", value: leadsTotal, href: "/admin/leads" },
    { label: "已发布文章", value: published, href: "/admin/articles" },
    { label: "待审核候选稿", value: pending, href: "/admin/geo", warn: pending > 0 },
    { label: "启用中的采集源", value: sources, href: "/admin/geo/sources" },
    { label: "采集源报错", value: sourceErrors, href: "/admin/geo/sources", warn: sourceErrors > 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-medium mb-8">仪表盘</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-border bg-surface p-6 hover:border-accent/40 transition-colors"
          >
            <div
              className={`text-4xl font-medium mb-2 ${c.warn ? "text-amber-400" : "text-accent"}`}
            >
              {c.value}
            </div>
            <div className="text-sm text-muted-foreground">{c.label}</div>
          </Link>
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-medium mb-2">3 天成交 SOP 提示</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          新线索须在 <span className="text-accent">4 小时内</span>首次响应（Day 1），48
          小时内发出方案与报价（Day 2），72 小时内推动签约（Day 3）。未处理线索请优先清零。
        </p>
      </div>
    </div>
  );
}
