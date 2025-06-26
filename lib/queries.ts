import { cache } from "react";
import { eq } from "drizzle-orm";

import db from "@/db";
import { auth } from "@/lib/auth";
import { sites, users, verificationTokens } from "@/db/schema";

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
