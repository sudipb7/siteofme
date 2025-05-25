import { NextResponse } from "next/server";

import { updateUser } from "@/lib/actions";
import { userSchema } from "@/lib/schemas";
import { getZodError } from "@/lib/utils";
import { withUser } from "@/lib/with-user";

export const PATCH = withUser(
  async ({ user, req, params }) => {
    const reqBody = await req.json();
    const { id } = params;

    if (user.id !== id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const validated = userSchema.safeParse(reqBody);
    if (!validated.success) {
      return NextResponse.json({ error: getZodError(validated.error) }, { status: 400 });
    }

    const updatedUser = await updateUser(id, validated.data);

    return NextResponse.json(
      { message: "User updated successfully", data: { user: updatedUser } },
      { status: 200 }
    );
  },
  {
    route: "/api/users/:id",
    method: "PATCH",
  }
);
