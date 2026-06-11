// Rule-based estimator — §5.3 of HANDOFF.md. No LLM call; instant + deterministic.

export type QuoteInput = {
  projectType: "website" | "tool" | "agent" | "saas" | "mobile" | "other";
  scale: "solo" | "lt10" | "10to50" | "gt50";
  timeline: "lt4w" | "1to3m" | "3to6m" | "gt6m";
  needAI: "yes" | "unsure" | "no";
  needI18n: boolean;
};

const BASE: Record<QuoteInput["projectType"], number> = {
  website: 5000,
  tool: 8000,
  agent: 15000,
  saas: 25000,
  mobile: 20000,
  other: 10000,
};

const SCALE_X: Record<QuoteInput["scale"], number> = {
  solo: 1.0,
  lt10: 1.3,
  "10to50": 1.7,
  gt50: 2.3,
};

const TIMELINE_X: Record<QuoteInput["timeline"], number> = {
  lt4w: 1.4, // rush
  "1to3m": 1.0,
  "3to6m": 1.2,
  gt6m: 1.5,
};

const FLOOR = 4000;
const CAP = 200000;

export function estimate(input: QuoteInput): { low: number; high: number; tier: "light" | "standard" | "flagship" } {
  let score = BASE[input.projectType] * SCALE_X[input.scale] * TIMELINE_X[input.timeline];
  if (input.needAI === "yes") score = (score + 5000) * 1.2;
  if (input.needI18n) score *= 1.15;

  const round500 = (n: number) => Math.round(n / 500) * 500;
  const low = Math.min(CAP, Math.max(FLOOR, round500(score * 0.85)));
  const high = Math.min(CAP, Math.max(low + 1000, round500(score * 1.35)));

  const mid = (low + high) / 2;
  const tier = mid < 15000 ? "light" : mid < 50000 ? "standard" : "flagship";
  return { low, high, tier };
}
