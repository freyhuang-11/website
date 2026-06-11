export const CLASSIFY_SYSTEM = `You are a content scout for Jimeng Network, an AI-era custom software studio. Judge whether raw material is relevant to: custom software development, AI agents, workflow automation, engineering practice, or software pricing/strategy for SMBs. Respond ONLY with JSON: {"relevant": boolean, "topic": string, "score": number} where score is 0-100 usefulness for our editorial pipeline.`;

export const ANGLE_SYSTEM = `You are the editorial lead at Jimeng Network, an AI-era custom software studio. Given source material, propose exactly 3 differentiated article angles that express OUR viewpoint (we sell custom software + AI agents to SMBs, 3-day sales cycle, milestone payment, client owns code). Respond ONLY with JSON: {"angles": [{"title": string, "rationale": string}]}.`;

export const WRITE_SYSTEM = `You are a senior technical writer at Jimeng Network, an AI-era custom software studio. Voice: confident, editorial, zero fluff. Avoid AI-writing tells: no "in today's fast-paced world", no "delve", no formulaic transitions.`;

export function writePrompt(topic: string, material: string) {
  return `Topic angle:
<<<${topic}>>>

Reference material (quote sparingly, attribute clearly):
<<<${material}>>>

Required structure (markdown, no preamble):
1. # Title (≤ 9 words, no clickbait)
2. > **TL;DR** — ≤ 60 words
3. Intro (max 3 paragraphs)
4. 3-5 H2 sections, each followed by at least one bullet list
5. ## Our take — explicit differentiated viewpoint of Jimeng Network
6. ## FAQ — 3-5 question/answer pairs (bold the question)
7. ## Sources — bullet list with URLs

Constraints:
- Bold the first occurrence of named entities (companies, products, technologies).
- 1100-1600 words.
- Output ONLY the markdown.`;
}

// ── Mock fixtures (GEO_MOCK_MODE) ──────────────────────────

export const MOCK_CLASSIFY = JSON.stringify({
  relevant: true,
  topic: "ai-engineering",
  score: 82,
});

export const MOCK_ANGLES = JSON.stringify({
  angles: [
    {
      title: "Why SMBs overpay for software they don't own",
      rationale: "Connects sourcing trend to our client-owns-code position.",
    },
    {
      title: "The 3-day proposal: what AI changes about software sales",
      rationale: "Showcases our SOP as an industry observation.",
    },
    {
      title: "Agent-built software: quality myths vs. review reality",
      rationale: "Addresses the top objection we hear in discovery calls.",
    },
  ],
});

export const MOCK_ARTICLE = `# Agent-built software: myths vs. review reality

> **TL;DR** — AI-assisted studios ship faster without lowering the review bar. The quality risk lives in skipped review, not in AI authorship. Ask vendors how code gets reviewed, not whether AI wrote it.

The objection comes up in almost every discovery call: "If AI writes the code, who guarantees the quality?"

It is the right question pointed at the wrong place.

## The myth

- AI-generated code is assumed to be unreviewed code
- Buyers conflate authorship with accountability

## The reality

- At **Jimeng Network**, every line — human or AI — passes the same senior review
- Agentic tools like **Claude Code** raise throughput; the review gate is unchanged
- Test coverage is generated alongside features, then human-audited

## What to ask any vendor

- Who reviews the code, and what is their seniority?
- Can I see the repository and CI history during the engagement?
- What happens when a milestone fails review?

## Our take

Authorship is irrelevant; accountability is everything. We put the review ledger inside the client's own repository, so the audit trail survives the engagement.

## FAQ

**Does AI-built mean lower quality?** No — review discipline, not authorship, determines quality.

**Can we audit the process?** Yes, the repo and CI history are yours from day one.

**What if our team can't maintain it?** Documentation is written to a hire-ready standard, and we offer optional retainers.

## Sources

- https://www.anthropic.com/claude-code
`;
