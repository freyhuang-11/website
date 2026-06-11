import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

async function toggleState(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const a = await prisma.article.findUnique({ where: { id } });
  if (a) {
    await prisma.article.update({
      where: { id },
      data: {
        state: a.state === "PUBLISHED" ? "ARCHIVED" : "PUBLISHED",
        publishedAt: a.state === "PUBLISHED" ? a.publishedAt : (a.publishedAt ?? new Date()),
      },
    });
  }
  revalidatePath("/admin/articles");
}

const stateLabel: Record<string, string> = {
  DRAFT: "草稿",
  PENDING_REVIEW: "待审",
  PUBLISHED: "已发布",
  ARCHIVED: "已下线",
};

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-medium mb-2">内容 · 文章</h1>
      <p className="text-sm text-muted-foreground mb-8">
        GEO 引擎产出的文章在「GEO 审核」中发布后会出现在这里；此处可一键下线 / 重新上线。
      </p>
      <div className="rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3 font-medium">标题</th>
              <th className="text-left px-4 py-3 font-medium">主题</th>
              <th className="text-left px-4 py-3 font-medium">发布时间</th>
              <th className="text-left px-4 py-3 font-medium">状态</th>
              <th className="text-left px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {articles.map((a) => (
              <tr key={a.id}>
                <td className="px-4 py-3">
                  <div>{a.titleZh}</div>
                  <a
                    href={`/en/insights/${a.slug}`}
                    target="_blank"
                    className="font-mono text-xs text-muted-foreground hover:text-accent"
                  >
                    /{a.slug} ↗
                  </a>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{a.topic}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {a.publishedAt?.toISOString().slice(0, 10) ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      a.state === "PUBLISHED" ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {stateLabel[a.state] ?? a.state}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <form action={toggleState}>
                    <input type="hidden" name="id" value={a.id} />
                    <button className="text-xs px-3 py-1 rounded-full border border-border hover:border-accent hover:text-accent transition">
                      {a.state === "PUBLISHED" ? "下线" : "上线"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
