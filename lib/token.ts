import db from "@/db";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "./queries";
import { verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.delete(verificationTokens).where(eq(verificationTokens.token, existingToken.token));
  }

  const verficationToken = await db
    .insert(verificationTokens)
    .values({ identifier: email, token, expires })
    .returning();

  return verficationToken[0];
};
