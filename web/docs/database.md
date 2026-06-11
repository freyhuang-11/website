# 数据库

Prisma 6 + SQLite（dev）/ PostgreSQL（prod）。schema：`prisma/schema.prisma`。

## 模型一览

| 模型 | 用途 | 关键字段 |
|---|---|---|
| `User` | 后台账号 | `role`: ADMIN/EDITOR/VIEWER；`passwordHash`: sha256 |
| `Lead` | 线索（报价器 + 联系表单） | `source`: quote/contact；`estimateLow/High`；`handled` |
| `Article` | 文章（GEO 产出 + 手工） | 双语字段成对；`state`: DRAFT→PENDING_REVIEW→PUBLISHED→ARCHIVED |
| `Case` | 案例（全部 `isSample=true`） | challenge/solution/result 三段双语 |
| `Industry` | 行业方案 | slug 对应 `/industries/[slug]` |
| `Faq` | FAQ | 前台 FAQPage schema 自动生成 |
| `Source` | GEO 采集源白名单 | `cron` 默认 `0 2,14 * * *`；`lastError` 监控 |
| `Candidate` | GEO 候选稿 | `state`: NEW→SCORED→PENDING_REVIEW→PUBLISHED/REJECTED；`originUrl` 唯一去重 |
| `Setting` | KV 配置 | 联系入口、webhook 等（值为 JSON 字符串） |

## Setting 已用 key

```
contact.email / contact.whatsapp / contact.wechat_qr_url / contact.calendly_url
webhook.lead_forward_url
```

## 切换到 Postgres（上线）

1. `prisma/schema.prisma` 改 `provider = "postgresql"`
2. `.env` 改 `DATABASE_URL="postgresql://user:pwd@host:5432/jimeng"`
3. `pnpm prisma migrate dev --name init`（生成首个迁移）
4. `pnpm tsx prisma/seed.ts`
5. 注意：SQLite 无原生 enum/JSON 列，本 schema 刻意全用 String，**Postgres 下无需改模型**。

## 上线前安全必改

- `User.passwordHash` 由 sha256 换 bcrypt：
  `pnpm add bcryptjs` → 改 `src/lib/auth.ts` 的 `sha256()` 调用为 `bcrypt.compare`
  → 重置管理员密码。
- `AUTH_SECRET` 用 `openssl rand -base64 32` 重新生成。

## 备份

SQLite：直接拷贝 `prisma/dev.db`。
Postgres：`pg_dump`（deployment.md 有 cron 示例）。
