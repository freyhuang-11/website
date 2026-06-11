import { PrismaClient } from "@prisma/client";
import { createHash } from "node:crypto";

const prisma = new PrismaClient();

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

const cases = [
  {
    slug: "cross-border-fulfillment-agent",
    titleEn: "Fulfillment agent for a cross-border brand",
    titleZh: "跨境品牌的履约智能体",
    industry: "cross-border",
    techJson: JSON.stringify(["Next.js", "Claude API", "Postgres", "Shopify API"]),
    summaryEn: "An AI agent that turns messy supplier emails into structured purchase orders, cutting order processing from 40 minutes to 90 seconds.",
    summaryZh: "把杂乱的供应商邮件自动转成结构化采购单的 AI 智能体，订单处理从 40 分钟缩短到 90 秒。",
    challengeEn: "A 12-person cross-border e-commerce brand was drowning in supplier emails — every order meant manual copy-paste across three systems, in two languages.",
    challengeZh: "一家 12 人的跨境电商品牌被供应商邮件淹没——每个订单都要在三个系统之间手动复制粘贴，还涉及两种语言。",
    solutionEn: "We built an email-ingesting agent on the Claude API: it classifies, extracts line items, validates against the product catalog, and drafts POs for one-click approval.",
    solutionZh: "我们基于 Claude API 构建了邮件摄取智能体：自动分类、提取行项目、对照商品目录校验，并生成一键审批的采购单。",
    resultEn: "Order processing time fell 96%. Two ops hires were redirected to growth work. The agent paid for itself in 7 weeks.",
    resultZh: "订单处理时间下降 96%，两名运营转向增长业务，智能体 7 周收回成本。",
    order: 1,
  },
  {
    slug: "saas-usage-billing-engine",
    titleEn: "Usage-based billing engine for a B2B SaaS",
    titleZh: "B2B SaaS 的用量计费引擎",
    industry: "saas",
    techJson: JSON.stringify(["TypeScript", "Stripe", "ClickHouse", "Temporal"]),
    summaryEn: "A metering and billing pipeline that reconciles 30M monthly events into invoices customers actually trust.",
    summaryZh: "将每月 3000 万事件对账成客户真正信任的账单的计量计费流水线。",
    challengeEn: "The client's homegrown billing script was silently dropping events; disputed invoices were costing them two churned accounts a quarter.",
    challengeZh: "客户自研的计费脚本会静默丢失事件，账单争议导致每季度流失两个客户。",
    solutionEn: "Event-sourced metering on ClickHouse with idempotent ingestion, a reconciliation dashboard, and Stripe invoice generation with full audit trails.",
    solutionZh: "基于 ClickHouse 的事件溯源计量、幂等摄取、对账仪表盘，以及带完整审计链路的 Stripe 账单生成。",
    resultEn: "Zero billing disputes in the first two quarters post-launch. Finance closes the month in hours, not days.",
    resultZh: "上线后两个季度零账单争议，财务月结从数天缩短到数小时。",
    order: 2,
  },
  {
    slug: "internal-ops-console",
    titleEn: "Ops console replacing 11 spreadsheets",
    titleZh: "替代 11 张表格的运营中台",
    industry: "internal-tools",
    techJson: JSON.stringify(["Next.js", "Prisma", "Postgres", "n8n"]),
    summaryEn: "One internal console that replaced 11 interlinked spreadsheets for a logistics team of 60.",
    summaryZh: "一个内部中台，替代了 60 人物流团队的 11 张相互关联的表格。",
    challengeEn: "Every workflow lived in spreadsheets with circular references. One mistyped cell once delayed 200 shipments.",
    challengeZh: "所有流程都活在互相引用的表格里，一次单元格输错曾延误 200 个发货。",
    solutionEn: "We mapped the real workflow in a one-week discovery, then shipped a role-based console with validation, audit logs and n8n-automated handoffs.",
    solutionZh: "一周需求挖掘理清真实流程，随后交付带校验、审计日志与 n8n 自动流转的角色化中台。",
    resultEn: "Data entry errors down 88%. New staff onboard in 2 days instead of 3 weeks.",
    resultZh: "录入错误下降 88%，新员工上手时间从 3 周降到 2 天。",
    order: 3,
  },
  {
    slug: "support-knowledge-agent",
    titleEn: "Support agent grounded in 4,000 docs",
    titleZh: "扎根 4000 篇文档的客服智能体",
    industry: "ai-agent",
    techJson: JSON.stringify(["Claude API", "RAG", "pgvector", "Slack API"]),
    summaryEn: "A retrieval-grounded support agent that answers 70% of tickets with citations — and knows when to escalate.",
    summaryZh: "基于检索的客服智能体，带引用回答 70% 的工单，并且知道何时转人工。",
    challengeEn: "A devtools company had 4,000 pages of docs nobody could navigate. Support spent 60% of time answering questions already documented.",
    challengeZh: "一家开发者工具公司有 4000 页没人翻得动的文档，客服 60% 的时间在回答文档里已有答案的问题。",
    solutionEn: "Hybrid retrieval over chunked docs with pgvector, answer drafting with Claude, confidence-gated auto-replies, and seamless human escalation in Slack.",
    solutionZh: "pgvector 混合检索 + Claude 起草回答 + 置信度门控自动回复 + Slack 无缝人工升级。",
    resultEn: "70% auto-resolution with citations. Median first response: 11 seconds. CSAT up 14 points.",
    resultZh: "70% 工单带引用自动解决，首响中位数 11 秒，客户满意度提升 14 分。",
    order: 4,
  },
  {
    slug: "ecommerce-replatform",
    titleEn: "Headless replatform for a DTC brand",
    titleZh: "DTC 品牌的无头电商重构",
    industry: "ecommerce",
    techJson: JSON.stringify(["Next.js", "Shopify Hydrogen", "Sanity", "Vercel"]),
    summaryEn: "A headless storefront that took LCP from 4.8s to 1.1s and conversion up 23%.",
    summaryZh: "无头商城重构，LCP 从 4.8 秒降到 1.1 秒，转化率提升 23%。",
    challengeEn: "A themed Shopify store was hitting its ceiling: slow pages, brittle customizations, and a marketing team blocked on every content change.",
    challengeZh: "模板化 Shopify 店铺触顶：页面慢、定制脆弱、营销团队改个内容都要排队等开发。",
    solutionEn: "Headless storefront on Hydrogen + Sanity CMS, with editorial workflows so marketing ships landing pages without engineers.",
    solutionZh: "Hydrogen + Sanity 无头架构，配编辑工作流，营销自己上线落地页，无需工程师。",
    resultEn: "LCP 1.1s, conversion +23%, marketing ships 5× more campaigns per quarter.",
    resultZh: "LCP 1.1 秒，转化 +23%，营销每季度上线活动数量翻 5 倍。",
    order: 5,
  },
  {
    slug: "content-pipeline-automation",
    titleEn: "AI content pipeline for a media startup",
    titleZh: "媒体创业公司的 AI 内容流水线",
    industry: "content",
    techJson: JSON.stringify(["Claude API", "Next.js", "node-cron", "IndexNow"]),
    summaryEn: "An editorial pipeline that drafts, fact-flags and schedules 20 articles a week — humans approve, AI does the lifting.",
    summaryZh: "每周起草、标注事实并排期 20 篇文章的编辑流水线——人来审核，AI 干重活。",
    challengeEn: "A two-person editorial team needed the output of ten to compete in search and AI answers.",
    challengeZh: "两人编辑团队需要十人的产出量，才能在搜索和 AI 问答中占有一席之地。",
    solutionEn: "Source-whitelisted ingestion, Claude-drafted articles with TL;DR and FAQ blocks, a review queue, and automated publishing with schema markup and IndexNow pings.",
    solutionZh: "白名单源采集、Claude 起草（带 TL;DR 和 FAQ 模块）、审核队列、自动发布并附 schema 标记与 IndexNow 推送。",
    resultEn: "Organic impressions up 240% in four months; the site now appears in AI-generated answers for its core queries.",
    resultZh: "四个月自然曝光增长 240%，站点已出现在核心查询的 AI 生成答案中。",
    order: 6,
  },
];

