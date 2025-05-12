import { eq } from "drizzle-orm";

import db from "@/db";
import { UserInsert, users } from "@/db/schema";

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
