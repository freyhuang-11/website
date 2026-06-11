import { prisma } from "@/lib/prisma";
import { complete, MODELS } from "@/lib/anthropic";
import { pingIndexNow } from "./indexnow";
import { SITE_URL } from "@/lib/seo/site";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function extractTitle(md: string): string {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : "Untitled";
}

function extractTldr(md: string): string {
  const m = md.match(/\*\*TL;DR\*\*\s*[—-]?\s*(.+)/);
  return m ? m[1].trim() : "";
}

const TRANSLATE_SYSTEM =
  "Translate the following English markdown article into natural, professional Simplified Chinese. Keep all markdown structure, entity bolding and URLs. Output only the translation.";

/**
 * Publish a reviewed candidate: create the bilingual Article, mark the
 * candidate, and ping IndexNow.
 */
export async function publishCandidate(candidateId: string) {
  const c = await prisma.candidate.findUnique({ where: { id: candidateId } });
  if (!c || !c.draftMd) throw new Error("candidate not found or has no draft");

  const titleEn = extractTitle(c.draftMd);
  const tldrEn = extractTldr(c.draftMd);
  const slug = slugify(titleEn);

  const bodyZh = await complete({
    model: MODELS.default,
    system: TRANSLATE_SYSTEM,
    prompt: c.draftMd,
    maxTokens: 8192,
    mockFixture: `# ${titleEn}（中文草稿）\n\n> **太长不看** — ${tldrEn}\n\n${c.draftMd}`,
  });

  const article = await prisma.article.upsert({
    where: { slug },
    update: {},
    create: {
      slug,
      titleEn,
      titleZh: extractTitle(bodyZh),
      tldrEn,
      tldrZh: extractTldr(bodyZh) || tldrEn,
      bodyEn: c.draftMd,
      bodyZh,
      sourcesJson: JSON.stringify([{ title: c.originTitle, url: c.originUrl }]),
      topic: c.topic,
      state: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  await prisma.candidate.update({
    where: { id: c.id },
    data: { state: "PUBLISHED", articleId: article.id },
  });

  await pingIndexNow([
    `${SITE_URL}/en/insights/${slug}`,
    `${SITE_URL}/zh/insights/${slug}`,
  ]);

  return article;
}
