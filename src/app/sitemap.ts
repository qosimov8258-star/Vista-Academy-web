import type { MetadataRoute } from "next";
import { fetchLanding } from "@/lib/api";
import { PLACEHOLDER_GROUPS } from "@/lib/groups";
import type { LandingGroup } from "@/lib/types";

const SITE_URL = "https://vista-academy.uz";

const ROUTES = ["", "/jadval", "/taomlar", "/tarbiyachi", "/talim-yonalishi", "/oqituvchilar", "/ariza"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const groups = await fetchLanding<LandingGroup[]>("/groups", []);
  const groupSlugs = groups.length > 0 ? groups.map((group) => group.slug) : PLACEHOLDER_GROUPS.map((group) => group.slug);

  return [
    ...ROUTES.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...groupSlugs.map((slug) => ({
      url: `${SITE_URL}/guruhlar/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
