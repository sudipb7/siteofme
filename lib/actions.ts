import { eq } from "drizzle-orm";

import db from "@/db";
import { sites, type UserInsert, users } from "@/db/schema";
import { DEFAULT_SITE_CONFIG } from "@/app/(main)/lib/constants";

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

    return site[0];
  } catch (error) {
    console.log("[ERROR >>> createSite]", error);
  }
};
