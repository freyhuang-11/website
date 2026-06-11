export const SITE_URL = process.env.PUBLIC_SITE_URL ?? "https://jimeng.it.com";

export const STATIC_PATHS = [
  "",
  "/services",
  "/work",
  "/industries",
  "/about",
  "/quote",
  "/contact",
  "/insights",
  "/faq",
  "/privacy",
  "/terms",
];

export const LOCALES = ["en", "zh"] as const;

export function localizedUrl(path: string, locale: string) {
  return `${SITE_URL}/${locale}${path}`;
}
