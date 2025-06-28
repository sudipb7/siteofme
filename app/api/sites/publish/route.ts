import { NextResponse } from "next/server";

import { getZodError } from "@/lib/utils";
import { withUser } from "@/lib/with-user";
import { publishSite } from "@/lib/actions";
import { updateSiteSchema } from "@/lib/schemas";

export const POST = withUser(
  async ({ req, user }) => {
    const body = await req.json();
    const validated = updateSiteSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: getZodError(validated.error) }, { status: 400 });
    }

    if (validated.data.slug !== user.username || validated.data.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const site = await publishSite(validated.data);
    if (!site) {
      return NextResponse.json({ error: "Failed to publish site" }, { status: 500 });
    }

    return NextResponse.json({ data: { site } }, { status: 200 });
  },
  {
    method: "POST",
    route: "/api/sites/publish",
  }
);
