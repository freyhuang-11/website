# Jimeng Network — Official Site + SEO/GEO Engine

> Your tools. Custom-built. AI-powered.

AI 时代软件定制开发公司的官网 + 后台 + SEO 自动化 + GEO 内容引擎。

- 前台：英文为主、中文为辅（next-intl，`/en` `/zh`）
- 后台：中文为主（`/admin`），仪表盘 / 线索 / 内容 / GEO 审核 / GEO 来源 / 设置
- SEO 自动化：sitemap / robots / OG / JSON-LD / llms.txt / llms-full.txt / RSS
- GEO 自动化：白名单 RSS 采集 → Claude 分类/角度/长文 → 人工审核 → 自动发布 + IndexNow

## 快速开始

```bash
cd web
cp .env.example .env
pnpm install
pnpm prisma db push
pnpm tsx prisma/seed.ts
pnpm tsx prisma/seed-articles.ts
pnpm dev
```

- 前台 http://localhost:3000
- 后台 http://localhost:3000/admin
  默认账号 `admin@jimeng.network` / `admin123`（在 `.env` 中修改）

## 文档导航

需求与决策：
- [HANDOFF.md](./HANDOFF.md) — 给执行模型的完整交接说明（v2 终版）
- [PROJECT_BRIEF.md](./PROJECT_BRIEF.md) — 历史 v1（已被 HANDOFF.md 取代）

工程文档：
- [架构说明](./web/docs/architecture.md)
- [开发指南](./web/docs/development.md)（含 Windows 本机已知坑）
- [数据库](./web/docs/database.md)
- [API 一览](./web/docs/api.md)
- [多语言](./web/docs/i18n.md)
- [SEO 引擎](./web/docs/seo.md)
- [GEO 引擎](./web/docs/geo.md)（重点）
- [3 天成交 SOP](./web/docs/sales-sop.md)
- [部署上线](./web/docs/deployment.md)
- [接手清单](./web/docs/handover-checklist.md)

## 技术栈

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · next-intl 4 ·
Prisma 6 (SQLite dev / Postgres prod) · 自研 HMAC 会话 · Anthropic SDK ·
rss-parser · node-cron · WebGL shader（首屏，三层降级）。

## 项目状态

v1 全部交付完成（构建通过）；视觉迭代进行中（提亮底色 / 案例 mockup / 服务区分 AI 主营 +
传统定制 / 移动端菜单 / 明暗切换）。详见 HANDOFF.md §17。
