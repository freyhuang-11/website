import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

async function toggleHandled(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (lead) {
    await prisma.lead.update({ where: { id }, data: { handled: !lead.handled } });
  }
  revalidatePath("/admin/leads");
}

const fmt$ = (n: number | null) => (n ? `$${(n / 1000).toFixed(1)}k` : "—");

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <div>
      <h1 className="text-2xl font-medium mb-8">线索（最近 100 条）</h1>
      <div className="rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3 font-medium">时间</th>
              <th className="text-left px-4 py-3 font-medium">邮箱</th>
              <th className="text-left px-4 py-3 font-medium">来源</th>
              <th className="text-left px-4 py-3 font-medium">类型</th>
              <th className="text-left px-4 py-3 font-medium">预估区间</th>
              <th className="text-left px-4 py-3 font-medium">备注</th>
              <th className="text-left px-4 py-3 font-medium">状态</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((l) => (
              <tr key={l.id} className={l.handled ? "opacity-50" : ""}>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {l.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                </td>
                <td className="px-4 py-3">{l.email}</td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted">{l.source}</span>
                </td>
                <td className="px-4 py-3">{l.projectType}</td>
                <td className="px-4 py-3 font-mono text-xs">
                  {fmt$(l.estimateLow)}–{fmt$(l.estimateHigh)}
                </td>
                <td className="px-4 py-3 text-muted-foreground max-w-60 truncate">{l.notes}</td>
                <td className="px-4 py-3">
                  <form action={toggleHandled}>
                    <input type="hidden" name="id" value={l.id} />
                    <button
                      className={`text-xs px-3 py-1 rounded-full border transition ${
                        l.handled
                          ? "border-border text-muted-foreground"
                          : "border-accent text-accent hover:bg-accent/10"
                      }`}
                    >
                      {l.handled ? "已处理" : "标记处理"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                  暂无线索
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
