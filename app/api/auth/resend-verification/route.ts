import { NextResponse } from "next/server";

import { withUser } from "@/lib/with-user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

export const POST = withUser(
  async ({ user }) => {
    const verificationToken = await generateVerificationToken(user.email!);
    if (!verificationToken) {
      return NextResponse.json({ error: "Failed to generate verification token" }, { status: 500 });
    }

    await sendVerificationEmail(verificationToken.identifier, verificationToken.token);

    return NextResponse.json({ message: "Verification email sent" });
  },
  {
    method: "POST",
    route: "/api/auth/resend-verification",
  }
);
