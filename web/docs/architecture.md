# 架构说明

## 总览（C4 - Container 级）

```
┌──────────────────────────────────────────────────────────┐
│                     Next.js 16 (单进程)                    │
│                                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐  │
│  │ 前台 (RSC)   │  │ 后台 /admin  │  │ API Routes       │  │
│  │ [locale]/*  │  │ 中文 UI      │  │ /api/leads       │  │
│  │ en 默认     │  │ HMAC 会话    │  │ /api/quote       │  │
│  └──────┬──────┘  └──────┬──────┘  │ /api/geo/*       │  │
│         │                │         └────────┬─────────┘  │
│         └────────┬───────┴──────────────────┘            │
│                  ▼                                        │
│           Prisma 6 (SQLite dev / Postgres prod)           │
│                                                           │
│  instrumentation.ts → node-cron (GEO 每日 02:00/14:00)    │
└──────────────────────────────────────────────────────────┘
          │                          │
          ▼                          ▼
   RSS 白名单源                 Anthropic API
   (rss-parser 采集)        (Haiku 分类 / Sonnet 角度
                             / Opus 长文 / Sonnet 翻译)
                             GEO_MOCK_MODE=true 时跳过
```

## 关键数据流

### 1. 线索流（建联）
访客 → `/quote` 报价器 或 `/contact` 表单 → `POST /api/quote|leads`
→ `Lead` 表 → （可选）`webhook.lead_forward_url` 转发到用户自己的建联系统
→ 后台「线索」页人工处理。

### 2. GEO 内容流
cron / 后台手动 → `runPipeline()`:
`crawler.ts`（RSS→Candidate 去重入库）→ `classifyCandidates`（Haiku 评分，≥60 进入 SCORED）
→ `draftCandidates`（Sonnet 选角度 + Opus 写稿 → PENDING_REVIEW）
→ 后台「GEO 审核」人工发布 → `publisher.ts`（提取标题/TL;DR、Sonnet 翻译中文、创建 Article、
ping IndexNow）→ 文章自动出现在 `/insights`、sitemap、feed.xml、llms-full.txt。

### 3. SEO 派生
所有 SEO 端点都是数据库的纯派生（无需手动维护）：
`sitemap.ts` / `robots.ts` / `llms.txt` / `llms-full.txt` / `feed.xml` 均实时查询 Prisma。

## 关键选型理由

| 选型 | 理由 |
|---|---|
| Next.js App Router + RSC | 前台几乎全部 Server Components，零客户端状态 → SEO 与性能 |
| next-intl `localePrefix: always` | URL 即语言（`/en` `/zh`），hreflang 干净 |
| SQLite (dev) | 零依赖启动；生产切 Postgres 仅改 schema provider + URL（见 database.md） |
| 自研 HMAC 会话而非 Auth.js | 后台单管理员场景，~60 行实现零依赖；需 SSO 时按 development.md 换 Auth.js |
| GEO_MOCK_MODE | 无 API key 时整条管线可演示（固定 fixture），UI/流程不被阻塞 |
| WebGL→Canvas2D→CSS 三层 Hero | 所有访客视觉一致（结构相同精度不同），见 `hero-canvas.tsx` |

## 已知取舍（接手者须知）

- 后台密码为 sha256（无 salt）——**上线前换 bcrypt**（database.md 有迁移步骤）。
- CRM 只做「接收 + 标记处理」，状态机/PDF/邮件营销刻意不做（v1 范围决策）。
- 富文本编辑器（Tiptap）未引入：文章正文以 markdown 存储，后台只做上线/下线；编辑可直接改数据库或 v1.1 加 Tiptap。
- `middleware.ts` 用了已弃用的 middleware 约定（Next 16 建议 proxy），功能正常，升级时改名即可。
