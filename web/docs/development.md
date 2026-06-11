# 开发指南

## 环境要求

- Node 20+（开发机为 24.14.1）
- pnpm 9+（`npm install -g pnpm`）
- Docker 仅生产 Postgres 需要，本地开发**不需要**

## 首次启动（10 分钟内可跑通）

```bash
cd web
cp .env.example .env          # 默认值即可本地跑
pnpm install
pnpm prisma db push           # 创建 prisma/dev.db (SQLite)
pnpm tsx prisma/seed.ts       # 种子：6 案例/9 FAQ/6 行业/10 源/admin 账号
pnpm dev                      # http://localhost:3000
```

后台：`/admin`，账号密码来自 `.env` 的 `ADMIN_EMAIL` / `ADMIN_PASSWORD`（seed 时写入）。
改密码：改 `.env` 后重跑 seed，或直接 update User 表（sha256 哈希）。

## 环境变量速查（.env.example 有完整注释）

| 变量 | 作用 | 本地默认 |
|---|---|---|
| `DATABASE_URL` | 数据库 | `file:./dev.db` |
| `AUTH_SECRET` | 会话签名 | dev 占位，**上线必换** |
| `ANTHROPIC_API_KEY` | GEO AI 调用 | 空（自动进 MOCK 模式） |
| `GEO_MOCK_MODE` | 强制 mock | `true` |
| `INDEXNOW_KEY` | IndexNow 推送 | 占位 hex |
| `PUBLIC_SITE_URL` | sitemap/canonical 绝对地址 | `https://jimeng.it.com` |
| `GEO_CRON_DISABLED` | 关闭内置 cron | 未设 |

## 本机已知坑（Windows / 本仓库）

1. **`D:\` 根目录不可写**（EPERM）。pnpm store 已配置到 `D:/SamsoData/.pnpm-store`
   （`pnpm config get store-dir` 验证）。corepack 也会写 D:\ 失败 → 用 `npm i -g pnpm`。
2. pnpm 11 的构建脚本白名单在 `pnpm-workspace.yaml` 的 `allowBuilds` 字段
   （不再读 package.json 的 `pnpm` 字段）。新增带 postinstall 的依赖如被拦截，在那里加。
3. **Prisma 必须用 v6**。v7 移除了 schema 内 `url =` 的写法，本项目按 v6 约定编写。
   升级 v7 需要迁移到 `prisma.config.ts` + driver adapters，不建议在交接期做。
4. `pnpm tsx -e "..."` 内联脚本在本机会静默无输出——把脚本写成文件放在项目目录内再跑。

## 常用命令

```bash
pnpm dev                # 开发（Turbopack）
pnpm build && pnpm start  # 生产构建/运行
pnpm lint               # ESLint
pnpm prisma studio      # 图形化看库
pnpm tsx prisma/seed.ts # 重跑种子（upsert，幂等）
curl -X POST localhost:3000/api/geo/crawl  # 手动跑 GEO 管线
```

## 如何换成 Auth.js（如需 SSO/OAuth）

当前鉴权在 `src/lib/auth.ts`（HMAC cookie，~60 行）。替换步骤：
1. `pnpm add next-auth@beta @auth/prisma-adapter`
2. 按 Auth.js v5 文档建 `src/auth.ts` + `/api/auth/[...nextauth]`
3. 把 `admin/layout.tsx` 的 `getSessionUserId()` 换成 `auth()` 会话检查
4. 删除 `src/lib/auth.ts` 与 `/admin-login`（Auth.js 自带登录页）

## 代码风格

- 默认 Server Component；`"use client"` 仅限：hero-canvas、quote-wizard、lead-form、locale-switcher
- 变更数据一律 Server Actions（admin 内）或 API route（公开表单）
- 双语内容字段成对出现（`titleEn`/`titleZh`），不引入嵌套 JSON
