import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL, STATIC_PATHS, LOCALES, localizedUrl } from "@/lib/seo/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, cases, industries] = await Promise.all([
    prisma.article.findMany({ where: { state: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.case.findMany({ select: { slug: true } }),
    prisma.industry.findMany({ select: { slug: true } }),
  ]);

  const dynamicPaths = [
    ...articles.map((a) => ({ path: `/insights/${a.slug}`, lastModified: a.updatedAt })),
    ...cases.map((c) => ({ path: `/work/${c.slug}`, lastModified: undefined })),
    ...industries.map((i) => ({ path: `/industries/${i.slug}`, lastModified: undefined })),
  ];

  const allPaths = [
    ...STATIC_PATHS.map((path) => ({ path, lastModified: undefined as Date | undefined })),
    ...dynamicPaths,
  ];

  return allPaths.map(({ path, lastModified }) => ({
    url: localizedUrl(path, "en"),
    lastModified: lastModified ?? new Date(),
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, localizedUrl(path, l)]),
      ),
    },
  }));
}
