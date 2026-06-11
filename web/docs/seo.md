# SEO 引擎

原则：**SEO 产物全部是数据库的派生**，发布内容后无需手动维护任何 SEO 文件。

## 自动产物

| 端点 | 源码 | 说明 |
|---|---|---|
| `/sitemap.xml` | `src/app/sitemap.ts` | 静态页 + 文章/案例/行业动态页，每条带 en/zh hreflang |
| `/robots.txt` | `src/app/robots.ts` | 禁 `/admin` `/api` |
| `/llms.txt` | `src/app/llms.txt/route.ts` | LLM 爬虫导航（GEO 关键产物） |
| `/llms-full.txt` | `src/app/llms-full.txt/route.ts` | 全部已发布内容机读索引，1h 缓存 |
| `/feed.xml` | `src/app/feed.xml/route.ts` | RSS 2.0 |

## 结构化数据（JSON-LD）

| 页面 | Schema | 位置 |
|---|---|---|
| 首页 | `Organization` | `[locale]/page.tsx` |
| FAQ 页 | `FAQPage` | `[locale]/faq/page.tsx` |
| 文章页 | `Article` + `FAQPage`（文末 FAQ 自动） | `[locale]/insights/[slug]/page.tsx` |

新增页面要加 schema：参考文章页的 `<script type="application/ld+json">` 写法。

## 元数据

全局模板在 `[locale]/layout.tsx`（`title.template = "%s · Jimeng Network"`、OG、metadataBase）。
每页可用 `generateMetadata()` 覆写；数据库记录预留 `seoTitle*/seoDesc*` 字段（文章表）。

## 性能守则（保 Lighthouse ≥90）

- 图片一律 `next/image`
- Hero shader 帧率自适应 DPR ≤2；离屏即停渲染（v1.1 建议加 IntersectionObserver）
- `"use client"` 组件保持最少（当前仅 4 个）
- 新增第三方脚本必须 `next/script` + `strategy="lazyOnload"`

## 上线后动作清单

1. `PUBLIC_SITE_URL` 改为真实域名 → sitemap/canonical 自动正确
2. Google Search Console + Bing Webmaster 提交 sitemap
3. 放置 IndexNow key 文件：`public/<INDEXNOW_KEY>.txt`，内容为 key 本身
4. 验证 `https://域名/llms.txt` 可访问（部分 AI 爬虫已读取该约定）
