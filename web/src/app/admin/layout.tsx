import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUserId, logout } from "@/lib/auth";
import "../globals.css";

export const metadata = {
  title: "Jimeng 管理后台",
  robots: { index: false },
};

const navItems = [
  { href: "/admin", label: "仪表盘" },
  { href: "/admin/leads", label: "线索" },
  { href: "/admin/articles", label: "内容" },
  { href: "/admin/geo", label: "GEO 审核" },
  { href: "/admin/geo/sources", label: "GEO 来源" },
  { href: "/admin/settings", label: "设置" },
];

async function logoutAction() {
  "use server";
  await logout();
  redirect("/admin-login");
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getSessionUserId();
  if (!userId) redirect("/admin-login");

  return (
    <html lang="zh" data-theme="dark">
      <body className="min-h-screen flex">
        <aside className="w-60 shrink-0 border-r border-border bg-surface flex flex-col">
          <div className="flex items-center gap-2 px-6 h-16 border-b border-border">
            <div className="h-5 w-5 rounded-sm bg-accent" />
            <span className="font-mono text-sm">jimeng 后台</span>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="p-3 border-t border-border space-y-1">
            <a
              href="/en"
              target="_blank"
              className="block px-4 py-2 text-xs text-muted-foreground hover:text-foreground"
            >
              查看前台 ↗
            </a>
            <form action={logoutAction}>
              <button className="w-full text-left px-4 py-2 text-xs text-muted-foreground hover:text-foreground">
                退出登录
              </button>
            </form>
          </div>
        </aside>
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
