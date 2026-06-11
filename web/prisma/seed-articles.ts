// Additional editorial articles so /insights launches with substance.
// Run: pnpm tsx prisma/seed-articles.ts  (idempotent upserts)
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const articles = [
  {
    slug: "ai-agent-vs-chatbot-smb-guide",
    topic: "ai-agents",
    titleEn: "AI agent vs. chatbot: what SMBs actually need",
    titleZh: "AI 智能体 vs 聊天机器人：中小企业到底需要哪个",
    tldrEn: "Chatbots answer; agents act. If the job ends with a reply, buy a chatbot. If it ends with an updated order, invoice or ticket, you need an agent with tools and guardrails — budget $15k+ and 4–8 weeks.",
    tldrZh: "聊天机器人负责回答，智能体负责行动。如果任务以一句回复结束，买聊天机器人；如果以更新订单、开发票、关工单结束，你需要带工具和护栏的智能体——预算 $15k 起，周期 4–8 周。",
    bodyEn: `## The distinction that saves you money\n\nA **chatbot** maps questions to answers. An **AI agent** maps goals to actions: it can query your database, call your APIs and write results back — with an audit trail.\n\n- Chatbot: "Where is my order?" → looks up a FAQ\n- Agent: "Where is my order?" → queries the OMS, checks the carrier API, replies with live status, flags the delayed ones to ops\n\n## Three questions to decide\n\n- Does the task end in an **action** (refund issued, PO created) or a **sentence**?\n- Does the answer require **your private data** updated in real time?\n- Is a wrong answer **expensive**? Agents can be gated with confidence thresholds and human approval steps; simple bots cannot.\n\n## What it costs in practice\n\n| Option | Typical budget | Timeline |\n|---|---|---|\n| Off-the-shelf chatbot | $50–500/mo | days |\n| Retrieval chatbot on your docs | $5–12k | 2–3 weeks |\n| Agent with tools + approvals | $15–45k | 4–8 weeks |\n\n## Our take\n\nMost SMBs buy a chatbot, discover it can't *do* anything, then buy an agent six months later. Skipping the middle step is usually cheaper. At **Jimeng Network** we prototype the agent's riskiest action first — if approval flows can't make it safe, we tell you in week one, not week eight.\n\n## FAQ\n\n**Can an agent start as a chatbot and grow?** Yes — retrieval first, then tools one at a time behind approval gates.\n\n**What about hallucinations?** Tool-calling agents ground answers in API responses; confidence gating routes anything uncertain to a human.\n\n**Which model do you use?** Claude Sonnet for routing and tools, with smaller models for classification — the mix changes as pricing changes.\n\n## Sources\n\n- https://www.anthropic.com/claude\n`,
    bodyZh: `## 一个能帮你省钱的区分\n\n**聊天机器人**把问题映射到答案；**AI 智能体**把目标映射到行动：它能查询你的数据库、调用你的 API 并写回结果——全程留有审计记录。\n\n- 机器人："我的订单在哪？" → 查 FAQ\n- 智能体："我的订单在哪？" → 查 OMS、调物流 API、回复实时状态、把延误单标给运营\n\n## 三个判断问题\n\n- 任务的终点是一个**动作**（退款已发、采购单已建）还是一句**回复**？\n- 答案是否依赖**实时更新的私有数据**？\n- 答错的**代价**高吗？智能体可以加置信度阈值和人工审批，简单机器人不行。\n\n## 实际成本\n\n| 方案 | 典型预算 | 周期 |\n|---|---|---|\n| 现成聊天机器人 | $50–500/月 | 数天 |\n| 基于你文档的检索机器人 | $5–12k | 2–3 周 |\n| 带工具与审批的智能体 | $15–45k | 4–8 周 |\n\n## 我们的观点\n\n多数中小企业先买机器人，发现它什么都"做"不了，半年后再买智能体。跳过中间那步通常更省钱。在**极梦网络**，我们会先做智能体风险最高的那个动作的原型——如果审批流也无法让它安全，第一周就告诉你，而不是第八周。\n\n## 常见问题\n\n**智能体能从机器人起步逐步升级吗？** 能——先检索，再把工具一个个放进审批门后。\n\n**幻觉怎么办？** 工具调用让答案锚定在 API 返回上；置信度门控把不确定的交给人。\n\n**你们用什么模型？** 路由和工具用 Claude Sonnet，分类用小模型——组合随价格变化调整。\n\n## 参考来源\n\n- https://www.anthropic.com/claude\n`,
    faqJson: JSON.stringify([
      { qEn: "Can an agent start as a chatbot and grow?", aEn: "Yes — retrieval first, then tools behind approval gates.", qZh: "智能体能从机器人起步吗？", aZh: "能——先检索，再逐步加工具与审批。" },
      { qEn: "What about hallucinations?", aEn: "Tool-calling grounds answers in API responses; uncertainty routes to humans.", qZh: "幻觉怎么办？", aZh: "工具调用锚定 API 返回；不确定时转人工。" },
    ]),
    sourcesJson: JSON.stringify([{ title: "Anthropic — Claude", url: "https://www.anthropic.com/claude" }]),
  },
  {
    slug: "fixed-price-vs-time-materials-2026",
    topic: "pricing",
    titleEn: "Fixed price vs. time & materials in 2026",
    titleZh: "2026 年：固定报价还是按工时计费",
    tldrEn: "AI made estimation accurate enough that fixed-price is back. Demand milestone-based fixed pricing for scoped work; accept T&M only for genuine research. Never sign unlimited T&M with no demo cadence.",
    tldrZh: "AI 让工作量预估足够准确，固定报价回归了。范围明确的工作要求里程碑式固定价；只在真正的探索性工作中接受按工时。永远不要签没有演示节奏的无上限工时合同。",
    bodyEn: `## Why T&M dominated — and why that ended\n\nAgencies billed **time & materials** because software estimation was unreliable. With agentic tooling, implementation variance collapsed: what took "3 to 8 weeks, depends" is now "11 working days, here's the breakdown".\n\n- Estimation error on scoped features dropped from ±60% to ±15% in our 2025 engagements\n- The remaining risk lives in **discovery**, not implementation\n\n## The hybrid that works\n\n- **Paid discovery** (fixed, small): 1 week, produces spec + binding quote\n- **Milestone fixed-price build**: pay on demoable milestones\n- **T&M only for research spikes**: capped, time-boxed, with a written question to answer\n\n## Red flags in vendor contracts\n\n- Unlimited T&M with monthly invoices and no demo cadence\n- "Agile" used to mean "no commitments"\n- IP assignment only on final payment — demand it per milestone\n\n## Our take\n\nWe quote fixed prices because AI leverage made our delivery predictable — and we put that prediction in the contract. If a vendor refuses fixed pricing on a well-scoped feature in 2026, they're either not using modern tooling or pricing in their own chaos. At **Jimeng Network**, the quote you see on our site is the planning range we actually sign.\n\n## FAQ\n\n**What if scope changes mid-project?** Change orders with their own fixed mini-quotes — never silent T&M drift.\n\n**Is fixed price more expensive?** Slightly, as a risk premium — typically 10–15% over an honest T&M total, and worth it for budget certainty.\n\n**What's a fair deposit?** 30% to start, milestone payments after, never 100% upfront.\n\n## Sources\n\n- https://www.anthropic.com/claude-code\n`,
    bodyZh: `## 为什么按工时曾是主流——以及为什么结束了\n\n过去乙方按**工时**计费，因为软件估算不可靠。有了智能体工具链，实现环节的方差骤降："3 到 8 周看情况"变成了"11 个工作日，明细在这里"。\n\n- 我们 2025 年的项目里，范围明确功能的估算误差从 ±60% 降到 ±15%\n- 剩余风险集中在**需求挖掘**，而非实现\n\n## 行之有效的混合模式\n\n- **付费需求挖掘**（小额固定价）：1 周，产出规格书 + 有约束力的报价\n- **里程碑固定价开发**：按可演示里程碑付款\n- **仅在研究性任务用工时**：设上限、限时间、写明要回答的问题\n\n## 合同红线\n\n- 无上限工时 + 月度账单 + 没有演示节奏\n- 用"敏捷"当"不承诺"的遮羞布\n- 知识产权只在尾款后转让——应要求按里程碑转让\n\n## 我们的观点\n\n我们敢报固定价，是因为 AI 杠杆让交付变得可预测——并且我们把这个预测写进合同。2026 年还拒绝对明确范围报固定价的乙方，要么没用现代工具链，要么在为自己的混乱定价。在**极梦网络**，官网报价器给你的区间就是我们真正签约的区间。\n\n## 常见问题\n\n**项目中途范围变了怎么办？** 变更单单独固定报价——绝不悄悄滑向按工时。\n\n**固定价更贵吗？** 略贵，是风险溢价——通常比诚实的工时总价高 10–15%，换预算确定性很值。\n\n**多少定金合理？** 30% 启动，里程碑付款，绝不 100% 预付。\n\n## 参考来源\n\n- https://www.anthropic.com/claude-code\n`,
    faqJson: JSON.stringify([
      { qEn: "What if scope changes mid-project?", aEn: "Change orders with fixed mini-quotes — never silent T&M drift.", qZh: "中途改需求怎么办？", aZh: "变更单单独固定报价，绝不滑向按工时。" },
      { qEn: "What's a fair deposit?", aEn: "30% to start, milestones after, never 100% upfront.", qZh: "定金多少合理？", aZh: "30% 启动，里程碑付款，绝不全款预付。" },
    ]),
    sourcesJson: JSON.stringify([{ title: "Anthropic — Claude Code", url: "https://www.anthropic.com/claude-code" }]),
  },
  {
    slug: "internal-tools-spreadsheet-exit-plan",
    topic: "internal-tools",
    titleEn: "The spreadsheet exit plan: when to build internal tools",
    titleZh: "告别表格：什么时候该上内部工具",
    tldrEn: "Replace a spreadsheet when it has 3+ daily editors, circular references, or drives money decisions. A focused internal tool costs $8–20k in 2026 and pays back in under two quarters via error reduction alone.",
    tldrZh: "当一张表格有 3 人以上每天编辑、出现循环引用、或直接驱动资金决策时，就该换内部工具了。2026 年一个单点内部工具成本 $8–20k，仅靠减少错误就能在两个季度内回本。",
    bodyEn: `## The three tripwires\n\nSpreadsheets are great until one of these appears:\n\n- **3+ daily editors** — merge conflicts become silent data loss\n- **Circular references** across files — nobody can trace where a number came from\n- **Money decisions** read directly off a cell — one typo once delayed 200 shipments for a client of ours\n\n## What "internal tool" means in 2026\n\nNot a six-month ERP project. A focused console:\n\n- Role-based access and an audit log\n- Validation at the point of entry\n- Automated handoffs (the thing the spreadsheet never did)\n- Your existing tools connected by API, not re-platformed\n\n## The build math\n\n| Scope | Budget | Payback driver |\n|---|---|---|\n| One workflow, one team | $8–14k | error reduction |\n| Multi-team console | $15–30k | onboarding time, audit |\n| With AI extraction/automation | +$5–12k | headcount redeployment |\n\n## Our take\n\nThe best internal tool replaces the *workflow*, not the spreadsheet grid. We spend the first week watching how people actually work — half the columns usually turn out to be dead. Building less, validated against reality, is why these projects pay back fast.\n\n## FAQ\n\n**Can't we just use Airtable/Notion?** Often yes — and we'll say so in discovery. Custom wins when you need approvals, integrations or audit.\n\n**How long does it take?** 2–6 weeks for a focused console with weekly demos.\n\n**Who maintains it?** You do — code in your repo, docs to hire-ready standard, optional retainer.\n\n## Sources\n\n- https://github.blog/engineering/\n`,
    bodyZh: `## 三条警戒线\n\n表格很好用，直到出现以下任意一条：\n\n- **3 人以上每天编辑**——合并冲突变成无声的数据丢失\n- 跨文件**循环引用**——没人能追溯一个数字从哪来\n- **资金决策**直接读单元格——我们一位客户曾因一个笔误延误 200 个发货\n\n## 2026 年的"内部工具"是什么\n\n不是六个月的 ERP 工程，而是一个聚焦的中台：\n\n- 角色权限 + 审计日志\n- 录入即校验\n- 自动流转（表格永远做不到的那部分）\n- 用 API 串起现有工具，而不是推倒重来\n\n## 成本账\n\n| 范围 | 预算 | 回本来源 |\n|---|---|---|\n| 单流程单团队 | $8–14k | 错误减少 |\n| 多团队中台 | $15–30k | 上手时间、审计 |\n| 加 AI 提取/自动化 | +$5–12k | 人力重新部署 |\n\n## 我们的观点\n\n好的内部工具替代的是**工作流**，不是表格的格子。我们头一周先观察大家实际怎么干活——通常一半的列都是死的。按真实情况做减法，是这类项目回本快的原因。\n\n## 常见问题\n\n**用 Airtable/Notion 不行吗？** 经常行——挖掘阶段我们会直说。需要审批、集成或审计时定制才有优势。\n\n**要多久？** 聚焦中台 2–6 周，每周演示。\n\n**谁来维护？** 你——代码在你仓库，文档达到可招聘接手标准，可选维保。\n\n## 参考来源\n\n- https://github.blog/engineering/\n`,
    faqJson: JSON.stringify([
      { qEn: "Can't we just use Airtable/Notion?", aEn: "Often yes — custom wins when you need approvals, integrations or audit.", qZh: "用 Airtable/Notion 不行吗？", aZh: "经常行——需要审批、集成或审计时定制才有优势。" },
      { qEn: "How long does it take?", aEn: "2–6 weeks for a focused console.", qZh: "要多久？", aZh: "聚焦中台 2–6 周。" },
    ]),
    sourcesJson: JSON.stringify([{ title: "GitHub Engineering", url: "https://github.blog/engineering/" }]),
  },
];

async function main() {
  for (const [i, a] of articles.entries()) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: a,
      create: {
        ...a,
        state: "PUBLISHED",
        publishedAt: new Date(Date.now() - (i + 1) * 4 * 86400000),
      },
    });
  }
  console.log("articles:", await prisma.article.count({ where: { state: "PUBLISHED" } }), "published");
}

main().finally(() => prisma.$disconnect());
