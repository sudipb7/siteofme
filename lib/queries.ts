import { eq } from "drizzle-orm";

import db from "@/db";
import { auth } from "@/lib/auth";
import { users } from "@/db/schema";

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

export const currentUser = async () => {
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
};
