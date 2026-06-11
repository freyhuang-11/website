import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo/site";

export const revalidate = 3600;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const articles = await prisma.article.findMany({
    where: { state: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  const items = articles
    .map(
      (a) => `  <item>
    <title>${esc(a.titleEn)}</title>
    <link>${SITE_URL}/en/insights/${a.slug}</link>
    <guid>${SITE_URL}/en/insights/${a.slug}</guid>
    <description>${esc(a.tldrEn)}</description>
    <pubDate>${a.publishedAt?.toUTCString() ?? ""}</pubDate>
  </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Jimeng Network — Insights</title>
  <link>${SITE_URL}/en/insights</link>
  <description>What we're learning building AI-native software.</description>
  <language>en</language>
${items}
</channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
