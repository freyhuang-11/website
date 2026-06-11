import Parser from "rss-parser";
import { prisma } from "@/lib/prisma";

const parser = new Parser({ timeout: 15000 });

/**
 * Fetch enabled whitelisted RSS sources and store de-duplicated candidates.
 * Returns number of new candidates per source.
 */
export async function crawlAllSources() {
  const sources = await prisma.source.findMany({ where: { enabled: true } });
  const results: { source: string; added: number; error?: string }[] = [];

  for (const source of sources) {
    try {
      const feed = await parser.parseURL(source.url);
      let added = 0;
      for (const item of (feed.items ?? []).slice(0, 20)) {
        const url = item.link;
        if (!url || !item.title) continue;
        const exists = await prisma.candidate.findUnique({ where: { originUrl: url } });
        if (exists) continue;
        await prisma.candidate.create({
          data: {
            sourceId: source.id,
            originUrl: url,
            originTitle: item.title,
            excerpt: (item.contentSnippet ?? item.content ?? "").slice(0, 1500),
          },
        });
        added++;
      }
      await prisma.source.update({
        where: { id: source.id },
        data: { lastRunAt: new Date(), lastError: null },
      });
      results.push({ source: source.name, added });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      await prisma.source.update({
        where: { id: source.id },
        data: { lastRunAt: new Date(), lastError: msg.slice(0, 500) },
      });
      results.push({ source: source.name, added: 0, error: msg });
    }
  }
  return results;
}
