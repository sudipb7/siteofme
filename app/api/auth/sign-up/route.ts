import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import db from "@/db";
import { users } from "@/db/schema";
import { auth, signIn } from "@/lib/auth";
import { getZodError } from "@/lib/utils";
import { createSite } from "@/lib/actions";
import { signUpSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/lib/queries";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (session?.user?.id) {
      return NextResponse.json({ error: "You are already signed in" }, { status: 400 });
    }

    const reqBody = await req.json();

    const validated = signUpSchema.safeParse(reqBody);
    if (!validated.success) {
      return NextResponse.json({ error: getZodError(validated.error) }, { status: 400 });
    }

    const { email, username, password } = validated.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await getUserByEmail(email);
    if (user) {
      return NextResponse.json({ error: "Email already in use!" }, { status: 400 });
    }

    const newUser = (
      await db
        .insert(users)
        .values({
          email,
          username,
          password: hashedPassword,
        })
        .returning()
    )[0];

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.identifier, verificationToken.token);

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    const site = await createSite(username, newUser.id);
    if (!site) {
      return NextResponse.json({ error: "Failed to create site" }, { status: 500 });
    }

    return NextResponse.json({ message: `Welcome to the site of, ${username}` }, { status: 200 });
  } catch (error) {
    console.error("[ERROR] >> POST: /api/auth/sign-up", error);
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong :(" }, { status: 500 });
  }
}