const industries = [
  { slug: "ecommerce", nameEn: "E-commerce", nameZh: "电商", taglineEn: "Storefronts that convert and stacks that scale.", taglineZh: "高转化前端与可扩展架构。", order: 1, iconKey: "shopping-cart" },
  { slug: "saas", nameEn: "SaaS", nameZh: "SaaS", taglineEn: "Billing, onboarding and the unglamorous parts done right.", taglineZh: "计费、引导与那些不性感但要命的部分。", order: 2, iconKey: "layers" },
  { slug: "cross-border", nameEn: "Cross-border", nameZh: "跨境", taglineEn: "Two languages, three time zones, one toolchain.", taglineZh: "两种语言、三个时区、一套工具链。", order: 3, iconKey: "globe" },
  { slug: "internal-tools", nameEn: "Internal tools", nameZh: "内部工具", taglineEn: "Kill the spreadsheet sprawl.", taglineZh: "终结表格蔓延。", order: 4, iconKey: "wrench" },
  { slug: "ai-agent", nameEn: "AI agents", nameZh: "AI 智能体", taglineEn: "Agents with tools, memory and your knowledge.", taglineZh: "带工具、记忆与企业知识的智能体。", order: 5, iconKey: "bot" },
  { slug: "content", nameEn: "Content & media", nameZh: "内容与媒体", taglineEn: "Pipelines that publish while you sleep.", taglineZh: "睡觉时也在发布的内容流水线。", order: 6, iconKey: "newspaper" },
].map((i) => ({
  ...i,
  bodyEn: `We have shipped multiple engagements in ${i.nameEn.toLowerCase()}. A typical project starts with a one-week discovery, followed by milestone-based delivery with weekly demos. Ask us for the playbook on your first call.`,
  bodyZh: `我们在${i.nameZh}领域交付过多个项目。典型项目从一周的需求挖掘开始，随后按里程碑交付、每周演示。首次通话即可索取该领域方案手册。`,
}));

