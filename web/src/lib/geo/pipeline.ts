import { prisma } from "@/lib/prisma";
import { complete, MODELS } from "@/lib/anthropic";
import {
  CLASSIFY_SYSTEM,
  ANGLE_SYSTEM,
  WRITE_SYSTEM,
  writePrompt,
  MOCK_CLASSIFY,
  MOCK_ANGLES,
  MOCK_ARTICLE,
} from "./prompts";

const MIN_SCORE = 60;

function parseJson<T>(text: string): T | null {
  try {
    // strip markdown fences if the model added them
    const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
    return JSON.parse(cleaned) as T;
  } catch {
    return null;
  }
}

/** Step 2: classify + score NEW candidates (Haiku). */
export async function classifyCandidates(limit = 10) {
  const candidates = await prisma.candidate.findMany({
    where: { state: "NEW" },
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  let scored = 0;
  for (const c of candidates) {
    const out = await complete({
      model: MODELS.fast,
      system: CLASSIFY_SYSTEM,
      prompt: `Title: ${c.originTitle}\n\nExcerpt: ${c.excerpt}`,
      maxTokens: 200,
      mockFixture: MOCK_CLASSIFY,
    });
    const parsed = parseJson<{ relevant: boolean; topic: string; score: number }>(out);
    if (!parsed) continue;

    await prisma.candidate.update({
      where: { id: c.id },
      data: {
        topic: parsed.topic,
        score: parsed.score,
        state: parsed.relevant && parsed.score >= MIN_SCORE ? "SCORED" : "REJECTED",
      },
    });
    scored++;
  }
  return scored;
}

/** Steps 3-4: pick angle (Sonnet) and write the long-form draft (Opus). */
export async function draftCandidates(limit = 3) {
  const candidates = await prisma.candidate.findMany({
    where: { state: "SCORED" },
    orderBy: { score: "desc" },
    take: limit,
  });

  let drafted = 0;
  for (const c of candidates) {
    const anglesOut = await complete({
      model: MODELS.default,
      system: ANGLE_SYSTEM,
      prompt: `Title: ${c.originTitle}\n\nExcerpt: ${c.excerpt}`,
      maxTokens: 600,
      mockFixture: MOCK_ANGLES,
    });
    const angles = parseJson<{ angles: { title: string }[] }>(anglesOut);
    const angle = angles?.angles?.[0]?.title ?? c.originTitle;

    const article = await complete({
      model: MODELS.long,
      system: WRITE_SYSTEM,
      prompt: writePrompt(angle, `${c.originTitle}\n\n${c.excerpt}\n\nSource: ${c.originUrl}`),
      maxTokens: 8192,
      mockFixture: MOCK_ARTICLE,
    });

    await prisma.candidate.update({
      where: { id: c.id },
      data: { draftMd: article, state: "PENDING_REVIEW" },
    });
    drafted++;
  }
  return drafted;
}

/** Full pipeline used by cron and the manual trigger. */
export async function runPipeline() {
  const { crawlAllSources } = await import("./crawler");
  const crawl = await crawlAllSources();
  const scored = await classifyCandidates(15);
  const drafted = await draftCandidates(3);
  return { crawl, scored, drafted };
}
