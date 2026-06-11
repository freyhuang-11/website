import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { publishCandidate } from "@/lib/geo/publisher";
import { runPipeline } from "@/lib/geo/pipeline";
import { MOCK_MODE } from "@/lib/anthropic";

async function runNow() {
  "use server";
  await runPipeline();
  revalidatePath("/admin/geo");
}

async function decide(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const action = String(formData.get("action"));
  if (action === "publish") {
    await publishCandidate(id);
  } else {
    await prisma.candidate.update({ where: { id }, data: { state: "REJECTED" } });
  }
  revalidatePath("/admin/geo");
}

export default async function GeoQueuePage() {
  const pending = await prisma.candidate.findMany({
    where: { state: "PENDING_REVIEW" },
    include: { source: true },
    orderBy: { score: "desc" },
  });
  const stats = await prisma.candidate.groupBy({ by: ["state"], _count: true });
  const stat = (s: string) => stats.find((x) => x.state === s)?._count ?? 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-medium">GEO 审核队列</h1>
        <form action={runNow}>
          <button className="px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition">
            ▶ 立即运行采集管线
          </button>
        </form>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        采集 {stat("NEW")} 待分类 · {stat("SCORED")} 已评分 · {stat("PENDING_REVIEW")} 待审 ·{" "}
        {stat("PUBLISHED")} 已发布 · {stat("REJECTED")} 已弃
        {MOCK_MODE && (
          <span className="ml-3 text-xs px-2 py-0.5 rounded bg-amber-400/15 text-amber-400">
            MOCK 模式（未配置 ANTHROPIC_API_KEY，AI 输出为固定示例）
          </span>
        )}
      </p>

      <div className="space-y-6">
        {pending.map((c) => (
          <div key={c.id} className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <span className="font-mono text-xs text-accent mr-3">分数 {c.score}</span>
                <span className="text-sm">{c.originTitle}</span>
                <a
                  href={c.originUrl}
                  target="_blank"
                  className="ml-2 font-mono text-xs text-muted-foreground hover:text-accent"
                >
                  原文 ↗
                </a>
              </div>
              <div className="flex gap-2">
                <form action={decide}>
                  <input type="hidden" name="id" value={c.id} />
                  <input type="hidden" name="action" value="publish" />
                  <button className="text-sm px-4 py-1.5 rounded-full bg-accent text-accent-foreground hover:opacity-90 transition">
                    发布
                  </button>
                </form>
                <form action={decide}>
                  <input type="hidden" name="id" value={c.id} />
                  <input type="hidden" name="action" value="reject" />
                  <button className="text-sm px-4 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground transition">
                    弃稿
                  </button>
                </form>
              </div>
            </div>
            <div className="grid md:grid-cols-2 divide-x divide-border">
              <div className="p-6">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  原素材摘要
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {c.excerpt.slice(0, 600)}
                </p>
              </div>
              <div className="p-6">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  AI 草稿（markdown）
                </div>
                <pre className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap max-h-80 overflow-auto font-mono">
                  {c.draftMd?.slice(0, 3000)}
                </pre>
              </div>
            </div>
          </div>
        ))}
        {pending.length === 0 && (
          <div className="rounded-2xl border border-border bg-surface p-12 text-center text-muted-foreground">
            暂无待审候选稿——点击右上角「立即运行采集管线」生成。
          </div>
        )}
      </div>
    </div>
  );
}
