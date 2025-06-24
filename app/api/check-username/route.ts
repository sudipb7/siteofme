import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import db from "@/db";
import { users } from "@/db/schema";
import { getZodError } from "@/lib/utils";
import { signUpSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const validated = signUpSchema.pick({ username: true }).safeParse(reqBody);
    if (!validated.success) {
      return NextResponse.json({ error: getZodError(validated.error) }, { status: 400 });
    }

    const { username } = validated.data;

    const user = await db.select().from(users).where(eq(users.username, username)).limit(1);
    if (user.length > 0) {
      return NextResponse.json(
        { error: "This username is already taken, you’re a little late.😐" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "It’s available... this username is available! 😃" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ERROR] >> POST: /api/check-username", error);
    return NextResponse.json({ error: "Something went wrong :(" }, { status: 500 });
  }
}