const faqs = [
  { questionEn: "How much does a project cost?", questionZh: "项目要花多少钱？", answerEn: "Three tiers: Light ($5–15k) for focused tools, Standard ($15–50k) for full products, Flagship ($50k+) for platform-level builds. The instant quoter on /quote gives you a realistic range in 60 seconds.", answerZh: "三档：轻定制（$5–15k）做单点工具，标准（$15–50k）做完整产品，旗舰（$50k+）做平台级系统。/quote 报价器 60 秒给出真实区间。", category: "pricing", order: 1 },
  { questionEn: "How long will it take?", questionZh: "需要多长时间？", answerEn: "Light projects ship in 2–4 weeks, Standard in 6–10 weeks, Flagship is scoped per milestone. You see a working demo every week regardless of size.", answerZh: "轻定制 2–4 周，标准 6–10 周，旗舰按里程碑规划。无论大小，每周都能看到可运行的演示。", category: "process", order: 2 },
  { questionEn: "What if you don't deliver?", questionZh: "做不出来怎么办？", answerEn: "Payment is milestone-based and every milestone is demoable. Code lives in your Git repository from day one — if we stop, you keep everything and owe nothing further.", answerZh: "里程碑付款，每个里程碑都可演示。代码从第一天就在你的 Git 仓库——即使合作中止，所有成果归你，后续费用一分不欠。", category: "trust", order: 3 },
  { questionEn: "Who owns the code and IP?", questionZh: "代码和知识产权归谁？", answerEn: "You do. Full IP assignment is standard in our contract, and the repository is under your organization from the first commit.", answerZh: "归你。合同默认完整知识产权转让，仓库从第一个 commit 起就在你的组织名下。", category: "trust", order: 4 },
  { questionEn: "Is the AI thing real or just marketing?", questionZh: "你们的 AI 是真的还是营销话术？", answerEn: "Our own operations run on the toolchain we sell: Claude Code for engineering, custom agents for content and ops. We show you the actual setups during your discovery call.", answerZh: "我们自己的公司就运转在卖给你的这套工具链上：Claude Code 写代码、自研智能体跑内容和运营。需求沟通时直接演示真实环境。", category: "ai", order: 5 },
  { questionEn: "How do we communicate during the project?", questionZh: "项目期间如何沟通？", answerEn: "A dedicated channel (Slack, WeCom or email — your pick), weekly demo calls, and async updates. English and Chinese both fine.", answerZh: "专属频道（Slack、企微或邮件，你来选）、每周演示会、异步进展更新。中英文皆可。", category: "process", order: 6 },
  { questionEn: "Can you work with our existing team?", questionZh: "能和我们现有团队协作吗？", answerEn: "Yes — about half our projects are co-builds. We follow your code review process and hand off with documentation your engineers actually use.", answerZh: "可以——约一半项目是协同开发。我们遵循你的代码评审流程，交接文档以你的工程师能直接用为标准。", category: "process", order: 7 },
  { questionEn: "What happens after launch?", questionZh: "上线之后呢？", answerEn: "30 days of included fixes, then an optional retainer. No lock-in: documentation and runbooks are written so any competent team can take over.", answerZh: "上线后 30 天免费修复，之后可选维保。无绑定：文档和运维手册的标准是任何合格团队都能接手。", category: "process", order: 8 },
  { questionEn: "Why are you cheaper than agencies and pricier than freelancers?", questionZh: "为什么你们比大厂便宜、比自由职业者贵？", answerEn: "AI tooling gives us agency-grade output at studio-size overhead. You pay for senior judgment plus AI leverage — not for office space and account managers.", answerZh: "AI 工具链让我们以工作室的成本产出大厂级质量。你付费购买的是资深判断力加 AI 杠杆——而不是写字楼和客户经理。", category: "pricing", order: 9 },
];

