# 软件定制开发公司官网 + 建联/获客系统
## 项目交接说明书（Project Brief / Model Handoff Document）

> 本文档用于把当前需求**完整、无损**地交接给下一个模型（目标：Fable 5）继续执行。
> 阅读顺序：1. 项目目标 → 2. 多视角共识 → 3. 范围与产物 → 4. 技术栈 → 5. 功能清单 → 6. 3 天成交 SOP → 7. 设计与前端要求 → 8. 多语言 → 9. 自动 SEO/GEO 内容引擎 → 10. 文档交付 → 11. 启动 SOP → 12. 待确认问题清单。

---

## 0. 元信息（Meta）

| 项 | 值 |
|---|---|
| 项目代号 | `aether-studio`（占位，可替换） |
| 文档版本 | v1.0 |
| 编写日期 | 2026-06-11 |
| 编写者 | Claude Opus 4.7（产品 + 销售 + 客户 + AI 解决方案专家联合视角） |
| 目标执行模型 | Claude Fable 5（`claude-fable-5`） |
| 工作模式 | 本地搭建（local-first），同时要求开发文档可让真实工程师无障碍上线 |
| 主语言 | 前台：英文（en）为主，中文（zh）次之；后台：中文（zh）为主，英文（en）次之 |
| 部署目标 | 后续可一键上 Vercel / 自有服务器（Docker） |
| 仓库目录 | `D:/SamsoData/aether-studio/` |

---

## 1. 项目核心目标（One-liner）

> **"做一个让海外/国内客户在 3 天内愿意付定金的、AI 时代软件定制开发公司的高转化官网 + 建联获客中台。"**

三个不可妥协的目标：

1. **专业感拉满**：前端要让访客 5 秒内相信"这家公司技术比 90% 的同行强"。
2. **3 天成交链路**：从落地 → 建联 → 需求澄清 → 报价 → 签单，全流程 SOP 化，系统辅助。
3. **自我增长**：后台具备自动 SEO（传统搜索引擎）+ GEO（Generative Engine Optimization，面向 AI 搜索 / ChatGPT / Perplexity / Google AIO / 百度智能问答）的内容采集与定时发布能力，让站点持续被外部收录与 AI 引用。

---

## 2. 四视角共识（PM × Sales × Customer × AI Solution Architect）

四个角色必须对以下事实达成一致。**任何后续设计决策都要回到这里验证。**

### 2.1 产品经理（PM）视角
- 这不是"展示型官网"，而是**销售漏斗 + CRM 入口 + 内容引擎**三合一系统。
- MVP < 2 周内本地跑通；功能优先级用 MoSCoW（见 §5）。
- 一切前端炫技必须服务于"建立信任 → 触发咨询 → 收集需求"。

### 2.2 销售视角
- 客户决策路径：**好奇 → 信任 → 心动 → 行动 → 成交**。
- 关键转化点：
  - **首屏 hero**：3 秒说清"我们做什么 + 为什么选我们"。
  - **行业方案页**：必须有客户所在行业的影子（电商、SaaS、内部工具、AI Agent、跨境…）。
  - **AI 报价器**：6–10 个问题立刻返回区间报价，降低询价心理门槛。
  - **预约日历**：对接 Cal.com / 自建日历 → 30 分钟免费咨询。
  - **多通道 IM**：微信 / WhatsApp / Telegram，海外/国内双轨。

### 2.3 客户视角（甲方画像：中小企业老板 / 独立创业者 / 海外 SMB）
客户怕：**被宰、做不出来、沟通成本高、不懂技术被忽悠、AI 是噱头。** 官网必须直接回答：
- 💰 **多少钱？** → 轻定制 / 标准 / 旗舰三档区间 + AI 报价器。
- ⏱ **多久？** → 典型项目时间线（甘特图可视化）。
- 🛡 **不交付怎么办？** → 里程碑分期付款 + 代码托管在客户 Git。
- 🤖 **AI 是真的吗？** → 公开内部 AI 工具链（Claude Code / Cursor / v0 / 自研 Agent）截图与短视频。

### 2.4 AI 解决方案专家视角
"AI 定制服务"分四层：
- **L1 工具化**：现成 AI 接入 + Prompt 工程。
- **L2 工作流化**：n8n / 自研编排，把 AI 嵌入企业 SOP（客服、文档、销售）。
- **L3 Agent 化**：为企业搭建带工具调用 / 记忆 / 知识库的专属 Agent。
- **L4 模型化**：微调 / RAG / 私有部署。

官网必须用人话 + 案例解释这四层，禁堆术语。

