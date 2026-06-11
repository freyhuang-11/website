import "../globals.css";

export const metadata = { title: "登录 · Jimeng 管理后台", robots: { index: false } };

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" data-theme="dark">
      <body className="min-h-screen flex items-center justify-center">{children}</body>
    </html>
  );
}
