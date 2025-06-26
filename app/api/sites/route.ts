import { NextResponse } from "next/server";

import { withUser } from "@/lib/with-user";
import { createSite } from "@/lib/actions";
import { getSiteBySlug } from "@/lib/queries";
import { createSiteSchema } from "@/lib/schemas";
import { getZodError } from "@/lib/utils";

export const POST = withUser(
  async ({ user, req }) => {
    const body = await req.json();
    const validated = createSiteSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: getZodError(validated.error) }, { status: 400 });
    }

    const { slug, userId } = validated.data;

    if (slug !== user.username || userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingSite = await getSiteBySlug(slug);
    if (existingSite) {
      return NextResponse.json({ error: "Site already exists" }, { status: 400 });
    }

    const site = await createSite(slug, userId);
    if (!site) {
      return NextResponse.json({ error: "Failed to create site" }, { status: 500 });
    }

    return NextResponse.json(
      { data: { site }, message: "Site created successfully" },
      { status: 200 }
    );
  },
  {
    method: "POST",
    route: "/api/sites",
  }
);