### ✅ 共识签收
> 下一个模型读到此处请先复述："我理解这是销售漏斗 + 内容引擎 + IM 中台三合一，3 天内成交是核心 KPI，前端炫技为转化服务，AI 能力必须可证伪。" 复述完才能动键盘。

---

## 3. 范围与交付物

### 3.1 一句话范围
**前台官网（en 为主）+ 后台管理系统（zh 为主）+ 自动 SEO/GEO 内容引擎 + 完整技术/开发文档。**

### 3.2 交付物清单
| # | 交付物 | 形态 | 验收标准 |
|---|---|---|---|
| D1 | 前台官网 | Next.js 应用 | 在 1440 / 768 / 375px 三档下视觉无 bug |
| D2 | 后台管理系统 | 同仓 `/admin` | 内容/线索/SEO/GEO/账户五大模块齐全 |
| D3 | 建联系统 | 表单 + IM 路由 + 邮件通知 + CRM 入口 | 提交线索 60 秒内触发企微 + 邮件提醒 |
| D4 | AI 报价器 | 嵌入首页/价格页 | 6–10 问 → 区间报价 + 自动留资 |
| D5 | 自动 SEO 模块 | 后台一键生成 sitemap / robots / OG / schema.org | Lighthouse SEO ≥ 95 |
| D6 | 自动 GEO 内容引擎 | 定时任务 + 白名单 + AI 重写 + 人工审核 | 每日自动产出 ≥ 3 篇候选稿 |
| D7 | 多语言系统 | next-intl | 前台 en/zh、后台 zh/en 全覆盖 |
| D8 | 技术说明文档 | `/docs/architecture.md` | 架构图 + 数据流 + 选型理由 |
| D9 | 开发文档 | `/docs/development.md` | 本地启动 / 环境变量 / 目录结构 / CI/CD / 部署 |
| D10 | 运营 SOP | `/docs/sales-sop.md` | 3 天成交 SOP（见 §6） |

---

## 4. 技术栈

> 原则：选 2026 年最主流、文档最全、AI 工具最熟悉的栈。**不为新而新。**

| 层 | 选型 |
|---|---|
| 前端框架 | **Next.js 15 (App Router) + React 19** |
| 语言 | TypeScript (strict) |
| 样式 | Tailwind CSS v4 + CSS Variables |
| UI 组件 | **shadcn/ui** + Radix |
| 动效 | **Framer Motion** + GSAP（关键转场） |
| 3D / 视觉锤 | React Three Fiber + Drei（带性能 fallback） |
| 国际化 | **next-intl** |
| 表单 | React Hook Form + Zod |
| 富文本 | Tiptap |
| 数据库 | **PostgreSQL**（本地 Docker，生产 Supabase / Neon） |
| ORM | **Prisma** |
| 鉴权 | **Auth.js (NextAuth v5)** |
| 文件 | 本地 `/public/uploads` + 抽象层 → 生产 S3/R2 |
| 邮件 | Resend（开发用 console transport） |
| IM | WhatsApp Business / Telegram Bot / 企业微信 Webhook |
| 定时任务 | **node-cron**（本地）→ 生产 Vercel Cron / BullMQ |
| 采集 | Playwright + RSS Parser + Reddit / HN API |
| AI 调用 | **Anthropic SDK**：默认 `claude-sonnet-4-6`、长文 `claude-opus-4-8`、轻量 `claude-haiku-4-5-20251001` |
| 分析 | Plausible（自托管） + 自建埋点 |
| 容器 | Docker + docker-compose |
| 包管理 | pnpm |

> ⚠️ 所有 LLM 调用必须使用最新模型 ID，禁止硬编码 `claude-3-*` 等旧 ID。

---

## 5. 功能清单（MoSCoW）

### 5.1 前台官网

**Must Have**
- 首页 Hero：动态背景（粒子 / shader / 3D + 降级 fallback）+ 一句话价值主张 + 双 CTA
- `/services`：四层 AI 能力卡片 + 软件定制四象限
- `/work`：可筛选案例 + 详情页
- `/industries/[slug]`：电商、SaaS、内部工具、AI Agent、跨境…
- `/about`：团队 + 价值观 + AI 工具链截图墙
- `/quote` AI 报价器：6–10 问 → 区间报价 + 必填邮箱
- `/contact`：表单 + 日历 + 多 IM 入口
- `/blog`、`/insights`：GEO 内容引擎出口
- FAQ：覆盖客户 9 大恐惧
- 全站 i18n（en/zh）
- 全站 SEO（sitemap / robots / OG / JSON-LD）

**Should Have**
- 暗黑/明亮切换
- Magnetic button / cursor blend
- 滚动叙事案例页
- 社会证明（最近咨询提示）

