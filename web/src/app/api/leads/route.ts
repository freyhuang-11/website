import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSetting } from "@/lib/settings";

// Contact-form leads (lighter shape than quote leads)
const schema = z.object({
  name: z.string().max(100).optional(),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  locale: z.string().default("en"),
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
      projectType: "contact",
      scale: "-",
      timeline: "-",
      needAI: "-",
      notes: d.name ? `${d.name}: ${d.message}` : d.message,
      source: "contact",
      locale: d.locale,
    },
  });

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