const sources = [
  { name: "Hacker News Top", url: "https://hnrss.org/frontpage" },
  { name: "Indie Hackers", url: "https://www.indiehackers.com/feed.xml" },
  { name: "Product Hunt", url: "https://www.producthunt.com/feed" },
  { name: "a16z", url: "https://a16z.com/feed/" },
  { name: "Vercel Blog", url: "https://vercel.com/atom" },
  { name: "Anthropic News", url: "https://www.anthropic.com/news/feed.xml" },
  { name: "Paul Graham Essays", url: "http://www.aaronsw.com/2002/feeds/pgessays.rss" },
  { name: "Shopify Engineering", url: "https://shopify.engineering/blog.atom" },
  { name: "Stripe Engineering", url: "https://stripe.com/blog/feed.rss" },
  { name: "GitHub Engineering", url: "https://github.blog/engineering/feed/" },
];

const sampleArticle = {
  slug: "custom-software-ai-era-cost",
  titleEn: "What custom software actually costs in the AI era",
  titleZh: "AI 时代，定制软件到底要花多少钱",
  tldrEn: "AI-native studios deliver custom software at 30–60% of 2022 agency prices. The savings come from agentic coding, not offshoring. Budget $5–15k for a focused tool, $15–50k for a full product.",
  tldrZh: "AI 原生工作室以 2022 年大厂报价的 30–60% 交付定制软件。省的钱来自智能体编程，而非外包。单点工具预算 $5–15k，完整产品 $15–50k。",
  bodyEn: `## The old math is dead\n\nIn 2022, a typical agency quoted **$80k** for an internal tool that an AI-native studio ships today for **$20k**. The difference is not cheaper labor — it is **agentic coding**: tools like **Claude Code** let one senior engineer do the work of a three-person pod.\n\n- Discovery and spec writing: accelerated by AI interview synthesis\n- Implementation: 3× throughput with agentic coding\n- QA: AI-generated test suites reviewed by humans\n\n## What you should actually budget\n\n| Tier | Range | What it buys |\n|---|---|---|\n| Light | $5–15k | One focused tool or automation |\n| Standard | $15–50k | A full product with auth, billing, admin |\n| Flagship | $50k+ | Platform-level systems and AI agents |\n\n## Our take\n\nThe risk in 2026 is not overpaying — it is buying from teams that use AI as a label rather than a method. Ask any vendor to show you their actual toolchain on the first call. We do.\n\n## FAQ\n\n**Does AI-built mean lower quality?** No — every line is reviewed by senior engineers; AI raises throughput, not risk tolerance.\n\n**Why not hire a freelancer?** A freelancer gives you hands; a studio gives you judgment, continuity and documentation.\n`,
  bodyZh: `## 旧的算法已经失效\n\n2022 年，大厂给一个内部工具报价 **8 万美元**，如今 AI 原生工作室 **2 万美元** 就能交付。差别不在于更便宜的人力，而在于**智能体编程**：**Claude Code** 这类工具让一名资深工程师顶得上三人小组。\n\n- 需求挖掘与规格撰写：AI 访谈综合提速\n- 实现：智能体编程带来 3 倍吞吐\n- 质检：AI 生成测试套件 + 人工评审\n\n## 你的真实预算\n\n| 档位 | 区间 | 能买到什么 |\n|---|---|---|\n| 轻定制 | $5–15k | 一个单点工具或自动化 |\n| 标准 | $15–50k | 含鉴权、计费、后台的完整产品 |\n| 旗舰 | $50k+ | 平台级系统与 AI 智能体 |\n\n## 我们的观点\n\n2026 年的风险不是花冤枉钱，而是把钱交给把 AI 当标签而非方法的团队。第一次通话就让供应商演示真实工具链——我们就是这么做的。\n\n## 常见问题\n\n**AI 写的代码质量会差吗？** 不会——每一行都经资深工程师评审；AI 提升的是吞吐量，不是风险容忍度。\n\n**为什么不直接找自由职业者？** 自由职业者给你双手，工作室给你判断力、连续性和文档。\n`,
  faqJson: JSON.stringify([
    { qEn: "Does AI-built mean lower quality?", aEn: "No — every line is reviewed by senior engineers.", qZh: "AI 写的代码质量会差吗？", aZh: "不会——每一行都经资深工程师评审。" },
    { qEn: "Why not hire a freelancer?", aEn: "A freelancer gives you hands; a studio gives you judgment, continuity and documentation.", qZh: "为什么不直接找自由职业者？", aZh: "自由职业者给你双手，工作室给你判断力、连续性和文档。" },
  ]),
  sourcesJson: JSON.stringify([{ title: "Anthropic — Claude Code", url: "https://www.anthropic.com/claude-code" }]),
  topic: "pricing",
  state: "PUBLISHED",
  publishedAt: new Date(),
};

