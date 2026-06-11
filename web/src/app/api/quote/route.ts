import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSetting } from "@/lib/settings";

const schema = z.object({
  projectType: z.string(),
  scale: z.string(),
  timeline: z.string(),
  needAI: z.string(),
  needI18n: z.boolean().default(false),
  email: z.string().email(),
  company: z.string().optional(),
  notes: z.string().max(2000).optional(),
  locale: z.string().default("en"),
  estimateLow: z.number().int().optional(),
  estimateHigh: z.number().int().optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const d = parsed.data;

  const lead = await prisma.lead.create({
    data: {
      email: d.email,
      company: d.company,
      projectType: d.projectType,
      scale: d.scale,
      timeline: d.timeline,
      needAI: d.needAI,
      needI18n: d.needI18n,
      notes: d.notes,
      estimateLow: d.estimateLow,
      estimateHigh: d.estimateHigh,
      source: "quote",
      locale: d.locale,
    },
  });

  // Forward to user's own lead system if configured (fire-and-forget)
  const webhook = await getSetting("webhook.lead_forward_url", "");
  if (webhook) {
    fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "lead.created", lead }),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true, id: lead.id });
}
