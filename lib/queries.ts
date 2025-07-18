import { cache } from "react";
import { eq, gt } from "drizzle-orm";
import { sql, and, gte } from "drizzle-orm";

import db from "@/db";
import { auth } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { Site, sites, users, verificationTokens } from "@/db/schema";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (user.length === 0) {
      return null;
    }

    return user[0];
  } catch (error) {
    console.error("[ERROR >>> getUserByEmail]", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
    if (user.length === 0) {
      return null;
    }

    return user[0];
  } catch (error) {
    console.error("[ERROR >>> getUserById]", error);
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.username, username)).limit(1);
    if (user.length === 0) {
      return null;
    }

    return user[0];
  } catch (error) {
    console.error("[ERROR >>> getUserById]", error);
    return null;
  }
};

export const currentUser = cache(async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return null;
    }

    const user = await getUserById(session.user.id);
    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("[ERROR >>> currentUser]", error);
    return null;
  }
});

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: eq(verificationTokens.token, token),
    });

    return verificationToken;
  } catch (error) {
    console.error("[ERROR >>> getVerificationTokenByToken]", error);
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: eq(verificationTokens.identifier, email),
    });

    return verificationToken;
  } catch (error) {
    console.error("[ERROR >>> getVerificationTokenByEmail]", error);
    return null;
  }
};

export const getSiteBySlug = async (slug: string) => {
  try {
    const site = await db.query.sites.findFirst({ where: eq(sites.slug, slug) });
    if (!site) {
      return null;
    }

    return site;
  } catch (error) {
    console.error("[ERROR >>> getSiteBySlug]", error);
    return null;
  }
};

export const getSiteByUserId = async (userId: string) => {
  try {
    const site = await db.query.sites.findFirst({ where: eq(sites.userId, userId) });
    if (!site) {
      return null;
    }

    return site;
  } catch (error) {
    console.error("[ERROR >>> getSiteByUserId]", error);
    return null;
  }
};

export const getSiteDraftByUserName = async (username: string) => {
  try {
    const draft = await redis.get(`site:${username}`);
    if (!draft) {
      return null;
    }

    return draft as Site;
  } catch (error) {
    console.error("[ERROR >>> getSiteDraftByUserName]", error);
    return null;
  }
};

export async function getAllPublishedSites() {
  return db.query.sites.findMany({
    where: gt(sites.version, 0),
    columns: {
      slug: true,
      updatedAt: true,
    },
  });
}

export const getTotalUsersCount = async () => {
  try {
    const result = await db.select({ count: sql<number>`count(*)` }).from(users);
    return result[0]?.count || 0;
  } catch (error) {
    console.error("[ERROR >>> getTotalUsersCount]", error);
    return 0;
  }
};

export const getUsersWithSitesCount = async () => {
  try {
    const result = await db
      .select({ count: sql<number>`count(distinct ${sites.userId})` })
      .from(sites);
    return result[0]?.count || 0;
  } catch (error) {
    console.error("[ERROR >>> getUsersWithSitesCount]", error);
    return 0;
  }
};

export const getOnboardedUsersCount = async () => {
  try {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(
        and(
          sql`${users.name} IS NOT NULL AND ${users.name} != ''`,
          sql`${users.username} IS NOT NULL AND ${users.username} != ''`
        )
      );
    return result[0]?.count || 0;
  } catch (error) {
    console.error("[ERROR >>> getOnboardedUsersCount]", error);
    return 0;
  }
};

export const getTotalSitesCount = async () => {
  try {
    const result = await db.select({ count: sql<number>`count(*)` }).from(sites);
    return result[0]?.count || 0;
  } catch (error) {
    console.error("[ERROR >>> getTotalSitesCount]", error);
    return 0;
  }
};

export const getTotalNumberOfSitesPublished = async () => {
  try {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(sites)
      .where(gt(sites.version, 0));
    return result[0]?.count || 0;
  } catch (error) {
    console.error("[ERROR >>> getTotalNumberOfSitesPublished]", error);
    return 0;
  }
};

export const getTotalSitesPublished = async () => {
  try {
    const result = await db
      .select({ total: sql<number>`sum(${sites.version})` })
      .from(sites)
      .where(gt(sites.version, 0));
    return result[0]?.total || 0;
  } catch (error) {
    console.error("[ERROR >>> getTotalSitesPublished]", error);
    return 0;
  }
};

export const getUsersWithPublishedSitesCount = async () => {
  try {
    const result = await db
      .select({ count: sql<number>`count(distinct ${sites.userId})` })
      .from(sites)
      .where(gt(sites.version, 0));
    return result[0]?.count || 0;
  } catch (error) {
    console.error("[ERROR >>> getUsersWithPublishedSitesCount]", error);
    return 0;
  }
};

export const getUserSignupsInTimeRange = async (hours: number) => {
  try {
    const timeAgo = new Date();
    timeAgo.setHours(timeAgo.getHours() - hours);

    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(gte(users.createdAt, timeAgo));
    return result[0]?.count || 0;
  } catch (error) {
    console.error(`[ERROR >>> getUserSignupsInTimeRange(${hours}h)]`, error);
    return 0;
  }
};

export const getNumberOfSitesPublishedInTimeRange = async (hours: number) => {
  try {
    const timeAgo = new Date();
    timeAgo.setHours(timeAgo.getHours() - hours);

    // Count unique sites that have been updated in the time range and are published
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(sites)
      .where(and(gt(sites.version, 0), gte(sites.updatedAt, timeAgo)));
    return result[0]?.count || 0;
  } catch (error) {
    console.error(`[ERROR >>> getNumberOfSitesPublishedInTimeRange(${hours}h)]`, error);
    return 0;
  }
};

export const getTotalSitesPublishedInTimeRange = async (hours: number) => {
  try {
    const timeAgo = new Date();
    timeAgo.setHours(timeAgo.getHours() - hours);

    // Note: Without individual publish event tracking, we can't accurately count
    // total publishing events in a timeframe. This returns the same as unique sites
    // updated in the timeframe. For true publish event counting, we'd need a separate
    // publish_events table or similar tracking mechanism.
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(sites)
      .where(and(gt(sites.version, 0), gte(sites.updatedAt, timeAgo)));
    return result[0]?.count || 0;
  } catch (error) {
    console.error(`[ERROR >>> getTotalSitesPublishedInTimeRange(${hours}h)]`, error);
    return 0;
  }
};
