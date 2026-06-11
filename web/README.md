# Jimeng Network — Official Site + SEO/GEO Engine

> Your tools. Custom-built. AI-powered.

官网（en/zh 双语）+ 中文后台 + SEO 自动化 + GEO 内容引擎，单仓 Next.js 应用。

## 一行启动

```bash
pnpm install && pnpm prisma db push && pnpm tsx prisma/seed.ts && pnpm dev
```

→ 前台 http://localhost:3000 （自动按浏览器语言跳 `/en` 或 `/zh`）
→ 后台 http://localhost:3000/admin （默认账号 `admin@jimeng.network` / `admin123`，见 `.env`）

## 目录

| 路径 | 说明 |
|---|---|
| `src/app/[locale]/` | 前台页面（en/zh） |
| `src/app/admin/` | 中文后台（仪表盘 / 线索 / 内容 / GEO / 设置） |
| `src/app/api/` | leads、quote、geo 管线 API |
| `src/lib/geo/` | GEO 引擎（采集→分类→撰写→发布→IndexNow） |
| `src/lib/seo/` | SEO 工具（sitemap / llms.txt 数据源） |
| `prisma/` | schema + seed（6 案例 / 9 FAQ / 6 行业 / 10 采集源） |
| `messages/` | i18n 文案（en.json / zh.json） |
| `docs/` | 全部交付文档（接手必读 `docs/handover-checklist.md`） |

## 文档导航

- [架构说明](docs/architecture.md)
- [开发指南](docs/development.md)（环境、常见报错）
- [数据库](docs/database.md)
- [API 一览](docs/api.md)
- [多语言维护](docs/i18n.md)
- [SEO 引擎](docs/seo.md)
- [GEO 引擎](docs/geo.md)（重点）
- [3 天成交 SOP](docs/sales-sop.md)
- [部署上线](docs/deployment.md)
- [接手清单](docs/handover-checklist.md)
