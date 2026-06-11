import { NextResponse } from "next/server";
import { runPipeline } from "@/lib/geo/pipeline";

export const maxDuration = 300;

// Manual/cron trigger for the full GEO pipeline.
export async function POST() {
  const result = await runPipeline();
  return NextResponse.json(result);
}
