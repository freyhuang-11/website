import { SITE_URL } from "@/lib/seo/site";

// Notify IndexNow-compatible engines (Bing, Yandex, Seznam) of new/updated URLs.
export async function pingIndexNow(urls: string[]) {
  const key = process.env.INDEXNOW_KEY;
  if (!key || urls.length === 0) return { ok: false, reason: "no key or urls" };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key,
      keyLocation: `${SITE_URL}/${key}.txt`,
      urlList: urls,
    }),
  }).catch(() => null);

  return { ok: res?.ok ?? false, status: res?.status };
}
