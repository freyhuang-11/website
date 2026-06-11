import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

async function addSource(formData: FormData) {
  "use server";
  const name = String(formData.get("name") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  if (!name || !/^https?:\/\//.test(url)) return;
  await prisma.source.upsert({ where: { url }, update: { name }, create: { name, url } });
  revalidatePath("/admin/geo/sources");
}

async function toggleSource(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const s = await prisma.source.findUnique({ where: { id } });
  if (s) await prisma.source.update({ where: { id }, data: { enabled: !s.enabled } });
  revalidatePath("/admin/geo/sources");
}

async function deleteSource(formData: FormData) {
  "use server";
  await prisma.source.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/geo/sources");
}

export default async function SourcesPage() {
  const sources = await prisma.source.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-medium mb-2">GEO 采集来源</h1>
      <p className="text-sm text-muted-foreground mb-8">
        仅白名单 RSS 源会被采集。调度：每日 02:00 与 14:00（cron <code className="font-mono">0 2,14 * * *</code>）。
      </p>

      <form action={addSource} className="flex gap-3 mb-8 max-w-2xl">
        <input
          name="name"
          placeholder="来源名称"
          required
          className="w-48 px-4 py-2.5 rounded-xl bg-surface border border-border focus:border-accent outline-none text-sm"
        />
        <input
          name="url"
          placeholder="https://example.com/feed.xml"
          required
          className="flex-1 px-4 py-2.5 rounded-xl bg-surface border border-border focus:border-accent outline-none text-sm font-mono"
        />
        <button className="px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition whitespace-nowrap">
          + 添加
        </button>
      </form>

      <div className="rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3 font-medium">名称</th>
              <th className="text-left px-4 py-3 font-medium">URL</th>
              <th className="text-left px-4 py-3 font-medium">上次运行</th>
              <th className="text-left px-4 py-3 font-medium">状态</th>
              <th className="text-left px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sources.map((s) => (
              <tr key={s.id} className={s.enabled ? "" : "opacity-50"}>
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground max-w-72 truncate">
                  {s.url}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {s.lastRunAt?.toISOString().slice(0, 16).replace("T", " ") ?? "—"}
                </td>
                <td className="px-4 py-3">
                  {s.lastError ? (
                    <span className="text-xs px-2 py-0.5 rounded bg-red-400/15 text-red-400" title={s.lastError}>
                      报错
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded bg-accent/15 text-accent">正常</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <form action={toggleSource}>
                      <input type="hidden" name="id" value={s.id} />
                      <button className="text-xs px-3 py-1 rounded-full border border-border hover:border-accent hover:text-accent transition">
                        {s.enabled ? "停用" : "启用"}
                      </button>
                    </form>
                    <form action={deleteSource}>
                      <input type="hidden" name="id" value={s.id} />
                      <button className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground hover:border-red-400 hover:text-red-400 transition">
                        删除
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
