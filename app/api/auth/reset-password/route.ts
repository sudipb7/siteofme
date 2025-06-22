import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import db from "@/db";
import { signIn } from "@/lib/auth";
import { getZodError } from "@/lib/utils";
import { updateUser } from "@/lib/actions";
import { signInSchema } from "@/lib/schemas";
import { verificationTokens } from "@/db/schema";
import { getUserByEmail, getVerificationTokenByToken } from "@/lib/queries";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const validated = signInSchema.pick({ password: true }).safeParse(reqBody);
    if (!validated.success) {
      return NextResponse.json({ error: getZodError(validated.error) }, { status: 400 });
    }

    const { password } = validated.data;

    if (!reqBody.token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const verificationToken = await getVerificationTokenByToken(reqBody.token);
    if (!verificationToken || new Date() > verificationToken.expires) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const user = await getUserByEmail(verificationToken.identifier);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const promises = [
      updateUser(user.id, {
        password: hashedPassword,
        email: user.email,
        ...(!user.emailVerified && { emailVerified: new Date() }),
      }),
      db.delete(verificationTokens).where(eq(verificationTokens.identifier, user.email)),
    ];

    await Promise.all(promises);

    await signIn("credentials", {
      email: user.email,
      password,
      redirect: false,
    });

    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
  } catch (error) {
    console.log("[ERROR] >> POST: /api/auth/reset-password", error);
    return NextResponse.json({ error: "Something went wrong :(" }, { status: 500 });
  }
}
