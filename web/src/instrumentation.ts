// Registers the GEO cron scheduler inside the Next.js server process.
// In production on Vercel, prefer Vercel Cron hitting /api/geo/crawl instead.
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.GEO_CRON_DISABLED === "true") return;

  const cron = (await import("node-cron")).default;
  const { runPipeline } = await import("@/lib/geo/pipeline");

  // 02:00 and 14:00 daily — §8.2 of HANDOFF.md
  cron.schedule("0 2,14 * * *", async () => {
    try {
      const result = await runPipeline();
      console.log("[geo-cron]", JSON.stringify(result.crawl), `scored=${result.scored} drafted=${result.drafted}`);
    } catch (e) {
      console.error("[geo-cron] failed", e);
    }
  });
  console.log("[geo-cron] scheduled: 0 2,14 * * *");
}
