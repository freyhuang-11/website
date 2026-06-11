# 接手清单（Day-1 / Day-3 / Day-7）

## Day-1：跑通（约 10 分钟）

- [ ] 克隆/拿到 `web/` 目录，确认 Node 20+、pnpm 已装
- [ ] `cp .env.example .env`（本地默认值即可）
- [ ] `pnpm install && pnpm prisma db push && pnpm tsx prisma/seed.ts && pnpm dev`
- [ ] 打开 http://localhost:3000 → 看到荧光绿暗色首页（中/英自动）
- [ ] 打开 /admin → 用 `.env` 里的 ADMIN_EMAIL/PASSWORD 登录 → 看到仪表盘
- [ ] /admin/geo 点「立即运行采集管线」→ 队列出现候选稿（MOCK 模式）
- [ ] 点一篇「发布」→ 前台 /en/insights 出现该文章
- [ ] /en/quote 走完 6 步 → /admin/leads 出现线索

## Day-3：接管业务

- [ ] 读完 `docs/architecture.md`、`docs/geo.md`、`docs/sales-sop.md`
- [ ] 在 /admin/settings 填真实联系方式（邮箱 / WhatsApp / 微信二维码 / Calendly）
- [ ] 替换微信二维码：上传图片到 `public/uploads/`，settings 填路径
- [ ] 配置 `webhook.lead_forward_url` 对接你的建联系统（POST JSON，见 api.md）
- [ ] 申请 Anthropic API key → `.env` 填入 + `GEO_MOCK_MODE=false` → 重跑管线看真实产出
- [ ] 修复 4 个失效采集源（/admin/geo/sources 标红的，换新 RSS 地址）
- [ ] 检查 6 个 Sample 案例文案，按真实情况微调或保留

## Day-7：上线

- [ ] 按 `docs/deployment.md` 选路线（Vercel 或 Docker）
- [ ] 数据库切 Postgres（`docs/database.md` 4 步）
- [ ] **安全三件套**：AUTH_SECRET 重新生成 / 密码哈希换 bcrypt / `/api/geo/*` 加 token
- [ ] `PUBLIC_SITE_URL` 改真实域名；放置 `public/<INDEXNOW_KEY>.txt`
- [ ] `jimeng.it.com` 从旧站切流（注意旧站 URL 如有外链，配置 301）
- [ ] Search Console / Bing Webmaster 提交 sitemap
- [ ] Lighthouse 四项验收：Perf ≥90 / SEO ≥95 / A11y ≥95 / BP ≥95
- [ ] 法务复核 /privacy 与 /terms（当前为占位文案）

## 联系与密钥交接表（交接人填写）

| 项 | 值 / 存放处 |
|---|---|
| 域名注册商账号 | ___ |
| 服务器 / Vercel 账号 | ___ |
| Postgres 连接串 | ___ |
| Anthropic API key | ___ |
| Resend API key（可选） | ___ |
| 管理员邮箱/密码 | ___ |