**Could Have**
- 客户后台（已签约客户看进度）
- 公开 Roadmap

**Won't Have（v1）**
- 复杂电商 / SaaS 化

### 5.2 后台管理系统（`/admin`，中文为主）

1. **仪表盘** — 线索 / 漏斗 / 内容 / SEO 健康分
2. **线索 CRM** — 状态机 `New → Qualified → Quoted → Won/Lost`，备注、跟进、报价 PDF
3. **内容管理** — 文章、案例、行业方案、FAQ（i18n + Tiptap）
4. **SEO 中心** — 元数据、sitemap、关键词跟踪、schema.org 模板
5. **GEO 内容引擎**（见 §9） — 来源、调度、AI 重写、审核、发布
6. **多语言管理** — 缺失项检测
7. **账户与角色** — admin / editor / viewer
8. **系统设置** — API Key、Webhook、IM 路由

---

## 6. 3 天成交 SOP

```
Day 0（访客进站）
  └─ Hero → 信任锚点
  └─ 触发：AI 报价器 / 预约 / IM
        ↓ 系统自动
        - 60 秒内通知销售（企微 + 邮件 + Telegram）
        - 自动回信（en/zh）含 Calendly 链接
        - CRM 创建线索（New）

Day 1（首次沟通）
  └─ 销售 4h 内首响
  └─ 30 min Discovery Call
  └─ Call 后 2h 内 AI 生成《需求摘要 + 方案 + 初步报价 PDF》
  └─ CRM → Qualified

Day 2（方案确认）
  └─ 销售 + 技术 30 min 会议
  └─ 出《正式 SOW + 报价单 + 合同草案》
  └─ CRM → Quoted

Day 3（成交）
  └─ 电子签（DocuSign / 法大大）+ 30% 定金
  └─ CRM → Won
  └─ 自动建项目（Linear / Notion / Git）
  └─ 欢迎邮件 + 客户后台账号
```

后台需要一个"3 天倒计时"组件，每条线索可视化处于第几天、下一步、负责人。

---

## 7. 设计与前端要求

### 7.1 风格关键词
**Editorial · Technical · Confident · 2026**
参考：Linear、Vercel、Stripe、Resend、Anthropic、Cal.com、Liveblocks、Rauno.me、Igloo Inc。

### 7.2 视觉原则
- 大量留白 + 大字号 sans serif + 等宽字体点缀（Geist / Inter / JetBrains Mono）
- 调色板：近黑 `#0A0A0A` + 暖白 `#FAFAFA` + 一个强调色（电光蓝 `#3B82F6` / 荧光绿 `#84CC16` / 紫罗兰，待用户选）
- 微动效贯穿：进入动画、hover magnetic、滚动视差、cursor blend
- 首屏必须有一个**视觉锤子**（粒子 / WebGL / shader / 3D / Lottie）
- 暗模式为主，亮模式为辅

### 7.3 交付前需用户确认（见 §12）

---

## 8. 多语言（i18n）

| 端 | 默认 | 次选 | 实现 |
|---|---|---|---|
| 前台 | `en` | `zh` | next-intl，`/en/...`、`/zh/...`，根路径按 `Accept-Language` 重定向 |
| 后台 | `zh` | `en` | 同上 |

- 静态文案：`messages/en.json`、`messages/zh.json`
- 数据库内容字段：`{ en, zh }` 结构
- 后台高亮翻译缺失项
- AI 自动翻译草稿，人工 review 后发布

---

## 9. 自动 SEO + GEO 内容引擎（重点）

### 9.1 SEO
- 每页：`<title>`、`<meta description>`、OG、Twitter Card、canonical
- JSON-LD：Organization / Service / Article / FAQPage / BreadcrumbList
- sitemap.xml 动态生成（i18n hreflang）
- robots.txt、AVIF 图、Core Web Vitals 全绿（LCP < 2.5s、CLS < 0.1、INP < 200ms）

### 9.2 GEO（面向 AI 搜索）
**目标**：让 ChatGPT / Claude / Perplexity / Google AIO / 百度智能问答**在用户搜"软件定制开发公司"时引用我们**。

要点：
1. **AI 友好结构**：每篇文章顶部 TL;DR (≤60 词) + H2/H3 分段 + Bullet + FAQ schema + 实体加粗
2. **`llms.txt` + `llms-full.txt`**：根目录提供 LLM 爬虫地图
3. **可引用单元**：每段关键论述后埋"数据 / 来源 / 案例编号"
4. **内容产线**（后台自动化）：
   ```
   cron 调度
     → 采集（RSS / 白名单站点 / Reddit / HN / X API）
     → 去重 + 主题分类（Claude Haiku）
     → 角度生成（"我们的独家观点"，Claude Sonnet）
     → 长文撰写（Claude Opus，TL;DR + 引用 + FAQ）
     → 人工审核队列
     → 发布到 /blog + /insights（自动 schema.org Article + FAQPage）
     → ping IndexNow + Google / Bing sitemap
     → 可选转发 Medium / Dev.to / 掘金
   ```
