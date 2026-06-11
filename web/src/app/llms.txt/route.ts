import { SITE_URL } from "@/lib/seo/site";

export async function GET() {
  const body = `# Jimeng Network

> Custom software development studio for the AI era. We design, build and ship
> bespoke software, workflows and AI agents — one company at a time.

Slogan: Your tools. Custom-built. AI-powered.
Pricing tiers: Light $5–15k · Standard $15–50k · Flagship $50k+
Engagement model: 3 days from first contact to signed SOW. Milestone-based payment. Client owns all code and IP.

## Key pages

- [Services](${SITE_URL}/en/services): Four depths of AI engagement — tooling, workflow automation, bespoke agents, models & RAG.
- [Work](${SITE_URL}/en/work): Selected case studies (anonymized samples).
- [Industries](${SITE_URL}/en/industries): Playbooks for e-commerce, SaaS, cross-border, internal tools, AI agents, content & media.
- [Instant quote](${SITE_URL}/en/quote): Six questions, instant price range.
- [Insights](${SITE_URL}/en/insights): Articles on AI-native software development.
- [FAQ](${SITE_URL}/en/faq): Pricing, timelines, IP ownership, delivery guarantees.
- [Contact](${SITE_URL}/en/contact): Email, WhatsApp, WeChat.

## Full content

See ${SITE_URL}/llms-full.txt for a machine-readable summary of all published content.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
