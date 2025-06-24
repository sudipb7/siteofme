import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { auth, signIn } from "@/lib/auth";
import { getZodError } from "@/lib/utils";
import { signInSchema } from "@/lib/schemas";
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

    const validated = signInSchema.safeParse(reqBody);
    if (!validated.success) {
      return NextResponse.json({ error: getZodError(validated.error) }, { status: 400 });
    }

    const { email, password } = validated.data;

    const user = await getUserByEmail(email);
    if (!user || !user.password) {
      return NextResponse.json({ error: "Try a different email or sign up" }, { status: 400 });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    if (!user.emailVerified) {
      const token = await generateVerificationToken(email);
      await sendVerificationEmail(token.identifier, token.token);
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return NextResponse.json(
      { message: `Welcome back to the site of, ${user.name ?? user.username}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ERROR] >> POST: /api/auth/sign-in", error);
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong :(" }, { status: 500 });
  }
}
