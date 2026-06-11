# API 一览

所有 API 为同仓 Route Handlers（`src/app/api/`）。无公开鉴权的写接口仅 leads/quote（蜜罐与限流见「上线加固」）。

## 公开接口

### `POST /api/quote` — 报价器留资
```json
{
  "projectType": "agent", "scale": "lt10", "timeline": "1to3m",
  "needAI": "yes", "needI18n": true,
  "email": "x@y.com", "company": "可选", "notes": "可选",
  "locale": "en", "estimateLow": 23500, "estimateHigh": 37500
}
```
→ `{ "ok": true, "id": "<leadId>" }`；并异步 POST 到 `webhook.lead_forward_url`（如已配置）。

### `POST /api/leads` — 联系表单
```json
{ "name": "可选", "email": "x@y.com", "message": "...", "locale": "en" }
```
→ 同上。

## 内部 / 运维接口

### `POST /api/geo/crawl` — 跑完整 GEO 管线
采集→分类→起草。返回：
```json
{ "crawl": [{"source": "...", "added": 20, "error": "可选"}], "scored": 15, "drafted": 3 }
```
内置 cron 自动调用（02:00/14:00）；Vercel 部署时改用 Vercel Cron 调本接口。

### `POST /api/geo/publish` — 发布/弃稿
```json
{ "candidateId": "...", "action": "publish" | "reject" }
```
publish → 翻译中文、建 Article、ping IndexNow，返回 `{ "ok": true, "slug": "..." }`。
（后台 UI 用 Server Actions 直调同一逻辑，本接口供脚本/外部系统用。）

## SEO 端点（GET，全自动派生）

| 路径 | 内容 |
|---|---|
| `/sitemap.xml` | 全站 URL + hreflang（en/zh） |
| `/robots.txt` | 禁 /admin /api，指 sitemap |
| `/llms.txt` | 给 LLM 爬虫的站点摘要 |
| `/llms-full.txt` | 全部已发布内容的机读索引 |
| `/feed.xml` | 文章 RSS（最近 50 篇） |

## 上线加固建议（v1.1）

- `/api/geo/*` 加 Bearer token（环境变量比对）
- leads/quote 加 IP 限流（如 `@upstash/ratelimit`）+ 表单蜜罐字段