async function main() {
  // Admin user (password hashed with sha256 for dev simplicity; swap to bcrypt in prod)
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL ?? "admin@jimeng.network" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL ?? "admin@jimeng.network",
      name: "Admin",
      passwordHash: sha256(process.env.ADMIN_PASSWORD ?? "admin123"),
      role: "ADMIN",
    },
  });

  for (const c of cases) {
    await prisma.case.upsert({
      where: { slug: c.slug },
      update: c,
      create: { ...c, publishedAt: new Date() },
    });
  }

  for (const i of industries) {
    await prisma.industry.upsert({ where: { slug: i.slug }, update: i, create: i });
  }

  await prisma.faq.deleteMany();
  for (const f of faqs) await prisma.faq.create({ data: f });

  for (const s of sources) {
    await prisma.source.upsert({ where: { url: s.url }, update: {}, create: s });
  }

  await prisma.article.upsert({
    where: { slug: sampleArticle.slug },
    update: sampleArticle,
    create: sampleArticle,
  });

  const settings: Record<string, unknown> = {
    "contact.email": "hello@jimeng.network",
    "contact.whatsapp": "https://wa.me/0000000000",
    "contact.wechat_qr_url": "/uploads/wechat-qr-placeholder.svg",
    "contact.calendly_url": "",
    "webhook.lead_forward_url": "",
  };
  for (const [key, value] of Object.entries(settings)) {
    await prisma.setting.upsert({
      where: { key },
      update: {},
      create: { key, value: JSON.stringify(value) },
    });
  }

  console.log("Seed complete:",
    await prisma.case.count(), "cases,",
    await prisma.industry.count(), "industries,",
    await prisma.faq.count(), "faqs,",
    await prisma.source.count(), "sources");
}

main().finally(() => prisma.$disconnect());
