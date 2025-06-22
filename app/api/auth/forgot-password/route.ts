import { NextRequest, NextResponse } from "next/server";

import { getZodError } from "@/lib/utils";
import { signInSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/lib/queries";
import { sendResetPasswordEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const validated = signInSchema.pick({ email: true }).safeParse(reqBody);
    if (!validated.success) {
      return NextResponse.json({ error: getZodError(validated.error) }, { status: 400 });
    }

    const { email } = validated.data;

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const verificationToken = await generateVerificationToken(email);
    await sendResetPasswordEmail(email, verificationToken.token);

    return NextResponse.json({ message: "Reset password email sent" }, { status: 200 });
  } catch (error) {
    console.log("[ERROR] >> POST: /api/auth/forgot-password", error);
    return NextResponse.json({ error: "Something went wrong :(" }, { status: 500 });
  }
}
