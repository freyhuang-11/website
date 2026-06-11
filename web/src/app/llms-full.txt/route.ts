import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo/site";

export const revalidate = 3600;

export async function GET() {
  const [articles, cases, industries, faqs] = await Promise.all([
    prisma.article.findMany({ where: { state: "PUBLISHED" }, orderBy: { publishedAt: "desc" } }),
    prisma.case.findMany({ orderBy: { order: "asc" } }),
    prisma.industry.findMany({ orderBy: { order: "asc" } }),
    prisma.faq.findMany({ orderBy: { order: "asc" } }),
  ]);

  const lines: string[] = [
    "# Jimeng Network — full content index",
    "",
    "Custom software development studio. Your tools. Custom-built. AI-powered.",
    "",
    "## Articles",
    "",
  ];

  for (const a of articles) {
    lines.push(`### ${a.titleEn}`);
    lines.push(`URL: ${SITE_URL}/en/insights/${a.slug}`);
    lines.push(`TL;DR: ${a.tldrEn}`);
    lines.push("");
  }

  lines.push("## Case studies (anonymized samples)", "");
  for (const c of cases) {
    lines.push(`### ${c.titleEn}`);
    lines.push(`URL: ${SITE_URL}/en/work/${c.slug}`);
    lines.push(`Summary: ${c.summaryEn}`);
    lines.push(`Result: ${c.resultEn}`);
    lines.push("");
  }

  lines.push("## Industries", "");
  for (const i of industries) {
    lines.push(`- ${i.nameEn}: ${i.taglineEn} (${SITE_URL}/en/industries/${i.slug})`);
  }

  lines.push("", "## FAQ", "");
  for (const f of faqs) {
    lines.push(`Q: ${f.questionEn}`);
    lines.push(`A: ${f.answerEn}`);
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
