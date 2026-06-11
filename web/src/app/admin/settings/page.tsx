import { revalidatePath } from "next/cache";
import { getSetting, setSetting } from "@/lib/settings";

const FIELDS = [
  { key: "contact.email", label: "销售邮箱", placeholder: "hello@jimeng.network" },
  { key: "contact.whatsapp", label: "WhatsApp 链接", placeholder: "https://wa.me/8613800000000" },
  { key: "contact.wechat_qr_url", label: "微信二维码图片 URL", placeholder: "/uploads/wechat-qr.png" },
  { key: "contact.calendly_url", label: "Calendly / Cal.com 预约链接", placeholder: "https://cal.com/yourname/30min" },
  { key: "webhook.lead_forward_url", label: "线索转发 Webhook（你的建联系统）", placeholder: "https://your-crm.example.com/hooks/lead" },
] as const;

async function save(formData: FormData) {
  "use server";
  for (const f of FIELDS) {
    const v = String(formData.get(f.key) ?? "").trim();
    await setSetting(f.key, v);
  }
  revalidatePath("/admin/settings");
}

export default async function SettingsPage() {
  const values = Object.fromEntries(
    await Promise.all(FIELDS.map(async (f) => [f.key, await getSetting(f.key, "")])),
  ) as Record<string, string>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-medium mb-2">系统设置</h1>
      <p className="text-sm text-muted-foreground mb-8">
        联系入口即时生效于前台联系页与页脚。「线索转发 Webhook」配置后，每条新线索会以 JSON POST
        到该地址，用于对接你自己的建联系统。
      </p>
      <form action={save} className="space-y-5">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="block text-sm text-muted-foreground mb-2">{f.label}</label>
            <input
              name={f.key}
              defaultValue={values[f.key]}
              placeholder={f.placeholder}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-accent outline-none text-sm font-mono"
            />
          </div>
        ))}
        <button className="px-8 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition">
          保存
        </button>
      </form>
    </div>
  );
}
