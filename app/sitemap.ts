import { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";
import { getAllPublishedSites } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["/", "/sign-in", "/sign-up", "/forgot-password"].map(route => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const sites = await getAllPublishedSites();

  const siteRoutes = sites.map(site => ({
    url: `${SITE_URL}/${site.slug}`,
    lastModified: site.updatedAt,
  }));

  return [...staticRoutes, ...siteRoutes];
}
