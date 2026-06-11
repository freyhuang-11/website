# 部署上线

两条路线任选。上线前先过一遍 `handover-checklist.md`。

## 路线 A：Vercel（最快）

1. 仓库推 GitHub → Vercel import（root 选 `web/`）
2. 数据库换托管 Postgres（Neon / Supabase）：
   - schema provider 改 `postgresql`（见 database.md）
   - Vercel 环境变量配 `DATABASE_URL`
3. 全部 `.env` 变量录入 Vercel（`AUTH_SECRET` 重新生成！）
4. 内置 cron 不适用 serverless → `GEO_CRON_DISABLED=true`，添加 `vercel.json`：
   ```json
   { "crons": [{ "path": "/api/geo/crawl", "schedule": "0 2,14 * * *" }] }
   ```
   注意：Vercel cron 是 GET，给 `/api/geo/crawl` 加一个 `export const GET = POST` 别名，
   并加 token 校验（见 api.md 加固节）。
5. 域名 `jimeng.it.com` 解析到 Vercel → `PUBLIC_SITE_URL=https://jimeng.it.com`

## 路线 B：自有服务器（Docker）

`web/docker-compose.yml`（生产参考）：

```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: jimeng
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: jimeng
    volumes: ["pgdata:/var/lib/postgresql/data"]
    restart: unless-stopped
  web:
    build: .
    ports: ["3000:3000"]
    env_file: .env.production
    depends_on: [db]
    restart: unless-stopped
volumes:
  pgdata:
```

Dockerfile（多阶段，标准 Next.js standalone）：

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable && pnpm prisma generate && pnpm build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

（需在 `next.config.ts` 加 `output: "standalone"`。）

Nginx 反代 + HTTPS：

```nginx
server {
  server_name jimeng.it.com;
  location / { proxy_pass http://127.0.0.1:3000; proxy_set_header Host $host; }
  # /admin 加 IP 白名单：
  location /admin { allow 1.2.3.4; deny all; proxy_pass http://127.0.0.1:3000; }
}
```
证书：`certbot --nginx -d jimeng.it.com`。

## 上线后验证（5 分钟）

```bash
curl -I https://jimeng.it.com            # 302 → /en 或 /zh
curl https://jimeng.it.com/sitemap.xml | head
curl https://jimeng.it.com/llms.txt | head
curl -X POST https://jimeng.it.com/api/geo/crawl   # （加 token 后带 token）
```
然后 Search Console 提交 sitemap，跑一次 Lighthouse（目标：Perf ≥90 / SEO ≥95）。

## 备份

Postgres 每日：`0 4 * * * pg_dump -U jimeng jimeng | gzip > /backup/jimeng-$(date +\%F).sql.gz`
（保留 30 天，异地一份。）
