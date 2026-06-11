import Anthropic from "@anthropic-ai/sdk";

export const MODELS = {
  default: process.env.ANTHROPIC_MODEL_DEFAULT ?? "claude-sonnet-4-6",
  long: process.env.ANTHROPIC_MODEL_LONG ?? "claude-opus-4-8",
  fast: process.env.ANTHROPIC_MODEL_FAST ?? "claude-haiku-4-5-20251001",
} as const;

export const MOCK_MODE =
  process.env.GEO_MOCK_MODE === "true" || !process.env.ANTHROPIC_API_KEY;

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) client = new Anthropic();
  return client;
}

/**
 * Single text-in/text-out completion. In MOCK_MODE returns the provided
 * fixture so the whole pipeline stays demoable without an API key.
 */
export async function complete(opts: {
  model: string;
  system?: string;
  prompt: string;
  maxTokens?: number;
  mockFixture: string;
}): Promise<string> {
  if (MOCK_MODE) return opts.mockFixture;

  const res = await getClient().messages.create({
    model: opts.model,
    max_tokens: opts.maxTokens ?? 4096,
    system: opts.system,
    messages: [{ role: "user", content: opts.prompt }],
  });

  const block = res.content.find((b) => b.type === "text");
  return block && block.type === "text" ? block.text : "";
}
