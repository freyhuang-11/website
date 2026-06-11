import { redirect } from "next/navigation";
import { login, getSessionUserId } from "@/lib/auth";

async function loginAction(formData: FormData) {
  "use server";
  const ok = await login(
    String(formData.get("email") ?? ""),
    String(formData.get("password") ?? ""),
  );
  redirect(ok ? "/admin" : "/admin-login?error=1");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getSessionUserId()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <form
      action={loginAction}
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 space-y-4"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="h-6 w-6 rounded-sm bg-accent" />
        <span className="font-mono text-sm">jimeng · 管理后台</span>
      </div>
      {error && <p className="text-sm text-red-400">邮箱或密码错误</p>}
      <div>
        <label className="block text-sm text-muted-foreground mb-2">邮箱</label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent outline-none"
        />
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-2">密码</label>
        <input
          name="password"
          type="password"
          required
          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent outline-none"
        />
      </div>
      <button className="w-full py-3 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition">
        登录
      </button>
    </form>
  );
}
