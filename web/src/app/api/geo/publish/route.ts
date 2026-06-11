import { NextResponse } from "next/server";
import { z } from "zod";
import { publishCandidate } from "@/lib/geo/publisher";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  candidateId: z.string(),
  action: z.enum(["publish", "reject"]),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  if (parsed.data.action === "reject") {
    await prisma.candidate.update({
      where: { id: parsed.data.candidateId },
      data: { state: "REJECTED" },
    });
    return NextResponse.json({ ok: true });
  }

  const article = await publishCandidate(parsed.data.candidateId);
  return NextResponse.json({ ok: true, slug: article.slug });
}
