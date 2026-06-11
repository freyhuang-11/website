# GEO 引擎（Generative Engine Optimization）

目标：让 ChatGPT / Claude / Perplexity / Google AIO / 百度智能问答在回答
"custom software development" 类问题时**引用本站**。

## 管线（src/lib/geo/）

```
cron (02:00/14:00) 或 后台「立即运行」或 POST /api/geo/crawl
  │
  ▼ crawler.ts      RSS 白名单采集 → Candidate（originUrl 唯一去重）
  ▼ pipeline.ts     classifyCandidates: Haiku 评分，≥60 → SCORED，否则 REJECTED
  ▼ pipeline.ts     draftCandidates: Sonnet 出 3 角度取第一 → Opus 写 1100-1600 词长文
  │                 （结构强制：TL;DR ≤60词 / H2+bullets / Our take / FAQ / Sources）
  ▼ 状态 PENDING_REVIEW —— 人工审核闸门（后台 /admin/geo）
  ▼ publisher.ts    发布：提取标题→slug、Sonnet 翻中文、建 Article(PUBLISHED)
  ▼ indexnow.ts     ping IndexNow（Bing/Yandex）
  ▼ 自动出现在 /insights、sitemap.xml、feed.xml、llms-full.txt
```

## 模型分工（src/lib/anthropic.ts）

| 环节 | 模型 | 环境变量 |
|---|---|---|
| 分类评分 | `claude-haiku-4-5-20251001` | `ANTHROPIC_MODEL_FAST` |
| 角度生成 / 翻译 | `claude-sonnet-4-6` | `ANTHROPIC_MODEL_DEFAULT` |
| 长文撰写 | `claude-opus-4-8` | `ANTHROPIC_MODEL_LONG` |

**MOCK 模式**：`GEO_MOCK_MODE=true` 或无 `ANTHROPIC_API_KEY` 时，所有 AI 调用返回
`prompts.ts` 内的固定 fixture——管线、后台、发布全流程可演示，无成本。
后台 GEO 页会显示黄色 MOCK 徽章提醒。

## Prompt 模板

全部在 `src/lib/geo/prompts.ts`：
- `CLASSIFY_SYSTEM` — 相关性判断（返回 JSON）
- `ANGLE_SYSTEM` — 用公司立场出 3 个差异化角度
- `WRITE_SYSTEM` + `writePrompt()` — 长文结构约束 + 禁 AI 腔（no "delve" 等）

调优入口：改这三个常量即可，无需动管线代码。

## 内容的 GEO 结构（为什么这样写）

- **TL;DR 顶置**（≤60 词）→ AI 引擎最易摘录的 citable unit
- **FAQ 段** → 自动转 FAQPage schema，命中问句类 query
- **实体加粗** → 帮助引擎建立实体关联（公司名/产品名/技术名）
- **Sources 脚注**（nofollow）→ 可信度信号 + 合规（注明出处，重写非搬运）

## 采集合规

- 仅白名单源（后台可增删，建议只加官方 RSS / 公开 API）
- 失败源记录 `lastError` 标红不阻塞其他源
- AI 重写产出观点文，**不是**原文转载；引用处注明出处

## 运维

- 初始 10 源中 4 个 URL 已失效（a16z / Anthropic News / Indie Hackers / Shopify 格式问题）——
  后台「GEO 来源」页标红，找到新 RSS 地址替换即可
- 候选积压清理：REJECTED/NEW 状态超过 30 天可定期 delete（可加 cron）
- 生产环境若部署在 Vercel：`GEO_CRON_DISABLED=true` 关内置 cron，
  用 vercel.json 的 crons 调 `POST /api/geo/crawl`