5. **合规**：仅采集白名单且 robots 允许；AI 重写非搬运；附原文出处。

### 9.3 后台 GEO 模块
- 来源管理 / cron 调度 / 审核队列三栏视图 / 发布日历（7/30 天）

---

## 10. 文档交付（Docs Bundle）

| 文件 | 内容 |
|---|---|
| `README.md` | 一句话简介、目录结构、一行启动命令 |
| `docs/architecture.md` | C4 架构图 + 数据流 + 选型理由 |
| `docs/development.md` | 本地环境、`.env`、`pnpm dev` / `docker compose up`、常见报错 |
| `docs/database.md` | Prisma schema + 迁移流程 |
| `docs/api.md` | 后台 API 一览 |
| `docs/i18n.md` | 多语言新增/维护流程 |
| `docs/seo-geo.md` | SEO/GEO 引擎原理、来源添加、模型与 Prompt |
| `docs/sales-sop.md` | §6 详细版 |
| `docs/deployment.md` | Docker → VPS、Vercel、Nginx、HTTPS、备份 |
| `docs/handover-checklist.md` | 接手人 Day-1 checklist |

**写作标准**：新工程师 Day-1 跑通、Day-3 改业务、Day-7 上线。

---

## 11. 启动 SOP（接手模型的第一句话该问什么）

> 给 **Fable 5**：拿到本文件后，**不要直接动键盘**。按下面顺序一次性问完用户，再开 sprint 0：

### 必问
1. **品牌**：公司中英文名、Logo 是否已有、Slogan 草案？
2. **强调色**：电光蓝 / 荧光绿 / 紫罗兰 / 自定义？暗模式默认确认？
3. **首屏视觉锤子**：WebGL 粒子 / R3F 3D 几何 / 高端排版 + Motion Grid（3 选 1）
4. **域名与部署**：目标域名？Vercel 还是自有服务器？
5. **联系方式**：销售邮箱、WhatsApp、Telegram、企微 webhook 是否齐备？
6. **报价器三档区间**：轻定制 / 标准 / 旗舰，CNY 与 USD 各自范围？
7. **真实案例**：1–3 个可上线案例，还是全用占位？
8. **GEO 来源白名单**：已有清单还是采用建议清单？
9. **运行环境**：本机 Node 20+ / pnpm / Docker 是否齐备？

建议用 AskUserQuestion 一次性收集。

---

## 12. 待用户确认问题清单（开工前 Checklist）

- [ ] Q1：品牌名（中/英）+ Logo + Slogan
- [ ] Q2：强调色 + 暗/亮模式默认
- [ ] Q3：首屏视觉风格（3 选 1）
- [ ] Q4：报价三档区间
- [ ] Q5：销售联系通道
- [ ] Q6：真实案例 or 占位
- [ ] Q7：GEO 来源白名单 or 采用建议清单
- [ ] Q8：目标客户：海外 / 国内 / 海外为主国内为辅
- [ ] Q9：v1 是否包含 IM 真接入，还是先 mailto + Calendly
- [ ] Q10：本机规格（决定是否启用 R3F / WebGL 重特效）

---

## 13. Definition of Done for v1

- ✅ `pnpm dev` 一键启动前台 + 后台 + Postgres
- ✅ Lighthouse：Performance ≥ 90、SEO ≥ 95、A11y ≥ 95、Best Practices ≥ 95
- ✅ 线索提交 60 秒内销售收到通知 + CRM 出现
- ✅ 后台一键 GEO 采集 → 5 分钟内 ≥ 3 篇候选稿
- ✅ 前台 en/zh 与 后台 zh/en 无 missing key
- ✅ §10 文档齐备，新工程师按 `development.md` 10 分钟跑通
- ✅ 用户自己看完后愿意说："**如果我是客户，我会咨询并下单。**"

---

## 14. 后续扩展（V2+，先不做）
- 客户后台（进度看板）
- 在线签约 + 收款
- 自研 Agent SDK 展示页
- 招聘页
- 多公司 / 多品牌 SaaS 化

---

**文档结束。下一步：把本文件喂给 Fable 5，让它执行 §11，与用户走完 §12，再开 sprint 0。**
