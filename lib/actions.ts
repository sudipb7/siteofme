import { eq } from "drizzle-orm";

import db from "@/db";
import { redis } from "./redis";
import { Site, sites, type UserInsert, users } from "@/db/schema";
import { DEFAULT_SITE_CONFIG } from "@/app/(main)/lib/constants";
import { UpdateSiteInput } from "./schemas";

export const updateUser = async (id: string, data: UserInsert) => {
  try {
    const user = await db.update(users).set(data).where(eq(users.id, id)).returning();
    if (user.length === 0) {
      return null;
    }

    return user[0];
  } catch (error) {
    console.error("[ERROR >>> updateUser]", error);
    return null;
  }
};

export const createSiteDraft = async (site: Site) => {
  try {
    const siteDraft = await redis.set(`site:${site.slug}`, JSON.stringify(site));
    return siteDraft;
  } catch (error) {
    console.error("[ERROR >>> createSiteDraft]", error);
    return null;
  }
};

export const createSite = async (slug: string, userId: string) => {
  try {
    const site = await db
      .insert(sites)
      .values({
        slug,
        userId,
        ...DEFAULT_SITE_CONFIG,
      })
      .returning();

    await createSiteDraft(site[0]);

    return site[0];
  } catch (error) {
    console.error("[ERROR >>> createSite]", error);
    return null;
  }
};

export const publishSite = async (site: UpdateSiteInput) => {
  try {
    const publishedSite = await db
      .update(sites)
      .set({
        ...site,
        version: site.version + 1,
      })
      .where(eq(sites.id, site.id))
      .returning();

    await redis.set(`site:${site.slug}`, JSON.stringify(publishedSite[0]));

    return publishedSite[0];
  } catch (error) {
    console.error("[ERROR >>> publishSite]", error);
    return null;
  }
};
